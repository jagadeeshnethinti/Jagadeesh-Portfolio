import { useEffect, useRef } from 'react'

/**
 * Premium Architectural Background System
 * - Interactive Neural Constellation Canvas (nodes, dynamic filaments & cursor reaction)
 * - Morphing Aurora Glow Blobs (driven by active theme CSS variables --b1, --b2, --b3, --b4)
 * - Cybernetic Spatial Grid with perspective masking
 * - High-definition video layer with adaptive theme color tinting
 * - Motion toggle sync & performance optimization
 */
export default function VideoBackground() {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)

  // 1. Sync video playback with motion settings
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) v.pause()

    const sync = () => {
      const off = document.documentElement.getAttribute('data-motion') === 'off'
      if (off || reduce) v.pause()
      else v.play().catch(() => {})
    }
    const obs = new MutationObserver(sync)
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-motion'] })
    sync()
    return () => obs.disconnect()
  }, [])

  // High-performance interactive constellation canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId = null
    let width = 0
    let height = 0
    let mouseX = -1000
    let mouseY = -1000

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const onResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.scale(dpr, dpr)
    }
    onResize()
    window.addEventListener('resize', onResize, { passive: true })

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }
    window.addEventListener('mousemove', onMouseMove, { passive: true })

    // Generate balanced neural constellation nodes
    const NODE_COUNT = Math.min(Math.floor((width * height) / 28000), 55)
    const nodes = []
    for (let i = 0; i < NODE_COUNT; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.8 + 1.0,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.03,
      })
    }

    let lastTime = performance.now()

    const render = (time) => {
      const isMotionOff = document.documentElement.getAttribute('data-motion') === 'off'
      if (isMotionOff || reduce) {
        animId = requestAnimationFrame(render)
        return
      }

      const dt = Math.min((time - lastTime) / 1000, 0.1)
      lastTime = time

      ctx.clearRect(0, 0, width, height)

      // Get current theme colors from computed styles for dynamic live reactivity
      const style = getComputedStyle(document.documentElement)
      const particleColor = style.getPropertyValue('--accent-primary').trim() || '#2fe0ff'
      const secondaryColor = style.getPropertyValue('--accent-tertiary').trim() || '#7affd6'

      // Update and draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]

        // Gentle Brownian velocity drift
        n.x += n.vx * (dt * 60)
        n.y += n.vy * (dt * 60)

        // Screen boundary wrap
        if (n.x < -20) n.x = width + 20
        if (n.x > width + 20) n.x = -20
        if (n.y < -20) n.y = height + 20
        if (n.y > height + 20) n.y = -20

        // Subtle interactive mouse repulsion / parallax
        const dx = mouseX - n.x
        const dy = mouseY - n.y
        const dist = Math.hypot(dx, dy)
        if (dist < 140 && dist > 0) {
          const force = (1 - dist / 140) * 0.8
          n.x -= (dx / dist) * force * 1.5
          n.y -= (dy / dist) * force * 1.5
        }

        n.pulse += n.pulseSpeed
        const alpha = 0.32 + Math.sin(n.pulse) * 0.18

        // Draw node core
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2)
        ctx.fillStyle = particleColor
        ctx.globalAlpha = alpha
        ctx.fill()

        // Draw subtle node halo
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.radius * 2.6, 0, Math.PI * 2)
        ctx.fillStyle = secondaryColor
        ctx.globalAlpha = alpha * 0.22
        ctx.fill()

        // Draw inter-node neural connections
        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j]
          const cdx = n.x - n2.x
          const cdy = n.y - n2.y
          const cdist = Math.hypot(cdx, cdy)
          const maxDist = 125

          if (cdist < maxDist) {
            const lineAlpha = (1 - cdist / maxDist) * 0.14
            ctx.beginPath()
            ctx.moveTo(n.x, n.y)
            ctx.lineTo(n2.x, n2.y)
            ctx.strokeStyle = particleColor
            ctx.globalAlpha = lineAlpha
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }

      ctx.globalAlpha = 1
      animId = requestAnimationFrame(render)
    }

    animId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <div className="bg" aria-hidden="true">
      {/* 1. Animated Video Layer */}
      <video
        ref={videoRef}
        className="bg-video"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
      >
        <source src="/bg.mp4" type="video/mp4" />
      </video>

      {/* 2. Dynamic Aurora Blobs */}
      <div className="aurora">
        <div className="blob b1" />
        <div className="blob b2" />
        <div className="blob b3" />
        <div className="blob b4" />
      </div>

      {/* 3. Cybernetic Spatial Grid */}
      <div className="bg-grid" />

      {/* 4. Interactive Constellation Canvas */}
      <canvas ref={canvasRef} className="bg-canvas" />

      {/* 5. Adaptive Color Tint & Subtle Scrim */}
      <div className="bg-tint" />
      <div className="bg-overlay" />
    </div>
  )
}
