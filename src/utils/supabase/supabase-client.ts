import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://ysqnsccghaplinzqlhcl.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlzcW5zY2NnaGFwbGluenFsaGNsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYzNTg2NDgsImV4cCI6MjA3MTkzNDY0OH0.VuwYqe7rhUvkHGLmlu_BtSid-70NnNsbnyP0ZsXDA0g',
)
