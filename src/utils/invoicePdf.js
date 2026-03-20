import { jsPDF } from 'jspdf'

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

export function downloadInvoicePdf(invoice) {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' })

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(24)
  doc.text('Invoice', 40, 56)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(11)
  doc.text(`Invoice No: ${invoice.invoiceNumber}`, 40, 82)
  doc.text(`Issued: ${formatDate(invoice.createdAt)}`, 40, 98)
  doc.text(`Due: ${formatDate(invoice.dueDate)}`, 40, 114)

  doc.setFont('helvetica', 'bold')
  doc.text('From', 40, 146)
  doc.text('Bill To', 320, 146)

  doc.setFont('helvetica', 'normal')
  const senderLines = [invoice.sender.name, invoice.sender.email, invoice.sender.address]
  const clientLines = [invoice.client.name, invoice.client.email, invoice.client.address]

  senderLines.filter(Boolean).forEach((line, index) => {
    doc.text(line, 40, 164 + index * 14)
  })

  clientLines.filter(Boolean).forEach((line, index) => {
    doc.text(line, 320, 164 + index * 14)
  })

  let y = 236
  doc.setFillColor(246, 248, 255)
  doc.rect(40, y - 18, 515, 22, 'F')
  doc.setFont('helvetica', 'bold')
  doc.text('Description', 44, y - 4)
  doc.text('Qty', 340, y - 4)
  doc.text('Rate', 390, y - 4)
  doc.text('Line Total', 470, y - 4)

  doc.setFont('helvetica', 'normal')
  invoice.items.forEach((item) => {
    y += 24
    const lineTotal = item.quantity * item.price
    doc.text(item.description, 44, y)
    doc.text(String(item.quantity), 340, y)
    doc.text(formatCurrency(item.price, invoice.currency), 390, y)
    doc.text(formatCurrency(lineTotal, invoice.currency), 470, y)
  })

  y += 34
  doc.setFont('helvetica', 'bold')
  doc.text(`Subtotal: ${formatCurrency(invoice.subtotal, invoice.currency)}`, 360, y)
  y += 18
  doc.text(`Tax (${invoice.taxRate}%): ${formatCurrency(invoice.taxAmount, invoice.currency)}`, 360, y)
  y += 18
  doc.setFontSize(13)
  doc.text(`Total: ${formatCurrency(invoice.total, invoice.currency)}`, 360, y)

  if (invoice.notes) {
    y += 34
    doc.setFontSize(11)
    doc.setFont('helvetica', 'bold')
    doc.text('Notes', 40, y)
    doc.setFont('helvetica', 'normal')
    doc.text(invoice.notes, 40, y + 16, { maxWidth: 515 })
  }

  const fileName = `${invoice.invoiceNumber || invoice.id}.pdf`
  doc.save(fileName)
}
