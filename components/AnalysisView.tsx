import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Transaction } from '../types';
import { styles } from '../styles';
import TransactionCard from './TransactionCard';

interface AnalysisViewProps {
  transactions: Transaction[];
  onEditTransaction: (transaction: Transaction) => void;
  selectedYear: string;
  setSelectedYear: (val: string) => void;
  selectedMonth: string;
  setSelectedMonth: (val: string) => void;
  selectedDay: string;
  setSelectedDay: (val: string) => void;
  availableYears: string[];
}


export default function AnalysisView({
  transactions,
  onEditTransaction,
  selectedYear,
  setSelectedYear,
  selectedMonth,
  setSelectedMonth,
  selectedDay,
  setSelectedDay,
  availableYears,
}: AnalysisViewProps): React.JSX.Element {
  const [activeDropdown, setActiveDropdown] = useState<'year' | 'month' | 'day' | null>(null);

  const months = [
    'All', 'Jan (01)', 'Feb (02)', 'Mar (03)', 'Apr (04)', 'May (05)',
    'Jun (06)', 'Jul (07)', 'Aug (08)', 'Sep (09)', 'Oct (10)', 'Nov (11)', 'Dec (12)',
  ];
  const days = ['All', ...Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'))];

  // ── Financial Calculations ─────────────────────────────────────
  const totalIncome = transactions
    .filter(t => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const expenses = transactions.filter(t => t.amount < 0);
  const totalExpenseSum = Math.abs(expenses.reduce((acc, t) => acc + t.amount, 0));
  const netMargin = totalIncome - totalExpenseSum;

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

  // Currency formatter
  const fmt = (val: number) =>
    val.toLocaleString(undefined, { style: 'currency', currency: 'USD', minimumFractionDigits: 2 });



  return (
    <View style={{ flexDirection: 'row', flex: 1, gap: 20 }}>
      {/* ════════════════ COLUMN 1: Filters + Transactions ════════════════ */}
      <View style={{
        flex: 1.2,
        backgroundColor: '#1e293b',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#334155',
        padding: 16,
      }}>
        <Text style={[styles.analysisCardTitle, { marginBottom: 12 }]}>
          Analysis Controls & Records
        </Text>

        {/* Date Filters Row */}
        <View style={{ flexDirection: 'row', gap: 8, marginBottom: 16, zIndex: 50 }}>
          {/* Year */}
          <View style={{ flex: 1, position: 'relative', zIndex: 53 }}>
            <Text style={styles.filterLabel}>Year</Text>
            <TouchableOpacity
              style={styles.dropdownSelector}
              onPress={() => setActiveDropdown(activeDropdown === 'year' ? null : 'year')}
            >
              <Text style={styles.dropdownSelectorText}>
                {selectedYear === 'all' ? 'All' : selectedYear}
              </Text>
              <Text style={{ fontSize: 10, color: '#64748b' }}>▼</Text>
            </TouchableOpacity>
            {activeDropdown === 'year' && (
              <View style={[styles.dropdownMenu, {
                position: 'absolute', top: '100%', left: 0, right: 0, maxHeight: 180, zIndex: 100,
              }]}>
                <ScrollView nestedScrollEnabled>
                  <TouchableOpacity
                    style={styles.dropdownItem}
                    onPress={() => { setSelectedYear('all'); setActiveDropdown(null); }}
                  >
                    <Text style={styles.dropdownItemText}>All Years</Text>
                  </TouchableOpacity>
                  {availableYears.map(yr => (
                    <TouchableOpacity
                      key={yr}
                      style={styles.dropdownItem}
                      onPress={() => { setSelectedYear(yr); setActiveDropdown(null); }}
                    >
                      <Text style={styles.dropdownItemText}>{yr}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>

          {/* Month */}
          <View style={{ flex: 1, position: 'relative', zIndex: 52 }}>
            <Text style={styles.filterLabel}>Month</Text>
            <TouchableOpacity
              style={styles.dropdownSelector}
              onPress={() => setActiveDropdown(activeDropdown === 'month' ? null : 'month')}
            >
              <Text style={styles.dropdownSelectorText}>
                {selectedMonth === 'all' ? 'All' : selectedMonth}
              </Text>
              <Text style={{ fontSize: 10, color: '#64748b' }}>▼</Text>
            </TouchableOpacity>
            {activeDropdown === 'month' && (
              <View style={[styles.dropdownMenu, {
                position: 'absolute', top: '100%', left: 0, right: 0, maxHeight: 180, zIndex: 100,
              }]}>
                <ScrollView nestedScrollEnabled>
                  {months.map((m, idx) => (
                    <TouchableOpacity
                      key={m}
                      style={styles.dropdownItem}
                      onPress={() => {
                        setSelectedMonth(idx === 0 ? 'all' : String(idx).padStart(2, '0'));
                        setActiveDropdown(null);
                      }}
                    >
                      <Text style={styles.dropdownItemText}>{m}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>

          {/* Day */}
          <View style={{ flex: 1, position: 'relative', zIndex: 51 }}>
            <Text style={styles.filterLabel}>Day</Text>
            <TouchableOpacity
              style={styles.dropdownSelector}
              onPress={() => setActiveDropdown(activeDropdown === 'day' ? null : 'day')}
            >
              <Text style={styles.dropdownSelectorText}>
                {selectedDay === 'all' ? 'All' : selectedDay}
              </Text>
              <Text style={{ fontSize: 10, color: '#64748b' }}>▼</Text>
            </TouchableOpacity>
            {activeDropdown === 'day' && (
              <View style={[styles.dropdownMenu, {
                position: 'absolute', top: '100%', left: 0, right: 0, maxHeight: 180, zIndex: 100,
              }]}>
                <ScrollView nestedScrollEnabled>
                  {days.map(d => (
                    <TouchableOpacity
                      key={d}
                      style={styles.dropdownItem}
                      onPress={() => { setSelectedDay(d === 'All' ? 'all' : d); setActiveDropdown(null); }}
                    >
                      <Text style={styles.dropdownItemText}>
                        {d === 'All' ? 'All Days' : `Day ${d}`}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>
        </View>

        {/* Transaction List */}
        <ScrollView style={{ flex: 1, marginTop: 8 }} contentContainerStyle={{ gap: 10 }}>
          {transactions.map(item => (
            <TransactionCard
              key={item.id}
              transaction={item}
              onEdit={() => onEditTransaction(item)}
            />
          ))}
          {transactions.length === 0 && (
            <Text style={{ color: '#64748b', textAlign: 'center', marginTop: 40 }}>
              No transactions match selected filters.
            </Text>
          )}
        </ScrollView>
      </View>

      {/* ════════════════ COLUMN 2: P&L + Charts (scrollable) ════════════════ */}
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ gap: 16, paddingBottom: 24 }}>

        {/* ── Net P&L Statement Card (stacked rows) ── */}
        <View style={{
          backgroundColor: '#1e293b',
          borderRadius: 12,
          borderWidth: 1,
          borderColor: '#334155',
          padding: 16,
        }}>
          <Text style={styles.analysisCardTitle}>Net P&L Statement</Text>
          <View style={{ gap: 10 }}>
            {/* Income Row */}
            <View style={{
              backgroundColor: '#0f172a',
              borderRadius: 8,
              padding: 14,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <Text style={{ color: '#94a3b8', fontSize: 12, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5, fontFamily: 'Segoe UI' }}>
                Total Income
              </Text>
              <Text style={{ color: '#10b981', fontSize: 18, fontWeight: '700', fontFamily: 'Segoe UI' }}>
                {fmt(totalIncome)}
              </Text>
            </View>
            {/* Expenses Row */}
            <View style={{
              backgroundColor: '#0f172a',
              borderRadius: 8,
              padding: 14,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <Text style={{ color: '#94a3b8', fontSize: 12, fontWeight: '600', textTransform: 'uppercase', letterSpacing: 0.5, fontFamily: 'Segoe UI' }}>
                Total Expenses
              </Text>
              <Text style={{ color: '#f43f5e', fontSize: 18, fontWeight: '700', fontFamily: 'Segoe UI' }}>
                {fmt(totalExpenseSum)}
              </Text>
            </View>
            {/* Net Margin Row */}
            <View style={{
              backgroundColor: '#0f172a',
              borderRadius: 8,
              padding: 14,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: netMargin >= 0 ? '#064e3b' : '#4c0519',
            }}>
              <Text style={{ color: '#f8fafc', fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5, fontFamily: 'Segoe UI' }}>
                Net Margin
              </Text>
              <Text style={{
                color: netMargin >= 0 ? '#10b981' : '#f43f5e',
                fontSize: 20,
                fontWeight: '800',
                fontFamily: 'Segoe UI',
              }}>
                {netMargin >= 0 ? '+' : ''}{fmt(netMargin)}
              </Text>
            </View>
          </View>
        </View>

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
      </ScrollView>
    </View>
  );
}
