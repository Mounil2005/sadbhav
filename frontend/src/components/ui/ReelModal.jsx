import { useEffect, useRef, useCallback, useState } from 'react'
import { X, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react'
import { PortableText } from '@portabletext/react'
import { fetchPostBySlug } from '../../lib/queries'

function getYouTubeId(url) {
  if (!url) return null
  const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/]+)/)
  return m ? m[1] : null
}

const bodyComponents = {
  block: {
    normal: ({ children }) => <p className="text-white/80 text-sm leading-relaxed mb-3">{children}</p>,
    h2: ({ children }) => <h2 className="font-display font-semibold text-base text-white mt-5 mb-2">{children}</h2>,
    h3: ({ children }) => <h3 className="font-display font-semibold text-sm text-white mt-4 mb-1.5">{children}</h3>,
    blockquote: ({ children }) => <blockquote className="border-l-2 border-white/30 pl-3 my-3 italic text-white/60 text-xs">{children}</blockquote>,
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc list-outside pl-4 mb-3 space-y-1">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal list-outside pl-4 mb-3 space-y-1">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="text-white/80 text-sm leading-relaxed">{children}</li>,
    number: ({ children }) => <li className="text-white/80 text-sm leading-relaxed">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
  },
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
  const [panelOpen, setPanelOpen] = useState(false)
  const [body, setBody] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setPanelOpen(false)
    setBody(null)
  }, [index])

  const handleSeeMore = async () => {
    setPanelOpen(true)
    if (body !== null || loading) return
    setLoading(true)
    try {
      const post = await fetchPostBySlug(reel.slug)
      setBody(post?.body ?? [])
    } catch {
      setBody([])
    } finally {
      setLoading(false)
    }
  }

  const handleKey = useCallback((e) => {
    if (e.key === 'Escape') {
      if (panelOpen) setPanelOpen(false)
      else onClose()
    }
    if (!panelOpen && e.key === 'ArrowLeft') onPrev()
    if (!panelOpen && e.key === 'ArrowRight') onNext()
  }, [onClose, onPrev, onNext, panelOpen])

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
      {!panelOpen && index > 0 && (
        <button
          onClick={onPrev}
          className="absolute left-3 sm:left-5 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          aria-label="Previous"
        >
          <ChevronLeft size={22} />
        </button>
      )}

      {/* Next */}
      {!panelOpen && index < reels.length - 1 && (
        <button
          onClick={onNext}
          className="absolute right-3 sm:right-5 z-20 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          aria-label="Next"
        >
          <ChevronRight size={22} />
        </button>
      )}

      {/* Reel card */}
      <div
        className="relative bg-black rounded-2xl overflow-hidden shadow-2xl"
        style={{ height: 'min(88vh, 640px)', aspectRatio: '9/16' }}
      >
        {/* Video */}
        <div className="absolute inset-0">
          <VideoPlayer reel={reel} />
        </div>

        {/* Article panel — slides up over the video */}
        <div
          className="absolute inset-x-0 bottom-0 transition-transform duration-300 ease-in-out"
          style={{ transform: panelOpen ? 'translateY(0)' : 'translateY(100%)' }}
        >
          <div className="bg-black/95 rounded-t-2xl max-h-[48vh] flex flex-col">
            {/* Handle + collapse button */}
            <button
              onClick={() => setPanelOpen(false)}
              className="flex items-center justify-center gap-1.5 py-3 w-full text-white/40 hover:text-white/70 transition-colors"
            >
              <ChevronDown size={18} />
              <span className="text-xs font-sans">show less</span>
            </button>

            {/* Scrollable content */}
            <div className="overflow-y-auto px-5 pb-6 flex-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <span className="inline-block text-[10px] font-sans font-semibold px-2.5 py-0.5 rounded-full bg-white/15 text-white/70 mb-3">
                {reel.category}
              </span>
              <h2 className="font-display font-bold text-white text-base leading-snug mb-3">
                {reel.title}
              </h2>
              {loading && (
                <div className="flex justify-center py-6">
                  <div className="w-5 h-5 rounded-full border-2 border-white/20 border-t-white/60 animate-spin" />
                </div>
              )}
              {!loading && body && body.length > 0 && (
                <PortableText value={body} components={bodyComponents} />
              )}
              {!loading && body && body.length === 0 && (
                <p className="text-white/40 text-sm">{reel.excerpt}</p>
              )}
            </div>
          </div>
        </div>

        {/* Bottom caption — hidden when panel is open */}
        <div
          className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent pt-16 pb-4 px-4 transition-opacity duration-200"
          style={{ opacity: panelOpen ? 0 : 1, pointerEvents: panelOpen ? 'none' : 'auto' }}
        >
          <span className="inline-block text-[10px] font-sans font-semibold px-2.5 py-0.5 rounded-full bg-white/15 text-white/80 mb-2">
            {reel.category}
          </span>
          <p className="font-display font-bold text-white text-sm leading-snug mb-1.5">
            {reel.title}
          </p>
          {reel.excerpt && (
            <div className="text-white/70 text-xs leading-relaxed">
              <span className="line-clamp-2">{reel.excerpt}</span>
              <button
                onClick={handleSeeMore}
                className="text-white font-semibold ml-1"
              >
                ...see more
              </button>
            </div>
          )}
          <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/10">
            <span className="text-[10px] text-white/40 font-sans">{reel.author}</span>
            <span className="text-[10px] text-white/30 font-sans">{index + 1} / {reels.length}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
