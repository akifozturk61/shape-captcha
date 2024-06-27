import { createClient } from "@supabase/supabase-js";

const supabaseURL = "https://wgybbjcvaaqewzbpvqki.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndneWJiamN2YWFxZXd6YnB2cWtpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTk0OTg1NjgsImV4cCI6MjAzNTA3NDU2OH0.IhH-A4F4J2XToW2hI1AJ27c_nMLNTkE1zx9ftBRcdIc";
const supabase = createClient(supabaseURL, supabaseKey);

export default supabase;
