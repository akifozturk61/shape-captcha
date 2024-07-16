import { createClient } from "@supabase/supabase-js";

const supabaseURL = "https://kttjgwjkqxnlmadhxnpk.supabase.co";

const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0dGpnd2prcXhubG1hZGh4bnBrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjExNTIyNDEsImV4cCI6MjAzNjcyODI0MX0.t4NmBYlppquAaB7XbPytwCuwx_TNhfEzq8oehSpQZd4";
const supabase = createClient(supabaseURL, supabaseKey);

export default supabase;
