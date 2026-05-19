import { cn } from '../../utils/cn'

export default function SectionHeader({
  label,
  heading,
  subheading,
  align = 'left',
  theme = 'light',
  className,
}) {
  const isCenter = align === 'center'
  const isDark = theme === 'dark'

  return (
    <div className={cn(isCenter && 'text-center', className)}>
      {label && (
        <div
          className={cn(
            'text-xs font-sans font-semibold tracking-widest2 uppercase mb-3',
            isDark ? 'text-medical-300' : 'text-medical-500'
          )}
        >
          {label}
        </div>
      )}

      <div
        className={cn(
          'w-12 h-0.5 rounded bg-gradient-to-r from-medical-400 to-crimson-400 mb-5',
          isCenter && 'mx-auto'
        )}
      />

      {heading && (
        <h2
          className={cn(
            'font-display text-3xl md:text-4xl font-semibold',
            isDark ? 'text-white' : 'text-navy-700'
          )}
        >
          {heading}
        </h2>
      )}

      {subheading && (
        <p
          className={cn(
            'mt-4 text-lg leading-relaxed font-body',
            isDark ? 'text-white/50' : 'text-warm-500',
            isCenter && 'max-w-2xl mx-auto'
          )}
        >
          {subheading}
        </p>
      )}
    </div>
  )
}
