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
import { generateRandomTransactions } from './utils/mockData';
import Dashboard from './components/Dashboard';
import TransactionForm from './components/TransactionForm';
import TransactionFilters from './components/TransactionFilters';
import TransactionList from './components/TransactionList';

function App(): React.JSX.Element {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'filter'>('all');

  // Filter / sort state
  const [sortName, setSortName] = useState<'none' | 'asc' | 'desc'>('none');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [selectedDay, setSelectedDay] = useState('all');

  // Compute dashboard stats
  const totalExpenses = transactions
    .filter(t => t.amount < 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const totalAmount = transactions.reduce((sum, t) => sum + t.amount, 0);

  // Dynamic dropdown options derived from data
  const availableCategories = Array.from(
    new Set(transactions.map(t => t.category).filter((c): c is string => !!c))
  );

  const availableYears = Array.from(
    new Set(transactions.map(t => t.date.slice(0, 4)))
  ).sort();

  // Compute processed (filtered + sorted) transactions
  const processedTransactions = (() => {
    let list = [...transactions];

    if (selectedCategory !== 'all') {
      list = list.filter(t => t.category === selectedCategory);
    }
    if (selectedYear !== 'all') {
      list = list.filter(t => t.date.slice(0, 4) === selectedYear);
    }
    if (selectedMonth !== 'all') {
      list = list.filter(t => t.date.slice(5, 7) === selectedMonth);
    }
    if (selectedDay !== 'all') {
      list = list.filter(t => t.date.slice(8, 10) === selectedDay);
    }

    if (sortName === 'asc') {
      list.sort((a, b) => (a.description ?? '').localeCompare(b.description ?? ''));
    } else if (sortName === 'desc') {
      list.sort((a, b) => (b.description ?? '').localeCompare(a.description ?? ''));
    }

    return list;
  })();

  // Handle new transaction from form OR updating of a transaction
  const handleAddTransaction = (
    description: string | null,
    amount: number,
    category: string | null,
  ) => {
    if (editingTransaction) {
      // update mode: map over transaction to replace matching target ID
      setTransactions((prev) =>
        prev.map((t) =>
          t.id === editingTransaction.id
            ? { ...t, description, category, amount }
            : t
        )
      );
      setEditingTransaction(null);
    } else {
      // create new transaction with YYYY-MM-DD date format
      const now = new Date();
      const yyyy = now.getFullYear();
      const mm = String(now.getMonth() + 1).padStart(2, '0');
      const dd = String(now.getDate()).padStart(2, '0');

      const newTransaction: Transaction = {
        id: Date.now().toString(),
        description,
        category,
        amount,
        date: `${yyyy}-${mm}-${dd}`,
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

          {/* Seed button — always visible, appends 10 random transactions */}
          <TouchableOpacity
            style={styles.seedButton}
            onPress={() => {
              const newItems = generateRandomTransactions(10);
              setTransactions((prev) => [...prev, ...newItems]);
            }}
            activeOpacity={0.8}
          >
            <Text style={styles.seedButtonText}>⚡ Seed Mock Data</Text>
          </TouchableOpacity>
        </View>

        {/* Dashboard Summary */}
        <Dashboard
          totalExpenses={totalExpenses}
          totalAmount={totalAmount}
        />

        {/* Navigation Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'all' && styles.activeTabButton]}
            onPress={() => setActiveTab('all')}
          >
            <Text style={[styles.tabButtonText, activeTab === 'all' && styles.activeTabButtonText]}>
              All Transactions
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'filter' && styles.activeTabButton]}
            onPress={() => setActiveTab('filter')}
          >
            <Text style={[styles.tabButtonText, activeTab === 'filter' && styles.activeTabButtonText]}>
              Filters
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content: All Transactions */}
        {activeTab === 'all' && (
          <>
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
          </>
        )}

        {/* Tab Content: Filters */}
        {activeTab === 'filter' && (
          <TransactionFilters
            sortName={sortName}
            setSortName={setSortName}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedYear={selectedYear}
            setSelectedYear={setSelectedYear}
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            availableCategories={availableCategories}
            availableYears={availableYears}
          />
        )}

        {/* Divider */}
        <View style={styles.divider} />

        {/* Transaction List */}
        <TransactionList
          transactions={activeTab === 'filter' ? processedTransactions : transactions}
          onEditTransaction={handleEditTransaction}
        />
      </View>
    </SafeAreaView>
  );
}

export default App;