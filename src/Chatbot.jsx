import { useState, useRef, useEffect, useCallback } from 'react'
import { createSpeechRecognizer, speakText, stopSpeaking } from './speechService'

/* ------------------------------------------------------------------ *
 *  Jagadesh Nethinti — AI Portfolio Assistant (Gemini-powered)
 *  Trained exclusively on Jagadesh's CV, projects, and portfolio data.
 *  Uses the Gemini API with resilient multi-model failover.
 *  Includes Microsoft Cognitive Services Speech-to-Text,
 *  Realistic Natural Voice Text-to-Speech (TTS), and Walking Developer Bot.
 * ------------------------------------------------------------------ */

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || ''

// Resilient list of models with automatic failover (handles 503 high-demand or deprecations)
const CANDIDATE_MODELS = [
  'gemini-3.5-flash',
  'gemini-3.7-flash',
  'gemini-flash-lite-latest',
  'gemini-3.8-flash',
  'gemini-flash-latest',
]

/* ------------------------------------------------------------------ *
 *  Complete portfolio knowledge base — the chatbot is grounded on this
 * ------------------------------------------------------------------ */
const PORTFOLIO_CONTEXT = `
You are Jagadesh Nethinti's AI Portfolio Assistant on his official portfolio website (https://jagadesh-nethinti.indevs.in/). 
You MUST ONLY answer questions related to Jagadesh Nethinti's professional profile, skills, projects, experience, education, certifications, and contact information described below.

If someone asks a question that is NOT related to Jagadesh Nethinti or his portfolio/professional work, politely redirect them:
"I'm Jagadesh's portfolio assistant — I can only help with questions about his skills, projects, experience, and professional background. Feel free to ask me anything about his work! 🚀"

IMPORTANT: Keep responses concise, conversational, friendly, and professional. Always start responses warmly (e.g. "Hai!", "Hello!"). Think like a professional lead mobile & AI app developer when explaining architectures, algorithms, and mobile client engineering. Format responses with clear markdown bullets or bold text when listing items.

===== PERSONAL INFORMATION =====
- Full Name: Jagadesh Nethinti (also known as Jagadeesh Nethinti)
- Title: Lead Mobile App Developer & Full-Stack AI Software Engineer
- Location: Hyderabad, Telangana, India
- Email: jagadeeshnethinti809@gmail.com
- Phone: +91 93926 96206
- GitHub: https://github.com/jagadeeshnethinti
- LinkedIn: https://www.linkedin.com/in/jagadesh-nethinti-09364b235
- Portfolio: https://jagadesh-nethinti.indevs.in/
- Status: Open to Work — Actively considering roles in Full-Stack Mobile Development, AI Systems Engineering, and Backend Architecture

===== PROFESSIONAL SUMMARY =====
Jagadesh Nethinti is a Professional Mobile App Developer and Senior Full-Stack AI Software Engineer with 2.3+ years of production experience. He has architected and shipped 17+ mobile client systems and distributed microservices. He works at Pengwin Solutions Pvt. Ltd., Hyderabad as a core Full-Stack & AI Engineer on a 2-person product engineering team since July 2024. He has 11+ Google Play Store production applications delivered.

===== WORK EXPERIENCE =====
Role: Full Stack & AI Software Engineer
Company: Pengwin Solutions Pvt. Ltd., Hyderabad
Period: Jul 2024 – Present
Note: Core Full-Stack & AI Engineer on a 2-person product engineering team

Key Achievements:
- Architected, built, and shipped 11+ production mobile applications and NestJS backends over 2.3+ years
- Developed 20+ modular, accessible screens in React Native with Redux Toolkit
- Integrated LLM capabilities via Anthropic Claude and OpenAI APIs — building structured prompt guardrails, SQL schema grounding, and conversational agents
- Built secure authentication services using JWT and role-based access control (RBAC), with normalized schemas across PostgreSQL and MySQL
- Engineered automated ETL pipelines and Power BI dashboards with custom DAX measures
- Conducted customer behavior analysis on booking data using SQL (window functions, CTEs) and Python — identifying SUVs as the primary revenue driver (35% of gross revenue)

===== TECHNICAL SKILLS =====

1. Generative AI & Foundation Models:
   - Anthropic Claude API, OpenAI / ChatGPT API, Local LLM Hosting (Ollama), Hugging Face Transformers
   - Autonomous Chatbot Systems, Prompt Engineering & Guardrails, Context Optimization & Few-Shot Modeling

2. Mobile & Frontend Architecture:
   - React Native (iOS & Android), TypeScript, Modern JavaScript (ES6+)
   - Redux Toolkit & State Normalization, Responsive & Accessible UI Systems, React.js
   - Runtime & Re-render Optimization

3. Distributed Backend & Data Systems:
   - NestJS, Node.js (REST & WebSockets), PostgreSQL & MySQL
   - Secure Authentication (JWT, RBAC), Automated ETL Pipelines, Database Schema Design & Normalization

4. Analytics, Business Intelligence & Automation:
   - Power BI & Enterprise Reporting, Advanced DAX Measures & Star Schema Modeling
   - Exploratory Data Analysis (EDA) with Python & SQL, Google Play Console Release Management (CI/CD)

===== FEATURED PROJECTS =====

1. Hailo Cabs — Enterprise Ride-Hailing Platform
   - Tech: React Native, NestJS, WebSockets, Redis, PostgreSQL, Google Maps API
   - Highlights: Sub-second bidirectional driver dispatch over WebSockets, real-time geolocation streaming, JWT-authenticated multi-role access (driver, rider, admin). 100K+ monthly ride requests.

2. Pengwin Customer & Partner Ecosystem — Multi-Tenant Mobile Suite
   - Tech: React Native, Redux Toolkit, Node.js, PostgreSQL, Google Play Console
   - Highlights: Dual-client mobile architecture (consumer booking & vendor fulfillment), shared design system across 20+ screens, zero regression releases over 11+ updates.

3. DeepCare AI — Clinical Diagnosis & Medical Imaging Support
   - Tech: Python, PyTorch, FastAPI, React, Claude API, OpenCV
   - Highlights: Vision transformers for chest X-ray & MRI anomaly detection, RAG-grounded clinical summaries citing PubMed sources, HIPAA-compliant audit logging.

4. SmartFlow — Automated Operations & Predictive Analytics Pipeline
   - Tech: Python, NestJS, Power BI, DAX, PostgreSQL, Docker
   - Highlights: End-to-end automated ETL pipeline processing 500K+ daily event records, custom DAX analytical models for executive KPI tracking, reduced manual report compilation by 90%.

5. OmniCart — High-Concurrency Headless E-Commerce Engine
   - Tech: Next.js 14, Node.js, Stripe API, Redis, MySQL, TailwindCSS
   - Highlights: Sub-50ms product catalog search using Redis caching layers, resilient checkout pipeline with optimistic locking, automated webhook reconciliation for payment settlements.

6. DevLens — Developer Telemetry & Code Quality Dashboard
   - Tech: React, TypeScript, GitHub REST API, Express.js, Chart.js
   - Highlights: Real-time pull request velocity tracking, automated PR risk scoring based on commit churn and test coverage, team productivity heatmaps used across 5 engineering squads.

7. SwiftRent — Vehicle Rental Fleet Management System
   - Tech: React Native, Redux Toolkit, Node.js, MySQL, Google Maps API
   - Highlights: Turnkey fleet management with live GPS vehicle tracking, automated dynamic pricing engine factoring seasonal demand, maintenance schedule alerts reducing fleet downtime by 22%.

8. NeuroTask — AI-Powered Sprint Planner & Agile Assistant
   - Tech: React, OpenAI API, NestJS, PostgreSQL, WebSockets
   - Highlights: Natural language user-story generation into fully scoped Jira-style tickets, automated story-point estimation using historical velocity embeddings, interactive sprint board with collaborative drag-and-drop.

===== METRICS & IMPACT =====
- 17+ Mobile Apps & Client Systems Shipped
- 11+ Verified Google Play Releases
- +15% Customer Acquisition Lift
- 35% Primary Revenue Driver Identified (SUV fleet)
- 2.3+ Years Software & AI Engineering

===== EDUCATION =====
- B.Sc. in Computer Science — Artificial Intelligence & Robotics
- Institution: Aditya Degree College, Kakinada
- Period: 2021 – 2024
- Core Foundations: Distributed Systems Architecture, Deep Learning & Neural Models, Relational DBMS, Data Structures & Algorithms, Statistical Inference

===== CERTIFICATIONS =====
1. Microsoft Certified: Power BI Data Analyst
   - Simplilearn / Microsoft Curriculum · 2024
   - Focus: Star Schema Dimensional Modeling, Advanced DAX, Enterprise Data Pipelines & DirectQuery Telemetry

2. Advanced Financial & Operational Modeling
   - Simplilearn Professional Certification · 2024
   - Focus: Automated Power Query ETL, Programmatic VBA Macros, Statistical Anomaly Detection
`


