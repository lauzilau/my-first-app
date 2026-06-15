import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://dszuizsqakkarsykjvut.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRzenVpenNxYWtrYXJzeWtqdnV0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE1NDkzOTQsImV4cCI6MjA5NzEyNTM5NH0.724PXaCzajcrEjwFIXHh8ylHXknXSlf7cUo7a0ZRltY";

export const supabase = createClient(supabaseUrl, supabaseKey);