import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { createAdminClient } from '@/lib/supabase/server'
import DodoPayments from 'dodopayments'

export async function POST(req: Request) {
  try {
    const dodoClient = new DodoPayments({
      bearerToken: process.env.DODO_SECRET_KEY || 'dummy_for_build',
      webhookKey: process.env.DODO_WEBHOOK_SECRET || 'dummy_for_build'
    });

    const body = await req.text()
    const headersList = await headers()
    const headerObj = Object.fromEntries(headersList.entries())
    
    let event;
    try {
      event = dodoClient.webhooks.unwrap(body, { headers: headerObj });
    } catch (err) {
      console.error('[Dodo Webhook] Invalid Signature', err)
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    // Dodopayments wrapper returns the event wrapped or direct.
    // The event payload itself is in event
    const eventId = (event as any).event_id || (event as any).id || crypto.randomUUID()
    
    const supabase = await createAdminClient()

    // 1 & 2. Idempotency Check via Unique Constraint
    const { error: insertError } = await supabase.from('payment_events').insert({
      event_id: eventId,
      event_type: event.type,
      payload: event,
      status: 'processing'
    })

    if (insertError) {
      // 23505 is the Postgres error code for unique_violation
      if (insertError.code === '23505') {
        console.log(`[Dodo Webhook] Event ${eventId} already processed (duplicate)`)
        return NextResponse.json({ status: 'ignored', reason: 'duplicate' })
      }
      throw insertError
    }

    let processingStatus = 'processed'

    // 3. Process Specific Events
    if (event.type === 'payment.succeeded') {
      const paymentData = (event as any).data
      const userId = paymentData.metadata?.user_id // Passed in via payment link metadata
      
      if (!userId) {
        throw new Error('No user_id found in payment metadata')
      }

      // Add to payments table
      await supabase.from('payments').insert({
        user_id: userId,
        payment_id: paymentData.payment_id || paymentData.id,
        dodo_customer_id: paymentData.customer_id,
        amount: paymentData.total_amount || paymentData.amount,
        currency: paymentData.currency,
        status: 'succeeded',
        product_type: 'exam_booster_pack',
        purchased_at: new Date(paymentData.created_at || Date.now()).toISOString()
      })

      // Grant Credits (100 Recovery Credits, valid for 30 days)
      const expirationDate = new Date()
      expirationDate.setDate(expirationDate.getDate() + 30)

      // Fetch current credits to accumulate
      const { data: user } = await supabase
        .from('users')
        .select('credits_remaining')
        .eq('id', userId)
        .single()
      
      const newCredits = (user?.credits_remaining || 0) + 100

      await supabase
        .from('users')
        .update({
          credits_remaining: newCredits,
          credits_expires_at: expirationDate.toISOString()
        })
        .eq('id', userId)

    } else if (event.type === 'payment.failed') {
      processingStatus = 'processed'
    } else if (event.type === 'refund.succeeded') {
      processingStatus = 'processed'
    } else {
      processingStatus = 'ignored'
    }

    // 4. Update Event Status
    await supabase
      .from('payment_events')
      .update({ status: processingStatus, processed_at: new Date().toISOString() })
      .eq('event_id', eventId)

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('[Dodo Webhook Error]', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
