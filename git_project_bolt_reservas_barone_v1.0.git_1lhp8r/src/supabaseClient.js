import { createClient } from '@supabase/supabase-js';

    const supabaseUrl = 'https://rzazywxicpmsmhrngsns.supabase.co'; // Reemplaza con tu URL de Supabase
    const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ6YXp5d3hpY3Btc21ocm5nc25zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ5NTg5MjgsImV4cCI6MjA1MDUzNDkyOH0.S7PwMpKLtusYvKd5O86-aUECej0rBNwW31Dh-iOiSsI'; // Reemplaza con tu Anon Key

    export const supabase = createClient(supabaseUrl, supabaseAnonKey);
