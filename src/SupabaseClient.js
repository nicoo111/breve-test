import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://bptudwvistrqejzjqdjg.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJwdHVkd3Zpc3RycWVqempxZGpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgzMTY0NjIsImV4cCI6MjA1Mzg5MjQ2Mn0.9w1IpwYkcqv83e-hQfM2Tut51gS-f6attM9T3CUrWMg";


const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
