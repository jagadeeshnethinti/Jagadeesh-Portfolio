import { useEffect, useRef } from 'react'
import lottie from 'lottie-web/build/player/lottie_light.js'

export default function CatAnimation({ size = 220 }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const anim = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: '/cat-loader.json',
    })

    return () => {
      anim.destroy()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="cat-lottie-container"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      aria-label="Loader cat animation"
    />
  )
}
