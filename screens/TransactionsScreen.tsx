import React from 'react';
import { View, Text, TouchableOpacity, useWindowDimensions, FlatList } from 'react-native';
import { useTransactionContext } from '../context/TransactionContext';
import TransactionCard from '../components/TransactionCard';
import TransactionForm from '../components/TransactionForm';
import CompactFilter from '../components/CompactFilter';
import { styles } from '../styles';
import { generateRandomTransactions } from '../utils/mockData';

export default function TransactionsScreen(): React.JSX.Element {
  const {
    transactions, setTransactions,
    isFormOpen, setIsFormOpen,
    editingTransaction,
    categories,
    filterState, setFilterState,
    selectedMonth, setSelectedMonth,
    processedTransactions,
    handleAddTransaction, handleEditTransaction, handleCancelForm
  } = useTransactionContext();

  const { width } = useWindowDimensions();
  const layoutPadding = width > 768 ? 24 : 16;

  const renderHeader = () => (
    <>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
        <TouchableOpacity
          style={[styles.seedButton, { flex: 1, marginRight: 8 }]}
          onPress={() => {
            const newItems = generateRandomTransactions(10);
            setTransactions((prev) => [...prev, ...newItems]);
          }}
          activeOpacity={0.8}
        >
          <Text style={styles.seedButtonText}>⚡ Seed Data</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.addButton, { flex: 1, marginLeft: 8 }]}
          onPress={() => setIsFormOpen(!isFormOpen)}
          activeOpacity={0.8}
        >
          <Text style={styles.addButtonText}>
            {isFormOpen ? '✕ Close Form' : '+ Add New'}
          </Text>
        </TouchableOpacity>
      </View>

      {isFormOpen && (
        <View style={{ marginBottom: 24 }}>
          <TransactionForm
            onSubmit={handleAddTransaction}
            onCancel={handleCancelForm}
            initialTransaction={editingTransaction}
            categories={categories}
          />
        </View>
      )}

      <CompactFilter 
        filterState={filterState} 
        setFilterState={setFilterState} 
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
      />
    </>
  );

  return (
    <View style={[styles.layout, { padding: layoutPadding, paddingBottom: 0 }]}>
      <FlatList
        data={processedTransactions}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TransactionCard
            transaction={item}
            onEdit={() => handleEditTransaction(item)}
          />
        )}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyTextTitle}>No transactions found</Text>
            <Text style={styles.emptyTextSubtitle}>
              Try adjusting your filter or add a new transaction.
            </Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 40, gap: 10 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
