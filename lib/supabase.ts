// lib/supabase.ts — Supabase client with AsyncStorage session persistence
import 'react-native-url-polyfill/auto';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// These are safe to hardcode directly: the anon/publishable key is meant to be
// public-facing. Row Level Security policies protect your data, not this key.
const supabaseUrl = 'https://qtssbwxslpkkkbymszac.supabase.co';
const supabaseAnonKey = 'sb_publishable_ji0lr9YW1GLBCG1fmVSkhg_EEfr0JbV';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false, // Prevents issues on React Native
  },
});