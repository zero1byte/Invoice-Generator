import { Link, useParams } from 'react-router-dom'
import { useInvoices } from '../context/InvoiceContext'

function formatDate(value) {
  if (!value) return '—'
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  }).format(new Date(value))
}

function formatCurrency(value, currency) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency', currency, maximumFractionDigits: 2,
  }).format(Number(value) || 0)
}

function isOverdue(dueDate) {
  return dueDate && new Date(dueDate) < new Date()
}

function InvoiceViewPage() {
  const { invoiceId } = useParams()
  const { getInvoiceById, downloadById } = useInvoices()
  const invoice = getInvoiceById(invoiceId)

  if (!invoice) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-5 animate-fade-in-up text-center">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-[var(--surface-3)] border border-[var(--border)] text-[var(--text-muted)]">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <h2 className="text-xl font-bold text-[var(--text-primary)]">Invoice not found</h2>
          <p className="text-sm text-[var(--text-secondary)] mt-1.5">This invoice may have been removed or the link is invalid.</p>
        </div>
        <Link to="/invoices" className="btn-primary mt-1">Back to Invoices</Link>
      </div>
    )
  }

  const overdue = isOverdue(invoice.dueDate)

  return (
    <div className="space-y-6 animate-fade-in-up">

      {/* ── Top bar ───────────────────────────────────────── */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between print:hidden">
        <div>
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-[var(--text-muted)] mb-2">
            <Link to="/invoices" className="hover:text-[var(--text-primary)] transition-colors font-medium">
              Invoices
            </Link>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
            <span className="font-semibold text-[var(--text-secondary)]">{invoice.invoiceNumber}</span>
          </nav>
          <h1 className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">Invoice Preview</h1>
        </div>

        <div className="flex flex-wrap gap-2 sm:shrink-0">
          <button
            onClick={() => window.print()}
            className="btn-secondary"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0110.56 0m-10.56 0L6.34 18m10.94-4.171c.24.03.48.062.72.096m-.72-.096L17.66 18m0 0l.229 2.523a1.125 1.125 0 01-1.12 1.227H7.231c-.662 0-1.18-.568-1.12-1.227L6.34 18m11.318 0h1.091A2.25 2.25 0 0021 15.75V9.456c0-1.081-.768-2.015-1.837-2.175a48.055 48.055 0 00-1.913-.247M6.34 18H5.25A2.25 2.25 0 013 15.75V9.456c0-1.081.768-2.015 1.837-2.175a48.041 48.041 0 011.913-.247m10.5 0a48.536 48.536 0 00-10.5 0m10.5 0V3.375c0-.621-.504-1.125-1.125-1.125h-8.25c-.621 0-1.125.504-1.125 1.125v3.659M18 10.5h.008v.008H18V10.5zm-3 0h.008v.008H15V10.5z" />
            </svg>
            Print
          </button>
          <button
            type="button"
            onClick={() => downloadById(invoice.id)}
            className="btn-primary"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Download PDF
          </button>
          <Link to="/invoice/new" className="btn-secondary">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            New Invoice
          </Link>
        </div>
      </div>

      {/* ── Invoice Document ──────────────────────────────── */}
      <div className="card-lg overflow-hidden animate-bounce-in" style={{ animationDelay: '80ms' }}>

        {/* Document Header */}
        <div className="px-8 py-8 md:px-12 border-b border-[var(--border)] bg-gradient-to-br from-[var(--accent-light)] via-transparent to-transparent">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.1em] text-indigo-500 dark:text-indigo-400 mb-2">Invoice</p>
              <p className="font-display italic text-4xl font-bold text-[var(--text-primary)] tracking-tight">
                {invoice.invoiceNumber}
              </p>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-xs text-[var(--text-muted)] mb-1">Total Amount</p>
              <p className="text-4xl font-extrabold bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent tabular-nums">
                {formatCurrency(invoice.total, invoice.currency)}
              </p>
              <div className="mt-2">
                {overdue
                  ? <span className="badge-danger">Overdue</span>
                  : <span className="badge-success">Unpaid</span>
                }
              </div>
            </div>
          </div>
        </div>

        {/* Parties & Dates */}
        <div className="px-8 py-7 md:px-12 border-b border-[var(--border)]">
          <div className="grid gap-8 sm:grid-cols-3">
            {/* From */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-3">From</p>
              <p className="font-bold text-[var(--text-primary)]">{invoice.sender.name}</p>
              <div className="mt-1.5 space-y-0.5 text-sm text-[var(--text-secondary)]">
                {invoice.sender.email && <p>{invoice.sender.email}</p>}
                {invoice.sender.address && <p className="whitespace-pre-line">{invoice.sender.address}</p>}
              </div>
            </div>

            {/* Bill To */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-3">Bill To</p>
              <p className="font-bold text-[var(--text-primary)]">{invoice.client.name}</p>
              <div className="mt-1.5 space-y-0.5 text-sm text-[var(--text-secondary)]">
                {invoice.client.email && <p>{invoice.client.email}</p>}
                {invoice.client.address && <p className="whitespace-pre-line">{invoice.client.address}</p>}
              </div>
            </div>

            {/* Dates */}
            <div className="space-y-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-1">Issue Date</p>
                <p className="font-semibold text-sm text-[var(--text-primary)]">{formatDate(invoice.createdAt)}</p>
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-[var(--text-muted)] mb-1">Due Date</p>
                <p className={`font-semibold text-sm ${overdue ? 'text-rose-500' : 'text-[var(--text-primary)]'}`}>
                  {formatDate(invoice.dueDate)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Line Items Table */}
        <div className="px-8 md:px-12 overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th className="text-left pl-0">Description</th>
                <th className="text-right w-20">Qty</th>
                <th className="text-right w-28">Rate</th>
                <th className="text-right w-32 pr-0">Total</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, i) => (
                <tr key={i}>
                  <td className="pl-0 font-medium text-[var(--text-primary)]">
                    {item.description || <span className="text-[var(--text-muted)] italic text-xs">No description</span>}
                  </td>
                  <td className="text-right tabular-nums">{item.quantity}</td>
                  <td className="text-right tabular-nums">{formatCurrency(item.price, invoice.currency)}</td>
                  <td className="text-right font-bold text-[var(--text-primary)] tabular-nums pr-0">
                    {formatCurrency(item.quantity * item.price, invoice.currency)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="px-8 py-6 md:px-12 flex justify-end border-t border-[var(--border)]">
          <div className="w-full sm:w-72 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-[var(--text-secondary)]">Subtotal</span>
              <span className="font-semibold text-[var(--text-primary)] tabular-nums">{formatCurrency(invoice.subtotal, invoice.currency)}</span>
            </div>
            <div className="flex justify-between text-sm pb-4 border-b border-[var(--border)]">
              <span className="text-[var(--text-secondary)]">Tax ({invoice.taxRate}%)</span>
              <span className="font-semibold text-[var(--text-primary)] tabular-nums">{formatCurrency(invoice.taxAmount, invoice.currency)}</span>
            </div>
            <div className="flex justify-between items-center pt-1">
              <span className="font-bold text-[var(--text-primary)]">Total Due</span>
              <span className="text-2xl font-extrabold bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent tabular-nums">
                {formatCurrency(invoice.total, invoice.currency)}
              </span>
            </div>
          </div>
        </div>

        {/* Notes */}
        {invoice.notes && (
          <div className="px-8 pb-8 md:px-12">
            <div className="rounded-xl bg-[var(--accent-light)] border border-[var(--accent-border)] p-5">
              <p className="text-[11px] font-bold uppercase tracking-widest text-indigo-500 dark:text-indigo-400 mb-2">Notes & Terms</p>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{invoice.notes}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default InvoiceViewPage