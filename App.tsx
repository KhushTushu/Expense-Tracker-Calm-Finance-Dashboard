
import React, { useState, useMemo } from 'react';
import { Expense, Category, CATEGORY_STYLES } from './types';
import { ExpenseForm } from './components/ExpenseForm';
import { Counter } from './components/Counter';
import { SmartInsights } from './components/SmartInsights';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell 
} from 'recharts';

const App: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: '1', description: 'Organic Grocery', amount: 84.20, category: 'Food', date: new Date().toISOString() },
    { id: '2', description: 'Studio Rent', amount: 1200.00, category: 'Housing', date: new Date().toISOString() },
    { id: '3', description: 'Yoga Membership', amount: 120.00, category: 'Wellness', date: new Date().toISOString() },
    { id: '4', description: 'Commuter Pass', amount: 45.00, category: 'Transport', date: new Date().toISOString() },
  ]);

  const totalSpent = useMemo(() => expenses.reduce((sum, e) => sum + e.amount, 0), [expenses]);

  const chartData = useMemo(() => {
    const grouped = expenses.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(grouped).map(([name, value]) => ({ name, value }));
  }, [expenses]);

  const handleAddExpense = (newExpense: Omit<Expense, 'id' | 'date'>) => {
    const expense: Expense = {
      ...newExpense,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString(),
    };
    setExpenses(prev => [expense, ...prev]);
  };

  const removeExpense = (id: string) => {
    setExpenses(prev => prev.filter(e => e.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 px-4 py-8 md:py-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Header & Main Stats */}
        <header className="lg:col-span-12 flex flex-col md:flex-row md:items-end justify-between mb-4 gap-6">
          <div>
            <h1 className="text-3xl font-light tracking-tight text-slate-800">ZenSpend</h1>
            <p className="text-slate-400 font-medium">Simplify your financial flow</p>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1">Total Monthly Flow</span>
            <h2 className="text-5xl font-light text-slate-900">
              <Counter value={totalSpent} />
            </h2>
          </div>
        </header>

        {/* Left Column: Entry & Insights */}
        <aside className="lg:col-span-4 space-y-6">
          <ExpenseForm onAdd={handleAddExpense} />
          <SmartInsights expenses={expenses} />
        </aside>

        {/* Middle Column: Visualization */}
        <main className="lg:col-span-8 space-y-8">
          <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Distribution by Category</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 12 }} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 12 }} 
                  />
                  <Tooltip 
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={40}>
                    {chartData.map((entry, index) => {
                      const style = CATEGORY_STYLES[entry.name as Category] || CATEGORY_STYLES['Other'];
                      // We map Tailwind colors to roughly equivalent Hex for Recharts
                      const colorMap: Record<string, string> = {
                        'bg-blue-50': '#60a5fa',
                        'bg-emerald-50': '#34d399',
                        'bg-amber-50': '#fbbf24',
                        'bg-rose-50': '#f87171',
                        'bg-indigo-50': '#818cf8',
                        'bg-slate-100': '#94a3b8',
                        'bg-gray-100': '#d1d5db',
                      };
                      return <Cell key={`cell-${index}`} fill={colorMap[style.bg] || '#94a3b8'} />;
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* List Section */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Recent Activity</h3>
              <span className="text-xs text-slate-400">{expenses.length} entries</span>
            </div>
            <div className="space-y-3">
              {expenses.map((expense) => {
                const style = CATEGORY_STYLES[expense.category] || CATEGORY_STYLES['Other'];
                return (
                  <div 
                    key={expense.id}
                    className="group bg-white p-4 rounded-2xl border border-slate-100 flex items-center justify-between hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 animate-slide-in"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${style.bg} ${style.text}`}>
                        <div className={`w-2 h-2 rounded-full ${style.dot}`} />
                      </div>
                      <div>
                        <p className="font-medium text-slate-800">{expense.description}</p>
                        <p className="text-xs text-slate-400">{expense.category} • {new Date(expense.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-semibold text-slate-700">
                        ${expense.amount.toFixed(2)}
                      </span>
                      <button 
                        onClick={() => removeExpense(expense.id)}
                        className="opacity-0 group-hover:opacity-100 p-2 text-slate-300 hover:text-rose-400 transition-all focus:outline-none"
                        aria-label="Delete expense"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                );
              })}
              {expenses.length === 0 && (
                <div className="py-12 text-center bg-slate-100/50 rounded-2xl border border-dashed border-slate-200">
                  <p className="text-slate-400 text-sm">No expenses logged yet. Start your mindful journey above.</p>
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default App;
