import { useEffect, useState, useRef, useCallback } from 'react'
import { flushSync } from 'react-dom'
import { Loader } from 'lucide-react'
import { loaderBus } from '../utils/loaderBus'

const MIN_MS = 2000

export default function PageLoader() {
  const [visible, setVisible]   = useState(false)
  const [progress, setProgress] = useState(0)
  const [fadeOut, setFadeOut]   = useState(false)
  const startedAt  = useRef(null)
  const timers     = useRef([])
  const touchFired = useRef(false)

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }, [])

  const triggerStopRef = useRef(null)
  triggerStopRef.current = () => {
    clearTimers()
    const elapsed   = Date.now() - (startedAt.current ?? Date.now())
    const remaining = Math.max(0, MIN_MS - elapsed)
    const t1 = setTimeout(() => setProgress(100),                      remaining)
    const t2 = setTimeout(() => setFadeOut(true),                      remaining + 200)
    const t3 = setTimeout(() => { setVisible(false); setProgress(0) }, remaining + 500)
    timers.current = [t1, t2, t3]
  }

  const showLoader = useCallback((href) => {
    if (!href || !href.startsWith('/') || href.startsWith('//')) return
    clearTimers()
    startedAt.current = Date.now()

    // ─── CLEF DU PROBLÈME MOBILE ───────────────────────────────────────────
    // flushSync force React à rendre le loader IMMÉDIATEMENT et de façon
    // SYNCHRONE, avant que React Router ait le temps de naviguer.
    // Sans ça, React 18 batchifie setVisible(true) avec les mises à jour
    // suivantes → le loader n'est jamais peint à l'écran sur mobile.
    // ────────────────────────────────────────────────────────────────────────
    flushSync(() => {
      setFadeOut(false)
      setProgress(0)
      setVisible(true)
    })

    // Progression étalée sur ~1800ms
    const t1 = setTimeout(() => setProgress(20),   80)
    const t2 = setTimeout(() => setProgress(40),   350)
    const t3 = setTimeout(() => setProgress(58),   700)
    const t4 = setTimeout(() => setProgress(72),  1100)
    const t5 = setTimeout(() => setProgress(83),  1500)
    const t6 = setTimeout(() => setProgress(90),  1800)
    timers.current = [t1, t2, t3, t4, t5, t6]

    loaderBus.onStop(() => triggerStopRef.current?.())
  }, [clearTimers])

  useEffect(() => {
    const handleTouch = (e) => {
      const anchor = e.target.closest('a[href], button[data-nav]')
      if (!anchor) return
      const href = anchor.getAttribute('href') || anchor.getAttribute('data-nav')
      if (href && href.startsWith('/') && !href.startsWith('//')) {
        touchFired.current = true
        showLoader(href)
      }
    }

    const handleClick = (e) => {
      if (touchFired.current) {
        touchFired.current = false
        return
      }
      const anchor = e.target.closest('a[href], button[data-nav]')
      if (!anchor) return
      showLoader(anchor.getAttribute('href'))
    }

    document.addEventListener('touchstart', handleTouch, { passive: true })
    document.addEventListener('click',      handleClick)
    return () => {
      document.removeEventListener('touchstart', handleTouch)
      document.removeEventListener('click',      handleClick)
    }
  }, [showLoader])

  if (!visible) return null

  return (
    <>
      {/* Voile couvrant */}
      <div
        className="fixed inset-0 z-[9998]"
        style={{
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          backgroundColor: 'rgba(245,247,250,0.85)',
          opacity: fadeOut ? 0 : 1,
          transition: 'opacity 400ms ease',
          pointerEvents: fadeOut ? 'none' : 'auto',
        }}
      />

      {/* Barre de progression */}
      <div
        className="fixed top-0 left-0 right-0 z-[9999] h-[3px]"
        style={{ opacity: fadeOut ? 0 : 1, transition: 'opacity 400ms ease' }}
      >
        <div className="absolute inset-0 bg-fassi-blue/10" />
        <div
          className="h-full bg-fassi-red"
          style={{
            width: `${progress}%`,
            transition: progress === 0 ? 'none' : 'width 400ms cubic-bezier(0.4,0,0.2,1)',
            boxShadow: '0 0 10px rgba(204,31,31,0.6)',
          }}
        />
        <div
          className="absolute top-0 h-full w-6 bg-white/60 blur-sm"
          style={{
            left: `calc(${progress}% - 12px)`,
            transition: progress === 0 ? 'none' : 'left 400ms cubic-bezier(0.4,0,0.2,1)',
          }}
        />
      </div>

      {/* Spinner centré */}
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
        style={{ opacity: fadeOut ? 0 : 1, transition: 'opacity 400ms ease' }}
      >
        <div className="flex items-center gap-2 sm:gap-3 bg-white/90 backdrop-blur-sm rounded-2xl px-4 sm:px-6 py-3 sm:py-4 shadow-xl">
          <Loader size={20} strokeWidth={2} className="text-fassi-red animate-spin shrink-0 sm:w-6 sm:h-6" />
          <span className="text-fassi-blue text-sm sm:text-base font-semibold tracking-wide">Chargement…</span>
        </div>
      </div>
    </>
  )
}


