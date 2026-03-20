import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useInvoices } from '../context/InvoiceContext'

const initialItem = { description: '', quantity: 1, price: 0 }

const initialState = {
  invoiceNumber: '',
  currency: 'USD',
  dueDate: '',
  taxRate: 10,
  notes: 'Thank you for your business.',
  sender: {
    name: 'Invoice Generator Inc.',
    email: 'billing@invoicegenerator.com',
    address: '500 Business Ave, New York, NY',
  },
  client: {
    name: '',
    email: '',
    address: '',
  },
  items: [initialItem],
}

function formatCurrency(value, currency) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(Number(value) || 0)
}

function InvoiceFormPage() {
  const navigate = useNavigate()
  const { createInvoice } = useInvoices()
  const [form, setForm] = useState(initialState)

  const summary = useMemo(() => {
    const subtotal = form.items.reduce((sum, item) => {
      const quantity = Number(item.quantity) || 0
      const price = Number(item.price) || 0
      return sum + quantity * price
    }, 0)

    const taxAmount = subtotal * ((Number(form.taxRate) || 0) / 100)
    return {
      subtotal,
      taxAmount,
      total: subtotal + taxAmount,
    }
  }, [form.items, form.taxRate])

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const updateParty = (party, key, value) => {
    setForm((prev) => ({
      ...prev,
      [party]: {
        ...prev[party],
        [key]: value,
      },
    }))
  }

  const updateItem = (index, key, value) => {
    setForm((prev) => ({
      ...prev,
      items: prev.items.map((item, itemIndex) =>
        itemIndex === index ? { ...item, [key]: value } : item,
      ),
    }))
  }

  const addItem = () => {
    setForm((prev) => ({ ...prev, items: [...prev.items, initialItem] }))
  }

  const removeItem = (index) => {
    setForm((prev) => ({
      ...prev,
      items: prev.items.filter((_, itemIndex) => itemIndex !== index),
    }))
  }

  const onSubmit = (event) => {
    event.preventDefault()

    const invoice = createInvoice(form)
    navigate(`/invoices/${invoice.id}`)
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] animate-fade-in-up">
      <form
        onSubmit={onSubmit}
        className="space-y-6 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-xl shadow-slate-200/60"
      >
        <header className="space-y-2">
          <h1 className="text-2xl font-bold text-slate-900">Invoice Form</h1>
          <p className="text-sm text-slate-600">
            Enter billing details, line items, and taxes to generate a professional invoice.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-2">
          <label className="space-y-1 text-sm font-medium text-slate-700">
            Invoice Number
            <input
              value={form.invoiceNumber}
              onChange={(event) => updateField('invoiceNumber', event.target.value)}
              placeholder="INV-2026-001"
              className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none ring-cyan-300 transition focus:ring"
            />
          </label>
          <label className="space-y-1 text-sm font-medium text-slate-700">
            Due Date
            <input
              type="date"
              value={form.dueDate}
              onChange={(event) => updateField('dueDate', event.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none ring-cyan-300 transition focus:ring"
            />
          </label>
          <label className="space-y-1 text-sm font-medium text-slate-700">
            Currency
            <select
              value={form.currency}
              onChange={(event) => updateField('currency', event.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none ring-cyan-300 transition focus:ring"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="INR">INR</option>
              <option value="GBP">GBP</option>
            </select>
          </label>
          <label className="space-y-1 text-sm font-medium text-slate-700">
            Tax Rate (%)
            <input
              type="number"
              min="0"
              value={form.taxRate}
              onChange={(event) => updateField('taxRate', event.target.value)}
              className="w-full rounded-xl border border-slate-300 px-3 py-2 outline-none ring-cyan-300 transition focus:ring"
            />
          </label>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          <fieldset className="space-y-3 rounded-2xl border border-slate-200 p-4">
            <legend className="px-2 text-sm font-semibold text-slate-900">Your Business</legend>
            <input
              value={form.sender.name}
              onChange={(event) => updateParty('sender', 'name', event.target.value)}
              placeholder="Business Name"
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none ring-cyan-300 transition focus:ring"
            />
            <input
              type="email"
              value={form.sender.email}
              onChange={(event) => updateParty('sender', 'email', event.target.value)}
              placeholder="business@email.com"
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none ring-cyan-300 transition focus:ring"
            />
            <textarea
              value={form.sender.address}
              onChange={(event) => updateParty('sender', 'address', event.target.value)}
              placeholder="Business Address"
              className="h-20 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none ring-cyan-300 transition focus:ring"
            />
          </fieldset>

          <fieldset className="space-y-3 rounded-2xl border border-slate-200 p-4">
            <legend className="px-2 text-sm font-semibold text-slate-900">Client Details</legend>
            <input
              required
              value={form.client.name}
              onChange={(event) => updateParty('client', 'name', event.target.value)}
              placeholder="Client Name"
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none ring-cyan-300 transition focus:ring"
            />
            <input
              type="email"
              value={form.client.email}
              onChange={(event) => updateParty('client', 'email', event.target.value)}
              placeholder="client@email.com"
              className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none ring-cyan-300 transition focus:ring"
            />
            <textarea
              value={form.client.address}
              onChange={(event) => updateParty('client', 'address', event.target.value)}
              placeholder="Client Address"
              className="h-20 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none ring-cyan-300 transition focus:ring"
            />
          </fieldset>
        </section>

        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Line Items</h2>
            <button
              type="button"
              onClick={addItem}
              className="rounded-lg border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-slate-400"
            >
              Add Item
            </button>
          </div>

          <div className="space-y-3">
            {form.items.map((item, index) => (
              <div key={index} className="grid gap-2 rounded-2xl border border-slate-200 p-3 md:grid-cols-[1fr_120px_120px_auto]">
                <input
                  value={item.description}
                  onChange={(event) => updateItem(index, 'description', event.target.value)}
                  placeholder="Service description"
                  className="rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none ring-cyan-300 transition focus:ring"
                />
                <input
                  type="number"
                  min="0"
                  value={item.quantity}
                  onChange={(event) => updateItem(index, 'quantity', event.target.value)}
                  placeholder="Qty"
                  className="rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none ring-cyan-300 transition focus:ring"
                />
                <input
                  type="number"
                  min="0"
                  value={item.price}
                  onChange={(event) => updateItem(index, 'price', event.target.value)}
                  placeholder="Price"
                  className="rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none ring-cyan-300 transition focus:ring"
                />
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  disabled={form.items.length === 1}
                  className="rounded-xl bg-rose-100 px-3 py-2 text-xs font-semibold text-rose-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-1">
          <label className="text-sm font-medium text-slate-700" htmlFor="notes">
            Notes
          </label>
          <textarea
            id="notes"
            value={form.notes}
            onChange={(event) => updateField('notes', event.target.value)}
            className="h-24 w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none ring-cyan-300 transition focus:ring"
          />
        </section>

        <button
          type="submit"
          className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          Generate Invoice
        </button>
      </form>

      <aside className="h-fit rounded-3xl border border-slate-200 bg-slate-900 p-6 text-slate-100 shadow-xl shadow-slate-300/60 lg:sticky lg:top-24">
        <h2 className="text-lg font-semibold">Invoice Summary</h2>
        <div className="mt-4 space-y-3 text-sm">
          <div className="flex items-center justify-between border-b border-slate-700 pb-2">
            <span>Subtotal</span>
            <span>{formatCurrency(summary.subtotal, form.currency)}</span>
          </div>
          <div className="flex items-center justify-between border-b border-slate-700 pb-2">
            <span>Tax</span>
            <span>{formatCurrency(summary.taxAmount, form.currency)}</span>
          </div>
          <div className="flex items-center justify-between text-base font-semibold text-cyan-300">
            <span>Total</span>
            <span>{formatCurrency(summary.total, form.currency)}</span>
          </div>
        </div>
        <p className="mt-6 text-xs leading-relaxed text-slate-400">
          Tip: Add your invoice number and due date so clients can process your payments faster.
        </p>
      </aside>
    </div>
  )
}

export default InvoiceFormPage
