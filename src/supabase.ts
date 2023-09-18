import { createClient } from "@supabase/supabase-js";
import type { Database } from "./database.types";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_SECRET = import.meta.env.VITE_SUPABASE_SECRET;

if (!SUPABASE_URL || !SUPABASE_SECRET)
  throw "Missing VITE_SUPABASE_URL or VITE_SUPABASE_SECRET!";

const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_SECRET);

export default supabase;
