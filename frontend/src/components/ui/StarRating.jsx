export default function StarRating({ count = 5, max = 5 }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of ${max} stars`}>
      {Array.from({ length: max }, (_, i) => (
        <svg
          key={i}
          viewBox="0 0 12 12"
          fill="currentColor"
          className={`w-3.5 h-3.5 ${i < count ? 'text-amber-400' : 'text-warm-200'}`}
          aria-hidden="true"
        >
          <path d="M6 0l1.5 4.5H12L8.25 7.5 9.75 12 6 9 2.25 12l1.5-4.5L0 4.5h4.5z" />
        </svg>
      ))}
    </div>
  )
}
