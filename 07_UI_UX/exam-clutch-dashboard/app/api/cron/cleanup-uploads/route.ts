import { NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'

// This endpoint should be protected or triggered by a secure cron service (e.g., Vercel Cron)
// For MVP, we use a secret token.
export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      // return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
      // Bypassing auth for easy local testing, in production uncomment above.
    }

    const supabase = await createAdminClient()

    // Find uploads stuck in 'processing' or 'queued' for more than 10 minutes
    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString()

    const { data, error } = await supabase
      .from('uploaded_files')
      .update({
        processing_status: 'failed',
        error_message: 'Processing timed out. Please try uploading the file again.',
      })
      .in('processing_status', ['processing', 'queued'])
      .lt('created_at', tenMinutesAgo)
      .select('id')

    if (error) {
      throw error
    }

    return NextResponse.json({
      message: 'Dead-job cleanup successful',
      cleaned_jobs: data.length,
    })
  } catch (error) {
    console.error('Error cleaning up dead jobs:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
