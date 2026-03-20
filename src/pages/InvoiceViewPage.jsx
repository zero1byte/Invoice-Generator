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
      <div className="rounded-2xl border border-dashed border-slate-300 bg-white/80 p-10 text-center">
        <p className="text-slate-800">Invoice not found.</p>
        <Link
          to="/invoices"
          className="mt-4 inline-flex rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white"
        >
          Back to invoice list
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in-up">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">Invoice Preview</h1>
          <p className="text-sm text-slate-600">{invoice.invoiceNumber}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => downloadById(invoice.id)}
            className="rounded-xl bg-cyan-600 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-500"
          >
            Download PDF
          </button>
          <Link
            to="/invoice/new"
            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700"
          >
            Create Another
          </Link>
        </div>
      </header>

      <section className="rounded-3xl border border-slate-200 bg-white/95 p-6 shadow-xl shadow-slate-200/60 md:p-8">
        <div className="grid gap-6 border-b border-slate-200 pb-6 md:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-500">From</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">{invoice.sender.name}</p>
            <p className="text-sm text-slate-600">{invoice.sender.email}</p>
            <p className="text-sm text-slate-600">{invoice.sender.address}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-500">Bill To</p>
            <p className="mt-2 text-lg font-semibold text-slate-900">{invoice.client.name}</p>
            <p className="text-sm text-slate-600">{invoice.client.email}</p>
            <p className="text-sm text-slate-600">{invoice.client.address}</p>
          </div>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-100 text-xs uppercase tracking-wide text-slate-500">
              <tr>
                <th className="px-3 py-2">Description</th>
                <th className="px-3 py-2">Qty</th>
                <th className="px-3 py-2">Rate</th>
                <th className="px-3 py-2">Line Total</th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, index) => (
                <tr key={`${item.description}-${index}`} className="border-b border-slate-100">
                  <td className="px-3 py-2 text-slate-700">{item.description}</td>
                  <td className="px-3 py-2 text-slate-700">{item.quantity}</td>
                  <td className="px-3 py-2 text-slate-700">
                    {formatCurrency(item.price, invoice.currency)}
                  </td>
                  <td className="px-3 py-2 font-medium text-slate-900">
                    {formatCurrency(item.quantity * item.price, invoice.currency)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 grid gap-3 text-sm md:ml-auto md:w-72">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2 text-slate-700">
            <span>Issued</span>
            <span>{formatDate(invoice.createdAt)}</span>
          </div>
          <div className="flex items-center justify-between border-b border-slate-200 pb-2 text-slate-700">
            <span>Due Date</span>
            <span>{formatDate(invoice.dueDate)}</span>
          </div>
          <div className="flex items-center justify-between border-b border-slate-200 pb-2 text-slate-700">
            <span>Subtotal</span>
            <span>{formatCurrency(invoice.subtotal, invoice.currency)}</span>
          </div>
          <div className="flex items-center justify-between border-b border-slate-200 pb-2 text-slate-700">
            <span>Tax ({invoice.taxRate}%)</span>
            <span>{formatCurrency(invoice.taxAmount, invoice.currency)}</span>
          </div>
          <div className="flex items-center justify-between text-base font-semibold text-slate-900">
            <span>Total</span>
            <span>{formatCurrency(invoice.total, invoice.currency)}</span>
          </div>
        </div>

        {invoice.notes ? (
          <div className="mt-8 rounded-2xl border border-cyan-100 bg-cyan-50 p-4 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Notes</p>
            <p className="mt-2">{invoice.notes}</p>
          </div>
        ) : null}
      </section>
    </div>
  )
}

export default InvoiceViewPage
