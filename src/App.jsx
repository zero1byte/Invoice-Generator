import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import { useTheme } from './context/ThemeContext'
import DashboardPage from './pages/DashboardPage'
import InvoiceFormPage from './pages/InvoiceFormPage'
import InvoicesPage from './pages/InvoicesPage'
import InvoiceViewPage from './pages/InvoiceViewPage'

function linkClassName({ isActive }) {
  return [
    'relative px-4 py-2 text-sm font-medium transition-all duration-300',
    isActive
      ? 'text-blue-600 dark:text-blue-400 after:absolute after:bottom-0 after:left-4 after:right-4 after:h-0.5 after:bg-blue-600 dark:after:bg-blue-400'
      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200',
  ].join(' ')
}

function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen bg-mesh dark:bg-mesh-dark text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <header className="sticky top-0 z-20 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm dark:shadow-lg transition-all duration-300">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-4 py-3 md:px-8">
          <NavLink to="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
            <img src="/logo.png" alt="InvoiceFlow" className="h-10 w-10 rounded-lg shadow-md object-cover" />
            <div className="hidden sm:block">
              <p className="text-sm font-bold text-slate-900 dark:text-slate-100">InvoiceFlow</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Professional Billing</p>
            </div>
          </NavLink>
          <nav className="flex items-center gap-6">
            <div className="flex items-center gap-1">
              <NavLink to="/" className={linkClassName} end>
                Dashboard
              </NavLink>
              <NavLink to="/invoice/new" className={linkClassName}>
                Create
              </NavLink>
              <NavLink to="/invoices" className={linkClassName}>
                Invoices
              </NavLink>
            </div>
            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-lg px-3 py-2 text-lg font-semibold transition-all duration-300 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
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

      <footer className="border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 transition-colors duration-300">
        <div className="mx-auto w-full max-w-7xl px-4 py-6 md:px-8">
          <p className="text-center text-xs text-slate-500 dark:text-slate-400">
            © 2024 InvoiceFlow. Built for modern, professional invoicing workflows.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
