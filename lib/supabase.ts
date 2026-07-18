// lib/supabase.ts — Supabase client with AsyncStorage session persistence
import 'react-native-url-polyfill/auto';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables.\n' +
    'Create a .env file in the project root with:\n' +
    '  EXPO_PUBLIC_SUPABASE_URL=https://your-project-url.supabase.co\n' +
    '  EXPO_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key\n' +
    'See .env.example for reference.',
  );
}

export const supabase = createClient(supabaseUrl!, supabaseAnonKey!, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false, // Prevents issues on React Native
  },
});
