// utils/mockData.ts — Dynamic random transaction generator

import { Transaction } from '../types';

const descriptions = [
  'Acro Gym Membership', 'Weekly Grocery Haul', 'Decentralized Swap Reward',
  'La Jolla Bookstore', 'Seattle Move Mattress Box', 'Electricity Utility Bill',
  'Freelance Coding Payment', 'Starbucks Coffee', 'SaaS Subscription', 'Zelle Transfer'
];

const categories = ['Fitness', 'Groceries', 'Income', 'Education', 'Logistics', 'Utilities', 'Coding', 'Food', 'Entertainment'];

export function generateRandomTransactions(count: number): Transaction[] {
  const generated: Transaction[] = [];
  for (let i = 0; i < count; i++) {
    const isIncome = Math.random() > 0.6;
    const amount = isIncome 
      ? parseFloat((Math.random() * 1500 + 10).toFixed(2))
      : -parseFloat((Math.random() * 250 + 5).toFixed(2));

    const randomDesc = descriptions[Math.floor(Math.random() * descriptions.length)];
    const randomCat = isIncome ? 'Income' : categories[Math.floor(Math.random() * categories.length)];

    const year = Math.floor(Math.random() * (2026 - 2024 + 1)) + 2024;
    const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
    const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0');

    generated.push({
      id: `generated-${Date.now()}-${Math.random()}`,
      description: randomDesc,
      category: randomCat,
      amount,
      date: `${year}-${month}-${day}`
    });
  }
  return generated;
}
