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

  if (reel.videoUrl) {
    return (
      <video
        key={reel.id}
        ref={videoRef}
        src={reel.videoUrl}
        className="w-full h-full object-contain"
        controls
        playsInline
        autoPlay
      />
    )
  }

  if (reel.videoFileUrl) {
    return (
      <video
        key={reel.id}
        ref={videoRef}
        src={reel.videoFileUrl}
        className="w-full h-full object-contain"
        controls
        playsInline
        autoPlay
      />
    )
  }

  return (
    <div className="w-full h-full flex items-center justify-center bg-navy-900 text-white/30 text-sm">
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
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 sm:p-6"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
        aria-label="Close"
      >
        <X size={18} />
      </button>

      {/* Prev */}
      {index > 0 && (
        <button
          onClick={onPrev}
          className="absolute left-3 sm:left-6 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          aria-label="Previous"
        >
          <ChevronLeft size={22} />
        </button>
      )}

      {/* Next */}
      {index < reels.length - 1 && (
        <button
          onClick={onNext}
          className="absolute right-3 sm:right-6 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          aria-label="Next"
        >
          <ChevronRight size={22} />
        </button>
      )}

      {/* Card */}
      <div className="flex flex-col md:flex-row bg-navy-900 rounded-2xl overflow-hidden w-full max-w-4xl max-h-[90vh] shadow-2xl">

        {/* Video — 9:16 */}
        <div className="flex-shrink-0 w-full md:w-auto md:h-[80vh] aspect-[9/16] bg-black">
          <VideoPlayer reel={reel} />
        </div>

        {/* Info */}
        <div className="flex flex-col p-6 md:p-8 md:w-72 lg:w-80 flex-shrink-0 overflow-y-auto">
          <span className="text-[10px] font-sans font-semibold px-2.5 py-1 rounded-full bg-medical-500/20 text-medical-300 self-start mb-4">
            {reel.category}
          </span>

          <h2 className="font-display font-bold text-white text-lg leading-snug mb-3">
            {reel.title}
          </h2>

          {reel.excerpt && (
            <p className="text-white/60 text-sm leading-relaxed mb-4">{reel.excerpt}</p>
          )}

          <div className="mt-auto pt-4 border-t border-white/10">
            <div className="text-xs text-white/40 font-sans">{reel.author}</div>
            <time className="text-[11px] text-white/30 font-sans">{reel.displayDate}</time>
          </div>

          {/* Counter */}
          <div className="text-[11px] text-white/30 font-sans mt-3 text-center">
            {index + 1} / {reels.length}
          </div>
        </div>
      </div>
    </div>
  )
}
