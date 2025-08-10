import { createClient, type SupabaseClient } from "@supabase/supabase-js"

export function getSupabaseServer(): SupabaseClient {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
  const service =
    process.env.SUPABASE_SERVICE_ROLE ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !service) {
    throw new Error("Faltan SUPABASE_URL y alguna clave (SUPABASE_SERVICE_ROLE o SUPABASE_SERVICE_ROLE_KEY o ANON).")
  }

  return createClient(url, service)
}
