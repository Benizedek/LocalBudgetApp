// types.ts — Shared data model for LocalBudgetApp

export interface Transaction {
  id: string;
  description?: string | null;
  category?: string | null;
  amount: number;
  date: string;
}
