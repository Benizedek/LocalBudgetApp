import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { styles } from './styles';
import { Transaction } from './types';
import Dashboard from './components/Dashboard';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';

function App(): React.JSX.Element {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);

  // Compute dashboard stats
  const totalExpenses = transactions
    .filter(transaction => transaction.amount < 0)
    .reduce((runningTotal, transaction) => runningTotal + transaction.amount, 0);

  const totalAmount = transactions.reduce((runningTotal, transaction) => runningTotal + transaction.amount, 0);

  // Handle new transaction from form
  const handleAddTransaction = (
    description: string | null,
    amount: number,
    category: string | null,
  ) => {
    const newTransaction: Transaction = {
      id: Date.now().toString(),
      description,
      category,
      amount,
      date: new Date().toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
    };

    setTransactions((prev) => [newTransaction, ...prev]);
    setIsFormOpen(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0f172a" />

      <View style={styles.layout}>
        {/* Header / Brand Area */}
        <View style={styles.header}>
          <Text style={styles.titleText}>Local Budget Tracker</Text>
          <Text style={styles.subtitleText}>Windows Desktop Edition</Text>
        </View>

        {/* Dashboard Summary */}
        <Dashboard
          totalExpenses={totalExpenses}
          totalAmount={totalAmount}
        />

        {/* Action Button */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setIsFormOpen(!isFormOpen)}
          activeOpacity={0.8}
        >
          <Text style={styles.addButtonText}>
            {isFormOpen ? '✕ Close Form' : '+ Add New Transaction'}
          </Text>
        </TouchableOpacity>

        {/* Conditional Transaction Form */}
        {isFormOpen && (
          <>
            <View style={styles.divider} />
            <TransactionForm
              onSubmit={handleAddTransaction}
              onCancel={() => setIsFormOpen(false)}
            />
          </>
        )}

        {/* Divider */}
        <View style={styles.divider} />

        {/* Transaction List component (this is what renders the items!) */}
        <TransactionList transactions={transactions} />
      </View>
    </SafeAreaView>
  );
}

export default App;