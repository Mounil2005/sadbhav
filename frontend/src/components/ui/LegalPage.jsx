export function LegalPage({ title, lastUpdated, children }) {
  return (
    <div className="min-h-screen bg-white">

      {/* Document header */}
      <div className="border-b border-warm-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 py-6 sm:py-8">
          <a
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-sans font-medium text-warm-400 hover:text-navy-700 transition-colors mb-8 sm:mb-10"
          >
            ← Back to Home
          </a>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <div className="text-[10px] font-sans font-semibold tracking-[0.2em] uppercase text-warm-400 mb-2">
                Sadbhav Hospital — Legal Document
              </div>
              <h1 className="font-display font-bold text-2xl sm:text-3xl text-navy-900">
                {title}
              </h1>
            </div>
            {lastUpdated && (
              <div className="text-right flex-shrink-0">
                <div className="text-[10px] font-sans uppercase tracking-widest text-warm-400 mb-0.5">Last Updated</div>
                <div className="text-sm font-sans text-warm-600">{lastUpdated}</div>
              </div>
            )}
          </div>

          <div className="mt-6 h-px bg-gradient-to-r from-navy-800 via-navy-400 to-transparent" />
        </div>
      </div>

      {/* Document body */}
      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-10 sm:py-14">
        <div>{children}</div>
      </div>

    </div>
  )
}

export function LegalSection({ title, children }) {
  return (
    <section className="mb-10 sm:mb-12">
      <h2 className="font-sans font-semibold text-[13px] sm:text-sm text-navy-900 tracking-wide uppercase mb-4 pb-3 border-b border-warm-200">
        {title}
      </h2>
      <div className="space-y-3 text-navy-700 text-sm sm:text-[15px] leading-[1.8] font-body">
        {children}
      </div>
    </section>
  )
}

export function LegalList({ items }) {
  return (
    <ul className="space-y-2 mt-3 pl-1">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3 text-navy-700 text-sm sm:text-[15px] font-body leading-[1.8]">
          <span className="mt-[11px] w-1 h-1 rounded-full bg-warm-400 flex-shrink-0" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function LegalHighlight({ children }) {
  return (
    <div className="border border-warm-200 bg-warm-50 rounded-lg px-5 sm:px-6 py-4 sm:py-5 mb-10">
      <p className="text-navy-700 text-sm sm:text-[15px] font-body leading-[1.8]">{children}</p>
    </div>
  )
}
