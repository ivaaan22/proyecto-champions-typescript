import { createClient } from "@supabase/supabase-js"

const SUPABASE_URL = "https://tfofaaxbhbosjwlggeqr.supabase.co"
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRmb2ZhYXhiaGJvc2p3bGdnZXFyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA0ODkyOTAsImV4cCI6MjA5NjA2NTI5MH0.ixv0uYUv2I6kxFqOZ9PO3uiRRRYWHnQVGm2z7lbT-S0"

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
