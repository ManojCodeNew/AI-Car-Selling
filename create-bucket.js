require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function createBucket() {
  const { data, error } = await supabase.storage.createBucket('car-images', {
    public: true
  });

  if (error) {
    console.error('Error creating bucket:', error);
  } else {
    console.log('✅ Bucket created successfully:', data);
  }
}

createBucket();