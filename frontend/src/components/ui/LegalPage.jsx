export function LegalPage({ title, lastUpdated, children }) {
  return (
    <div className="min-h-screen bg-warm-50">
      <div className="bg-white border-b border-warm-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <a
            href="/"
            className="inline-flex items-center gap-2 text-sm font-sans font-medium text-warm-500 hover:text-medical-600 transition-colors"
          >
            ← Back to Home
          </a>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="mb-10">
          <span className="inline-block text-[11px] font-sans font-semibold tracking-widest uppercase text-medical-500 mb-3">
            Legal
          </span>
          <h1 className="font-display font-bold text-3xl sm:text-4xl text-navy-800 mb-3">
            {title}
          </h1>
          {lastUpdated && (
            <p className="text-sm text-warm-400 font-sans">Last updated: {lastUpdated}</p>
          )}
        </div>

        <div className="prose-legal">
          {children}
        </div>
      </div>
    </div>
  )
}

export function LegalSection({ title, children }) {
  return (
    <section className="mb-10">
      <h2 className="font-display font-semibold text-xl text-navy-800 mb-4 pb-3 border-b border-warm-200">
        {title}
      </h2>
      <div className="space-y-3 text-warm-600 text-sm sm:text-base leading-relaxed font-body">
        {children}
      </div>
    </section>
  )
}

export function LegalList({ items }) {
  return (
    <ul className="space-y-2 mt-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-warm-600 text-sm sm:text-base font-body">
          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-medical-400 flex-shrink-0" aria-hidden="true" />
          <span className="leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function LegalHighlight({ children }) {
  return (
    <div className="bg-medical-50 border-l-4 border-medical-400 rounded-r-xl px-5 py-4 my-5">
      <p className="text-navy-700 text-sm sm:text-base font-body leading-relaxed">{children}</p>
    </div>
  )
}
