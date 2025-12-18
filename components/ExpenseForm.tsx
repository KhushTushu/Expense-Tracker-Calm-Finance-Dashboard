
import React, { useState } from 'react';
import { Category, Expense } from '../types';

interface ExpenseFormProps {
  onAdd: (expense: Omit<Expense, 'id' | 'date'>) => void;
}

const CATEGORIES: Category[] = ['Housing', 'Food', 'Transport', 'Wellness', 'Leisure', 'Utilities', 'Other'];

export const ExpenseForm: React.FC<ExpenseFormProps> = ({ onAdd }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<Category>('Food');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !amount) return;

    onAdd({
      description,
      amount: parseFloat(amount),
      category,
    });

    setDescription('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
      <h3 className="text-lg font-medium text-slate-800">New Entry</h3>
      <div className="space-y-3">
        <div>
          <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. Morning Latte"
            className="w-full mt-1 px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all text-slate-700"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Amount</label>
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full mt-1 px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all text-slate-700"
              required
            />
          </div>
          <div>
            <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="w-full mt-1 px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all text-slate-700 appearance-none"
            >
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <button
        type="submit"
        className="w-full py-3 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors active:scale-[0.98] transform"
      >
        Add Expense
      </button>
    </form>
  );
};
