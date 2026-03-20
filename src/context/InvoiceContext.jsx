import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { downloadInvoicePdf } from '../utils/invoicePdf'

const STORAGE_KEY = 'invoice_generator_records_v1'

const InvoiceContext = createContext(null)

function parseStorage() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return []
    }

    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function calculateSummary(items, taxRate) {
  const subtotal = items.reduce((sum, item) => {
    const quantity = Number(item.quantity) || 0
    const price = Number(item.price) || 0
    return sum + quantity * price
  }, 0)

  const normalizedTaxRate = Number(taxRate) || 0
  const taxAmount = subtotal * (normalizedTaxRate / 100)
  const total = subtotal + taxAmount

  return {
    subtotal,
    taxRate: normalizedTaxRate,
    taxAmount,
    total,
  }
}

export function InvoiceProvider({ children }) {
  const [invoices, setInvoices] = useState(parseStorage)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(invoices))
  }, [invoices])

  const value = useMemo(() => {
    const createInvoice = (payload) => {
      const items = (payload.items || [])
        .filter((item) => item.description && (Number(item.quantity) || 0) > 0)
        .map((item) => ({
          description: item.description.trim(),
          quantity: Number(item.quantity) || 0,
          price: Number(item.price) || 0,
        }))

      const summary = calculateSummary(items, payload.taxRate)
      const now = new Date()
      const id = `INV-${now.getTime().toString().slice(-8)}`

      const invoice = {
        id,
        createdAt: now.toISOString(),
        invoiceNumber: payload.invoiceNumber || id,
        sender: payload.sender,
        client: payload.client,
        notes: payload.notes || '',
        dueDate: payload.dueDate || '',
        currency: payload.currency || 'USD',
        items,
        ...summary,
      }

      setInvoices((prev) => [invoice, ...prev])
      return invoice
    }

    const getInvoiceById = (invoiceId) =>
      invoices.find((invoice) => invoice.id === invoiceId)

    const downloadById = (invoiceId) => {
      const invoice = getInvoiceById(invoiceId)
      if (!invoice) {
        return false
      }

      downloadInvoicePdf(invoice)
      return true
    }

    return {
      invoices,
      createInvoice,
      getInvoiceById,
      downloadById,
    }
  }, [invoices])

  return (
    <InvoiceContext.Provider value={value}>{children}</InvoiceContext.Provider>
  )
}

export function useInvoices() {
  const context = useContext(InvoiceContext)

  if (!context) {
    throw new Error('useInvoices must be used inside InvoiceProvider')
  }

  return context
}
