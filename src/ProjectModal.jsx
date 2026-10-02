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
  if (type === 'pizza') {
    return (
      <>
        <div className="viz-head">
          <span>Temporal Order Demand Distribution</span>
          <span className="viz-tool">Tableau · Behavioral Analytics</span>
        </div>
        <svg className="spark tall" viewBox="0 0 300 120" preserveAspectRatio="none">
          <defs>
            <linearGradient id="m-pizza" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ff8a5b" stopOpacity="0.45" />
              <stop offset="1" stopColor="#ff8a5b" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            className="area"
            d="M0,104 L25,96 L50,64 L75,52 L100,40 L125,58 L150,74 L175,64 L200,46 L225,30 L250,22 L275,42 L300,74 L300,120 L0,120 Z"
            fill="url(#m-pizza)"
          />
          <path
            className="draw"
            d="M0,104 L25,96 L50,64 L75,52 L100,40 L125,58 L150,74 L175,64 L200,46 L225,30 L250,22 L275,42 L300,74"
            fill="none"
            stroke="#ff8a5b"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength="1"
          />
        </svg>
        <div className="viz-foot">
          Demand concentrations at <strong>1:00 PM &amp; 8:00 PM</strong> — critical operational windows leveraged for dynamic dispatch and surge staffing.
        </div>
      </>
    )
  }
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
  if (type === 'time') {
    return (
      <>
        <div className="viz-head">
          <span>ETL Pipeline Turnaround Velocity</span>
          <span className="viz-tool">Excel · Power Query · VBA Automation</span>
        </div>
        <div className="time-body">
          <div className="col">
            <div className="col-track">
              <div className="col-bar manual" style={{ '--h': '100%' }} />
            </div>
            <span className="col-label">Manual Pipeline</span>
          </div>
          <div className="col">
            <div className="col-track">
              <div className="col-bar auto" style={{ '--h': '30%' }} />
            </div>
            <span className="col-label">Automated ETL</span>
          </div>
          <div className="time-kpi">
            <span className="kpi-num grad">−70%</span>
            <span>operational latency reduction</span>
          </div>
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
