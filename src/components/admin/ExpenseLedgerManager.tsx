'use client';

import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  TrendingDown, 
  TrendingUp, 
  Plus, 
  Trash2, 
  Download, 
  Building2, 
  Calendar, 
  Tag, 
  CreditCard,
  X,
  FileSpreadsheet
} from 'lucide-react';
import { GymExpense, ExpenseCategory } from '@/lib/types';
import { getGymExpenses, saveGymExpense, deleteGymExpense, getTransactions, generateCSV } from '@/lib/dataStore';
import confetti from 'canvas-confetti';

export default function ExpenseLedgerManager() {
  const [expenses, setExpenses] = useState<GymExpense[]>(() => getGymExpenses());
  const [transactions, setTransactions] = useState(() => getTransactions());
  const [selectedBranch, setSelectedBranch] = useState<string>('ALL');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ExpenseCategory>('EQUIPMENT');
  const [amount, setAmount] = useState<number>(5000);
  const [paidTo, setPaidTo] = useState('');
  const [paymentMode, setPaymentMode] = useState<'UPI' | 'CASH' | 'NET_BANKING'>('UPI');
  const [branch, setBranch] = useState<'Ayodhya Nagar' | 'Govind Garden'>('Ayodhya Nagar');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const handleSync = () => {
      setExpenses(getGymExpenses());
      setTransactions(getTransactions());
    };
    window.addEventListener('tnt_datastore_sync', handleSync);
    return () => window.removeEventListener('tnt_datastore_sync', handleSync);
  }, []);

  const handleCreateExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount) return;
    const newExp: GymExpense = {
      id: `exp-${Date.now()}`,
      title,
      category,
      amount: Number(amount),
      date: new Date().toISOString().split('T')[0],
      paidTo,
      paymentMode,
      branch,
      notes,
    };
    saveGymExpense(newExp);
    setExpenses(getGymExpenses());
    setIsAddModalOpen(false);
    setTitle('');
    setAmount(5000);
    setPaidTo('');
    setNotes('');
    confetti({ particleCount: 40 });
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this expense record?')) {
      deleteGymExpense(id);
      setExpenses(getGymExpenses());
    }
  };

  const handleDownloadCSV = () => {
    const csvData = generateCSV('EXPENSES');
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `TNT_MMA_Expenses_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const filteredExpenses = selectedBranch === 'ALL'
    ? expenses
    : expenses.filter(e => e.branch === selectedBranch);

  const totalExpenseAmount = filteredExpenses.reduce((acc, e) => acc + e.amount, 0);
  const totalRevenueAmount = transactions.reduce((acc, t) => acc + (t.status === 'PAID' ? t.totalAmount : 0), 0);
  const netProfit = totalRevenueAmount - totalExpenseAmount;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <span>Gym Expense & P&L Ledger</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 font-bold">GymBook Standard</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-zinc-400">
            Categorized tracking of rent, trainer payroll, equipment maintenance, and utility bills.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadCSV}
            className="px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-300 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold text-xs uppercase tracking-wider shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Expense</span>
          </button>
        </div>
      </div>

      {/* P&L Financial Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm space-y-1">
          <p className="text-[10px] uppercase font-bold text-slate-500 dark:text-zinc-400 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-green-500" />
            Total Revenue Collected
          </p>
          <p className="text-2xl font-black text-green-600 dark:text-green-400">
            ₹{totalRevenueAmount.toLocaleString('en-IN')}
          </p>
          <p className="text-[10px] text-slate-400">From athlete memberships & renewals</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm space-y-1">
          <p className="text-[10px] uppercase font-bold text-slate-500 dark:text-zinc-400 flex items-center gap-1">
            <TrendingDown className="w-3.5 h-3.5 text-red-500" />
            Total Operational Expenses
          </p>
          <p className="text-2xl font-black text-red-600 dark:text-red-400">
            ₹{totalExpenseAmount.toLocaleString('en-IN')}
          </p>
          <p className="text-[10px] text-slate-400">{filteredExpenses.length} operational entries</p>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm space-y-1">
          <p className="text-[10px] uppercase font-bold text-slate-500 dark:text-zinc-400 flex items-center gap-1">
            <DollarSign className="w-3.5 h-3.5 text-orange-500" />
            Net Academy Profit (P&L)
          </p>
          <p className={`text-2xl font-black ${netProfit >= 0 ? 'text-slate-900 dark:text-white' : 'text-red-500'}`}>
            ₹{netProfit.toLocaleString('en-IN')}
          </p>
          <p className="text-[10px] text-slate-400">Monthly Net Operating Margin</p>
        </div>
      </div>

      {/* Branch Filter */}
      <div className="flex items-center gap-2 text-xs">
        <span className="font-bold text-slate-500 dark:text-zinc-400">Filter Branch:</span>
        {['ALL', 'Ayodhya Nagar', 'Govind Garden'].map((b) => (
          <button
            key={b}
            onClick={() => setSelectedBranch(b)}
            className={`px-3 py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
              selectedBranch === b
                ? 'bg-orange-500 text-white shadow-sm'
                : 'bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:bg-slate-100'
            }`}
          >
            {b}
          </button>
        ))}
      </div>

      {/* Expenses Table */}
      <div className="space-y-2.5">
        {filteredExpenses.map((exp) => (
          <div
            key={exp.id}
            className="p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 flex items-center justify-between gap-4 text-xs hover:border-orange-500/40 shadow-sm transition-all"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 dark:text-white text-sm">{exp.title}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 text-slate-700 dark:text-zinc-300">
                  {exp.category}
                </span>
                <span className="text-[10px] font-semibold text-slate-400">
                  ({exp.branch})
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-zinc-400">
                Paid to: <strong>{exp.paidTo}</strong> • Mode: {exp.paymentMode} • Date: {exp.date}
              </p>
            </div>

            <div className="flex items-center gap-4">
              <span className="font-black text-red-600 dark:text-red-400 text-base">
                -₹{exp.amount.toLocaleString('en-IN')}
              </span>
              <button
                onClick={() => handleDelete(exp.id)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 transition-colors"
                title="Delete expense"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Add Expense */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-zinc-800">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Record Academy Expense
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateExpense} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-700 dark:text-zinc-300">Expense Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Boxing Gloves & Shin Guards Batch Purchase"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-zinc-300">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 outline-none"
                  >
                    <option value="RENT">Rent</option>
                    <option value="EQUIPMENT">Equipment</option>
                    <option value="SALARY">Trainer Salary</option>
                    <option value="ELECTRICITY">Electricity & AC</option>
                    <option value="MARKETING">Marketing & Ads</option>
                    <option value="SUPPLEMENTS">Supplements</option>
                    <option value="MISC">Miscellaneous</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-zinc-300">Amount (₹)</label>
                  <input
                    type="number"
                    required
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-zinc-300">Paid To</label>
                  <input
                    type="text"
                    required
                    placeholder="Vendor / Landlord"
                    value={paidTo}
                    onChange={(e) => setPaidTo(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-700 dark:text-zinc-300">Branch</label>
                  <select
                    value={branch}
                    onChange={(e) => setBranch(e.target.value as any)}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200 dark:border-zinc-800 outline-none"
                  >
                    <option value="Ayodhya Nagar">Ayodhya Nagar</option>
                    <option value="Govind Garden">Govind Garden</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider shadow-md cursor-pointer"
              >
                Record Expense
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
