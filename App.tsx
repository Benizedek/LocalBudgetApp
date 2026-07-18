import React from 'react';
import { StatusBar, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TransactionProvider } from './context/TransactionContext';
import MainNavigation from './components/MainNavigation';
import { styles } from './styles';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <TransactionProvider>
        <View style={styles.container}>
          <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
          <MainNavigation />
        </View>
      </TransactionProvider>
    </SafeAreaProvider>
  );
}

export default App;