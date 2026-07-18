import React from 'react';
import { StatusBar, View, ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider, useAuth } from './context/AuthContext';
import { TransactionProvider } from './context/TransactionContext';
import MainNavigation from './components/MainNavigation';
import AuthScreen from './screens/AuthScreen';
import { styles } from './styles';

/**
 * Inner component that reads auth state and conditionally renders
 * either the AuthScreen or the main app workspace.
 */
function AppGate(): React.JSX.Element {
  const { session, loading } = useAuth();

  // Restoring persisted session — show loading spinner
  if (loading) {
    return (
      <View style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
        <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  // No session — show login/signup screen
  if (!session) {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
        <AuthScreen />
      </View>
    );
  }

  // Authenticated — show the financial workspace
  return (
    <TransactionProvider>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
        <MainNavigation />
      </View>
    </TransactionProvider>
  );
}

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <AppGate />
      </AuthProvider>
    </SafeAreaProvider>
  );
}

export default App;