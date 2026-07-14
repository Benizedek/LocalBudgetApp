import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { styles } from './styles';

// 1. TypeScript interface for a Transaction
export interface Transaction {
  id: string;
  description: string;
  amount: number; // Negative for expense, positive for income
  date: string;
}

function App(): React.JSX.Element {
  // 2. React state array (transactions) and transaction counter
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [counter, setCounter] = useState<number>(0);

  // 3. Add transaction logic (mock expense)
  const addTransaction = () => {
    const nextCounter = counter + 1;
    // Generate a random expense amount between -10.00 and -150.00
    const randomAmount = -(parseFloat((Math.random() * 140 + 10).toFixed(2)));

    const newTransaction: Transaction = {
      id: Date.now().toString() + '_' + nextCounter,
      description: `Transaction #${nextCounter}`,
      amount: randomAmount,
      date: new Date().toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
    };

    // Prepend to transactions array
    setTransactions((prev) => [newTransaction, ...prev]);
    setCounter(nextCounter);
  };

  // Calculate stats
  const totalExpenses = transactions.reduce((acc, t) => acc + t.amount, 0);
  const transactionCount = transactions.length;

  const renderItem = ({ item }: { item: Transaction }) => {
    return (
      <View style={styles.transactionCard}>
        <View style={styles.cardLeft}>
          <Text style={styles.descriptionText}>{item.description}</Text>
          <Text style={styles.dateText}>{item.date}</Text>
        </View>
        <View style={styles.cardRight}>
          <Text style={styles.amountText}>
            {item.amount.toLocaleString(undefined, {
              style: 'currency',
              currency: 'USD',
            })}
          </Text>
        </View>
      </View>
    );
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

        {/* Dashboard/Summary Section */}
        <View style={styles.dashboard}>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Total Expenses</Text>
            <Text style={[styles.statValue, styles.negativeColor]}>
              {totalExpenses.toLocaleString(undefined, {
                style: 'currency',
                currency: 'USD',
              })}
            </Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statLabel}>Logged Transactions</Text>
            <Text style={styles.statValue}>{transactionCount}</Text>
          </View>
        </View>

        {/* Action Button */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={addTransaction}
          activeOpacity={0.8}
        >
          <Text style={styles.addButtonText}>+ Add New Transaction</Text>
        </TouchableOpacity>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Scrollable Transaction List */}
        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyTextTitle}>No transactions logged</Text>
              <Text style={styles.emptyTextSubtitle}>
                Click the button above to add a mock transaction.
              </Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}

export default App;
