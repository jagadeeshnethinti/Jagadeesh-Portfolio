import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ErrorBoundary, ErrorPage } from './ErrorPage.jsx'

function Root() {
  const urlParams = new URLSearchParams(window.location.search)
  const isErrorSimulated = urlParams.has('error') || window.location.pathname === '/error' || window.location.pathname === '/500'

  if (isErrorSimulated) {
    const code = urlParams.get('code') || 500
    return (
      <ErrorPage
        code={code}
        title="Server-Side Exception Detected"
        message="A simulated server-side disturbance has been triggered for telemetry validation. The Loader Cat animation is monitoring recovery protocols."
        error={new Error(`HTTP ${code}: Internal Service Telemetry Exception`)}
        onReset={() => {
          window.location.href = '/'
        }}
      />
    )
  }

  return (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
