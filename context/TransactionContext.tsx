// context/TransactionContext.tsx — Cloud-synced transaction state via Supabase
import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Alert } from 'react-native';
import { Transaction } from '../types';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';

interface TransactionContextType {
  transactions: Transaction[];
  loading: boolean;
  isFormOpen: boolean;
  setIsFormOpen: (val: boolean) => void;
  editingTransaction: Transaction | null;
  setEditingTransaction: (val: Transaction | null) => void;
  categories: string[];
  setCategories: React.Dispatch<React.SetStateAction<string[]>>;
  isSettingsOpen: boolean;
  setIsSettingsOpen: (val: boolean) => void;
  newCategoryName: string;
  setNewCategoryName: (val: string) => void;
  filterState: 'all' | 'income' | 'expense' | 'date_desc' | 'amount_desc';
  setFilterState: (val: 'all' | 'income' | 'expense' | 'date_desc' | 'amount_desc') => void;
  selectedMonth: string;
  setSelectedMonth: (val: string) => void;
  totalIncome: number;
  totalExpenses: number;
  netMargin: number;
  availableCategories: string[];
  processedTransactions: Transaction[];
  handleAddTransaction: (description: string | null, amount: number, category: string | null) => void;
  handleEditTransaction: (transaction: Transaction) => void;
  handleCancelForm: () => void;
  seedTransactions: (count: number) => Promise<void>;
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const { session } = useAuth();
  const userId = session?.user?.id;

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  const [categories, setCategories] = useState<string[]>([
    'Fitness', 'Groceries', 'Income', 'Education', 'Logistics', 'Utilities',
  ]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  const [filterState, setFilterState] = useState<'all' | 'income' | 'expense' | 'date_desc' | 'amount_desc'>('all');
  const [selectedMonth, setSelectedMonth] = useState('all');

  // ── Fetch transactions from Supabase on mount ──────────────────
  const fetchTransactions = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('user_id', userId)
      .order('date', { ascending: false });

    if (error) {
      Alert.alert('Fetch Error', error.message);
      setLoading(false);
      return;
    }
    setTransactions(data ?? []);
    setLoading(false);
  }, [userId]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  // ── Computed values ────────────────────────────────────────────
  const monthFilteredTransactions = selectedMonth === 'all'
    ? transactions
    : transactions.filter(t => {
        const parts = t.date.split(/[-/]/);
        if (parts.length >= 2) {
          const m = parts[0].length === 4 ? parts[1] : parts[0];
          return parseInt(m, 10) === parseInt(selectedMonth, 10);
        }
        return false;
      });

  const totalIncome = monthFilteredTransactions
    .filter(t => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = Math.abs(monthFilteredTransactions
    .filter(t => t.amount < 0)
    .reduce((sum, t) => sum + t.amount, 0));

  const netMargin = totalIncome - totalExpenses;

  const availableCategories = Array.from(
    new Set(transactions.map(t => t.category).filter((c): c is string => !!c))
  );

  const processedTransactions = (() => {
    let list = [...monthFilteredTransactions];
    if (filterState === 'income') {
      list = list.filter(t => t.amount > 0);
    } else if (filterState === 'expense') {
      list = list.filter(t => t.amount < 0);
    }

    if (filterState === 'date_desc') {
      list.sort((a, b) => b.date.localeCompare(a.date));
    } else if (filterState === 'amount_desc') {
      list.sort((a, b) => Math.abs(b.amount) - Math.abs(a.amount));
    } else {
      // Default: sort by date descending
      list.sort((a, b) => b.date.localeCompare(a.date));
    }
    return list;
  })();

  // ── CRUD Operations ────────────────────────────────────────────

  const handleAddTransaction = async (
    description: string | null,
    amount: number,
    category: string | null,
  ) => {
    if (!userId) return;

    if (editingTransaction) {
      // ── UPDATE existing ──
      const { error } = await supabase
        .from('transactions')
        .update({ description, category, amount })
        .eq('id', editingTransaction.id)
        .eq('user_id', userId);

      if (error) {
        Alert.alert('Update Error', error.message);
        return;
      }
      // Optimistic local update
      setTransactions((prev) =>
        prev.map((t) =>
          t.id === editingTransaction.id
            ? { ...t, description, category, amount }
            : t
        )
      );
      setEditingTransaction(null);
    } else {
      // ── INSERT new ──
      const now = new Date();
      const yyyy = now.getFullYear();
      const mm = String(now.getMonth() + 1).padStart(2, '0');
      const dd = String(now.getDate()).padStart(2, '0');
      const dateStr = `${yyyy}-${mm}-${dd}`;

      const { data, error } = await supabase
        .from('transactions')
        .insert({
          user_id: userId,
          description,
          category,
          amount,
          date: dateStr,
        })
        .select()
        .single();

      if (error) {
        Alert.alert('Insert Error', error.message);
        return;
      }
      if (data) {
        setTransactions((prev) => [data, ...prev]);
      }
    }
    setIsFormOpen(false);
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsFormOpen(true);
  };

  const handleCancelForm = () => {
    setIsFormOpen(false);
    setEditingTransaction(null);
  };

  // ── Seed random transactions into Supabase ─────────────────────
  const seedTransactions = async (count: number) => {
    if (!userId) return;

    const descriptions = [
      'Acro Gym Membership', 'Weekly Grocery Haul', 'Decentralized Swap Reward',
      'La Jolla Bookstore', 'Seattle Move Mattress Box', 'Electricity Utility Bill',
      'Freelance Coding Payment', 'Starbucks Coffee', 'SaaS Subscription', 'Zelle Transfer',
    ];
    const expenseCategories = [
      'Fitness', 'Groceries', 'Education', 'Logistics', 'Utilities', 'Coding', 'Food', 'Entertainment',
    ];

    const rows = [];
    for (let i = 0; i < count; i++) {
      const isIncome = Math.random() > 0.6;
      const amount = isIncome
        ? parseFloat((Math.random() * 1500 + 10).toFixed(2))
        : -parseFloat((Math.random() * 250 + 5).toFixed(2));

      const year = new Date().getFullYear();
      const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
      const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');

      rows.push({
        user_id: userId,
        description: descriptions[Math.floor(Math.random() * descriptions.length)],
        category: isIncome ? 'Income' : expenseCategories[Math.floor(Math.random() * expenseCategories.length)],
        amount,
        date: `${year}-${month}-${day}`,
      });
    }

    const { data, error } = await supabase
      .from('transactions')
      .insert(rows)
      .select();

    if (error) {
      Alert.alert('Seed Error', error.message);
      return;
    }
    if (data) {
      setTransactions((prev) => [...data, ...prev]);
    }
  };

  // ── Context value ──────────────────────────────────────────────
  const value: TransactionContextType = {
    transactions, loading,
    isFormOpen, setIsFormOpen,
    editingTransaction, setEditingTransaction,
    categories, setCategories,
    isSettingsOpen, setIsSettingsOpen,
    newCategoryName, setNewCategoryName,
    filterState, setFilterState,
    selectedMonth, setSelectedMonth,
    totalIncome, totalExpenses, netMargin,
    availableCategories,
    processedTransactions,
    handleAddTransaction, handleEditTransaction, handleCancelForm,
    seedTransactions,
  };

  return <TransactionContext.Provider value={value}>{children}</TransactionContext.Provider>;
};

export const useTransactionContext = () => {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error('useTransactionContext must be used within a TransactionProvider');
  }
  return context;
};
