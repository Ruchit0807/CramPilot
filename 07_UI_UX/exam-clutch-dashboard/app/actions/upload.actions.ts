'use server'

import { createClient } from '@/lib/supabase/server'
import { AI_CONFIG } from '@/lib/ai/config'

export async function processUpload(file: File, sessionId: string, fileCategory: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const userId = user?.id || null
  const guestId = !userId ? 'guest_session' : null // Ideally read from cookies

  // 1. Constraints Check
  if (file.size > AI_CONFIG.uploadLimits.maxFileSizeMB * 1024 * 1024) {
    throw new Error(`File size exceeds limit of ${AI_CONFIG.uploadLimits.maxFileSizeMB}MB`)
  }

  if (!AI_CONFIG.uploadLimits.allowedMimeTypes.includes(file.type as any)) {
    throw new Error('Invalid file type uploaded.')
  }

  // 2. Insert as 'queued'
  const { data: record, error: insertError } = await supabase
    .from('uploaded_files')
    .insert({
      session_id: sessionId,
      user_id: userId,
      guest_id: guestId,
      file_url: 'pending_upload_url', // Mock for now, would be S3/Supabase Storage URL
      file_name: file.name,
      file_type: file.type,
      file_category: fileCategory,
      processing_status: 'queued',
      page_count: 0, // Would be extracted during parsing
    })
    .select()
    .single()

  if (insertError) throw new Error('Failed to queue upload')

  // 3. Transition to 'processing'
  await supabase
    .from('uploaded_files')
    .update({ processing_status: 'processing' })
    .eq('id', record.id)

  try {
    // 4. Simulate Extraction (Here we would enforce maxPages and extractionTimeoutMs)
    // const extracted = await extractPDF(file, { timeout: AI_CONFIG.uploadLimits.extractionTimeoutMs })
    // if (extracted.pages > AI_CONFIG.uploadLimits.maxPages) throw new Error('Max pages exceeded')
    
    const mockExtractedText = 'Mock extracted syllabus text...'

    // 5. Complete
    await supabase
      .from('uploaded_files')
      .update({
        processing_status: 'completed',
        extracted_text: mockExtractedText,
        page_count: 5 // Mock value
      })
      .eq('id', record.id)

    return { success: true, fileId: record.id, text: mockExtractedText }
  } catch (err: any) {
    // 6. Fail
    await supabase
      .from('uploaded_files')
      .update({
        processing_status: 'failed',
        error_message: err.message || 'Unknown parsing error'
      })
      .eq('id', record.id)

    return { success: false, error: err.message }
  }
}
