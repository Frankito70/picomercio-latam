// lib/supabaseClient.js
import { createClient } from '@supabase/supabase-js'

// Validación de variables de entorno
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Faltan las variables de entorno de Supabase. Verifica tu archivo .env.local')
}

// Cliente Supabase listo para usar en toda la app
export const supabase = createClient(supabaseUrl, supabaseKey)
