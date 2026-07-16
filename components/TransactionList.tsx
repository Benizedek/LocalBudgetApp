import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { Transaction } from '../types';
import TransactionCard from './TransactionCard';
import { styles } from '../styles';

interface TransactionListProps {
  transactions: Transaction[];
  onEditTransaction: (transaction: Transaction) => void
}

function TransactionList({ transactions }: TransactionListProps): React.JSX.Element {

  return (
    <FlatList
      data={transactions}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContent}
      renderItem={({ item }) => {
        // 1. Evaluate sign purely from the transaction amount
        const isIncome = item.amount >= 0;

        return (
          <View style={styles.transactionCard}>
            <View style={styles.cardLeft}>
              {/* Uses fallback in case the name is empty */}
              <Text style={styles.descriptionText}>
                {item.description ?? 'Untitled Expense'}
              </Text>
              <Text style={styles.dateText}>{item.date}</Text>
            </View>

            <View style={styles.cardRight}>
              {/* 2. Directly calls styles.positiveColor / styles.negativeColor from styles.ts */}
              <Text style={[
                isIncome ? styles.positiveColor : styles.negativeColor
              ]}>
                {item.amount.toLocaleString(undefined, {
                  style: 'currency',
                  currency: 'USD',
                })}
              </Text>
            </View>
          </View>
        );
      }}
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