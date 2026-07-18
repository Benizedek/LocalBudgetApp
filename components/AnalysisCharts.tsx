import React from 'react';
import { View, Text } from 'react-native';
import { Transaction } from '../types';
import { styles } from '../styles';

interface AnalysisChartsProps {
  transactions: Transaction[];
}

export default function AnalysisCharts({ transactions }: AnalysisChartsProps): React.JSX.Element {
  // ── Financial Calculations ─────────────────────────────────────
  const expenses = transactions.filter(t => t.amount < 0);

  // Group strictly by negative amounts, explicitly excluding "Income" category
  const categoryTotals: { [key: string]: number } = {};
  expenses.forEach(t => {
    const cat = t.category || 'Uncategorized';
    if (cat === 'Income') return; // Always exclude Income from charts
    categoryTotals[cat] = (categoryTotals[cat] || 0) + Math.abs(t.amount);
  });

  // Recalculate expense total without Income category for accurate chart percentages
  const chartExpenseTotal = Object.values(categoryTotals).reduce((a, b) => a + b, 0);

  const chartColors = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899', '#38bdf8', '#a855f7'];
  const chartData = Object.keys(categoryTotals).map((cat, idx) => {
    const amount = categoryTotals[cat];
    const percentage = chartExpenseTotal > 0 ? (amount / chartExpenseTotal) * 100 : 0;
    return { category: cat, amount, percentage, color: chartColors[idx % chartColors.length] };
  });

  return (
    <View style={{ gap: 16, paddingBottom: 24 }}>
      {/* ── Bar Chart (expenses only, no Income) ── */}
      <View style={{
        backgroundColor: '#1e293b',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#334155',
        padding: 16,
      }}>
        <Text style={styles.analysisCardTitle}>Category Bar Graph</Text>
        <View style={{ marginTop: 12, gap: 10 }}>
          {chartData.map(data => (
            <View key={data.category}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                <Text style={{ color: '#cbd5e1', fontSize: 12, fontWeight: '600', fontFamily: 'Segoe UI' }}>
                  {data.category}
                </Text>
                <Text style={{ color: '#94a3b8', fontSize: 11, fontFamily: 'Segoe UI' }}>
                  ${data.amount.toFixed(2)} ({data.percentage.toFixed(0)}%)
                </Text>
              </View>
              <View style={{ width: '100%', height: 10, backgroundColor: '#0f172a', borderRadius: 5, overflow: 'hidden' }}>
                {data.percentage > 0 && (
                  <View style={{ width: `${data.percentage}%`, height: '100%', backgroundColor: data.color, borderRadius: 5 }} />
                )}
              </View>
            </View>
          ))}
          {chartData.length === 0 && (
            <Text style={{ color: '#64748b', textAlign: 'center', paddingVertical: 20 }}>
              No expense data to generate bar chart.
            </Text>
          )}
        </View>
      </View>

      {/* ── Stacked Segmented Allocation Bar ── */}
      <View style={{ backgroundColor: '#1e293b', borderRadius: 12, borderWidth: 1, borderColor: '#334155', padding: 16 }}>
        <Text style={styles.analysisCardTitle}>Expense Allocation Breakdown</Text>

        {/* Stacked Bar */}
        <View style={{
          flexDirection: 'row',
          width: '100%',
          height: 24,
          backgroundColor: '#0f172a',
          borderRadius: 12,
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: '#334155',
          marginTop: 14,
        }}>
          {chartData.length > 0 ? (
            chartData.map(data =>
              data.percentage > 0 ? (
                <View
                  key={data.category}
                  style={{
                    width: `${data.percentage}%`,
                    height: '100%',
                    backgroundColor: data.color,
                    borderRightWidth: 2,
                    borderColor: '#1e293b',
                  }}
                />
              ) : null
            )
          ) : (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: '#64748b', fontSize: 11, fontFamily: 'Segoe UI' }}>
                No expense data to display.
              </Text>
            </View>
          )}
        </View>

        {/* Breakdown Legend */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 14 }}>
          {chartData.map(data => (
            <View key={data.category} style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: data.color }} />
              <Text style={{ color: '#f8fafc', fontSize: 12, fontWeight: '600', fontFamily: 'Segoe UI' }}>
                {data.category}
              </Text>
              <Text style={{ color: '#94a3b8', fontSize: 11, fontFamily: 'Segoe UI' }}>
                ${data.amount.toFixed(2)} ({data.percentage.toFixed(0)}%)
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
