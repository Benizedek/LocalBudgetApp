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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a', // Slate 900
  },
  layout: {
    flex: 1,
    padding: 24,
    maxWidth: 800,
    width: '100%',
    alignSelf: 'center',
  },
  header: {
    marginBottom: 24,
  },
  titleText: {
    fontSize: 28,
    fontWeight: '800',
    color: '#f8fafc', // Slate 50
    fontFamily: 'Segoe UI',
  },
  subtitleText: {
    fontSize: 14,
    color: '#94a3b8', // Slate 400
    fontFamily: 'Segoe UI',
    marginTop: 4,
  },
  dashboard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 16,
  },
  statBox: {
    flex: 1,
    backgroundColor: '#1e293b', // Slate 800
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155', // Slate 700
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#94a3b8',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    fontFamily: 'Segoe UI',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#f8fafc',
    marginTop: 8,
    fontFamily: 'Segoe UI',
  },
  negativeColor: {
    color: '#f43f5e', // Rose 500
  },
  addButton: {
    backgroundColor: '#3b82f6', // Blue 500 (Windows blue accent)
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: 'Segoe UI',
  },
  divider: {
    height: 1,
    backgroundColor: '#334155',
    marginVertical: 24,
  },
  listContent: {
    flexGrow: 1,
    gap: 12,
    paddingBottom: 24,
  },
  transactionCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  cardLeft: {
    flex: 1,
  },
  descriptionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f8fafc',
    fontFamily: 'Segoe UI',
  },
  dateText: {
    fontSize: 12,
    color: '#64748b', // Slate 500
    marginTop: 4,
    fontFamily: 'Segoe UI',
  },
  cardRight: {
    marginLeft: 16,
  },
  amountText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#f43f5e', // Rose 500
    fontFamily: 'Segoe UI',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
  },
  emptyTextTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#94a3b8',
    fontFamily: 'Segoe UI',
    textAlign: 'center',
  },
  emptyTextSubtitle: {
    fontSize: 14,
    color: '#64748b',
    fontFamily: 'Segoe UI',
    textAlign: 'center',
    marginTop: 8,
  },
});

export default App;
