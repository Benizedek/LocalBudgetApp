// screens/AuthScreen.tsx — Modern dark-themed login/signup screen
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function AuthScreen(): React.JSX.Element {
  const { signIn, signUp } = useAuth();

  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const isSignIn = mode === 'signin';

  const handleSubmit = async () => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail) {
      setError('Please enter your email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setError('');
    setBusy(true);
    try {
      if (isSignIn) {
        await signIn(trimmedEmail, password);
      } else {
        await signUp(trimmedEmail, password);
      }
    } catch {
      // Error already shown by AuthContext Alert
    } finally {
      setBusy(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={s.root}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={s.scroll}
        keyboardShouldPersistTaps="handled"
      >
        {/* ── Branding ─────────────────────────────────────────── */}
        <View style={s.brandBlock}>
          <View style={s.logoCircle}>
            <Text style={s.logoEmoji}>💰</Text>
          </View>
          <Text style={s.brandTitle}>Local Budget</Text>
          <Text style={s.brandSubtitle}>
            Track your finances, everywhere.
          </Text>
        </View>

        {/* ── Card ──────────────────────────────────────────────── */}
        <View style={s.card}>
          <Text style={s.cardTitle}>
            {isSignIn ? 'Welcome Back' : 'Create Account'}
          </Text>
          <Text style={s.cardSubtitle}>
            {isSignIn
              ? 'Sign in to access your financial workspace.'
              : 'Sign up to start tracking across all your devices.'}
          </Text>

          {/* Email */}
          <Text style={s.label}>Email</Text>
          <TextInput
            style={s.input}
            placeholder="you@example.com"
            placeholderTextColor="#475569"
            value={email}
            onChangeText={(t) => {
              setEmail(t);
              if (error) setError('');
            }}
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            autoComplete="email"
          />

          {/* Password */}
          <Text style={s.label}>Password</Text>
          <TextInput
            style={s.input}
            placeholder="••••••••"
            placeholderTextColor="#475569"
            value={password}
            onChangeText={(t) => {
              setPassword(t);
              if (error) setError('');
            }}
            secureTextEntry
            textContentType={isSignIn ? 'password' : 'newPassword'}
            autoComplete={isSignIn ? 'current-password' : 'new-password'}
          />

          {/* Error */}
          {error !== '' && <Text style={s.error}>{error}</Text>}

          {/* Submit */}
          <TouchableOpacity
            style={[s.submitBtn, busy && { opacity: 0.6 }]}
            onPress={handleSubmit}
            disabled={busy}
            activeOpacity={0.8}
          >
            {busy ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={s.submitText}>
                {isSignIn ? 'Sign In' : 'Create Account'}
              </Text>
            )}
          </TouchableOpacity>

          {/* Mode toggle */}
          <View style={s.toggleRow}>
            <Text style={s.toggleLabel}>
              {isSignIn ? "Don't have an account?" : 'Already have an account?'}
            </Text>
            <TouchableOpacity
              onPress={() => {
                setMode(isSignIn ? 'signup' : 'signin');
                setError('');
              }}
            >
              <Text style={s.toggleLink}>
                {isSignIn ? 'Sign Up' : 'Sign In'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// ── Styles ──────────────────────────────────────────────────────
const s = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 48,
  },

  /* Branding */
  brandBlock: {
    alignItems: 'center',
    marginBottom: 36,
  },
  logoCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#1e293b',
    borderWidth: 2,
    borderColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  logoEmoji: {
    fontSize: 32,
  },
  brandTitle: {
    fontSize: 30,
    fontWeight: '800',
    color: '#f8fafc',
    fontFamily: 'Segoe UI',
  },
  brandSubtitle: {
    fontSize: 15,
    color: '#64748b',
    fontFamily: 'Segoe UI',
    marginTop: 6,
  },

  /* Card */
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#334155',
    padding: 28,
    maxWidth: 420,
    width: '100%',
    alignSelf: 'center',
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#f8fafc',
    fontFamily: 'Segoe UI',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#94a3b8',
    fontFamily: 'Segoe UI',
    marginBottom: 24,
    lineHeight: 20,
  },

  /* Inputs */
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
    fontFamily: 'Segoe UI',
  },
  input: {
    backgroundColor: '#0f172a',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#f8fafc',
    fontFamily: 'Segoe UI',
    marginBottom: 16,
  },

  /* Error */
  error: {
    color: '#f43f5e',
    fontSize: 13,
    fontFamily: 'Segoe UI',
    marginBottom: 12,
  },

  /* Submit */
  submitBtn: {
    backgroundColor: '#3b82f6',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 4,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  submitText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Segoe UI',
  },

  /* Toggle */
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    gap: 6,
  },
  toggleLabel: {
    color: '#64748b',
    fontSize: 14,
    fontFamily: 'Segoe UI',
  },
  toggleLink: {
    color: '#3b82f6',
    fontSize: 14,
    fontWeight: '700',
    fontFamily: 'Segoe UI',
  },
});
