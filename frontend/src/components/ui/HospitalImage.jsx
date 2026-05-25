import { cn } from '../../utils/cn'

const GRADIENTS = {
  navy: 'linear-gradient(160deg, #1a3a6b 0%, #1e5fa8 35%, #2c7bd4 65%, #1a3a6b 100%)',
  light: 'linear-gradient(160deg, #e0edf8 0%, #cde0f5 50%, #dbeafe 100%)',
  warm: 'linear-gradient(160deg, #f5f0eb 0%, #ede8e1 100%)',
}

const ASPECT_RATIOS = {
  hero: '4/5',
  portrait: '3/4',
  wide: '16/9',
  square: '1/1',
  cinema: '21/9',
  card: '4/3',
}

export default function HospitalImage({
  src = null,
  alt = '',
  aspect = 'portrait',
  gradient = 'navy',
  overlay = false,
  overlayOpacity = 0.25,
  className,
  children,
  onLoad,
}) {
  const aspectRatio = ASPECT_RATIOS[aspect] ?? aspect
  const bg = src ? undefined : (typeof gradient === 'string' && GRADIENTS[gradient] ? GRADIENTS[gradient] : gradient)

  return (
    <div
      className={cn('relative overflow-hidden', className)}
      style={{ aspectRatio }}
    >
      {/* Placeholder gradient — shown when no real image */}
      {!src && (
        <div
          className="absolute inset-0"
          style={{ background: bg }}
          aria-hidden="true"
        />
      )}

      {/* Real image — lazy-loaded, covers container */}
      {src && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={onLoad}
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
        />
      )}

      {/* Optional dark overlay — improves text legibility on photos */}
      {overlay && (
        <div
          className="absolute inset-0 bg-navy-900"
          style={{ opacity: overlayOpacity }}
          aria-hidden="true"
        />
      )}

      {/* Slot for floating cards, captions, badges */}
      {children && (
        <div className="relative z-10 h-full">{children}</div>
      )}
    </div>
  )
}

HospitalImage.gradients = GRADIENTS
HospitalImage.aspects = ASPECT_RATIOS
