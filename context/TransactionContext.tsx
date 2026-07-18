import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Transaction } from '../types';

interface TransactionContextType {
  transactions: Transaction[];
  setTransactions: React.Dispatch<React.SetStateAction<Transaction[]>>;
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
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  const [categories, setCategories] = useState<string[]>([
    'Fitness', 'Groceries', 'Income', 'Education', 'Logistics', 'Utilities',
  ]);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  const [filterState, setFilterState] = useState<'all' | 'income' | 'expense' | 'date_desc' | 'amount_desc'>('all');
  const [selectedMonth, setSelectedMonth] = useState('all');

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

  const handleAddTransaction = (
    description: string | null,
    amount: number,
    category: string | null,
  ) => {
    if (editingTransaction) {
      setTransactions((prev) =>
        prev.map((t) =>
          t.id === editingTransaction.id
            ? { ...t, description, category, amount }
            : t
        )
      );
      setEditingTransaction(null);
    } else {
      const now = new Date();
      const yyyy = now.getFullYear();
      const mm = String(now.getMonth() + 1).padStart(2, '0');
      const dd = String(now.getDate()).padStart(2, '0');

      const newTransaction: Transaction = {
        id: Date.now().toString(),
        description,
        category,
        amount,
        date: `${yyyy}-${mm}-${dd}`,
      };
      setTransactions((prev) => [newTransaction, ...prev]);
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

  const value: TransactionContextType = {
    transactions, setTransactions,
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
    handleAddTransaction, handleEditTransaction, handleCancelForm
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
