import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Transaction } from '../types';
import { styles } from '../styles';

interface TransactionCardProps {
  transaction: Transaction;
  onEdit: (transaction: Transaction) => void;
}

function TransactionCard({ transaction, onEdit }: TransactionCardProps): React.JSX.Element {
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
        <TouchableOpacity
          onPress={() => onEdit(transaction)}
          activeOpacity={0.7}
          style={{
            paddingVertical: 4,
            paddingHorizontal: 8,
            borderRadius: 4,
            backgroundColor: '#334155',
            marginTop: 8,
          }}
        >
          <Text style={{ color: '#cbd5e1', fontSize: 11, fontWeight: '600' }}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default TransactionCard;
