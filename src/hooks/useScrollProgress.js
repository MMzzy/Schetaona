import { useEffect, useRef, useState } from 'react'

export function useScrollProgress(options = {}) {
  const { start = 0.8, end = 0.2 } = options
  const ref = useRef(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onScroll = () => {
      const rect = el.getBoundingClientRect()
      const windowH = window.innerHeight

      const enterPoint = windowH * start
      const exitPoint = windowH * end

      const raw = (enterPoint - rect.top) / (enterPoint - exitPoint)
      const clamped = Math.min(1, Math.max(0, raw))
      setProgress(clamped)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [start, end])

  return [ref, progress]
}