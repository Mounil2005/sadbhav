import { useEffect, useRef, useCallback } from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

function getYouTubeId(url) {
  if (!url) return null
  const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/)
  return m ? m[1] : null
}

function VideoPlayer({ reel }) {
  const videoRef = useRef(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {})
    }
  }, [reel])

  const ytId = getYouTubeId(reel.videoUrl)

  if (ytId) {
    return (
      <iframe
        key={reel.id}
        src={`https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0`}
        className="w-full h-full"
        allow="autoplay; fullscreen"
        allowFullScreen
        title={reel.title}
      />
    )
  }

  const src = reel.videoUrl || reel.videoFileUrl
  if (src) {
    return (
      <video
        key={reel.id}
        ref={videoRef}
        src={src}
        style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
        controls
        playsInline
        autoPlay
      />
    )
  }

  return (
    <div className="w-full h-full flex items-center justify-center bg-black text-white/30 text-sm">
      No video available
    </div>
  )
}

export default function ReelModal({ reels, index, onClose, onPrev, onNext }) {
  const reel = reels[index]

  const handleKey = useCallback((e) => {
    if (e.key === 'Escape') onClose()
    if (e.key === 'ArrowLeft') onPrev()
    if (e.key === 'ArrowRight') onNext()
  }, [onClose, onPrev, onNext])

  useEffect(() => {
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [handleKey])

  if (!reel) return null

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 sm:p-6"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
        aria-label="Close"
      >
        <X size={18} />
      </button>

      {/* Prev */}
      {index > 0 && (
        <button
          onClick={onPrev}
          className="absolute left-3 sm:left-5 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          aria-label="Previous"
        >
          <ChevronLeft size={22} />
        </button>
      )}

      {/* Next */}
      {index < reels.length - 1 && (
        <button
          onClick={onNext}
          className="absolute right-3 sm:right-5 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          aria-label="Next"
        >
          <ChevronRight size={22} />
        </button>
      )}

      {/* Reel card — Instagram-style */}
      <div
        className="relative bg-black rounded-2xl overflow-hidden shadow-2xl"
        style={{ height: 'min(88vh, 640px)', aspectRatio: '9/16' }}
      >
        {/* Video fills card */}
        <div className="absolute inset-0">
          <VideoPlayer reel={reel} />
        </div>

        {/* Bottom info overlay */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-16 pb-4 px-4">
          {/* Category badge */}
          <span className="inline-block text-[10px] font-sans font-semibold px-2.5 py-0.5 rounded-full bg-white/15 text-white/80 mb-2">
            {reel.category}
          </span>

          {/* Title */}
          <p className="font-display font-bold text-white text-sm leading-snug mb-1.5">
            {reel.title}
          </p>

          {/* Description + see more */}
          {reel.excerpt && (
            <div className="text-white/70 text-xs leading-relaxed">
              <span className="line-clamp-2">{reel.excerpt}</span>
              <a
                href={`/blog/${reel.slug}`}
                className="text-white font-semibold ml-1 hover:underline"
              >
                ...see more
              </a>
            </div>
          )}

          {/* Author + counter */}
          <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/10">
            <span className="text-[10px] text-white/40 font-sans">{reel.author}</span>
            <span className="text-[10px] text-white/30 font-sans">{index + 1} / {reels.length}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
