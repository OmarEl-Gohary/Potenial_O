import { createClient } from '@supabase/supabase-js'

// These come from your Vercel environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Optional: Log which environment you're connected to
console.log('Connected to:', import.meta.env.VITE_ENVIRONMENT || 'unknown')
console.log('Supabase URL:', supabaseUrl)
