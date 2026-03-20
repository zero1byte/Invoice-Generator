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
    name: 'Your Business Name',
    email: 'billing@yourbusiness.com',
    address: '123 Business St, City, State 12345',
  },
  client: { name: '', email: '', address: '' },
  items: [initialItem],
}

function formatCurrency(value, currency) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency', currency, maximumFractionDigits: 2,
  }).format(Number(value) || 0)
}

function FieldLabel({ children, required }) {
  return (
    <label className="block text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)] mb-1.5">
      {children}
      {required && <span className="text-rose-500 ml-0.5">*</span>}
    </label>
  )
}

function SectionHeader({ icon, title, subtitle, action }) {
  return (
    <div className="flex items-start justify-between mb-5">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl flex items-center justify-center bg-[var(--accent-light)] border border-[var(--accent-border)] text-indigo-500 dark:text-indigo-400 shrink-0">
          {icon}
        </div>
        <div>
          <h2 className="font-bold text-sm text-[var(--text-primary)]">{title}</h2>
          {subtitle && <p className="text-xs text-[var(--text-muted)] mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {action}
    </div>
  )
}

function InvoiceFormPage() {
  const navigate = useNavigate()
  const { createInvoice } = useInvoices()
  const [form, setForm] = useState(initialState)

  const summary = useMemo(() => {
    const subtotal = form.items.reduce(
      (sum, item) => sum + (Number(item.quantity) || 0) * (Number(item.price) || 0), 0
    )
    const taxAmount = subtotal * ((Number(form.taxRate) || 0) / 100)
    return { subtotal, taxAmount, total: subtotal + taxAmount }
  }, [form.items, form.taxRate])

  const updateField   = (k, v) => setForm(p => ({ ...p, [k]: v }))
  const updateParty   = (party, k, v) => setForm(p => ({ ...p, [party]: { ...p[party], [k]: v } }))
  const updateItem    = (i, k, v) => setForm(p => ({ ...p, items: p.items.map((it, idx) => idx === i ? { ...it, [k]: v } : it) }))
  const addItem       = () => setForm(p => ({ ...p, items: [...p.items, { ...initialItem }] }))
  const removeItem    = (i) => setForm(p => ({ ...p, items: p.items.filter((_, idx) => idx !== i) }))

  const onSubmit = (e) => {
    e.preventDefault()
    const invoice = createInvoice(form)
    navigate(`/invoices/${invoice.id}`)
  }

  const iconDetails = (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  )
  const iconBusiness = (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h1.5m-1.5 3h1.5m-1.5 3h1.5m3-6H15m-1.5 3H15m-1.5 3H15M9 21v-3.375c0-.621.504-1.125 1.125-1.125h3.75c.621 0 1.125.504 1.125 1.125V21" />
    </svg>
  )
  const iconClient = (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
  )
  const iconItems = (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
  )
  const iconNotes = (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
    </svg>
  )

  return (
    <div className="animate-fade-in-up">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">Create Invoice</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1.5">Fill in the details below to generate a professional invoice PDF.</p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_360px] items-start">
        <form onSubmit={onSubmit} className="flex flex-col gap-4">

          {/* Invoice Details */}
          <div className="form-section">
            <SectionHeader icon={iconDetails} title="Invoice Details" subtitle="Reference number, dates & tax" />
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <FieldLabel required>Invoice Number</FieldLabel>
                <input className="input-field" value={form.invoiceNumber} onChange={e => updateField('invoiceNumber', e.target.value)} placeholder="INV-2024-001" required />
              </div>
              <div>
                <FieldLabel required>Due Date</FieldLabel>
                <input type="date" className="input-field" value={form.dueDate} onChange={e => updateField('dueDate', e.target.value)} required />
              </div>
              <div>
                <FieldLabel>Currency</FieldLabel>
                <select className="input-field" value={form.currency} onChange={e => updateField('currency', e.target.value)}>
                  <option value="USD">USD – US Dollar</option>
                  <option value="EUR">EUR – Euro</option>
                  <option value="INR">INR – Indian Rupee</option>
                  <option value="GBP">GBP – British Pound</option>
                </select>
              </div>
              <div>
                <FieldLabel>Tax Rate (%)</FieldLabel>
                <input type="number" className="input-field" min="0" max="100" step="0.1" value={form.taxRate} onChange={e => updateField('taxRate', e.target.value)} placeholder="10" />
              </div>
            </div>
          </div>

          {/* Your Business */}
          <div className="form-section">
            <SectionHeader icon={iconBusiness} title="Your Business" subtitle="Sender info shown on the invoice" />
            <div className="flex flex-col gap-3">
              <div>
                <FieldLabel>Business Name</FieldLabel>
                <input className="input-field" value={form.sender.name} onChange={e => updateParty('sender', 'name', e.target.value)} placeholder="Acme Inc." />
              </div>
              <div>
                <FieldLabel>Email</FieldLabel>
                <input type="email" className="input-field" value={form.sender.email} onChange={e => updateParty('sender', 'email', e.target.value)} placeholder="billing@business.com" />
              </div>
              <div>
                <FieldLabel>Address</FieldLabel>
                <textarea className="input-field h-20" value={form.sender.address} onChange={e => updateParty('sender', 'address', e.target.value)} placeholder="123 Business St, City, State 12345" />
              </div>
            </div>
          </div>

          {/* Bill To */}
          <div className="form-section">
            <SectionHeader icon={iconClient} title="Bill To" subtitle="Client billing details" />
            <div className="flex flex-col gap-3">
              <div>
                <FieldLabel required>Client Name</FieldLabel>
                <input required className="input-field" value={form.client.name} onChange={e => updateParty('client', 'name', e.target.value)} placeholder="Client Company" />
              </div>
              <div>
                <FieldLabel>Email</FieldLabel>
                <input type="email" className="input-field" value={form.client.email} onChange={e => updateParty('client', 'email', e.target.value)} placeholder="client@company.com" />
              </div>
              <div>
                <FieldLabel>Address</FieldLabel>
                <textarea className="input-field h-20" value={form.client.address} onChange={e => updateParty('client', 'address', e.target.value)} placeholder="Client billing address" />
              </div>
            </div>
          </div>

          {/* Line Items */}
          <div className="form-section">
            <SectionHeader
              icon={iconItems}
              title="Line Items"
              subtitle="Services or products being billed"
              action={
                <button type="button" onClick={addItem} className="btn-ghost text-xs border border-[var(--border)] text-indigo-500 dark:text-indigo-400 hover:bg-[var(--accent-light)]">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  Add Item
                </button>
              }
            />

            {/* Column headers */}
            <div className="hidden sm:grid grid-cols-[1fr_80px_110px_40px] gap-2 px-1 mb-2">
              {['Description', 'Qty', 'Rate', ''].map(h => (
                <span key={h} className="text-[11px] font-bold uppercase tracking-widest text-[var(--text-muted)]">{h}</span>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              {form.items.map((item, i) => (
                <div key={i} className="grid grid-cols-1 sm:grid-cols-[1fr_80px_110px_40px] gap-2 items-center p-3 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] hover:border-[var(--border-strong)] transition-colors">
                  <input className="input-field text-sm" value={item.description} onChange={e => updateItem(i, 'description', e.target.value)} placeholder="Service or product description" />
                  <input type="number" className="input-field text-sm text-right" min="0" step="0.01" value={item.quantity} onChange={e => updateItem(i, 'quantity', e.target.value)} placeholder="1" title="Quantity" />
                  <input type="number" className="input-field text-sm text-right" min="0" step="0.01" value={item.price} onChange={e => updateItem(i, 'price', e.target.value)} placeholder="0.00" title="Unit rate" />
                  <button
                    type="button"
                    onClick={() => removeItem(i)}
                    disabled={form.items.length === 1}
                    className="btn-danger w-9 h-9 flex items-center justify-center rounded-lg p-0"
                    title="Remove item"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="form-section">
            <SectionHeader icon={iconNotes} title="Notes & Terms" subtitle="Payment terms or thank you message" />
            <textarea className="input-field h-24" value={form.notes} onChange={e => updateField('notes', e.target.value)} placeholder="Payment due within 30 days. Thank you for your business!" />
          </div>

          <button type="submit" className="btn-primary w-full justify-center py-3.5 text-base">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            Generate Invoice
          </button>
        </form>

        {/* ── Sticky Sidebar Summary ────────────────────────── */}
        <aside className="xl:sticky xl:top-6">
          <div className="card-lg overflow-hidden">
            {/* Header */}
            <div className="px-6 py-5 border-b border-[var(--border)] bg-gradient-to-br from-[var(--accent-light)] to-transparent">
              <p className="text-[11px] font-bold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 mb-1">Invoice Summary</p>
              <p className="text-3xl font-extrabold bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent tabular-nums">
                {formatCurrency(summary.total, form.currency)}
              </p>
              <p className="text-xs text-[var(--text-muted)] mt-1">Total due</p>
            </div>

            {/* Breakdown */}
            <div className="px-6 py-5 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-[var(--text-secondary)]">Subtotal</span>
                <span className="text-sm font-semibold text-[var(--text-primary)] tabular-nums">{formatCurrency(summary.subtotal, form.currency)}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-[var(--border)]">
                <span className="text-sm text-[var(--text-secondary)]">Tax ({form.taxRate}%)</span>
                <span className="text-sm font-semibold text-[var(--text-primary)] tabular-nums">{formatCurrency(summary.taxAmount, form.currency)}</span>
              </div>
              <div className="flex justify-between items-center pt-1">
                <span className="font-bold text-[var(--text-primary)]">Total Due</span>
                <span className="text-xl font-extrabold bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent tabular-nums">
                  {formatCurrency(summary.total, form.currency)}
                </span>
              </div>
            </div>

            {/* Tips */}
            <div className="px-6 pb-6">
              <div className="rounded-xl bg-[var(--surface-3)] border border-[var(--border)] p-4">
                <p className="text-[11px] font-bold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 mb-2.5">Pro Tips</p>
                <ul className="space-y-2">
                  {[
                    'Use sequential numbers like INV-2024-001',
                    'Set clear due dates for faster payments',
                    'Add payment terms in the notes section',
                  ].map(tip => (
                    <li key={tip} className="flex gap-2 text-xs text-[var(--text-secondary)] leading-relaxed">
                      <span className="text-indigo-400 shrink-0 mt-0.5">→</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default InvoiceFormPage