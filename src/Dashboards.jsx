import Counter from './Counter.jsx'
import { ArrowRightIcon } from './Icons.jsx'

/* Animated, dashboard-style visuals of the real findings from the resume.
   Charts draw/grow when scrolled into view (driven by the .reveal -> .in
   class added by App's IntersectionObserver). */

const REVENUE = [
  ['SUV', 35],
  ['Sedan', 24],
  ['Hatchback', 18],
  ['Luxury', 14],
  ['Van', 9],
]

export default function Dashboards() {
  return (
    <section id="dashboards" className="section">
      <div className="container">
        <p className="kicker reveal">02 — Telemetry &amp; Quantitative Intelligence</p>
        <h2 className="section-title reveal">Production Telemetry &amp; Quantitative Systems Intelligence</h2>
        <p className="prose reveal">
          Every system I architect is engineered for data-driven precision — transforming production
          usage telemetry into automated reporting pipelines, dimensional KPI monitors, and strategic operational discoveries.
        </p>

        <div className="viz-grid">
          {/* Revenue share — horizontal bars */}
          <div className="viz-card glass reveal">
            <div className="viz-head">
              <div className="viz-head-title-group">
                <span className="viz-app-tag">CarHive Fleet Platform</span>
                <span className="viz-title">Revenue Contribution by Fleet Segment</span>
              </div>
              <span className="viz-tool">Power BI · DAX</span>
            </div>
            <div className="bars">
              {REVENUE.map(([k, v], i) => (
                <div className="bar-row" key={k}>
                  <span className="bar-label">{k}</span>
                  <div className="bar-track">
                    <div
                      className={`bar-fill ${i === 0 ? 'lead' : ''}`}
                      style={{ '--w': `${(v / 35) * 100}%`, '--d': `${i * 110}ms` }}
                    />
                  </div>
                  <span className="bar-val">{v}%</span>
                </div>
              ))}
            </div>
            <div className="viz-foot">
              SUVs generated <strong>35%</strong> of platform gross revenue — steering strategic fleet acquisition.
            </div>
          </div>

          {/* Campaign efficiency — KPI + sparkline */}
          <div className="viz-card glass reveal">
            <div className="viz-head">
              <div className="viz-head-title-group">
                <span className="viz-app-tag">SM Lorry Logistics Ecosystem</span>
                <span className="viz-title">Customer Segmentation Performance</span>
              </div>
              <span className="viz-tool">Python · Modeling</span>
            </div>
            <div className="kpi">
              <Counter end={15} prefix="+" suffix="%" className="kpi-num grad" />
              <span className="kpi-sub">conversion lift vs. unsegmented baseline</span>
            </div>
            <svg className="spark" viewBox="0 0 300 90" preserveAspectRatio="none">
              <defs>
                <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#41ecdf" stopOpacity="0.45" />
                  <stop offset="1" stopColor="#41ecdf" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                className="area"
                d="M0,72 L60,66 L120,58 L180,42 L240,28 L300,12 L300,90 L0,90 Z"
                fill="url(#sg)"
              />
              <path
                className="draw"
                d="M0,72 L60,66 L120,58 L180,42 L240,28 L300,12"
                fill="none"
                stroke="#41ecdf"
                strokeWidth="2.5"
                strokeLinecap="round"
                pathLength="1"
              />
            </svg>
          </div>

          {/* Pizza demand — area chart */}
          <div className="viz-card glass reveal">
            <div className="viz-head">
              <div className="viz-head-title-group">
                <span className="viz-app-tag">Enterprise Sales Intelligence</span>
                <span className="viz-title">Temporal Order Demand Distribution</span>
              </div>
              <span className="viz-tool">Tableau · Analytics</span>
            </div>
            <svg className="spark tall" viewBox="0 0 300 120" preserveAspectRatio="none">
              <defs>
                <linearGradient id="pg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#ff8a5b" stopOpacity="0.45" />
                  <stop offset="1" stopColor="#ff8a5b" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                className="area"
                d="M0,104 L25,96 L50,64 L75,52 L100,40 L125,58 L150,74 L175,64 L200,46 L225,30 L250,22 L275,42 L300,74 L300,120 L0,120 Z"
                fill="url(#pg)"
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
              Peak demand concentrated at <strong>1:00 PM &amp; 8:00 PM</strong> — governed dynamic operational staffing.
            </div>
          </div>

          {/* Reporting time — before/after columns */}
          <div className="viz-card glass reveal">
            <div className="viz-head">
              <div className="viz-head-title-group">
                <span className="viz-app-tag">AskrDukan Operations Engine</span>
                <span className="viz-title">Automated ETL Pipeline Velocity</span>
              </div>
              <span className="viz-tool">Excel · Power Query · VBA</span>
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
                <Counter end={70} prefix="−" suffix="%" className="kpi-num grad" />
                <span>turnaround time reduction</span>
              </div>
            </div>
          </div>
        </div>

        <div className="telemetry-cta-row reveal" style={{ marginTop: '28px', textAlign: 'center' }}>
          <a
            href="#projects"
            className="btn ghost"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem' }}
          >
            <span>Inspect Live Production Telemetry in Section 05</span>
            <ArrowRightIcon size={14} color="var(--cyan)" />
          </a>
        </div>
      </div>
    </section>
  )
}
