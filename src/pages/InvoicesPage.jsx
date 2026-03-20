import { Link } from 'react-router-dom'
import { useInvoices } from '../context/InvoiceContext'

const pageDescription = "Manage and view all your invoices in one place. Download PDFs, track payments, and manage your billing history."

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
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">📋 Your Invoices</h1>
          <div className="space-y-1">
            <p className="text-lg text-slate-600 dark:text-slate-400">{pageDescription}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {invoices.length > 0
                ? `You have ${invoices.length} invoice${invoices.length === 1 ? '' : 's'} in your records`
                : 'No invoices yet. Create one to get started.'}
            </p>
          </div>
        </div>
        <Link to="/invoice/new" className="btn-primary whitespace-nowrap h-fit">
          + New Invoice
        </Link>
      </div>

      {invoices.length === 0 ? (
        <div className="relative overflow-hidden section-card text-center py-16">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-100 opacity-30 dark:bg-blue-900/30 blur-3xl" />
          <div className="relative space-y-4">
            <div className="mb-2 text-7xl animate-bounce-in">📄</div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">No invoices created yet</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
              Start by creating your first professional invoice. It will appear here with all your billing history.
            </p>
            <Link to="/invoice/new" className="btn-primary inline-block mt-4">
              ✨ Create Your First Invoice
            </Link>
          </div>
        </div>
      ) : (
        <div className="overflow-hidden section-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b-2 border-slate-300 dark:border-slate-600 bg-linear-to-r from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-800/30">
                <tr>
                  <th className="px-6 py-4 font-bold text-slate-900 dark:text-slate-100">Invoice</th>
                  <th className="px-6 py-4 font-bold text-slate-900 dark:text-slate-100">Client</th>
                  <th className="px-6 py-4 font-bold text-slate-900 dark:text-slate-100">Date</th>
                  <th className="px-6 py-4 text-right font-bold text-slate-900 dark:text-slate-100">Amount</th>
                  <th className="px-6 py-4 text-center font-bold text-slate-900 dark:text-slate-100">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {invoices.map((invoice, index) => (
                  <tr 
                    key={invoice.id} 
                    className="transition-all duration-300 hover:bg-blue-50 dark:hover:bg-blue-950/20 border-l-4 border-transparent hover:border-blue-500"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <td className="px-6 py-4 font-bold text-blue-600 dark:text-blue-400">{invoice.invoiceNumber}</td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-300 font-medium">{invoice.client.name}</td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{formatDate(invoice.createdAt)}</td>
                    <td className="px-6 py-4 text-right font-bold text-slate-900 dark:text-slate-100">
                      {formatCurrency(invoice.total, invoice.currency)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <Link
                          to={`/invoices/${invoice.id}`}
                          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 hover:bg-blue-100 dark:hover:bg-blue-950/50 transition-colors"
                          title="View invoice details"
                        >
                          👁 View
                        </Link>
                        <button
                          type="button"
                          onClick={() => downloadById(invoice.id)}
                          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 hover:bg-emerald-100 dark:hover:bg-emerald-950/50 transition-colors"
                          title="Download PDF"
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
