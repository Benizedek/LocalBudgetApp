import React from 'react';
import { View, Text } from 'react-native';
import { Transaction } from '../types';
import { styles } from '../styles';

interface TransactionCardProps {
  transaction: Transaction;
}

function TransactionCard({ transaction }: TransactionCardProps): React.JSX.Element {
  const hasDescription = transaction.description != null && transaction.description.trim() !== '';
  const hasCategory = transaction.category != null && transaction.category.trim() !== '';

  // check if amount is positive
  const isTotalPositive = transaction.amount >= 0;

  return (
    <View style={styles.transactionCard}>
      <View style={styles.cardLeft}>
        {/* Description — fallback to "Untitled Expense" when null/empty */}
        <Text style={hasDescription ? styles.descriptionText : styles.descriptionMuted}>
          {hasDescription ? transaction.description : 'Untitled Expense'}
        </Text>

        {/* Category badge */}
        {hasCategory ? (
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryBadgeText}>{transaction.category}</Text>
          </View>
        ) : (
          <View style={styles.categoryBadgeMuted}>
            <Text style={styles.categoryBadgeMutedText}>Uncategorized</Text>
          </View>
        )}

        <Text style={styles.dateText}>{transaction.date}</Text>
      </View>

      <View style={styles.cardRight}>
        <Text style={[styles.amountText, isTotalPositive ? styles.positiveColor : styles.negativeColor]}>
          {transaction.amount.toLocaleString(undefined, {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Text>
      </View>
    </View>
  );
}

export default TransactionCard;
