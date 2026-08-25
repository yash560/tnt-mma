'use client';

import React, { useState } from 'react';
import { 
  X, 
  DollarSign, 
  QrCode, 
  Printer, 
  CheckCircle2, 
  Flame, 
  ArrowUpRight, 
  Search,
  PlusCircle,
  FileText
} from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { TransactionInvoice, Member } from '@/lib/types';
import { getTransactions, saveTransaction, getMembers } from '@/lib/dataStore';

interface FeeLedgerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

export default function FeeLedgerModal({ isOpen, onClose, onUpdate }: FeeLedgerModalProps) {
  const [transactions, setTransactions] = useState<TransactionInvoice[]>(() => getTransactions());
  const [members] = useState<Member[]>(() => getMembers());
  const [selectedInvoice, setSelectedInvoice] = useState<TransactionInvoice | null>(null);
  const [showCollectPayment, setShowCollectPayment] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Collect payment form
  const [selectedMemberId, setSelectedMemberId] = useState('');
  const [customAmount, setCustomAmount] = useState<number>(3000);
  const [paymentMode, setPaymentMode] = useState<'UPI' | 'CASH' | 'CARD'>('UPI');
  const [planTitle, setPlanTitle] = useState('Combat Membership Renewal');
  const [paymentNote, setPaymentNote] = useState('');

  if (!isOpen) return null;

  const filteredTxns = transactions.filter((t) =>
    t.memberName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.memberPhone.includes(searchQuery)
  );

  const totalCollected = transactions.reduce((acc, t) => acc + (t.status === 'PAID' ? t.totalAmount : 0), 0);

  const handleCreatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    const member = members.find((m) => m.id === selectedMemberId);
    if (!member || customAmount <= 0) return;

    const gst = Math.round((customAmount * 18) / 118);
    const base = customAmount - gst;

    const newInvoice: TransactionInvoice = {
      id: `txn-${Date.now()}`,
      invoiceNumber: `TNT-INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      memberId: member.id,
      memberName: member.name,
      memberPhone: member.phone,
      planName: planTitle,
      amount: base,
      gstAmount: gst,
      totalAmount: customAmount,
      paymentMode,
      transactionRef: `${paymentMode}/REF-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toISOString().split('T')[0],
      status: 'PAID',
      notes: paymentNote || 'Front Desk settlement',
    };

    saveTransaction(newInvoice);
    setTransactions(getTransactions());
    setShowCollectPayment(false);
    setSelectedInvoice(newInvoice);
    onUpdate();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto" data-lenis-prevent>
      <div className="bg-zinc-950 border border-zinc-700 rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-5 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between no-print">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-400">
              <DollarSign className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-white">
                TNT Fee & Revenue Management Ledger
              </h3>
              <p className="text-xs text-zinc-400">
                Total Revenue Logged: <strong className="text-green-400">₹{totalCollected.toLocaleString('en-IN')}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowCollectPayment(!showCollectPayment)}
              className="px-3.5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              <span>{showCollectPayment ? 'View Ledger' : 'Collect Fee Payment'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-zinc-800 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs text-zinc-300">
          
          {showCollectPayment ? (
            /* Collect Payment / UPI QR Generator */
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-2">
                <h4 className="font-bold text-white text-sm">
                  Record Fee Collection & Generate Invoice
                </h4>
                <p className="text-xs text-zinc-400">
                  Select a member, enter amount, choose payment mode, and generate instant receipt or dynamic UPI QR for instant GPay/PhonePe scan.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                
                {/* Payment Form (7 cols) */}
                <form onSubmit={handleCreatePayment} className="md:col-span-7 space-y-4">
                  <div className="space-y-1.5">
                    <label className="font-bold text-zinc-300">Select Member *</label>
                    <select
                      required
                      value={selectedMemberId}
                      onChange={(e) => {
                        setSelectedMemberId(e.target.value);
                        const mem = members.find((m) => m.id === e.target.value);
                        if (mem) {
                          setCustomAmount(mem.balanceDue > 0 ? mem.balanceDue : mem.planAmount || 3000);
                          setPlanTitle(mem.planName || 'Monthly Membership');
                        }
                      }}
                      className="w-full px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-800 text-white outline-none focus:border-orange-500"
                    >
                      <option value="">-- Choose Member from Directory --</option>
                      {members.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.name} ({m.phone}) {m.balanceDue > 0 ? `[Due: ₹${m.balanceDue}]` : '[Active]'}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-bold text-zinc-300">Payment Purpose / Plan</label>
                      <input
                        type="text"
                        value={planTitle}
                        onChange={(e) => setPlanTitle(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white outline-none"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-bold text-zinc-300">Amount to Collect (₹) *</label>
                      <input
                        type="number"
                        min={100}
                        required
                        value={customAmount}
                        onChange={(e) => setCustomAmount(Number(e.target.value))}
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-green-400 font-bold outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-bold text-zinc-300">Payment Mode</label>
                      <select
                        value={paymentMode}
                        onChange={(e) => setPaymentMode(e.target.value as any)}
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white outline-none"
                      >
                        <option value="UPI">UPI (GPay, PhonePe, Paytm QR)</option>
                        <option value="CASH">Cash Frontdesk</option>
                        <option value="CARD">Card POS</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-bold text-zinc-300">Reference / Notes</label>
                      <input
                        type="text"
                        placeholder="e.g. Paid by father"
                        value={paymentNote}
                        onChange={(e) => setPaymentNote(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-green-600 hover:bg-green-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-green-600/25 transition-all cursor-pointer"
                  >
                    Confirm & Record Payment
                  </button>
                </form>

                {/* Live Dynamic UPI QR Display (5 cols) */}
                <div className="md:col-span-5 rounded-2xl bg-zinc-900 border border-zinc-800 p-5 text-center space-y-4">
                  <div className="space-y-1">
                    <p className="font-bold text-white text-xs">Dynamic Frontdesk UPI QR</p>
                    <p className="text-[11px] text-zinc-400">
                      Member can scan directly with GPay, PhonePe, or Paytm.
                    </p>
                  </div>

                  <div className="p-3 bg-white rounded-2xl inline-block shadow-xl border-2 border-orange-500">
                    <QRCodeSVG
                      value={`upi://pay?pa=tntmma@okaxis&pn=TNT%20MMA%20Academy%20Bhopal&am=${customAmount}&cu=INR&tn=TNT-FEES`}
                      size={150}
                    />
                  </div>

                  <div className="space-y-1 font-mono text-[10px] text-zinc-400">
                    <p className="font-bold text-white">Amount: ₹{customAmount.toLocaleString('en-IN')}</p>
                    <p>UPI ID: <span className="text-orange-400">tntmma@okaxis</span></p>
                    <p className="text-green-400">● 100% Zero Gateway Surcharge</p>
                  </div>
                </div>

              </div>
            </div>
          ) : (
            /* Transaction List Table */
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Search invoices by student name, phone, or invoice #..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white outline-none focus:border-orange-500 text-xs"
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-zinc-800 overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-zinc-900 text-zinc-400 font-bold uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-3.5">Invoice #</th>
                      <th className="p-3.5">Member</th>
                      <th className="p-3.5">Plan Description</th>
                      <th className="p-3.5">Mode</th>
                      <th className="p-3.5">Amount (₹)</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800 bg-zinc-950">
                    {filteredTxns.map((txn) => (
                      <tr key={txn.id} className="hover:bg-zinc-900/60 transition-colors">
                        <td className="p-3.5 font-mono text-orange-400 font-bold text-[11px]">
                          {txn.invoiceNumber}
                        </td>
                        <td className="p-3.5">
                          <p className="font-bold text-white">{txn.memberName}</p>
                          <p className="text-[10px] text-zinc-500">{txn.memberPhone}</p>
                        </td>
                        <td className="p-3.5 text-zinc-300">
                          {txn.planName}
                        </td>
                        <td className="p-3.5 font-mono text-zinc-400 text-[10px]">
                          <span className="px-2 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-200">
                            {txn.paymentMode}
                          </span>
                        </td>
                        <td className="p-3.5 font-bold text-white">
                          ₹{txn.totalAmount.toLocaleString('en-IN')}
                        </td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded bg-green-500/10 text-green-400 text-[10px] font-bold border border-green-500/20">
                            ● {txn.status}
                          </span>
                        </td>
                        <td className="p-3.5 text-right">
                          <button
                            onClick={() => setSelectedInvoice(txn)}
                            className="px-3 py-1 rounded-lg bg-zinc-800 hover:bg-orange-500 text-zinc-200 hover:text-white font-bold text-[11px] transition-colors cursor-pointer"
                          >
                            Print Receipt
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Printable Invoice Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4" data-lenis-prevent>
          <div className="bg-white text-zinc-900 rounded-3xl max-w-2xl w-full p-8 space-y-6 shadow-2xl relative print:p-0 print:m-0">
            <button
              onClick={() => setSelectedInvoice(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-zinc-100 text-zinc-600 hover:text-black no-print"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Letterhead */}
            <div className="border-b-2 border-orange-500 pb-4 flex items-start justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-orange-500 flex items-center justify-center text-white font-black">
                    TNT
                  </div>
                  <h2 className="text-xl font-black tracking-tight text-zinc-900">
                    TNT MMA FITNESS ACADEMY
                  </h2>
                </div>
                <p className="text-[10px] text-zinc-600">
                  Ayodhya Nagar & Govind Garden Facilities, Bhopal | Tel: +91 97132 17866
                </p>
              </div>

              <div className="text-right">
                <span className="font-mono text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded border border-orange-200">
                  {selectedInvoice.invoiceNumber}
                </span>
                <p className="text-[10px] text-zinc-500 mt-1">Date: {selectedInvoice.date}</p>
              </div>
            </div>

            {/* Billed to */}
            <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-zinc-50 border border-zinc-200 text-xs">
              <div>
                <p className="text-[10px] font-bold text-zinc-500 uppercase">Billed To (Athlete / Parent):</p>
                <p className="font-bold text-zinc-900 text-sm">{selectedInvoice.memberName}</p>
                <p className="text-zinc-600">{selectedInvoice.memberPhone}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-zinc-500 uppercase">Payment Info:</p>
                <p className="font-bold text-zinc-900">{selectedInvoice.paymentMode}</p>
                <p className="font-mono text-[10px] text-zinc-600 truncate">{selectedInvoice.transactionRef}</p>
              </div>
            </div>

            {/* Line Items */}
            <table className="w-full text-left text-xs border border-zinc-200 rounded-lg overflow-hidden">
              <thead className="bg-zinc-100 font-bold text-zinc-700">
                <tr>
                  <th className="p-3">Description</th>
                  <th className="p-3 text-right">Base Amount</th>
                  <th className="p-3 text-right">GST (18%)</th>
                  <th className="p-3 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                <tr>
                  <td className="p-3 font-semibold">{selectedInvoice.planName}</td>
                  <td className="p-3 text-right">₹{selectedInvoice.amount.toLocaleString('en-IN')}</td>
                  <td className="p-3 text-right">₹{selectedInvoice.gstAmount.toLocaleString('en-IN')}</td>
                  <td className="p-3 text-right font-bold text-zinc-900">₹{selectedInvoice.totalAmount.toLocaleString('en-IN')}</td>
                </tr>
              </tbody>
            </table>

            {/* Total Summary */}
            <div className="flex justify-end pt-2">
              <div className="w-64 space-y-1 text-xs">
                <div className="flex justify-between py-1 border-t border-zinc-200">
                  <span className="text-zinc-600">Subtotal:</span>
                  <span>₹{selectedInvoice.amount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-200">
                  <span className="text-zinc-600">CGST + SGST (18%):</span>
                  <span>₹{selectedInvoice.gstAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between py-2 text-base font-black text-zinc-900">
                  <span>Grand Total:</span>
                  <span className="text-orange-600">₹{selectedInvoice.totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Stamp & Actions */}
            <div className="pt-4 border-t border-zinc-200 flex items-center justify-between">
              <div className="text-[10px] text-zinc-500 font-mono">
                Status: PAID IN FULL • System Verified
              </div>
              <div className="flex gap-2 no-print">
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center gap-1.5"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Receipt</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
