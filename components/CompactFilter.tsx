import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface CompactFilterProps {
  filterState: 'all' | 'income' | 'expense' | 'date_desc' | 'amount_desc';
  setFilterState: (val: 'all' | 'income' | 'expense' | 'date_desc' | 'amount_desc') => void;
  selectedMonth: string;
  setSelectedMonth: (val: string) => void;
}

export default function CompactFilter({ filterState, setFilterState, selectedMonth, setSelectedMonth }: CompactFilterProps): React.JSX.Element {
  const isAndroid = Platform.OS === 'android';

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{isAndroid ? 'Month:' : 'View:'}</Text>
      <View style={styles.pickerContainer}>
        {isAndroid ? (
          <Picker
            selectedValue={selectedMonth}
            onValueChange={(itemValue) => setSelectedMonth(itemValue)}
            style={styles.picker}
            dropdownIconColor="#94a3b8"
          >
            <Picker.Item label="All Months" value="all" color="#0f172a" />
            <Picker.Item label="Jan (01)" value="01" color="#0f172a" />
            <Picker.Item label="Feb (02)" value="02" color="#0f172a" />
            <Picker.Item label="Mar (03)" value="03" color="#0f172a" />
            <Picker.Item label="Apr (04)" value="04" color="#0f172a" />
            <Picker.Item label="May (05)" value="05" color="#0f172a" />
            <Picker.Item label="Jun (06)" value="06" color="#0f172a" />
            <Picker.Item label="Jul (07)" value="07" color="#0f172a" />
            <Picker.Item label="Aug (08)" value="08" color="#0f172a" />
            <Picker.Item label="Sep (09)" value="09" color="#0f172a" />
            <Picker.Item label="Oct (10)" value="10" color="#0f172a" />
            <Picker.Item label="Nov (11)" value="11" color="#0f172a" />
            <Picker.Item label="Dec (12)" value="12" color="#0f172a" />
          </Picker>
        ) : (
          <Picker
            selectedValue={filterState}
            onValueChange={(itemValue) => setFilterState(itemValue)}
            style={styles.picker}
            dropdownIconColor="#94a3b8"
          >
            <Picker.Item label="All Transactions" value="all" color="#0f172a" />
            <Picker.Item label="Income Only" value="income" color="#0f172a" />
            <Picker.Item label="Expenses Only" value="expense" color="#0f172a" />
            <Picker.Item label="Sort by Date (Newest)" value="date_desc" color="#0f172a" />
            <Picker.Item label="Sort by Amount (Highest)" value="amount_desc" color="#0f172a" />
          </Picker>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#334155',
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 16,
  },
  label: {
    color: '#94a3b8',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 8,
  },
  pickerContainer: {
    flex: 1,
    minHeight: Platform.OS === 'android' ? 50 : 40,
    justifyContent: 'center',
  },
  picker: {
    color: '#f8fafc',
    backgroundColor: 'transparent',
    borderWidth: 0,
    minHeight: Platform.OS === 'android' ? 50 : 40,
  },
});
