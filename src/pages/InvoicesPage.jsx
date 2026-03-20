import { Link } from 'react-router-dom'
import { useInvoices } from '../context/InvoiceContext'

function formatDate(value) {
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

function InvoicesPage() {
  const { invoices, downloadById } = useInvoices()

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">Your Invoices</h1>
          <p className="text-slate-600">
            {invoices.length > 0
              ? `You have ${invoices.length} invoice${invoices.length === 1 ? '' : 's'} in your records`
              : 'No invoices yet. Create one to get started.'}
          </p>
        </div>
        <Link to="/invoice/new" className="btn-primary">
          New Invoice
        </Link>
      </div>

      {invoices.length === 0 ? (
        <div className="relative overflow-hidden rounded-2xl card-elevated px-6 py-16 text-center">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-100 opacity-30 blur-3xl" />
          <div className="relative">
            <div className="mb-4 text-6xl">📄</div>
            <h2 className="text-xl font-semibold text-slate-900">No invoices yet</h2>
            <p className="mt-2 text-slate-600">
              Start by creating your first invoice. It will appear here.
            </p>
            <Link to="/invoice/new" className="btn-primary mt-6 inline-block">
              Create Your First Invoice
            </Link>
          </div>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl card-elevated shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="px-6 py-4 font-semibold text-slate-900">Invoice</th>
                  <th className="px-6 py-4 font-semibold text-slate-900">Client</th>
                  <th className="px-6 py-4 font-semibold text-slate-900">Date</th>
                  <th className="px-6 py-4 text-right font-semibold text-slate-900">Total</th>
                  <th className="px-6 py-4 text-center font-semibold text-slate-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="transition-colors hover:bg-slate-50">
                    <td className="px-6 py-4 font-semibold text-blue-600">{invoice.invoiceNumber}</td>
                    <td className="px-6 py-4 text-slate-700">{invoice.client.name}</td>
                    <td className="px-6 py-4 text-slate-600">{formatDate(invoice.createdAt)}</td>
                    <td className="px-6 py-4 text-right font-semibold text-slate-900">
                      {formatCurrency(invoice.total, invoice.currency)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <Link
                          to={`/invoices/${invoice.id}`}
                          className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium text-blue-600 hover:bg-blue-50 transition-colors"
                        >
                          👁 View
                        </Link>
                        <button
                          type="button"
                          onClick={() => downloadById(invoice.id)}
                          className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium text-emerald-600 hover:bg-emerald-50 transition-colors"
                        >
                          ⬇️ PDF
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
