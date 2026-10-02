import { useEffect, useRef, useState } from 'react'

/**
 * Premium Interactive Cursor System
 * - Luminous core dot + smooth lerping glass follower ring
 * - Dynamic spotlight ambient glow tracking cursor
 * - Hover magnetism & expansion over interactive elements
 * - Click shockwave ripples
 * - Subtle stardust trail particles
 * - Automatically disabled on touch / mobile devices
 */
export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [hovered, setHovered] = useState(false)
  const [hoverText, setHoverText] = useState('')
  const [clicked, setClicked] = useState(false)
  const [enabled, setEnabled] = useState(true)
  const [ripples, setRipples] = useState([])

  useEffect(() => {
    // Check if device has a fine pointer (mouse/trackpad)
    const isTouch =
      window.matchMedia('(hover: none) and (pointer: coarse)').matches ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0

    if (isTouch) {
      setEnabled(false)
      return
    }

    let targetX = window.innerWidth / 2
    let targetY = window.innerHeight / 2
    let ringX = targetX
    let ringY = targetY
    let isMoving = false
    let lastSparkTime = 0

    // Canvas/DOM spark particles for subtle stardust trail
    const sparks = []
    const maxSparks = 14

    const updateMouse = (e) => {
      targetX = e.clientX
      targetY = e.clientY
      isMoving = true

      // Update global CSS variables for ambient card illumination
      document.documentElement.style.setProperty('--mouse-x', `${targetX}px`)
      document.documentElement.style.setProperty('--mouse-y', `${targetY}px`)

      // Snap the core dot directly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`
      }

      // Spawn stardust spark on swift movement (throttled)
      const now = performance.now()
      if (now - lastSparkTime > 55 && sparks.length < maxSparks) {
        lastSparkTime = now
        createSpark(targetX, targetY)
      }
    }

    const createSpark = (x, y) => {
      const container = document.getElementById('cursor-particles')
      if (!container) return

      const spark = document.createElement('span')
      spark.className = 'cursor-spark'
      const size = Math.random() * 4 + 2
      spark.style.width = `${size}px`
      spark.style.height = `${size}px`
      spark.style.left = `${x}px`
      spark.style.top = `${y}px`
      const vx = (Math.random() - 0.5) * 30
      const vy = (Math.random() - 0.5) * 30 - 10
      spark.style.setProperty('--vx', `${vx}px`)
      spark.style.setProperty('--vy', `${vy}px`)

      container.appendChild(spark)
      sparks.push(spark)

      setTimeout(() => {
        spark.remove()
        const idx = sparks.indexOf(spark)
        if (idx !== -1) sparks.splice(idx, 1)
      }, 550)
    }

    // Smooth RAF loop for the follower ring (lerp smoothing)
    let rafId
    const loop = () => {
      // Ease toward target
      ringX += (targetX - ringX) * 0.18
      ringY += (targetY - ringY) * 0.18

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`
      }

      rafId = requestAnimationFrame(loop)
    }
    rafId = requestAnimationFrame(loop)

    // Interactive element hover detection
    const handleMouseOver = (e) => {
      const target = e.target.closest(
        'a, button, [role="button"], .project, .viz-card, .skill-card, .cred, .swatch, .theme-toggle, .motion-toggle, .nav-cta, input, textarea'
      )
      if (target) {
        setHovered(true)
        if (target.classList.contains('project') || target.closest('.project')) {
          setHoverText('VIEW')
        } else if (target.classList.contains('store-badge')) {
          setHoverText('OPEN')
        } else {
          setHoverText('')
        }
      } else {
        setHovered(false)
        setHoverText('')
      }
    }

    const handleMouseDown = () => setClicked(true)
    const handleMouseUp = () => setClicked(false)

    // Click shockwave ripple
    const handleClick = (e) => {
      const id = Date.now() + Math.random()
      const newRipple = { id, x: e.clientX, y: e.clientY }
      setRipples((prev) => [...prev.slice(-4), newRipple])
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id))
      }, 600)
    }

    // Hide cursor when leaving window
    const handleMouseLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = '0'
      if (ringRef.current) ringRef.current.style.opacity = '0'
    }
    const handleMouseEnter = () => {
      if (dotRef.current) dotRef.current.style.opacity = '1'
      if (ringRef.current) ringRef.current.style.opacity = '1'
    }

    window.addEventListener('mousemove', updateMouse, { passive: true })
    window.addEventListener('mouseover', handleMouseOver, { passive: true })
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    window.addEventListener('click', handleClick)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', handleMouseEnter)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', updateMouse)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
      window.removeEventListener('click', handleClick)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', handleMouseEnter)
    }
  }, [])

  if (!enabled) return null

  return (
    <>
      {/* Screen-wide ambient spotlight following cursor */}
      <div className="cursor-spotlight" />

      {/* Trailing stardust particle container */}
      <div id="cursor-particles" className="cursor-particles" />

      {/* Click ripples */}
      {ripples.map((r) => (
        <span
          key={r.id}
          className="cursor-ripple"
          style={{ left: `${r.x}px`, top: `${r.y}px` }}
        />
      ))}

      {/* Follower ring */}
      <div
        ref={ringRef}
        className={`cursor-ring ${hovered ? 'hover' : ''} ${
          clicked ? 'click' : ''
        } ${hoverText ? 'has-text' : ''}`}
      >
        {hoverText && <span className="cursor-label">{hoverText}</span>}
      </div>

      {/* Center sharp core dot */}
      <div
        ref={dotRef}
        className={`cursor-dot ${hovered ? 'hover' : ''} ${clicked ? 'click' : ''}`}
      />
    </>
  )
}
