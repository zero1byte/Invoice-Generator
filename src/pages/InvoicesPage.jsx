import { Link } from 'react-router-dom'
import { useInvoices } from '../context/InvoiceContext'

function formatDate(value) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric', month: 'short', day: '2-digit',
  }).format(new Date(value))
}

function formatCurrency(value, currency) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency', currency, maximumFractionDigits: 2,
  }).format(Number(value) || 0)
}

// Consistent avatar color per client name
const AVATAR_COLORS = [
  ['bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-300'],
  ['bg-violet-100 dark:bg-violet-950/60 text-violet-600 dark:text-violet-300'],
  ['bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-300'],
  ['bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-300'],
  ['bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-300'],
  ['bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-300'],
]

function getAvatarClass(name) {
  let h = 0
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h)
  return AVATAR_COLORS[Math.abs(h) % AVATAR_COLORS.length][0]
}

function getInitials(name) {
  return (name || '?').split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

function InvoicesPage() {
  const { invoices, downloadById } = useInvoices()

  return (
    <div className="space-y-6 animate-fade-in-up">

      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-[var(--text-primary)]">Invoices</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            {invoices.length > 0
              ? `${invoices.length} invoice${invoices.length === 1 ? '' : 's'} total`
              : 'No invoices yet — create your first one.'}
          </p>
        </div>
        <Link to="/invoice/new" className="btn-primary self-start sm:self-center">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          New Invoice
        </Link>
      </div>

      {/* Empty state */}
      {invoices.length === 0 ? (
        <div className="card-lg px-8 py-20 flex flex-col items-center text-center gap-5">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center bg-[var(--accent-light)] border border-[var(--accent-border)] text-indigo-500 dark:text-indigo-400">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-[var(--text-primary)]">No invoices yet</h2>
            <p className="text-sm text-[var(--text-secondary)] mt-1.5 max-w-sm mx-auto leading-relaxed">
              Create your first invoice and it'll appear here with your full billing history.
            </p>
          </div>
          <Link to="/invoice/new" className="btn-primary mt-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Create First Invoice
          </Link>
        </div>
      ) : (
        <div className="card-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th className="text-left">Invoice</th>
                  <th className="text-left">Client</th>
                  <th className="text-left">Date</th>
                  <th className="text-right">Amount</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice, index) => (
                  <tr
                    key={invoice.id}
                    className="animate-bounce-in"
                    style={{ animationDelay: `${index * 40}ms` }}
                  >
                    {/* Invoice # */}
                    <td>
                      <code className="inline-block px-2.5 py-1 rounded-lg text-xs font-bold font-mono bg-[var(--accent-light)] text-indigo-600 dark:text-indigo-400 border border-[var(--accent-border)]">
                        {invoice.invoiceNumber}
                      </code>
                    </td>

                    {/* Client */}
                    <td>
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${getAvatarClass(invoice.client.name)}`}>
                          {getInitials(invoice.client.name)}
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-[var(--text-primary)] leading-tight">{invoice.client.name}</p>
                          {invoice.client.email && (
                            <p className="text-xs text-[var(--text-muted)] mt-0.5">{invoice.client.email}</p>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="whitespace-nowrap">{formatDate(invoice.createdAt)}</td>

                    {/* Amount */}
                    <td className="text-right">
                      <span className="font-bold text-sm text-[var(--text-primary)] tabular-nums">
                        {formatCurrency(invoice.total, invoice.currency)}
                      </span>
                    </td>

                    {/* Actions */}
                    <td>
                      <div className="flex items-center justify-center gap-1.5">
                        <Link
                          to={`/invoices/${invoice.id}`}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold
                            text-indigo-600 dark:text-indigo-400
                            bg-indigo-50 dark:bg-indigo-950/40
                            border border-indigo-100 dark:border-indigo-900/50
                            hover:bg-indigo-100 dark:hover:bg-indigo-950/70
                            transition-colors"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          View
                        </Link>
                        <button
                          type="button"
                          onClick={() => downloadById(invoice.id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold
                            text-emerald-600 dark:text-emerald-400
                            bg-emerald-50 dark:bg-emerald-950/40
                            border border-emerald-100 dark:border-emerald-900/50
                            hover:bg-emerald-100 dark:hover:bg-emerald-950/70
                            transition-colors cursor-pointer"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                          </svg>
                          PDF
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default InvoicesPage