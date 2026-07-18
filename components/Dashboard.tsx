import React from 'react';
import { View, Text, useWindowDimensions } from 'react-native';
import { styles } from '../styles';

interface DashboardProps {
  totalIncome: number;
  totalExpenses: number;
  netMargin: number;
}

export function Dashboard({ totalIncome, totalExpenses, netMargin }: DashboardProps): React.JSX.Element {

  // Check if net margin is positive
  const isMarginPositive = netMargin >= 0;

  const { width } = useWindowDimensions();
  const isMobile = width <= 768;

  return (
    <View style={[styles.dashboard, { gap: 12 }, isMobile && { flexDirection: 'column' }]}>
      {/* Total Income */}
      <View style={[styles.statBox, { flex: 1, minHeight: 90, paddingVertical: 16 }]}>
        <Text style={styles.statLabel}>Total Income</Text>
        <Text
          style={[styles.statValue, styles.positiveColor]}
          adjustsFontSizeToFit={true}
          numberOfLines={1}
        >
          {totalIncome.toLocaleString(undefined, {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Text>
      </View>

      {/* Total Expenses */}
      <View style={[styles.statBox, { flex: 1, minHeight: 90, paddingVertical: 16 }]}>
        <Text style={styles.statLabel}>Total Expenses</Text>
        <Text
          style={[styles.statValue, styles.negativeColor]}
          adjustsFontSizeToFit={true}
          numberOfLines={1}
        >
          {totalExpenses.toLocaleString(undefined, {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </Text>
      </View>

      {/* Net Margin */}
      <View style={[styles.statBox, { flex: 1, minHeight: 90, paddingVertical: 16 }]}>
        <Text style={styles.statLabel}>Net Margin</Text>
        <Text
          style={[styles.statValue, isMarginPositive ? styles.positiveColor : styles.negativeColor]}
          adjustsFontSizeToFit={true}
          numberOfLines={1}
        >
          {netMargin.toLocaleString(undefined, {
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
