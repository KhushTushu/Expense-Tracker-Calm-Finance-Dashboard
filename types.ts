
export type Category = 'Housing' | 'Food' | 'Transport' | 'Wellness' | 'Leisure' | 'Utilities' | 'Other';

export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: Category;
  date: string;
}

export interface CategoryStyle {
  bg: string;
  text: string;
  dot: string;
}

export const CATEGORY_STYLES: Record<Category, CategoryStyle> = {
  Housing: { bg: 'bg-blue-50', text: 'text-blue-700', dot: 'bg-blue-400' },
  Food: { bg: 'bg-emerald-50', text: 'text-emerald-700', dot: 'bg-emerald-400' },
  Transport: { bg: 'bg-amber-50', text: 'text-amber-700', dot: 'bg-amber-400' },
  Wellness: { bg: 'bg-rose-50', text: 'text-rose-700', dot: 'bg-rose-400' },
  Leisure: { bg: 'bg-indigo-50', text: 'text-indigo-700', dot: 'bg-indigo-400' },
  Utilities: { bg: 'bg-slate-100', text: 'text-slate-700', dot: 'bg-slate-400' },
  Other: { bg: 'bg-gray-100', text: 'text-gray-700', dot: 'bg-gray-400' },
};
