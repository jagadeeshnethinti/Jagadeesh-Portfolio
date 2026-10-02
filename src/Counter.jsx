import { useEffect, useRef, useState } from 'react'

const easeOut = (t) => 1 - Math.pow(1 - t, 3)

/**
 * Animated count-up that runs once when it scrolls into view.
 * <Counter end={35} suffix="%" />
 */
export default function Counter({
  end,
  duration = 1500,
  decimals = 0,
  prefix = '',
  suffix = '',
  className,
}) {
  const ref = useRef(null)
  const reduceMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const [val, setVal] = useState(() => (reduceMotion ? end : 0))
  const started = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el || reduceMotion) return

    let raf
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || started.current) return
        started.current = true
        io.disconnect()
        let start
        const tick = (t) => {
          if (start === undefined) start = t
          const p = Math.min((t - start) / duration, 1)
          setVal(end * easeOut(p))
          if (p < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => {
      io.disconnect()
      if (raf) cancelAnimationFrame(raf)
    }
  }, [end, duration, reduceMotion])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {val.toFixed(decimals)}
      {suffix}
    </span>
  )
}
