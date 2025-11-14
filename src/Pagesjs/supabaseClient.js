import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://dkgtszqlveselvacujaf.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRrZ3RzenFsdmVzZWx2YWN1amFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwMjMwNjgsImV4cCI6MjA3ODU5OTA2OH0.NBaY2al2mc7h9ovCI3nhHJPTCuAR0f3-N27P0--DbaM";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
