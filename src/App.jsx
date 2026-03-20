import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import DashboardPage from './pages/DashboardPage'
import InvoiceFormPage from './pages/InvoiceFormPage'
import InvoicesPage from './pages/InvoicesPage'
import InvoiceViewPage from './pages/InvoiceViewPage'

function linkClassName({ isActive }) {
  return [
    'relative px-4 py-2 text-sm font-medium transition-all duration-300',
    isActive
      ? 'text-blue-600 after:absolute after:bottom-0 after:left-4 after:right-4 after:h-0.5 after:bg-blue-600'
      : 'text-slate-600 hover:text-slate-900',
  ].join(' ')
}

function App() {
  return (
    <div className="min-h-screen bg-mesh text-slate-900">
      <header className="sticky top-0 z-20 border-b border-slate-200/50 bg-white/70 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-4 py-4 md:px-8">
          <NavLink to="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 text-white font-bold text-lg shadow-md">
              I$
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-bold text-slate-900">InvoiceFlow</p>
              <p className="text-xs text-slate-500">Professional Billing</p>
            </div>
          </NavLink>
          <nav className="flex items-center gap-1">
            <NavLink to="/" className={linkClassName} end>
              Dashboard
            </NavLink>
            <NavLink to="/invoice/new" className={linkClassName}>
              Create
            </NavLink>
            <NavLink to="/invoices" className={linkClassName}>
              Invoices
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 md:px-8 md:py-12">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/invoice/new" element={<InvoiceFormPage />} />
          <Route path="/invoices" element={<InvoicesPage />} />
          <Route path="/invoices/:invoiceId" element={<InvoiceViewPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <footer className="border-t border-slate-200/50 bg-white/50 backdrop-blur-sm">
        <div className="mx-auto w-full max-w-7xl px-4 py-6 md:px-8">
          <p className="text-center text-xs text-slate-500">
            © 2024 InvoiceFlow. Built for modern, professional invoicing workflows.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
