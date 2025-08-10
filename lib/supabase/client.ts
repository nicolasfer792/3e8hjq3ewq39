"use client"

import { createClient, type SupabaseClient } from "@supabase/supabase-js"

let supabaseBrowser: SupabaseClient | null = null

export function getSupabaseBrowser() {
  if (supabaseBrowser) return supabaseBrowser
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !anon) {
    console.warn("Faltan NEXT_PUBLIC_SUPABASE_URL o NEXT_PUBLIC_SUPABASE_ANON_KEY")
  }
  supabaseBrowser = createClient(url!, anon!)
  return supabaseBrowser
}
