import { createClient } from '@supabase/supabase-js'

// These come from your Vercel environment variables
const supabaseUrl = https://quyanytwsjofpuzxcoxk.supabase.co
const supabaseAnonKey = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1eWFueXR3c2pvZnB1enhjb3hrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2MDU0OTYsImV4cCI6MjA2OTE4MTQ5Nn0.VblFij5MuSh98fLBQFCu383-v0R2EM-2gwXSeiC2o_A

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Optional: Log which environment you're connected to
console.log('Connected to:', import.meta.env.VITE_ENVIRONMENT || 'unknown')
console.log('Supabase URL:', supabaseUrl)