/* ------------------------------------------------------------------ *
 *  Ultra-Realistic Premium Mecha Developer Robot (Walks when thinking)
 * ------------------------------------------------------------------ */
/* ------------------------------------------------------------------ *
 *  Ultra-Realistic Animated Mecha Mascot (Header, Floating FAB & Thinking Symbol)
 * ------------------------------------------------------------------ */
function RobotMascot({ size = 28, isWaving = false, isThinking = false }) {
  return (
    <div
      className={`robot-mascot-wrapper ${isWaving ? 'is-waving' : ''} ${isThinking ? 'is-thinking' : ''}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
        <defs>
          <linearGradient id="mascotMetalGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#223045" />
            <stop offset="60%" stopColor="#101826" />
            <stop offset="100%" stopColor="#050912" />
          </linearGradient>
          <linearGradient id="mascotVisorGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(47, 224, 255, 0.7)" />
            <stop offset="35%" stopColor="rgba(10, 16, 28, 0.96)" />
            <stop offset="100%" stopColor="rgba(2, 6, 23, 0.98)" />
          </linearGradient>
        </defs>

        {/* Beacon Antenna */}
        <line x1="18" y1="9" x2="18" y2="3" stroke="#2fe0ff" strokeWidth="2" strokeLinecap="round" />
        <circle
          cx="18"
          cy="2.5"
          r="2.2"
          fill="#7affd6"
          className={`robot-antenna-glow ${isThinking ? 'thinking' : ''}`}
        />

        {/* Sculpted Mecha Helmet */}
        <path
          d="M9 10 C9 6, 27 6, 27 10 L28 20 C28 23, 25 25, 18 25 C11 25, 8 23, 8 20 Z"
          fill="url(#mascotMetalGrad)"
          stroke="#2fe0ff"
          strokeWidth="1.4"
        />

        {/* Side Comms Ear-pieces */}
        <rect x="6" y="12" width="3" height="7" rx="1.5" fill="#1e293b" stroke="#2fe0ff" strokeWidth="1" />
        <circle cx="7.5" cy="15.5" r="1" fill="#7affd6" />
        <rect x="27" y="12" width="3" height="7" rx="1.5" fill="#1e293b" stroke="#2fe0ff" strokeWidth="1" />
        <circle cx="28.5" cy="15.5" r="1" fill="#7affd6" />

        {/* Curved 3D Glass Visor with Specular Horizon */}
        <rect x="10.5" y="11.5" width="15" height="7.5" rx="3.2" fill="url(#mascotVisorGrad)" stroke="rgba(47, 224, 255, 0.7)" strokeWidth="0.9" />

        {/* Animated Cybernetic Retinas */}
        <circle cx="14.5" cy="15" r="1.8" fill="#2fe0ff" className={`robot-eye ${isThinking ? 'thinking' : ''}`} />
        <circle cx="14.5" cy="15" r="0.8" fill="#ffffff" />
        <circle cx="21.5" cy="15" r="1.8" fill="#7affd6" className={`robot-eye ${isThinking ? 'thinking' : ''}`} />
        <circle cx="21.5" cy="15" r="0.8" fill="#ffffff" />

        {/* Dynamic Visor Scan Line when thinking */}
        {isThinking && (
          <line x1="12" y1="15" x2="24" y2="15" stroke="#2fe0ff" strokeWidth="1.2" className="robot-thinking-scanner" />
        )}

        {/* Mecha Mouth/Cheek Vents */}
        <path d="M15 21 Q18 22.8 21 21" stroke="#7affd6" strokeWidth="1.3" strokeLinecap="round" fill="none" />

        {/* Bionic Waving Hand */}
        <g className="robot-waving-arm">
          <path
            d="M7 16 C4 13, 3 8, 5 6 C6.5 4.5, 8.5 6.5, 8 9.5"
            stroke="#2fe0ff"
            strokeWidth="2.2"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="5" cy="5.5" r="1.8" fill="#7affd6" />
        </g>
      </svg>
    </div>
  )
}

/* ------------------------------------------------------------------ *
 *  SVG Icons
 * ------------------------------------------------------------------ */
function SendIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  )
}

function MicIcon({ size = 18, isListening = false }) {
  if (isListening) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mic-listening-svg">
        <line x1="1" y1="1" x2="23" y2="23" stroke="#ff4757" />
        <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
        <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" />
        <line x1="12" y1="19" x2="12" y2="23" />
        <line x1="8" y1="23" x2="16" y2="23" />
      </svg>
    )
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  )
}

function SpeakerIcon({ size = 15, isSpeaking = false }) {
  if (isSpeaking) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="speaker-speaking-svg">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="#2fe0ff" stroke="#2fe0ff" />
        <path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="#7affd6" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke="#2fe0ff" />
      </svg>
    )
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    </svg>
  )
}

function VolumeToggleIcon({ size = 17, isMuted = false }) {
  if (isMuted) {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
        <line x1="23" y1="9" x2="17" y2="15" stroke="#ff4757" />
        <line x1="17" y1="9" x2="23" y2="15" stroke="#ff4757" />
      </svg>
    )
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="rgba(47, 224, 255, 0.2)" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" stroke="#7affd6" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" stroke="#2fe0ff" />
    </svg>
  )
}

function CloseXIcon({ size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function SparkleIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0L14.59 8.41L23 11L14.59 13.59L12 22L9.41 13.59L1 11L9.41 8.41L12 0Z" />
    </svg>
  )
}

/* ------------------------------------------------------------------ *
 *  Quick suggestion chips
 * ------------------------------------------------------------------ */
const QUICK_QUESTIONS = [
  "What are Jagadesh's key skills?",
  "Tell me about his projects",
  "What's his work experience?",
  "How can I contact him?",
  "What certifications does he have?",
  "Tell me about the Hailo Cabs app",
]

/* ------------------------------------------------------------------ *
 *  Main Chatbot Component
 * ------------------------------------------------------------------ */
export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isWaving, setIsWaving] = useState(false)
  const [showGreetingPill, setShowGreetingPill] = useState(true)
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        "👋 **Hai! I'm Jagadesh's AI Assistant.**\n\nWelcome to his portfolio! I'm trained exclusively on Jagadesh's resume, 17+ projects, and technical skills.\n\n💬 **Type your question** to receive an answer in **text only**.\n🎙️ **Tap the Mic** to speak your prompt — I'll answer and **speak back with crystal-clear English voice audio**! 🚀",
    },
  ])
  const [input, setInput] = useState('')
  const [isThinking, setIsThinking] = useState(false)
  const [hasUnread, setHasUnread] = useState(false)

  // Speech-to-Text State
  const [isListening, setIsListening] = useState(false)
  const [speechStatus, setSpeechStatus] = useState('')
  const recognizerRef = useRef(null)

  // Text-to-Speech (TTS) Realistic Voice State (Clear Natural English)
  const [voiceReplyEnabled, setVoiceReplyEnabled] = useState(true)
  const [speakingMessageId, setSpeakingMessageId] = useState(null)
  const [activeVoiceName, setActiveVoiceName] = useState('')
  const lastInputWasVoice = useRef(false)

  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const chatBodyRef = useRef(null)

  // Auto-scroll to bottom
  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, isThinking, scrollToBottom])



  // Sync body class, focus input, wave when chat opens, and support Escape key to close
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('chatbot-open')
      setIsWaving(true)
      const waveTimer = setTimeout(() => setIsWaving(false), 2600)
      if (inputRef.current) {
        setTimeout(() => inputRef.current?.focus(), 300)
      }
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          setIsOpen(false)
        }
      }
      window.addEventListener('keydown', handleKeyDown)
      return () => {
        document.body.classList.remove('chatbot-open')
        clearTimeout(waveTimer)
        window.removeEventListener('keydown', handleKeyDown)
      }
    } else {
      document.body.classList.remove('chatbot-open')
      stopSpeaking()
      setSpeakingMessageId(null)
    }
  }, [isOpen])

  // Cleanup speech, audio, and body class on unmount
  useEffect(() => {
    return () => {
      document.body.classList.remove('chatbot-open')
      if (recognizerRef.current) {
        recognizerRef.current.stop().catch(() => {})
      }
      stopSpeaking()
    }
  }, [])

  // Play realistic voice for a specific message
  const handleSpeakMessage = useCallback((text, msgIdx) => {
    if (speakingMessageId === msgIdx) {
      stopSpeaking()
      setSpeakingMessageId(null)
      return
    }
    setSpeakingMessageId(msgIdx)
    speakText(text, {
      onStart: (info) => {
        if (info?.voiceName) setActiveVoiceName(info.voiceName)
      },
      onEnd: () => {
        setSpeakingMessageId(null)
      },
      onError: () => {
        setSpeakingMessageId(null)
      },
    })
  }, [speakingMessageId])

  // Speech-to-Text Controls (Microsoft Cognitive Services / Web Speech API)
  const startSpeech = async () => {
    try {
      stopSpeaking()
      setSpeakingMessageId(null)
      setSpeechStatus('Connecting microphone...')
      setIsListening(true)
      lastInputWasVoice.current = true

      const recognizer = await createSpeechRecognizer({
        onRecognizing: (interimText) => {
          setInput(interimText)
          setSpeechStatus('Transcribing speech in real-time...')
        },
        onRecognized: (finalText) => {
          setInput(finalText)
          setSpeechStatus('Captured speech prompt!')
        },
        onError: (err) => {
          console.warn('Speech notice:', err)
          setSpeechStatus('Mic notice: ' + (err?.message || err))
          setTimeout(() => setIsListening(false), 2500)
        },
        onEnd: () => {
          setIsListening(false)
          setSpeechStatus('')
        },
      })

      recognizerRef.current = recognizer
      await recognizer.start()
      setSpeechStatus(
        recognizer.type === 'microsoft-speech-sdk'
          ? 'Listening via Microsoft Speech SDK...'
          : 'Listening... Speak your prompt now'
      )
    } catch (err) {
      console.warn('Microphone start error:', err)
      setIsListening(false)
      setSpeechStatus(err.message || 'Microphone unavailable')
      setTimeout(() => setSpeechStatus(''), 3000)
    }
  }

  const stopSpeech = async () => {
    if (recognizerRef.current) {
      try {
        await recognizerRef.current.stop()
      } catch (e) {
        console.warn('Stop speech error:', e)
      }
      recognizerRef.current = null
    }
    setIsListening(false)
    setSpeechStatus('')
  }

  const toggleSpeech = () => {
    if (isListening) {
      stopSpeech()
    } else {
      startSpeech()
    }
  }

  // Build conversation history for context
  const buildConversationHistory = useCallback(() => {
    return messages.map((msg) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }))
  }, [messages])

  // Send message to Gemini API with multi-model fallback & realistic voice output
  const sendMessage = useCallback(
    async (userMessage, isVoicePrompt = false) => {
      if (!userMessage.trim() || isThinking) return

      stopSpeaking()
      setSpeakingMessageId(null)

      const wasVoice = isVoicePrompt || lastInputWasVoice.current
      lastInputWasVoice.current = false

      const newUserMsg = { role: 'user', content: userMessage.trim() }
      setMessages((prev) => [...prev, newUserMsg])
      setInput('')
      setIsThinking(true)

      try {
        const conversationHistory = [
          ...buildConversationHistory(),
          { role: 'user', parts: [{ text: userMessage.trim() }] },
        ]

        let botReply = null
        let lastErrorMessage = ''

        // Iterate over candidate models to handle any transient 503 or model deprecations
        for (const model of CANDIDATE_MODELS) {
          try {
            const response = await fetch(
              `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`,
              {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  systemInstruction: {
                    parts: [{ text: PORTFOLIO_CONTEXT }],
                  },
                  contents: conversationHistory,
                  generationConfig: {
                    temperature: 0.7,
                    topP: 0.9,
                    topK: 40,
                    maxOutputTokens: 1024,
                  },
                }),
              }
            )

            if (response.ok) {
              const data = await response.json()
              const text = data?.candidates?.[0]?.content?.parts?.[0]?.text
              if (text) {
                botReply = text
                break // Successful response obtained
              }
            } else {
              const errJson = await response.json().catch(() => null)
              console.warn(`Model ${model} returned ${response.status}:`, errJson)
              lastErrorMessage = errJson?.error?.message || `Status ${response.status}`
            }
          } catch (modelErr) {
            console.warn(`Error querying model ${model}:`, modelErr)
            lastErrorMessage = modelErr.message
          }
        }

        if (botReply) {
          const newAssistantIndex = messages.length + 1
          setMessages((prev) => [...prev, { role: 'assistant', content: botReply }])
          if (!isOpen) setHasUnread(true)

          // IMPORTANT: Only auto-play realistic voice if prompted via MIC (Voice-to-Text).
          // If user texted with keyboard or quick questions, reply strictly in TEXT ONLY!
          if (wasVoice && voiceReplyEnabled) {
            setSpeakingMessageId(newAssistantIndex)
            speakText(botReply, {
              onStart: (info) => {
                if (info?.voiceName) setActiveVoiceName(info.voiceName)
              },
              onEnd: () => {
                setSpeakingMessageId(null)
              },
              onError: () => {
                setSpeakingMessageId(null)
              },
            })
          }
        } else {
          throw new Error(lastErrorMessage || 'All Gemini models unavailable')
        }
      } catch (err) {
        console.error('Chatbot error:', err)
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content:
              "Oops, something went wrong on my end. Please try again in a moment! 🔄",
          },
        ])
      } finally {
        setIsThinking(false)
        setTimeout(() => inputRef.current?.focus(), 150)
      }
    },
    [isThinking, isOpen, buildConversationHistory, messages.length, voiceReplyEnabled]
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    const isFromVoice = lastInputWasVoice.current
    if (isListening) {
      stopSpeech()
    }
    sendMessage(input, isFromVoice)
  }

  const handleQuickQuestion = (q) => {
    if (isListening) {
      stopSpeech()
    }
    lastInputWasVoice.current = false
    sendMessage(q, false) // Strictly text only
  }

  const toggleChat = () => {
    setIsOpen((prev) => {
      const next = !prev
      if (next) {
        setShowGreetingPill(false)
      } else {
        stopSpeaking()
        setSpeakingMessageId(null)
      }
      return next
    })
    if (!isOpen) setHasUnread(false)
  }

  // Parse simple markdown: **bold**, *italic*, links, line breaks
  const formatMessage = (text) => {
    if (!text) return ''

    // Split by line breaks first
    const lines = text.split('\n')

    return lines.map((line, lineIdx) => {
      // Process inline formatting
      const parts = []
      let remaining = line
      let keyCounter = 0

      while (remaining.length > 0) {
        // Bold **text**
        const boldMatch = remaining.match(/\*\*(.+?)\*\*/)
        // Italic *text*
        const italicMatch = remaining.match(/\*(.+?)\*/)
        // Links [text](url)
        const linkMatch = remaining.match(/\[(.+?)\]\((.+?)\)/)
        // Bullet points
        const bulletMatch = remaining.match(/^[-•]\s+(.+)/)

        // Find earliest match
        const matches = [
          boldMatch && { type: 'bold', match: boldMatch, index: boldMatch.index },
          italicMatch && { type: 'italic', match: italicMatch, index: italicMatch.index },
          linkMatch && { type: 'link', match: linkMatch, index: linkMatch.index },
        ].filter(Boolean)

        if (matches.length === 0) {
          if (bulletMatch) {
            parts.push(
              <span key={keyCounter++} className="chat-bullet">
                • {bulletMatch[1]}
              </span>
            )
            remaining = ''
          } else {
            parts.push(<span key={keyCounter++}>{remaining}</span>)
            remaining = ''
          }
        } else {
          const earliest = matches.reduce((min, m) => (m.index < min.index ? m : min))

          // Text before match
          if (earliest.index > 0) {
            parts.push(<span key={keyCounter++}>{remaining.substring(0, earliest.index)}</span>)
          }

          if (earliest.type === 'bold') {
            parts.push(<strong key={keyCounter++}>{earliest.match[1]}</strong>)
            remaining = remaining.substring(earliest.index + earliest.match[0].length)
          } else if (earliest.type === 'italic') {
            parts.push(<em key={keyCounter++}>{earliest.match[1]}</em>)
            remaining = remaining.substring(earliest.index + earliest.match[0].length)
          } else if (earliest.type === 'link') {
            parts.push(
              <a
                key={keyCounter++}
                href={earliest.match[2]}
                target="_blank"
                rel="noreferrer"
                className="chat-link"
              >
                {earliest.match[1]}
              </a>
            )
            remaining = remaining.substring(earliest.index + earliest.match[0].length)
          }
        }
      }

      return (
        <span key={lineIdx}>
          {parts}
          {lineIdx < lines.length - 1 && <br />}
        </span>
      )
    })
  }

  return (
    <>
      {/* -------- Greeting Pill Badge when chat is closed -------- */}
      {!isOpen && showGreetingPill && (
        <aside
          aria-label="Chat assistant prompt"
          className="chatbot-greeting-pill"
          onClick={toggleChat}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && toggleChat()}
        >
          <span className="greeting-pill-wave" aria-hidden="true">👋</span>
          <span className="greeting-pill-text">
            <strong>Hai!</strong> Ask or speak to me
          </span>
          <button
            className="greeting-pill-close"
            onClick={(e) => {
              e.stopPropagation()
              setShowGreetingPill(false)
            }}
            aria-label="Dismiss greeting"
          >
            ×
          </button>
        </aside>
      )}

      {/* -------- Floating Chat Toggle Button (Removed when chatbot is open) -------- */}
      {!isOpen && (
        <button
          className="chatbot-fab"
          onClick={toggleChat}
          aria-label="Open chat assistant"
          title="Chat with Jagadesh's AI Assistant"
          id="chatbot-toggle"
        >
          <RobotMascot size={28} isWaving={true} />
          {hasUnread && <span className="chatbot-unread-dot" />}
        </button>
      )}

      {/* -------- Chat Window -------- */}
      <div className={`chatbot-window ${isOpen ? 'open' : ''}`} id="chatbot-window">
        {/* Header */}
        <div className="chatbot-header">
          <div className="chatbot-header-left">
            <div className="chatbot-avatar">
              <RobotMascot size={26} isWaving={isWaving} isThinking={isThinking} />
            </div>
            <div>
              <div className="chatbot-header-title">
                Jagadesh's AI Assistant
                <span className="chatbot-hai-badge">Hai! 👋</span>
              </div>
              <div className="chatbot-header-status">
                <span className={`chatbot-status-dot ${isThinking ? 'thinking' : ''}`} />
                {isThinking ? 'Thinking & Synthesizing...' : 'AI Voice & Text Assistant 🎙️✨'}
              </div>
            </div>
          </div>

          <div className="chatbot-header-actions">
            <button className="chatbot-close-btn" onClick={toggleChat} aria-label="Close chat">
              <CloseXIcon size={18} />
            </button>
          </div>
        </div>

        {/* Live Speaking Status Banner */}
        {speakingMessageId !== null && (
          <div className="chatbot-speaking-banner" aria-live="polite">
            <div className="speaking-banner-left">
              <span className="speaking-wave-bars">
                <span /><span /><span /><span />
              </span>
              <span className="speaking-banner-text">
                Speaking in clear English {activeVoiceName ? `· ${activeVoiceName}` : ''}
              </span>
            </div>
            <button
              type="button"
              className="speaking-stop-btn"
              onClick={() => {
                stopSpeaking()
                setSpeakingMessageId(null)
              }}
            >
              Stop Audio ⏹️
            </button>
          </div>
        )}

        {/* Messages */}
        <div className="chatbot-body" ref={chatBodyRef}>
          {messages.map((msg, idx) => (
            <div key={idx} className={`chatbot-msg ${msg.role}`}>
              {msg.role === 'assistant' && (
                <div className="chatbot-msg-avatar">
                  <SparkleIcon size={12} />
                </div>
              )}
              <div className={`chatbot-msg-bubble-wrapper ${msg.role}`}>
                <div className={`chatbot-msg-bubble ${msg.role}`}>
                  {formatMessage(msg.content)}
                </div>

                {/* Read Aloud button on assistant messages */}
                {msg.role === 'assistant' && (
                  <div className="chatbot-msg-footer-actions">
                    <button
                      type="button"
                      className={`chatbot-msg-speak-btn ${speakingMessageId === idx ? 'speaking' : ''}`}
                      onClick={() => handleSpeakMessage(msg.content, idx)}
                      aria-label={
                        speakingMessageId === idx
                          ? 'Stop reading aloud'
                          : 'Read aloud with realistic voice'
                      }
                      title={
                        speakingMessageId === idx
                          ? 'Stop voice'
                          : 'Read aloud with realistic natural voice'
                      }
                    >
                      <SpeakerIcon size={14} isSpeaking={speakingMessageId === idx} />
                      <span className="speak-btn-text">
                        {speakingMessageId === idx ? 'Speaking...' : 'Listen'}
                      </span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Quick suggestions — show only when there's just the welcome message */}
          {messages.length === 1 && !isThinking && (
            <div className="chatbot-suggestions">
              <div className="chatbot-suggestions-label">Quick questions</div>
              <div className="chatbot-chips">
                {QUICK_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    className="chatbot-chip"
                    onClick={() => handleQuickQuestion(q)}
                    type="button"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Cardless Bot Symbol Thinking Animation — No Card! */}
          {isThinking && (
            <div className="bot-thinking-symbol-row" aria-live="polite">
              <div className="bot-thinking-symbol-avatar">
                <RobotMascot size={26} isThinking={true} />
              </div>
              <div className="bot-thinking-pulse-wrap">
                <span className="thinking-pulse-dot dot-1" />
                <span className="thinking-pulse-dot dot-2" />
                <span className="thinking-pulse-dot dot-3" />
              </div>
              <span className="bot-thinking-text">Thinking...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* -------- Speech-to-Text Listening HUD above input -------- */}
        {isListening && (
          <div className="speech-listening-hud" aria-live="polite">
            <div className="speech-listening-left">
              <span className="speech-rec-dot" />
              <span className="speech-listening-text">
                {speechStatus || 'Listening... Speak your prompt now'}
              </span>
            </div>
            <div className="speech-equalizer" aria-hidden="true">
              <span /><span /><span /><span /><span />
            </div>
            <div className="speech-hud-actions">
              {input.trim() && (
                <button
                  type="button"
                  className="speech-send-now-btn"
                  onClick={() => {
                    const currentPrompt = input
                    stopSpeech()
                    sendMessage(currentPrompt, true)
                  }}
                  aria-label="Send voice prompt"
                  title="Send voice prompt and hear natural English voice response"
                >
                  Send 🚀
                </button>
              )}
              <button
                type="button"
                className="speech-done-btn"
                onClick={stopSpeech}
                aria-label="Finish speaking"
              >
                Done
              </button>
            </div>
          </div>
        )}

        {/* Input */}
        <form className="chatbot-input-area" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            className="chatbot-input"
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value)
              lastInputWasVoice.current = false
            }}
            onKeyDown={(e) => {
              if (e.key !== 'Enter') {
                lastInputWasVoice.current = false
              }
            }}
            placeholder={
              isListening
                ? '🎙️ Listening... Speak your prompt now'
                : "Type to chat in text, or tap Mic for voice reply..."
            }
            disabled={isThinking}
            aria-label="Type or speak your question"
            id="chatbot-input"
          />

          {/* Microsoft Speech-to-Text Microphone Button */}
          <button
            type="button"
            className={`chatbot-mic-btn ${isListening ? 'listening' : ''}`}
            onClick={toggleSpeech}
            disabled={isThinking}
            aria-label={
              isListening
                ? 'Stop voice recording'
                : 'Speak prompt using Speech to Text (Microsoft Speech SDK)'
            }
            title={
              isListening
                ? 'Stop listening'
                : 'Prompt with speech to text (Microsoft Speech SDK)'
            }
            id="chatbot-mic"
          >
            <MicIcon size={18} isListening={isListening} />
          </button>

          <button
            className="chatbot-send-btn"
            type="submit"
            disabled={!input.trim() || isThinking}
            aria-label="Send message"
            id="chatbot-send"
          >
            <SendIcon size={18} />
          </button>
        </form>

        {/* Footer */}
        <div className="chatbot-footer">
          <span>Powered by Gemini AI · Microsoft Speech SDK · Realistic Natural Voice</span>
        </div>
      </div>
    </>
  )
}
