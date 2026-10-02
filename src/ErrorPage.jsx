import { useState, Component } from 'react'
import CatAnimation from './CatAnimation.jsx'
import { ArrowRightIcon } from './Icons.jsx'

export function ErrorPage({
  code = 500,
  title = 'Server-Side Exception Detected',
  message = 'The server encountered an unexpected disruption while orchestrating distributed services. Our autonomous health monitor has logged this telemetry event.',
  error = null,
  onReset = null,
}) {
  const [showDetails, setShowDetails] = useState(false)

  const handleReload = () => {
    if (onReset) {
      onReset()
    } else {
      window.location.href = '/'
    }
  }

  return (
    <div className="error-page-wrapper">
      <div className="error-card glass">
        <div className="error-cat-stage">
          <CatAnimation size={200} />
        </div>

        <div className="error-badge-row">
          <span className="error-status-pill">
            <span className="error-pulse-dot" />
            <span>HTTP {code} · Server Telemetry Fault</span>
          </span>
        </div>

        <h1 className="error-title">{title}</h1>
        <p className="error-description">{message}</p>

        <div className="error-actions">
          <button className="btn primary" onClick={handleReload}>
            <span>Re-establish Connection</span>
            <ArrowRightIcon size={15} style={{ marginLeft: '6px' }} />
          </button>
          <a className="btn ghost" href="/">
            <span>Return to Portfolio</span>
          </a>
          {error && (
            <button
              className="btn ghost"
              onClick={() => setShowDetails((prev) => !prev)}
              style={{ fontSize: '0.82rem' }}
            >
              <span>{showDetails ? 'Hide Diagnostics' : 'Inspect Diagnostics'}</span>
            </button>
          )}
        </div>

        {error && showDetails && (
          <div className="error-diagnostics">
            <div className="diag-header">
              <span>Stack Telemetry &amp; Trace</span>
              <span className="diag-code">Err: {error.name || 'ServerError'}</span>
            </div>
            <pre className="diag-pre">
              {error.message || String(error)}
              {error.stack ? `\n\n${error.stack}` : ''}
            </pre>
          </div>
        )}

        <div className="error-foot">
          <span>Jagadesh Nethinti Portfolio · Resilient System Architecture</span>
        </div>
      </div>
    </div>
  )
}

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('[Portfolio Error Boundary caught an exception]:', error, errorInfo)
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorPage
          code={500}
          title="Server-Side Exception Caught"
          message="An unhandled exception interrupted the client pipeline. The Loader Cat is monitoring telemetry while recovery protocols re-initialize the system."
          error={this.state.error}
          onReset={this.handleReset}
        />
      )
    }

    return this.props.children
  }
}

export default ErrorPage
