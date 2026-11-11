const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    throw new Error("Supabase environment variables are missing");
}

const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false,
    },
});


async function checkSupabaseConnection() {
    const response = await fetch(
        `${supabaseUrl}/auth/v1/settings`,
        {
            headers: {
                apikey: supabaseKey,
            },
        }
    );

    const responseBody = await response.text();

    console.log("Supabase HTTP Status:", response.status);
    console.log("Supabase Response:", responseBody);

    if (!response.ok) {
        throw new Error(
            `Supabase returned status ${response.status}`
        );
    }

    return true;
}

module.exports = {
    supabase,
    checkSupabaseConnection,
};