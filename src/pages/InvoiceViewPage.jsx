import { Link, useParams } from 'react-router-dom'
import { useInvoices } from '../context/InvoiceContext'

function formatDate(value) {
  if (!value) {
    return '-'
  }

  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }).format(new Date(value))
}

function formatCurrency(value, currency) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  }).format(Number(value) || 0)
}

function InvoiceViewPage() {
  const { invoiceId } = useParams()
  const { getInvoiceById, downloadById } = useInvoices()
  const invoice = getInvoiceById(invoiceId)

  if (!invoice) {
    return (
      <div className="space-y-6">
        <div className="rounded-2xl card-elevated p-10 text-center">
          <div className="text-5xl mb-4">📋</div>
          <p className="text-slate-900 dark:text-slate-100 font-semibold">Invoice not found</p>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">The invoice you're looking for doesn't exist.</p>
          <Link
            to="/invoices"
            className="btn-primary mt-6 inline-block"
          >
            Back to Invoices
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between animate-fade-in-up">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">📋 Invoice Preview</h1>
          <p className="text-slate-600 dark:text-slate-400">Invoice #{invoice.invoiceNumber} - Professional invoice document</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => downloadById(invoice.id)}
            className="btn-primary"
          >
            ⬇️ Download PDF
          </button>
          <Link to="/invoice/new" className="btn-secondary">
            ➕ Create Another
          </Link>
        </div>
      </div>

      <div className="section-card rounded-2xl p-8 md:p-12 space-y-10 animate-bounce-in"
        style={{ animationDelay: '100ms' }}
      >
        <div className="grid gap-10 md:grid-cols-3 border-b-2 border-slate-300 dark:border-slate-700 pb-10">
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold">📤 From</p>
            <div>
              <p className="text-lg font-bold text-slate-900 dark:text-slate-100">{invoice.sender.name}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{invoice.sender.email}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">{invoice.sender.address}</p>
            </div>
          </div>
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold">📬 Bill To</p>
            <div>
              <p className="text-lg font-bold text-slate-900 dark:text-slate-100">{invoice.client.name}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{invoice.client.email}</p>
              <p className="text-sm text-slate-600 dark:text-slate-400">{invoice.client.address}</p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold mb-1">📅 Issued</p>
              <p className="text-base font-semibold text-slate-900 dark:text-slate-100">{formatDate(invoice.createdAt)}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 font-bold mb-1">⏰ Due Date</p>
              <p className="text-base font-semibold text-slate-900 dark:text-slate-100">{formatDate(invoice.dueDate)}</p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b-2 border-slate-300 dark:border-slate-600 bg-linear-to-r from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-800/30">
              <tr>
                <th className="px-4 py-4 font-bold text-slate-900 dark:text-slate-100">Description</th>
                <th className="px-4 py-4 text-right font-bold text-slate-900 dark:text-slate-100 w-20">Qty</th>
                <th className="px-4 py-4 text-right font-bold text-slate-900 dark:text-slate-100 w-24">Rate</th>
                <th className="px-4 py-4 text-right font-bold text-slate-900 dark:text-slate-100 w-32">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {invoice.items.map((item, index) => (
                <tr key={`${item.description}-${index}`} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-4 py-4 text-slate-700 dark:text-slate-300">{item.description}</td>
                  <td className="px-4 py-4 text-right text-slate-700 dark:text-slate-300">{item.quantity}</td>
                  <td className="px-4 py-4 text-right text-slate-700 dark:text-slate-300">
                    {formatCurrency(item.price, invoice.currency)}
                  </td>
                  <td className="px-4 py-4 text-right font-bold text-slate-900 dark:text-slate-100">
                    {formatCurrency(item.quantity * item.price, invoice.currency)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid gap-4 md:ml-auto md:w-72 text-sm border-t-2 border-slate-300 dark:border-slate-600 pt-8">
          <div className="flex items-center justify-between">
            <span className="text-slate-700 dark:text-slate-300">Subtotal</span>
            <span className="font-bold text-slate-900 dark:text-slate-100 text-base">{formatCurrency(invoice.subtotal, invoice.currency)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-700 dark:text-slate-300">Tax <span className="text-xs font-normal">({invoice.taxRate}%)</span></span>
            <span className="font-bold text-slate-900 dark:text-slate-100 text-base">{formatCurrency(invoice.taxAmount, invoice.currency)}</span>
          </div>
          <div className="flex items-center justify-between pt-4 border-t-2 border-slate-300 dark:border-slate-600 text-lg">
            <span className="font-bold text-slate-900 dark:text-slate-100">Total Due</span>
            <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-3xl font-bold text-transparent">
              {formatCurrency(invoice.total, invoice.currency)}
            </span>
          </div>
        </div>

        {invoice.notes ? (
          <div className="rounded-xl bg-linear-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-2 border-blue-200 dark:border-blue-900/50 p-6">
            <p className="font-bold text-slate-900 dark:text-slate-100 mb-3">📝 Notes & Terms</p>
            <p className="mt-2 text-slate-700 dark:text-slate-300 leading-relaxed text-sm">{invoice.notes}</p>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default InvoiceViewPage
