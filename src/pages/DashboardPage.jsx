import { Link } from 'react-router-dom'

const highlights = [
  {
    icon: '⚡',
    title: 'Lightning Fast',
    description: 'Create professional invoices in seconds with our intuitive form and smart defaults.',
  },
  {
    icon: '📊',
    title: 'Total Visibility',
    description: 'Track all your invoices in one place with real-time summaries and analytics.',
  },
  {
    icon: '📥',
    title: 'Instant Export',
    description: 'Generate PDF invoices with a single click, ready to share with clients.',
  },
]

const features = [
  { label: 'Invoices Created', value: '1000+', color: 'from-blue-600 to-blue-700' },
  { label: 'Avg. Setup Time', value: '2 min', color: 'from-emerald-600 to-emerald-700' },
  { label: 'Client Coverage', value: '100%', color: 'from-purple-600 to-purple-700' },
]

function DashboardPage() {
  return (
    <div className="space-y-10 animate-fade-in-up">
      <section className="relative overflow-hidden rounded-2xl card-elevated p-8 md:p-12">
        <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-blue-100 opacity-40 blur-3xl" />
        <div className="absolute -bottom-40 left-0 h-72 w-72 rounded-full bg-purple-100 opacity-30 blur-3xl" />

        <div className="relative grid gap-8 md:grid-cols-2 md:items-center">
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1">
                <span className="h-2 w-2 rounded-full bg-blue-600" />
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wide">
                  Professional Invoice Suite
                </span>
              </div>
              <h1 className="text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
                Billing Made Simple and Professional
              </h1>
            </div>
            <p className="text-lg leading-relaxed text-slate-600">
              Create, customize, and export professional invoices in minutes. Perfect for freelancers, 
              consultants, and small businesses who want to maintain a polished brand image.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link
                to="/invoice/new"
                className="btn-primary"
              >
                Create Invoice
              </Link>
              <Link
                to="/invoices"
                className="btn-secondary"
              >
                View History
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            {features.map((feature) => (
              <div key={feature.label} className="glass-card rounded-xl p-4">
                <p className="text-xs uppercase tracking-widest text-slate-500">
                  {feature.label}
                </p>
                <p className={`mt-1 text-2xl font-bold bg-gradient-to-r ${feature.color} bg-clip-text text-transparent`}>
                  {feature.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">Key Features</h2>
          <p className="text-slate-600">Everything you need for professional invoicing</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {highlights.map((item, index) => (
            <article
              key={item.title}
              className="glass-card rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-4 text-4xl">{item.icon}</div>
              <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">Get Started</h2>
          <p className="text-slate-600">Follow these simple steps to create your first invoice</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { step: '1', title: 'Fill Form', desc: 'Enter your business and client details' },
            { step: '2', title: 'Add Items', desc: 'Add products or services with rates' },
            { step: '3', title: 'Export PDF', desc: 'Download and share with your client' },
          ].map((item) => (
            <div key={item.step} className="card-elevated rounded-xl p-6 border-l-4 border-blue-600">
              <div className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-sm">
                {item.step}
              </div>
              <h3 className="font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default DashboardPage
