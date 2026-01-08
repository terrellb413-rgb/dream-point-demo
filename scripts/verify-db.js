const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load env vars manually since we are running a standalone script
const envPath = path.join(__dirname, '../.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');

const env = {};
envContent.split('\n').forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) {
        env[key.trim()] = value.trim();
    }
});

const supabaseUrl = env['NEXT_PUBLIC_SUPABASE_URL'];
const supabaseKey = env['NEXT_PUBLIC_SUPABASE_ANON_KEY'];

if (!supabaseUrl || !supabaseKey) {
    console.error("❌ Missing .env.local variables");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function verify() {
    console.log("Checking Supabase connection...");
    const { data, error } = await supabase.from('shops').select('count', { count: 'exact', head: true });

    if (error) {
        if (error.code === '42P01') { // undefined_table
            console.error("\n❌ TABLES NOT FOUND. You have not run the SQL script yet.");
            console.error("Please go to the Supabase SQL Editor and run the script I provided.");
        } else {
            console.error("\n❌ CONNECTION ERROR:", error.message);
        }
    } else {
        console.log("\n✅ SUCCESS: 'shops' table found!");
        console.log("Database is ready.");
    }
}

verify();
