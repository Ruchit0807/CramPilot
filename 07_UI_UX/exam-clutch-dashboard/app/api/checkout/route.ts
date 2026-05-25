import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import DodoPayments from 'dodopayments'

export async function GET(req: Request) {
  try {
    const dodoClient = new DodoPayments({
      bearerToken: process.env.DODO_SECRET_KEY || 'dummy_for_build',
      environment: 'test_mode',
    });

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      return NextResponse.redirect(new URL('/login?next=/api/checkout', req.url))
    }

    // Since we do not have a specific product_id, we will create a one-time payment link
    const session = await dodoClient.checkoutSessions.create({
      billing_address: {
        city: 'New York',
        country: 'US',
        state: 'NY',
        street: '123 Main St',
        zipcode: '10001',
      },
      product_cart: [
        {
          product_id: 'pdt_0NfY2p9aTOd0sDlLQeGmy',
          quantity: 1
        }
      ],
      metadata: {
        user_id: user.id
      },
      return_url: `${new URL(req.url).origin}/dashboard`
    });

    return NextResponse.redirect(session.checkout_url || '/error')
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.redirect(new URL('/error', req.url))
  }
}
