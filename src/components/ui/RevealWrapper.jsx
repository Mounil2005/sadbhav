import { useRef } from 'react'
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver'
import { cn } from '../../utils/cn'

const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default function RevealWrapper({
  children,
  delay = 0,
  className,
  as: Tag = 'div',
  direction = 'up',
}) {
  const ref = useRef(null)
  const visible = useIntersectionObserver(ref)

  if (prefersReducedMotion) {
    return <Tag className={className}>{children}</Tag>
  }

  const translateMap = {
    up: visible ? 'translate-y-0' : 'translate-y-5',
    down: visible ? 'translate-y-0' : '-translate-y-4',
    left: visible ? 'translate-x-0' : 'translate-x-4',
    right: visible ? 'translate-x-0' : '-translate-x-4',
    none: '',
  }

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
      className={cn(
        'transition-all duration-700 ease-out',
        visible ? 'opacity-100' : 'opacity-0',
        translateMap[direction],
        className
      )}
    >
      {children}
    </Tag>
  )
}
