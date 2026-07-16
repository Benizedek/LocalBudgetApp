import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { styles } from '../styles';

interface TransactionFiltersProps {
  sortName: 'none' | 'asc' | 'desc';
  setSortName: (v: 'none' | 'asc' | 'desc') => void;
  selectedCategory: string;
  setSelectedCategory: (v: string) => void;
  selectedYear: string;
  setSelectedYear: (v: string) => void;
  selectedMonth: string;
  setSelectedMonth: (v: string) => void;
  selectedDay: string;
  setSelectedDay: (v: string) => void;
  availableCategories: string[];
  availableYears: string[];
}

const SORT_OPTIONS: { key: 'none' | 'asc' | 'desc'; label: string }[] = [
  { key: 'none', label: 'No Sorting' },
  { key: 'asc',  label: 'Alphabetical (A → Z)' },
  { key: 'desc', label: 'Reverse (Z → A)' },
];

const MONTHS: { key: string; label: string }[] = [
  { key: 'all', label: 'All Months' },
  ...Array.from({ length: 12 }, (_, i) => {
    const mm = String(i + 1).padStart(2, '0');
    const name = new Date(2000, i).toLocaleString(undefined, { month: 'short' });
    return { key: mm, label: `${name} (${mm})` };
  }),
];

const DAYS: { key: string; label: string }[] = [
  { key: 'all', label: 'All Days' },
  ...Array.from({ length: 31 }, (_, i) => {
    const dd = String(i + 1).padStart(2, '0');
    return { key: dd, label: `Day ${dd}` };
  }),
];

// ── Reusable single-dropdown renderer ────────────────────────────
function Dropdown<T extends string>({
  label,
  value,
  displayValue,
  options,
  isOpen,
  onToggle,
  onSelect,
}: {
  label: string;
  value: T;
  displayValue: string;
  options: { key: T; label: string }[];
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (v: T) => void;
}) {
  return (
    <>
      <Text style={styles.filterLabel}>{label}</Text>
      <TouchableOpacity style={styles.dropdownSelector} onPress={onToggle}>
        <Text style={styles.dropdownSelectorText}>{displayValue}</Text>
        <Text style={{ color: '#64748b' }}>{isOpen ? '▲' : '▼'}</Text>
      </TouchableOpacity>
      {isOpen && (
        <View style={[styles.dropdownMenu, { maxHeight: 180 }]}>
          <ScrollView nestedScrollEnabled>
            {options.map((o) => (
              <TouchableOpacity
                key={o.key}
                style={styles.dropdownItem}
                onPress={() => onSelect(o.key)}
              >
                <Text style={[
                  styles.dropdownItemText,
                  o.key === value && { color: '#3b82f6', fontWeight: '700' },
                ]}>
                  {o.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </>
  );
}

// ── Main component ───────────────────────────────────────────────
export default function TransactionFilters({
  sortName, setSortName,
  selectedCategory, setSelectedCategory,
  selectedYear, setSelectedYear,
  selectedMonth, setSelectedMonth,
  selectedDay, setSelectedDay,
  availableCategories,
  availableYears,
}: TransactionFiltersProps): React.JSX.Element {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggle = (id: string) => setActiveDropdown(prev => prev === id ? null : id);
  const select = <T extends string>(setter: (v: T) => void) => (v: T) => {
    setter(v);
    setActiveDropdown(null);
  };

  const categoryOptions = [
    { key: 'all', label: 'All Categories' },
    ...availableCategories.map(c => ({ key: c, label: c })),
  ];

  const yearOptions = [
    { key: 'all', label: 'All Years' },
    ...availableYears.map(y => ({ key: y, label: y })),
  ];

  return (
    <View style={styles.filterContainer}>
      <Dropdown
        label="Sort by Name"
        value={sortName}
        displayValue={SORT_OPTIONS.find(o => o.key === sortName)?.label ?? 'No Sorting'}
        options={SORT_OPTIONS}
        isOpen={activeDropdown === 'name'}
        onToggle={() => toggle('name')}
        onSelect={select(setSortName)}
      />
      <Dropdown
        label="Filter by Category"
        value={selectedCategory}
        displayValue={selectedCategory === 'all' ? 'All Categories' : selectedCategory}
        options={categoryOptions}
        isOpen={activeDropdown === 'category'}
        onToggle={() => toggle('category')}
        onSelect={select(setSelectedCategory)}
      />
      <Dropdown
        label="Filter by Year"
        value={selectedYear}
        displayValue={selectedYear === 'all' ? 'All Years' : selectedYear}
        options={yearOptions}
        isOpen={activeDropdown === 'year'}
        onToggle={() => toggle('year')}
        onSelect={select(setSelectedYear)}
      />
      <Dropdown
        label="Filter by Month"
        value={selectedMonth}
        displayValue={MONTHS.find(m => m.key === selectedMonth)?.label ?? 'All Months'}
        options={MONTHS}
        isOpen={activeDropdown === 'month'}
        onToggle={() => toggle('month')}
        onSelect={select(setSelectedMonth)}
      />
      <Dropdown
        label="Filter by Day"
        value={selectedDay}
        displayValue={DAYS.find(d => d.key === selectedDay)?.label ?? 'All Days'}
        options={DAYS}
        isOpen={activeDropdown === 'day'}
        onToggle={() => toggle('day')}
        onSelect={select(setSelectedDay)}
      />
    </View>
  );
}
