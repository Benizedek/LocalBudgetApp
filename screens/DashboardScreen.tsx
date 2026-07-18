import React from 'react';
import { View, ScrollView, useWindowDimensions, ActivityIndicator } from 'react-native';
import { Dashboard } from '../components/Dashboard';
import AnalysisCharts from '../components/AnalysisCharts';
import CompactFilter from '../components/CompactFilter';
import { useTransactionContext } from '../context/TransactionContext';

export default function DashboardScreen(): React.JSX.Element {
  const {
    loading,
    totalIncome, totalExpenses, netMargin,
    processedTransactions,
    filterState, setFilterState,
    selectedMonth, setSelectedMonth
  } = useTransactionContext();

  const { width } = useWindowDimensions();
  const layoutPadding = width > 768 ? 24 : 16;

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0f172a' }}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return (
    <ScrollView 
      contentContainerStyle={{ 
        flexGrow: 1, 
        padding: layoutPadding, 
        paddingBottom: 40,
        maxWidth: 800,
        width: '100%',
        alignSelf: 'center'
      }}
      showsVerticalScrollIndicator={false}
    >
      <CompactFilter 
        filterState={filterState} 
        setFilterState={setFilterState} 
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
      />

      <Dashboard
        totalIncome={totalIncome}
        totalExpenses={totalExpenses}
        netMargin={netMargin}
      />

      <View style={{ marginTop: 24 }}>
        <AnalysisCharts transactions={processedTransactions} />
      </View>
    </ScrollView>
  );
}
