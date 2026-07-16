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
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  // Compute dashboard stats
  const totalExpenses = transactions
    .filter(transaction => transaction.amount < 0)
    .reduce((runningTotal, transaction) => runningTotal + transaction.amount, 0);

  const totalAmount = transactions.reduce((runningTotal, transaction) => runningTotal + transaction.amount, 0);

  // Handle new transaction from form OR updating of a transaction
  const handleAddTransaction = (
    description: string | null,
    amount: number,
    category: string | null,
  ) => {
    if (editingTransaction) {
      // update mode: map over transaction to replace mathcing target ID
      setTransactions((prev) =>
        prev.map((t) =>
          t.id === editingTransaction.id
            ? { ...t, description, category, amount }
            : t
        )
      );
      setEditingTransaction(null);
    } else {
      // create new transaction
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
    }
    setIsFormOpen(false);
  };

  // Handle edit button trigger
  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsFormOpen(true);
  };

  // Cancel state resets
  const handleCancelForm = () => {
    setIsFormOpen(false);
    setEditingTransaction(null);
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
              onCancel={handleCancelForm}
              initialTransaction={editingTransaction}
            />
          </>
        )}

        {/* Divider */}
        <View style={styles.divider} />

        {/* Transaction List component (this is what renders the items!) */}
        <TransactionList
          transactions={transactions}
          onEditTransaction={handleEditTransaction}
        />
      </View>
    </SafeAreaView>
  );
}

export default App;