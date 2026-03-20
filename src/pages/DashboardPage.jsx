import { Link } from 'react-router-dom'

const highlights = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
    title: 'Lightning Fast',
    description: 'Create professional invoices in seconds with our intuitive form and smart defaults.',
    iconClass: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-950/50 border-indigo-100 dark:border-indigo-900/50',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
    title: 'Total Visibility',
    description: 'Track all your invoices in one place with real-time summaries and analytics.',
    iconClass: 'text-violet-500 bg-violet-50 dark:bg-violet-950/50 border-violet-100 dark:border-violet-900/50',
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
      </svg>
    ),
    title: 'Instant Export',
    description: 'Generate PDF invoices with a single click, ready to share with clients.',
    iconClass: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 border-emerald-100 dark:border-emerald-900/50',
  },
]

const stats = [
  { label: 'Invoices Generated', value: '1,000+' },
  { label: 'Avg. Setup Time',    value: '2 min'  },
  { label: 'Client Satisfaction', value: '100%'  },
]

const steps = [
  {
    num: '01',
    title: 'Fill the Form',
    desc: 'Enter your business and client details with all necessary billing information.',
  },
  {
    num: '02',
    title: 'Add Line Items',
    desc: 'Add products or services with quantities and rates for a complete breakdown.',
  },
  {
    num: '03',
    title: 'Export & Send',
    desc: 'Download a polished PDF invoice and share it directly with your client.',
  },
]

function DashboardPage() {
  return (
    <div className="space-y-16 animate-fade-in-up">

      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="grid gap-10 lg:grid-cols-2 items-center pt-2 pb-2">
        <div className="space-y-7">
          <span className="badge-primary animate-scale-in">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400 inline-block" />
            Professional Invoice Suite
          </span>

          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-[1.1] tracking-tight text-[var(--text-primary)]">
              Billing Made{' '}
              <span className="font-display italic bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-500 bg-clip-text text-transparent">
                Simple.
              </span>
            </h1>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed max-w-[440px]">
              Professional invoice management for freelancers and small businesses.
              Create, track, and export in minutes — no learning curve.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 pt-1">
            <Link to="/invoice/new" className="btn-primary">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Create Invoice
            </Link>
            <Link to="/invoices" className="btn-secondary">
              View History
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Stat cards */}
        <div className="flex flex-col gap-3">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="card flex items-center justify-between px-6 py-5 animate-bounce-in"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <p className="text-xs font-bold uppercase tracking-[0.08em] text-[var(--text-muted)]">
                {s.label}
              </p>
              <span className="text-2xl font-extrabold bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent tabular-nums">
                {s.value}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Features ────────────────────────────────────────── */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">Key Features</h2>
          <p className="text-[var(--text-secondary)] mt-1.5 text-sm">Everything you need for professional billing</p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {highlights.map((item, i) => (
            <article
              key={item.title}
              className="feature-card animate-bounce-in"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl border mb-5 ${item.iconClass}`}>
                {item.icon}
              </div>
              <h3 className="font-bold text-base text-[var(--text-primary)] mb-2">{item.title}</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── Steps ───────────────────────────────────────────── */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-[var(--text-primary)]">Get Started in 3 Steps</h2>
          <p className="text-[var(--text-secondary)] mt-1.5 text-sm">From zero to professional invoice in under 2 minutes</p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {steps.map((item, i) => (
            <div
              key={item.num}
              className="step-card animate-bounce-in"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <span className="absolute top-3 right-4 text-5xl font-extrabold text-[var(--border)] select-none leading-none pointer-events-none">
                {item.num}
              </span>
              <div className="relative">
                <div className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 text-white font-bold text-sm mb-4">
                  {item.num}
                </div>
                <h3 className="font-bold text-base text-[var(--text-primary)] mb-2">{item.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ─────────────────────────────────────────────── */}
      <section className="card-accent rounded-2xl px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl font-bold text-[var(--text-primary)]">Ready to get paid faster?</h3>
          <p className="text-sm text-[var(--text-secondary)] mt-1.5">Create your first professional invoice right now.</p>
        </div>
        <Link to="/invoice/new" className="btn-primary shrink-0">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Create Invoice
        </Link>
      </section>

    </div>
  )
}

export default DashboardPage