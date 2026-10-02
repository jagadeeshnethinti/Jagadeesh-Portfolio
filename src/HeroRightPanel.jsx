import { useEffect, useRef, useState } from 'react'
import {
  GamepadIcon,
  VolumeOnIcon,
  VolumeOffIcon,
  PlayMiniIcon,
  RefreshMiniIcon,
} from './Icons.jsx'

/**
 * Premium Hero Right Panel
 * Dual Cyber Games (Top-aligned, No image):
 * Game 1: "Core Defense" — Guide the quantum interceptor core to capture cyan & gold data packets while dodging red anomalies.
 * Game 2: "Laser Blaster" — Aim and fire high-frequency plasma laser pulses to blast incoming cyber drones before they breach the core.
 */
export default function HeroRightPanel() {
  const [activeGame, setActiveGame] = useState('core') // 'core' | 'laser'
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('cyber-dual-high-score') || '0', 10)
  })
  const [multiplier, setMultiplier] = useState(1)
  const [shields, setShields] = useState(3)
  const [soundOn, setSoundOn] = useState(false)
  const [gameState, setGameState] = useState('ready') // 'ready' | 'playing' | 'gameover'

  const canvasRef = useRef(null)
  const animRef = useRef(null)
  const audioCtxRef = useRef(null)

  // Web Audio Synthesizer
  const playSound = (type = 'sine', freq = 587, duration = 0.12, endFreq = null) => {
    if (!soundOn) return
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)()
      }
      const ctx = audioCtxRef.current
      if (ctx.state === 'suspended') ctx.resume()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = type
      osc.frequency.setValueAtTime(freq, ctx.currentTime)
      if (endFreq !== null) {
        osc.frequency.exponentialRampToValueAtTime(Math.max(10, endFreq), ctx.currentTime + duration)
      }
      gain.gain.setValueAtTime(0.08, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)
      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start()
      osc.stop(ctx.currentTime + duration)
    } catch {}
  }

  // Handle Game Loops
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    const onResize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = rect.width
      height = rect.height
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    onResize()
    window.addEventListener('resize', onResize)

    // Player position
    let playerX = width / 2
    let playerY = height * 0.78
    let targetX = playerX
    let targetY = playerY

    // Lasers array (for Game 2)
    const lasers = []
    let lastLaserFire = 0

    // Targets / Items array
    let items = []
    let particles = []
    let spawnTimer = 0
    let lastTime = performance.now()
    let currentScore = score
    let currentMultiplier = 1
    let currentShields = shields
    let comboStreak = 0

    const onPointerMove = (e) => {
      const r = canvas.getBoundingClientRect()
      targetX = Math.max(16, Math.min(width - 16, e.clientX - r.left))
      targetY = Math.max(16, Math.min(height - 16, e.clientY - r.top))
    }

    const onPointerDown = (e) => {
      const r = canvas.getBoundingClientRect()
      targetX = Math.max(16, Math.min(width - 16, e.clientX - r.left))
      targetY = Math.max(16, Math.min(height - 16, e.clientY - r.top))

      if (activeGame === 'laser' && gameState === 'playing') {
        fireLaser(targetX, targetY)
      }
    }

    const fireLaser = (tx, ty) => {
      const now = performance.now()
      if (now - lastLaserFire < 120) return
      lastLaserFire = now

      // Dual cannons at bottom
      const leftCannonX = width * 0.35
      const rightCannonX = width * 0.65
      const cannonY = height - 12

      // Calculate angles
      const angL = Math.atan2(ty - cannonY, tx - leftCannonX)
      const angR = Math.atan2(ty - cannonY, tx - rightCannonX)
      const spd = 450

      lasers.push({
        x: leftCannonX,
        y: cannonY,
        vx: Math.cos(angL) * spd,
        vy: Math.sin(angL) * spd,
        life: 0.9,
      })
      lasers.push({
        x: rightCannonX,
        y: cannonY,
        vx: Math.cos(angR) * spd,
        vy: Math.sin(angR) * spd,
        life: 0.9,
      })

      playSound('sawtooth', 880, 0.1, 240) // Laser sound
    }

    canvas.addEventListener('pointermove', onPointerMove)
    canvas.addEventListener('pointerdown', onPointerDown)

    // Render loop
    const loop = (time) => {
      const dt = Math.min((time - lastTime) / 1000, 0.1)
      lastTime = time

      ctx.clearRect(0, 0, width, height)

      // Get theme colors from CSS
      const docStyle = getComputedStyle(document.documentElement)
      const themePrimary = docStyle.getPropertyValue('--accent-primary').trim() || '#2fe0ff'
      const themeSecondary = docStyle.getPropertyValue('--accent-secondary').trim() || '#5f9bff'
      const themeTertiary = docStyle.getPropertyValue('--accent-tertiary').trim() || '#7affd6'

      // 1. Draw Cyber Dark Background (No Image)
      ctx.save()
      const bgGrad = ctx.createRadialGradient(
        width / 2, height / 2, 20,
        width / 2, height / 2, Math.max(width, height) * 0.75
      )
      bgGrad.addColorStop(0, 'rgba(10, 20, 38, 0.95)')
      bgGrad.addColorStop(0.65, 'rgba(5, 10, 22, 0.98)')
      bgGrad.addColorStop(1, 'rgba(2, 5, 12, 1)')
      ctx.fillStyle = bgGrad
      ctx.fillRect(0, 0, width, height)

      // Futuristic Cyber Grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.045)'
      ctx.lineWidth = 1
      ctx.beginPath()
      for (let x = 0; x < width; x += 36) {
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
      }
      for (let y = 0; y < height; y += 36) {
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
      }
      ctx.stroke()

      // High-tech Corner Accent Brackets
      ctx.strokeStyle = themePrimary
      ctx.lineWidth = 2
      // Top-Left
      ctx.beginPath()
      ctx.moveTo(12, 24)
      ctx.lineTo(12, 12)
      ctx.lineTo(24, 12)
      ctx.stroke()
      // Top-Right
      ctx.beginPath()
      ctx.moveTo(width - 24, 12)
      ctx.lineTo(width - 12, 12)
      ctx.lineTo(width - 12, 24)
      ctx.stroke()
      // Bottom-Left
      ctx.beginPath()
      ctx.moveTo(12, height - 24)
      ctx.lineTo(12, height - 12)
      ctx.lineTo(24, height - 12)
      ctx.stroke()
      // Bottom-Right
      ctx.beginPath()
      ctx.moveTo(width - 24, height - 12)
      ctx.lineTo(width - 12, height - 12)
      ctx.lineTo(width - 12, height - 24)
      ctx.stroke()
      ctx.restore()

      // ---------------- GAME 1: CORE DEFENSE ----------------
      if (activeGame === 'core') {
        playerX += (targetX - playerX) * 0.22
        playerY += (targetY - playerY) * 0.22

        if (gameState === 'playing') {
          spawnTimer += dt
          if (spawnTimer > 0.42) {
            spawnTimer = 0
            const isGlitch = Math.random() < 0.24
            const isBonus = !isGlitch && Math.random() < 0.22
            items.push({
              x: Math.random() * (width - 44) + 22,
              y: -10,
              vy: 95 + Math.random() * 75,
              type: isGlitch ? 'glitch' : isBonus ? 'bonus' : 'packet',
              radius: isBonus ? 9 : isGlitch ? 8 : 7,
              pulse: 0,
            })
          }

          // Update & draw items
          for (let i = items.length - 1; i >= 0; i--) {
            const it = items[i]
            it.y += it.vy * dt
            it.pulse += dt * 5

            // Draw item
            ctx.save()
            ctx.beginPath()
            ctx.arc(it.x, it.y, it.radius, 0, Math.PI * 2)
            if (it.type === 'glitch') {
              ctx.fillStyle = '#ef4444'
              ctx.shadowColor = '#ef4444'
              ctx.shadowBlur = 10
            } else if (it.type === 'bonus') {
              ctx.fillStyle = '#fbbf24'
              ctx.shadowColor = '#fbbf24'
              ctx.shadowBlur = 14
            } else {
              ctx.fillStyle = themePrimary
              ctx.shadowColor = themePrimary
              ctx.shadowBlur = 10
            }
            ctx.fill()

            // Glowing ring
            ctx.beginPath()
            ctx.arc(it.x, it.y, it.radius + 3 + Math.sin(it.pulse) * 1.5, 0, Math.PI * 2)
            ctx.strokeStyle = it.type === 'glitch' ? 'rgba(239, 68, 68, 0.5)' : 'rgba(255, 255, 255, 0.45)'
            ctx.lineWidth = 1
            ctx.stroke()
            ctx.restore()

            // Collision with player core
            const dist = Math.hypot(it.x - playerX, it.y - playerY)
            if (dist < it.radius + 14) {
              if (it.type === 'glitch') {
                currentShields--
                setShields(currentShields)
                playSound('sawtooth', 180, 0.25)
                items.splice(i, 1)
                if (currentShields <= 0) {
                  setGameState('gameover')
                }
              } else {
                const pts = it.type === 'bonus' ? 250 : 100
                currentScore += pts * currentMultiplier
                comboStreak++
                if (comboStreak % 5 === 0 && currentMultiplier < 5) {
                  currentMultiplier++
                  setMultiplier(currentMultiplier)
                }
                setScore(currentScore)
                playSound('sine', it.type === 'bonus' ? 880 : 587, 0.14)

                // Bursts
                for (let p = 0; p < 10; p++) {
                  const ang = Math.random() * Math.PI * 2
                  const spd = 60 + Math.random() * 90
                  particles.push({
                    x: it.x,
                    y: it.y,
                    vx: Math.cos(ang) * spd,
                    vy: Math.sin(ang) * spd,
                    life: 1,
                    decay: 1.1,
                    size: Math.random() * 2.5 + 1.5,
                    color: it.type === 'bonus' ? '#fbbf24' : themePrimary,
                  })
                }
                items.splice(i, 1)
              }
              continue
            }

            if (it.y > height + 20) {
              items.splice(i, 1)
            }
          }
        }

        // Draw Player Interceptor Core
        ctx.save()
        // Core outer glow
        ctx.beginPath()
        ctx.arc(playerX, playerY, 20, 0, Math.PI * 2)
        ctx.strokeStyle = themePrimary
        ctx.lineWidth = 1.5
        ctx.shadowColor = themePrimary
        ctx.shadowBlur = 15
        ctx.stroke()

        // Core inner pulse
        ctx.beginPath()
        ctx.arc(playerX, playerY, 9, 0, Math.PI * 2)
        ctx.fillStyle = '#ffffff'
        ctx.shadowColor = '#ffffff'
        ctx.shadowBlur = 10
        ctx.fill()
        ctx.restore()
      }

      // ---------------- GAME 2: LASER BLASTER ----------------
      if (activeGame === 'laser') {
        if (gameState === 'playing') {
          spawnTimer += dt
          if (spawnTimer > 0.4) {
            spawnTimer = 0
            const isBoss = Math.random() < 0.2
            items.push({
              x: Math.random() * (width - 50) + 25,
              y: -12,
              vy: 65 + Math.random() * 55,
              hp: isBoss ? 2 : 1,
              maxHp: isBoss ? 2 : 1,
              radius: isBoss ? 13 : 9,
              pulse: 0,
            })
          }

          // Update lasers
          for (let i = lasers.length - 1; i >= 0; i--) {
            const l = lasers[i]
            l.x += l.vx * dt
            l.y += l.vy * dt
            l.life -= dt

            // Draw laser bolt
            ctx.save()
            ctx.beginPath()
            ctx.arc(l.x, l.y, 3, 0, Math.PI * 2)
            ctx.fillStyle = '#ffffff'
            ctx.shadowColor = themePrimary
            ctx.shadowBlur = 12
            ctx.fill()

            ctx.strokeStyle = themePrimary
            ctx.lineWidth = 2
            ctx.beginPath()
            ctx.moveTo(l.x, l.y)
            ctx.lineTo(l.x - (l.vx * 0.04), l.y - (l.vy * 0.04))
            ctx.stroke()
            ctx.restore()

            // Check collision with targets
            let hit = false
            for (let j = items.length - 1; j >= 0; j--) {
              const it = items[j]
              const dist = Math.hypot(it.x - l.x, it.y - l.y)
              if (dist < it.radius + 6) {
                hit = true
                it.hp--
                if (it.hp <= 0) {
                  const pts = it.maxHp > 1 ? 250 : 150
                  currentScore += pts * currentMultiplier
                  comboStreak++
                  if (comboStreak % 5 === 0 && currentMultiplier < 5) {
                    currentMultiplier++
                    setMultiplier(currentMultiplier)
                  }
                  setScore(currentScore)
                  playSound('triangle', 659, 0.16)

                  // Explosion particles
                  for (let p = 0; p < 14; p++) {
                    const ang = Math.random() * Math.PI * 2
                    const spd = 70 + Math.random() * 110
                    particles.push({
                      x: it.x,
                      y: it.y,
                      vx: Math.cos(ang) * spd,
                      vy: Math.sin(ang) * spd,
                      life: 1,
                      decay: 1.2,
                      size: Math.random() * 2.8 + 1.2,
                      color: it.maxHp > 1 ? '#fbbf24' : themePrimary,
                    })
                  }
                  items.splice(j, 1)
                } else {
                  playSound('sine', 440, 0.08)
                }
                break
              }
            }

            if (hit || l.life <= 0 || l.y < -10 || l.x < -10 || l.x > width + 10) {
              lasers.splice(i, 1)
            }
          }

          // Update drones
          for (let i = items.length - 1; i >= 0; i--) {
            const it = items[i]
            it.y += it.vy * dt
            it.pulse += dt * 4

            // Draw drone
            ctx.save()
            ctx.beginPath()
            ctx.arc(it.x, it.y, it.radius, 0, Math.PI * 2)
            ctx.fillStyle = it.maxHp > 1 ? '#f59e0b' : '#38bdf8'
            ctx.shadowColor = it.maxHp > 1 ? '#f59e0b' : '#38bdf8'
            ctx.shadowBlur = 12
            ctx.fill()

            // Hexagon or ring
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)'
            ctx.lineWidth = 1.2
            ctx.beginPath()
            ctx.arc(it.x, it.y, it.radius + 3, 0, Math.PI * 2)
            ctx.stroke()
            ctx.restore()

            // Breach bottom boundary
            if (it.y > height - 15) {
              currentShields--
              setShields(currentShields)
              playSound('sawtooth', 160, 0.25)
              items.splice(i, 1)
              if (currentShields <= 0) {
                setGameState('gameover')
              }
            }
          }
        }

        // Draw Cannons at bottom
        ctx.save()
        const leftCannonX = width * 0.35
        const rightCannonX = width * 0.65
        const cannonY = height - 10

        ctx.fillStyle = themePrimary
        ctx.shadowColor = themePrimary
        ctx.shadowBlur = 14
        ctx.beginPath()
        ctx.arc(leftCannonX, cannonY, 6, 0, Math.PI * 2)
        ctx.arc(rightCannonX, cannonY, 6, 0, Math.PI * 2)
        ctx.fill()

        // Crosshair at target
        ctx.strokeStyle = themeSecondary
        ctx.lineWidth = 1.5
        ctx.beginPath()
        ctx.arc(targetX, targetY, 12, 0, Math.PI * 2)
        ctx.moveTo(targetX - 16, targetY)
        ctx.lineTo(targetX + 16, targetY)
        ctx.moveTo(targetX, targetY - 16)
        ctx.lineTo(targetX, targetY + 16)
        ctx.stroke()
        ctx.restore()
      }

      // Draw Stardust Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const pt = particles[i]
        pt.x += pt.vx * dt
        pt.y += pt.vy * dt
        pt.life -= dt * pt.decay

        if (pt.life <= 0) {
          particles.splice(i, 1)
          continue
        }

        ctx.beginPath()
        ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2)
        ctx.fillStyle = pt.color
        ctx.globalAlpha = Math.max(0, pt.life)
        ctx.fill()
      }

      ctx.globalAlpha = 1
      animRef.current = requestAnimationFrame(loop)
    }

    animRef.current = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', onResize)
      canvas.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerdown', onPointerDown)
    }
  }, [activeGame, gameState, soundOn])

  // Start game handler
  const startGame = () => {
    setScore(0)
    setMultiplier(1)
    setShields(3)
    setGameState('playing')
  }

  // Update high score
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score)
      localStorage.setItem('cyber-dual-high-score', String(score))
    }
  }, [score, highScore])

  return (
    <div className="hero-console-glass">
      {/* Console Top Header */}
      <div className="console-head">
        <div className="console-status">
          <span className="console-pulse" />
          <span className="console-tag">60 FPS CYBER ARCADE</span>
        </div>

        {/* Exactly 2 Games Selector */}
        <div className="console-mode-toggle">
          <button
            type="button"
            className={`mode-btn ${activeGame === 'core' ? 'active' : ''}`}
            onClick={() => {
              setActiveGame('core')
              if (gameState === 'ready') startGame()
            }}
          >
            <GamepadIcon size={14} style={{ marginRight: '5px' }} />
            <span>Core Defense</span>
          </button>
          <button
            type="button"
            className={`mode-btn ${activeGame === 'laser' ? 'active' : ''}`}
            onClick={() => {
              setActiveGame('laser')
              if (gameState === 'ready') startGame()
            }}
          >
            <GamepadIcon size={14} style={{ marginRight: '5px' }} />
            <span>Laser Blaster</span>
          </button>
        </div>

        {/* Audio Toggle */}
        <button
          type="button"
          className={`sound-toggle-btn ${soundOn ? 'on' : ''}`}
          onClick={() => setSoundOn((s) => !s)}
          title={soundOn ? 'Mute sound' : 'Enable audio chimes'}
          aria-label="Toggle sound"
        >
          {soundOn ? <VolumeOnIcon size={16} /> : <VolumeOffIcon size={16} />}
        </button>
      </div>

      {/* Main Interactive Game Screen */}
      <div className="console-screen">
        <canvas ref={canvasRef} className="console-canvas" />

        {/* In-Game Overlay HUD */}
        {gameState === 'playing' && (
          <div className="game-hud">
            <div className="hud-metric">
              <span className="hud-lbl">THROUGHPUT</span>
              <span className="hud-val grad">{score.toLocaleString()} PTS</span>
            </div>
            <div className="hud-metric center">
              <span className="hud-lbl">MULTIPLIER</span>
              <span className="hud-val mult">x{multiplier}</span>
            </div>
            <div className="hud-metric right">
              <span className="hud-lbl">CORE SHIELDS</span>
              <div className="shield-dots">
                {[1, 2, 3].map((s) => (
                  <span
                    key={s}
                    className={`shield-dot ${s <= shields ? 'active' : ''}`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Ready / Game Over Prompts */}
        {gameState === 'ready' && (
          <div className="game-overlay-prompt">
            <span className="prompt-badge">
              {activeGame === 'core' ? 'CORE INTERCEPTOR' : 'PLASMA DEFENDER'}
            </span>
            <h4 className="prompt-title">
              {activeGame === 'core' ? 'Guide Core to Intercept Data' : 'Aim Crosshair & Blast Drones'}
            </h4>
            <p className="prompt-desc">
              {activeGame === 'core'
                ? 'Move cursor or touch to guide your quantum core. Collect cyan packets & golden matrices. Avoid red bugs!'
                : 'Move cursor to aim dual laser cannons. Click or tap to fire plasma laser bolts and eliminate incoming cyber drones!'}
            </p>
            <button type="button" className="btn primary prompt-btn" onClick={startGame}>
              <span>Launch {activeGame === 'core' ? 'Defense' : 'Blaster'}</span>
              <PlayMiniIcon size={12} style={{ marginLeft: '6px' }} />
            </button>
          </div>
        )}

        {gameState === 'gameover' && (
          <div className="game-overlay-prompt gameover">
            <span className="prompt-badge red">CORE SHIELD DEPLETED</span>
            <h4 className="prompt-title">Simulation Terminated</h4>
            <p className="prompt-desc">
              Final Score: <b>{score.toLocaleString()} PTS</b> · High Score: <b>{highScore.toLocaleString()} PTS</b>
            </p>
            <button type="button" className="btn primary prompt-btn" onClick={startGame}>
              <span>Re-engage System</span>
              <RefreshMiniIcon size={13} style={{ marginLeft: '6px' }} />
            </button>
          </div>
        )}
      </div>

      {/* Console Bottom Telemetry Bar */}
      <div className="console-foot">
        <div className="foot-item">
          <span className="foot-lbl">CONTROLS</span>
          <span className="foot-val">
            {activeGame === 'core' ? 'Cursor / Touch Steer' : 'Aim & Click to Fire'}
          </span>
        </div>
        <div className="foot-item">
          <span className="foot-lbl">INFERENCE</span>
          <span className="foot-val">240ms Sub-second</span>
        </div>
        <div className="foot-item">
          <span className="foot-lbl">ENGINEERING</span>
          <span className="foot-val">React Native &amp; NestJS</span>
        </div>
      </div>
    </div>
  )
}
