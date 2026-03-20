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
  { label: 'Invoices Created', value: '1000+', color: 'from-blue-600 to-blue-700', icon: '📊' },
  { label: 'Avg. Setup Time', value: '2 min', color: 'from-emerald-600 to-emerald-700', icon: '⏱️' },
  { label: 'Client Coverage', value: '100%', color: 'from-purple-600 to-purple-700', icon: '✓' },
]

const pageDescription = "Professional invoice management system designed for freelancers and small businesses to streamline billing workflows."
const featuresDescription = "Powerful features designed to make invoice management effortless and professional"
const stepsDescription = "Get started in three simple steps and create your first professional invoice"

function DashboardPage() {
  return (
    <div className="space-y-12 animate-fade-in-up">
      <section className="relative overflow-hidden section-card">
        <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-blue-100 opacity-40 dark:bg-blue-900/40 blur-3xl" />
        <div className="absolute -bottom-40 left-0 h-72 w-72 rounded-full bg-purple-100 opacity-30 dark:bg-purple-900/30 blur-3xl" />

        <div className="relative grid gap-10 md:grid-cols-2 md:items-center">
          <div className="space-y-8">
            <div className="space-y-3">
              <div className="badge-primary animate-scale-in">
                <span className="h-2 w-2 rounded-full bg-blue-600 dark:bg-blue-400" />
                <span>Professional Invoice Suite</span>
              </div>
              <h1 className="text-4xl font-bold leading-tight text-slate-900 dark:text-slate-100 md:text-5xl">
                Billing Made Simple and Professional
              </h1>
            </div>
            <div className="space-y-2">
              <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                {pageDescription}
              </p>
              <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                Create, customize, and export professional invoices in minutes. Perfect for maintaining a polished brand image.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 pt-4">
              <Link
                to="/invoice/new"
                className="btn-primary animate-bounce-in"
              >
                + Create Invoice
              </Link>
              <Link
                to="/invoices"
                className="btn-secondary"
              >
                📋 View History
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            {features.map((feature, index) => (
              <div 
                key={feature.label} 
                className="glass-card rounded-xl p-5 animate-bounce-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <p className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 font-semibold">
                  {feature.icon} {feature.label}
                </p>
                <p className={`mt-2 text-3xl font-bold bg-linear-to-r ${feature.color} bg-clip-text text-transparent`}>
                  {feature.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">✨ Key Features</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">{featuresDescription}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {highlights.map((item, index) => (
            <article
              key={item.title}
              className="feature-card animate-bounce-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="mb-4 text-5xl animate-float">{item.icon}</div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100">🚀 Get Started</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">{stepsDescription}</p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {[
            { 
              step: '1', 
              icon: '📝',
              title: 'Fill Form', 
              desc: 'Enter your business and client details with all necessary information' 
            },
            { 
              step: '2', 
              icon: '📦',
              title: 'Add Items', 
              desc: 'Add products or services with rates and quantities to invoice' 
            },
            { 
              step: '3', 
              icon: '⬇️',
              title: 'Export PDF', 
              desc: 'Download and share professional PDF invoices with your clients' 
            },
          ].map((item) => (
            <div 
              key={item.step} 
              className="step-card animate-bounce-in"
              style={{ animationDelay: `${(Number(item.step) - 1) * 100}ms` }}
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-linear-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg">
                {item.step}
              </div>
              <div className="text-2xl mb-2">{item.icon}</div>
              <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default DashboardPage
