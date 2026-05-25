import { createClient } from './client'

export async function signInWithGoogle() {
  const supabase = createClient()
  
  // We infer the origin dynamically if executed in browser
  const origin = typeof window !== 'undefined' ? window.location.origin : ''

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${origin}/auth/callback`,
      // Optional: Request additional scopes if necessary
      // scopes: 'email profile',
    },
  })

  if (error) {
    console.error('Google Auth Error:', error.message)
    return { success: false, error: error.message }
  }

  return { success: true, data }
}

export async function signOut() {
  const supabase = createClient()
  const { error } = await supabase.auth.signOut()
  
  if (error) {
    console.error('Sign out error:', error.message)
    return { success: false, error: error.message }
  }
  
  // Reload the page to reset the application state
  if (typeof window !== 'undefined') {
    window.location.reload()
  }
  return { success: true }
}

export async function signInWithPassword(email: string, password: string) {
  const supabase = createClient()
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { success: false, error: error.message }
  }
  return { success: true, data }
}

export async function signUp(email: string, password: string) {
  const supabase = createClient()
  // We infer the origin dynamically if executed in browser
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback`,
    },
  })

  if (error) {
    return { success: false, error: error.message }
  }
  return { success: true, data }
}
