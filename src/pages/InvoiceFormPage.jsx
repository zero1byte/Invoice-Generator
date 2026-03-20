import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useInvoices } from '../context/InvoiceContext'

const initialItem = { description: '', quantity: 1, price: 0 }

const pageDescription = "Create professional invoices with all the details your clients need. Fill in your information, add line items, and generate a PDF."

const sectionDescriptions = {
  details: "Enter invoice number, due date, currency and tax information",
  business: "Your company or business information that appears on the invoice",
  client: "Client or customer details for billing purposes",
  items: "Add products or services with quantities and rates",
  notes: "Optional payment terms, thank you message, or special instructions"
}

const initialState = {
  invoiceNumber: '',
  currency: 'USD',
  dueDate: '',
  taxRate: 10,
  notes: 'Thank you for your business.',
  sender: {
    name: 'Your Business Name',
    email: 'billing@yourbusiness.com',
    address: '123 Business St, City, State 12345',
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
    <div className="grid gap-8 lg:grid-cols-[1fr_400px] animate-fade-in-up">
      <form onSubmit={onSubmit} className="space-y-6">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">📝 Create Invoice</h1>
          <p className="text-slate-600 dark:text-slate-400">{pageDescription}</p>
        </div>

        <section className="form-section">
          <div className="space-y-1 mb-6">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">Details</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">{sectionDescriptions.details}</p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Invoice Number *</span>
              <input
                value={form.invoiceNumber}
                onChange={(event) => updateField('invoiceNumber', event.target.value)}
                placeholder="e.g., INV-2024-001"
                className="input-field w-full"
              />
            </label>
            <label className="space-y-2 text-sm">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Due Date *</span>
              <input
                type="date"
                value={form.dueDate}
                onChange={(event) => updateField('dueDate', event.target.value)}
                className="input-field w-full"
              />
            </label>
            <label className="space-y-2 text-sm">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Currency</span>
              <select
                value={form.currency}
                onChange={(event) => updateField('currency', event.target.value)}
                className="input-field w-full"
              >
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="INR">INR - Indian Rupee</option>
                <option value="GBP">GBP - British Pound</option>
              </select>
            </label>
            <label className="space-y-2 text-sm">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Tax Rate (%)</span>
              <input
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={form.taxRate}
                onChange={(event) => updateField('taxRate', event.target.value)}
                placeholder="10"
                className="input-field w-full"
              />
            </label>
          </div>
        </section>

        <section className="form-section">
          <div className="space-y-1 mb-6">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">👔 Your Business</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">{sectionDescriptions.business}</p>
          </div>
          <div className="space-y-3">
            <input
              value={form.sender.name}
              onChange={(event) => updateParty('sender', 'name', event.target.value)}
              placeholder="Business Name"
              className="input-field w-full text-sm"
            />
            <input
              type="email"
              value={form.sender.email}
              onChange={(event) => updateParty('sender', 'email', event.target.value)}
              placeholder="billing@yourbusiness.com"
              className="input-field w-full text-sm"
            />
            <textarea
              value={form.sender.address}
              onChange={(event) => updateParty('sender', 'address', event.target.value)}
              placeholder="Your Business Address"
              className="input-field h-20 w-full text-sm resize-none"
            />
          </div>
        </section>

        <section className="form-section">
          <div className="space-y-1 mb-6">
            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">👤 Bill To</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">{sectionDescriptions.client}</p>
          </div>
          <div className="space-y-3">
            <input
              required
              value={form.client.name}
              onChange={(event) => updateParty('client', 'name', event.target.value)}
              placeholder="Client Name"
              className="input-field w-full text-sm"
            />
            <input
              type="email"
              value={form.client.email}
              onChange={(event) => updateParty('client', 'email', event.target.value)}
              placeholder="client@email.com"
              className="input-field w-full text-sm"
            />
            <textarea
              value={form.client.address}
              onChange={(event) => updateParty('client', 'address', event.target.value)}
              placeholder="Client Address"
              className="input-field h-20 w-full text-sm resize-none"
            />
          </div>
        </section>

        <section className="form-section">
          <div className="flex items-center justify-between mb-6">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100">📦 Line Items</h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">{sectionDescriptions.items}</p>
            </div>
            <button
              type="button"
              onClick={addItem}
              className="btn-secondary text-xs"
            >
              + Add Item
            </button>
          </div>

          <div className="space-y-3">
            {form.items.map((item, index) => (
              <div 
                key={index} 
                className="grid gap-3 rounded-lg border border-slate-200 dark:border-slate-700 p-4 md:grid-cols-[1fr_100px_120px_100px] bg-linear-to-r from-slate-50 to-white dark:from-slate-800/50 dark:to-slate-800/30 hover:border-blue-300 dark:hover:border-blue-700 transition-colors"
              >
                <input
                  value={item.description}
                  onChange={(event) => updateItem(index, 'description', event.target.value)}
                  placeholder="Service or product description"
                  className="input-field text-sm col-span-full md:col-span-1"
                />
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.quantity}
                    onChange={(event) => updateItem(index, 'quantity', event.target.value)}
                    placeholder="Qty"
                    className="input-field text-sm w-full"
                    title="Quantity"
                  />
                </div>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.price}
                    onChange={(event) => updateItem(index, 'price', event.target.value)}
                    placeholder="Rate/Price"
                    className="input-field text-sm w-full"
                    title="Price per unit"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  disabled={form.items.length === 1}
                  className="rounded-lg bg-red-50 hover:bg-red-100 dark:bg-red-950/30 dark:hover:bg-red-950/50 px-3 py-2 text-xs font-semibold text-red-600 dark:text-red-400 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                  title="Remove item"
                >
                  ✕ Remove
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="form-section">
          <div className="space-y-1 mb-6">
            <label className="text-lg font-bold text-slate-900 dark:text-slate-100">📝 Notes</label>
            <p className="text-sm text-slate-600 dark:text-slate-400">{sectionDescriptions.notes}</p>
          </div>
          <textarea
            value={form.notes}
            onChange={(event) => updateField('notes', event.target.value)}
            placeholder="Payment terms, special instructions, or thank you message..."
            className="input-field h-24 w-full text-sm resize-none"
          />
        </section>

        <button type="submit" className="btn-primary w-full py-3 text-base font-semibold">
          ✓ Generate Invoice
        </button>
      </form>

      <aside className="h-fit lg:sticky lg:top-24">
        <div className="section-card bg-linear-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-200 dark:border-blue-900/50 space-y-6">
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase text-blue-600 dark:text-blue-400 tracking-widest">💰 Invoice Summary</p>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">Total Amount</h2>
          </div>

          <div className="space-y-4 border-t border-blue-200 dark:border-blue-900/50 pt-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600 dark:text-slate-400">Subtotal</span>
              <span className="font-semibold text-slate-900 dark:text-slate-100 text-base">{formatCurrency(summary.subtotal, form.currency)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600 dark:text-slate-400">Tax <span className="text-xs">({form.taxRate}%)</span></span>
              <span className="font-semibold text-slate-900 dark:text-slate-100 text-base">{formatCurrency(summary.taxAmount, form.currency)}</span>
            </div>
            <div className="flex items-center justify-between border-t-2 border-blue-200 dark:border-blue-900/50 pt-4 text-base">
              <span className="font-bold text-slate-900 dark:text-slate-100">Total Due</span>
              <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-3xl font-bold text-transparent">
                {formatCurrency(summary.total, form.currency)}
              </span>
            </div>
          </div>

          <div className="rounded-lg bg-blue-100 dark:bg-blue-950/60 border border-blue-300 dark:border-blue-900/50 p-4 space-y-2">
            <p className="text-xs font-bold text-blue-900 dark:text-blue-300">💡 Pro Tips</p>
            <ul className="text-xs text-blue-800 dark:text-blue-300 space-y-1 leading-relaxed">
              <li>• Use descriptive invoice numbers</li>
              <li>• Set clear due dates for faster payments</li>
              <li>• Add payment terms in notes</li>
            </ul>
          </div>
        </div>
      </aside>
    </div>
  )
}

export default InvoiceFormPage
