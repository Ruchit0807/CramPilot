import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // Use createBrowserClient for client-side components to ensure singleton instance
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
