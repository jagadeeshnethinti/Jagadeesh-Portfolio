import { useEffect, useState } from 'react'
import { GooglePlayIcon, ArrowRightIcon } from './Icons.jsx'

const MAIL = 'jagadeeshnethinti809@gmail.com'

const REVENUE = [
  ['SUV', 35],
  ['Sedan', 24],
  ['Hatchback', 18],
  ['Luxury', 14],
  ['Van', 9],
]

function Chart({ type }) {
  if (type === 'revenue') {
    return (
      <>
        <div className="viz-head">
          <span>Fleet Segment Gross Revenue Contribution</span>
          <span className="viz-tool">Power BI · Dimensional DAX</span>
        </div>
        <div className="bars">
          {REVENUE.map(([k, v], i) => (
            <div className="bar-row" key={k}>
              <span className="bar-label">{k}</span>
              <div className="bar-track">
                <div
                  className={`bar-fill ${i === 0 ? 'lead' : ''}`}
                  style={{ '--w': `${(v / 35) * 100}%`, '--d': `${i * 100}ms` }}
                />
              </div>
              <span className="bar-val">{v}%</span>
            </div>
          ))}
        </div>
      </>
    )
  }
  return null
}

export default function ProjectModal({ project, onClose }) {
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (!project) return
    const id = requestAnimationFrame(() => setShown(true))
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      cancelAnimationFrame(id)
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      setShown(false)
    }
  }, [project, onClose])

  if (!project) return null
  const p = project

  return (
    <div
      className={`modal-overlay ${shown ? 'show' : ''}`}
      onClick={onClose}
    >
      <div
        className="modal glass"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={p.name}
      >
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="1" y1="1" x2="13" y2="13" />
            <line x1="1" y1="13" x2="13" y2="1" />
          </svg>
        </button>
        <div className="modal-thumb" style={{ background: p.grad }}>
          {p.img ? (
            <img className="thumb-app big" src={p.img} alt={`${p.name} logo`} />
          ) : (
            <span className="thumb-mono big">{p.mono}</span>
          )}
          <span className="thumb-mono">{p.mono}</span>
          <span className="thumb-metric">{p.metric}</span>
        </div>
        <div className="modal-body">
          <span className="project-cat">{p.category}</span>
          <h3 className="modal-title">{p.name}</h3>
          <p className="prose">{p.blurb}</p>

          {p.shots && p.shots.length > 0 && (
            <div className="shot-gallery">
              {p.shots.map((s, i) => (
                <img
                  key={i}
                  className="shot"
                  src={s}
                  alt={`${p.name} screenshot ${i + 1}`}
                  loading="lazy"
                />
              ))}
            </div>
          )}

          {p.chart && (
            <div className={`modal-viz glass reveal ${shown ? 'in' : ''}`}>
              <Chart type={p.chart} />
            </div>
          )}

          <h4 className="modal-sub">System Architecture &amp; Key Deliverables</h4>
          <ul className="modal-details">
            {p.details?.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>

          <div className="modal-foot">
            <ul className="stack">
              {p.stack.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <div className="modal-actions">
              {p.links ? (
                p.links.map((lk) => (
                  <a
                    key={lk.url}
                    className="btn primary"
                    href={lk.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <GooglePlayIcon size={14} />
                    <span>{lk.label || 'View on Google Play'}</span>
                  </a>
                ))
              ) : p.link ? (
                <a
                  className="btn primary"
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  <GooglePlayIcon size={14} />
                  <span>{p.linkLabel ? `View on ${p.linkLabel}` : 'View on Google Play'}</span>
                </a>
              ) : null}
              <a
                className={`btn ${p.link || p.links ? 'ghost' : 'primary'}`}
                href={`mailto:${MAIL}?subject=${encodeURIComponent(
                  'Architecture Walkthrough Request: ' + p.name
                )}`}
              >
                <span>Request Technical Architecture Deep-Dive</span>
                <ArrowRightIcon size={14} color={p.link || p.links ? 'var(--cyan)' : '#04121a'} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
