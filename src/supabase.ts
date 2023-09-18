import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_SECRET = import.meta.env.VITE_SUPABASE_SECRET;

if (!SUPABASE_URL || !SUPABASE_SECRET)
  throw "Missing VITE_SUPABASE_URL or VITE_SUPABASE_SECRET!";

const supabase = createClient(SUPABASE_URL, SUPABASE_SECRET);

export default supabase;
