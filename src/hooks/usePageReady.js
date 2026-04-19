import { useEffect } from 'react'
import { loaderBus } from '../utils/loaderBus'

export function usePageReady() {
  useEffect(() => {
    // requestAnimationFrame garantit que le DOM est peint avant de signaler "prêt"
    const raf = requestAnimationFrame(() => loaderBus.stop())
    return () => cancelAnimationFrame(raf)
  }, [])
}
