import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { styles } from '../styles';
import { Transaction } from '../types';

interface TransactionFormProps {
  onSubmit: (description: string | null, amount: number, category: string | null, transactionType: 'expense' | 'income') => void;
  onCancel: () => void;
  initialTransaction?: Transaction | null;
}

function TransactionForm({ onSubmit, onCancel, initialTransaction }: TransactionFormProps): React.JSX.Element {

  const isEditing = !!initialTransaction;

  const [description, setDescription] = useState(initialTransaction?.description ?? '');
  const [amount, setAmount] = useState(initialTransaction ? Math.abs(initialTransaction.amount).toString() : '');
  const [category, setCategory] = useState(initialTransaction?.category ?? '');
  const [amountError, setAmountError] = useState('');
  const [transactionType, setTransactionType] = useState<'expense' | 'income'>(initialTransaction && initialTransaction.amount >= 0 ? 'income' : 'expense');


  const handleSubmit = () => {
    // Validate amount — must be non-empty and a finite number
    const trimmedAmount = amount.trim();
    const parsedAmount = Number(trimmedAmount);

    if (trimmedAmount === '' || !isFinite(parsedAmount)) {
      setAmountError('Please enter a valid dollar amount.');
      return;
    }

    setAmountError('');

    const finalAmount = transactionType === 'expense'
      ? -Math.abs(parsedAmount)
      : Math.abs(parsedAmount);

    // Coerce empty/whitespace-only strings to null
    const finalDescription = description.trim() !== '' ? description.trim() : null;
    const finalCategory = category.trim() !== '' ? category.trim() : null;

    onSubmit(finalDescription, finalAmount, finalCategory, transactionType);
  };

  return (
    <View style={styles.formOverlay}>
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>{isEditing ? 'Edit Transaction' : 'New Transaction'}</Text>

        {/* Toggle Transaction Type */}
        <View style={{ flexDirection: 'row', marginBottom: 16, gap: 8 }}>
          <TouchableOpacity
            style={[
              { flex: 1, padding: 12, borderRadius: 6, alignItems: 'center', backgroundColor: '#334155' }, transactionType === 'expense' && { backgroundColor: '#ef4444' }
            ]}
            onPress={() => setTransactionType('expense')}
            activeOpacity={0.7}
          >
            <Text style={{ color: '#fff', fontWeight: '700' }}>Expense</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              { flex: 1, padding: 12, borderRadius: 6, alignItems: 'center', backgroundColor: '#334155' },
              transactionType === 'income' && { backgroundColor: '#10b981' } // Green highlight for Income
            ]}
            onPress={() => setTransactionType('income')}
            activeOpacity={0.7}
          >
            <Text style={{ color: '#fff', fontWeight: '700' }}>Income</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          style={styles.textInput}
          placeholder="Bill Name (optional)"
          placeholderTextColor="#475569"
          value={description}
          onChangeText={setDescription}
        />

        <TextInput
          style={[styles.textInput, amountError ? styles.textInputError : null]}
          placeholder="Amount ($)"
          placeholderTextColor="#475569"
          value={amount}
          onChangeText={(text) => {
            setAmount(text);
            if (amountError) { setAmountError(''); }
          }}
          keyboardType="numeric"
        />
        {amountError ? <Text style={styles.errorText}>{amountError}</Text> : null}

        <TextInput
          style={styles.textInput}
          placeholder="Category (optional)"
          placeholderTextColor="#475569"
          value={category}
          onChangeText={setCategory}
        />

        <View style={styles.formActions}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={onCancel}
            activeOpacity={0.7}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
            activeOpacity={0.8}
          >
            <Text style={styles.submitButtonText}>{isEditing ? 'Save Changes' : 'Add Transaction'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default TransactionForm;
