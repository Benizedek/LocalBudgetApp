import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles';

interface DashboardProps {
  totalExpenses: number;
  totalAmount: number;
}

export function Dashboard({ totalExpenses, totalAmount }: DashboardProps): React.JSX.Element {

  // Check if total is positive
  const isTotalPositive = totalAmount >= 0;

  return (
    <View style={styles.dashboard}>
      {/* Total Expenses */}
      <View style={styles.statBox}>
        <Text style={styles.statLabel}>Total Expenses</Text>
        <Text style={[styles.statValue, styles.negativeColor]}>
          {totalExpenses.toLocaleString(undefined, {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Text>
      </View>

      {/* Total Amount */}
      <View style={styles.statBox}>
        <Text style={styles.statLabel}>Total Amount</Text>
        <Text style={[styles.statValue, isTotalPositive ? styles.positiveColor : styles.negativeColor]}>
          {totalAmount.toLocaleString(undefined, {
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

export default Dashboard;
