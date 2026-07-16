import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Transaction } from '../types';
import TransactionCard from './TransactionCard';
import { styles } from '../styles';

interface TransactionListProps {
  transactions: Transaction[];
  onEditTransaction: (transaction: Transaction) => void
}

function TransactionList({ transactions, onEditTransaction }: TransactionListProps): React.JSX.Element {

  return (
    <FlatList
      data={transactions}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContent}
      renderItem={({ item }) => (
        <TransactionCard
          transaction={item}
          onEdit={onEditTransaction}
        />
      )}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTextTitle}>No transactions logged</Text>
          <Text style={styles.emptyTextSubtitle}>
            Click the button above to add a transaction.
          </Text>
        </View>
      }
    />
  );
}

export default TransactionList;