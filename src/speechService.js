/**
 * Speech Service:
 * 1. Speech-to-Text (STT) via Microsoft Cognitive Services Speech SDK & Web Speech API.
 * 2. Ultra-Realistic Text-to-Speech (TTS) via Microsoft Azure Neural Voices & Web Speech Synthesis Natural Neural Voices.
 */

const AZURE_SPEECH_KEY = import.meta.env.VITE_AZURE_SPEECH_KEY
const AZURE_SPEECH_REGION = import.meta.env.VITE_AZURE_SPEECH_REGION || 'eastus'

/* ------------------------------------------------------------------ *
 *  Speech-to-Text (STT)
 * ------------------------------------------------------------------ */
export async function createSpeechRecognizer({
  onRecognizing,
  onRecognized,
  onError,
  onEnd,
}) {
  // Option 1: Microsoft Cognitive Services Speech SDK (if Azure key configured)
  if (
    AZURE_SPEECH_KEY &&
    AZURE_SPEECH_KEY.trim() !== '' &&
    AZURE_SPEECH_KEY !== 'your_azure_speech_key_here'
  ) {
    try {
      const SpeechSDK = await import('microsoft-cognitiveservices-speech-sdk')
      const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(
        AZURE_SPEECH_KEY.trim(),
        AZURE_SPEECH_REGION.trim()
      )
      speechConfig.speechRecognitionLanguage = 'en-US'
      const audioConfig = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput()
      const recognizer = new SpeechSDK.SpeechRecognizer(speechConfig, audioConfig)

      recognizer.recognizing = (s, e) => {
        if (e.result?.text) {
          onRecognizing?.(e.result.text)
        }
      }

      recognizer.recognized = (s, e) => {
        if (e.result?.text) {
          onRecognized?.(e.result.text)
        }
      }

      recognizer.canceled = (s, e) => {
        if (e.errorDetails) {
          onError?.(e.errorDetails)
        }
        onEnd?.()
      }

      recognizer.sessionStopped = () => {
        onEnd?.()
      }

      return {
        type: 'microsoft-speech-sdk',
        start: () =>
          new Promise((resolve, reject) => {
            recognizer.startContinuousRecognitionAsync(
              () => resolve(),
              (err) => reject(err)
            )
          }),
        stop: () =>
          new Promise((resolve) => {
            recognizer.stopContinuousRecognitionAsync(() => {
              recognizer.close()
              resolve()
            })
          }),
      }
    } catch (err) {
      console.warn(
        'Failed to initialize Microsoft Speech SDK, falling back to Web Speech API:',
        err
      )
    }
  }

  // Option 2: Browser Web Speech API (Native in Chrome, Edge, Safari, Android)
  const SpeechRecognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition

  if (!SpeechRecognition) {
    throw new Error(
      'Speech recognition is not supported in this browser. Please use Chrome, Edge, or provide Azure Speech credentials.'
    )
  }

  const recognition = new SpeechRecognition()
  recognition.continuous = true
  recognition.interimResults = true
  recognition.lang = 'en-US'

  let accumulatedFinal = ''

  recognition.onresult = (event) => {
    let interim = ''
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      const transcript = event.results[i][0].transcript
      if (event.results[i].isFinal) {
        accumulatedFinal += (accumulatedFinal ? ' ' : '') + transcript.trim()
      } else {
        interim += transcript
      }
    }
    const currentTranscript = (accumulatedFinal + (interim ? ' ' + interim : '')).trim()
    onRecognizing?.(currentTranscript)
    if (accumulatedFinal) {
      onRecognized?.(accumulatedFinal.trim())
    }
  }

  recognition.onerror = (event) => {
    console.warn('Speech recognition notice:', event.error)
    onError?.(event.error)
  }

  recognition.onend = () => {
    onEnd?.()
  }

  return {
    type: 'web-speech-api',
    start: () => {
      try {
        recognition.start()
      } catch (e) {
        console.warn('Recognition start notice:', e)
      }
    },
    stop: () => {
      try {
        recognition.stop()
      } catch (e) {
        console.warn('Recognition stop notice:', e)
      }
    },
  }
}

/* ------------------------------------------------------------------ *
 *  Text-to-Speech (TTS) — Ultra-Realistic Natural Voice Synthesis
 * ------------------------------------------------------------------ */

// Clean raw markdown, URLs, emojis, and symbols for natural conversational human speech
export function cleanTextForSpeech(text) {
  if (!text) return ''
  return text
    // Replace markdown links [label](url) with label
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove raw URLs
    .replace(/https?:\/\/\S+/g, '')
    // Remove code blocks and backticks
    .replace(/```[\s\S]*?```/g, '')
    .replace(/`([^`]+)`/g, '$1')
    // Remove bold, italics and headers
    .replace(/[*_]{1,3}([^*_]+)[*_]{1,3}/g, '$1')
    .replace(/^[\s*•\-#>0-9.]+/gm, '')
    // Pronounce common tech acronyms cleanly
    .replace(/\bAI\b/g, 'A I')
    .replace(/\bML\b/g, 'M L')
    .replace(/\bUI\b/g, 'U I')
    .replace(/\bUX\b/g, 'U X')
    .replace(/\bAPI\b/g, 'A P I')
    .replace(/([a-zA-Z0-9])\/([a-zA-Z0-9])/g, '$1 and $2')
    // Strip all emojis and symbol flags
    .replace(
      /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E6}-\u{1F1FF}]/gu,
      ''
    )
    .replace(/[~^|\\<>{}[\]]/g, ' ')
    // Collapse excess spaces & newlines into clean sentence pauses
    .replace(/\n+/g, '. ')
    .replace(/\s+/g, ' ')
    .replace(/\.+/g, '.')
    .trim()
}

// Global active synthesizer reference for interruption/stopping
let activeAzureSynthesizer = null
let speechKeepAliveTimer = null
let isCancelingSpeech = false

function startSpeechKeepAlive() {
  stopSpeechKeepAlive()
  speechKeepAliveTimer = setInterval(() => {
    if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
      window.speechSynthesis.pause()
      window.speechSynthesis.resume()
    } else {
      stopSpeechKeepAlive()
    }
  }, 4500)
}

function stopSpeechKeepAlive() {
  if (speechKeepAliveTimer) {
    clearInterval(speechKeepAliveTimer)
    speechKeepAliveTimer = null
  }
}

// Select the highest quality, most articulate natural English neural voice available with perfect pronunciation
export function getBestNaturalVoice(voices) {
  if (!voices || voices.length === 0) return null

  // Priority 1: High-fidelity Microsoft Natural Online US English Neural Voices (Windows / Edge)
  // Jenny and Guy are globally renowned as the gold standard in clear, human, articulate English pronunciation.
  const msNaturalUS = voices.find(
    (v) =>
      v.name.includes('Natural') &&
      (v.name.includes('Jenny') ||
        v.name.includes('Guy') ||
        v.name.includes('Aria') ||
        v.name.includes('Christopher') ||
        v.name.includes('Michelle')) &&
      (v.lang.toLowerCase() === 'en-us' || v.lang.startsWith('en'))
  )
  if (msNaturalUS) return msNaturalUS

  // Priority 2: High-fidelity Microsoft Natural Online UK English Neural Voices
  const msNaturalUK = voices.find(
    (v) =>
      v.name.includes('Natural') &&
      (v.name.includes('Ryan') || v.name.includes('Sonia') || v.name.includes('Libby')) &&
      v.lang.startsWith('en')
  )
  if (msNaturalUK) return msNaturalUK

  // Priority 3: Any Microsoft Natural English voice
  const anyMsNatural = voices.find(
    (v) =>
      v.name.includes('Natural') &&
      (v.lang.toLowerCase() === 'en-us' || v.lang.toLowerCase() === 'en-gb' || v.lang.startsWith('en'))
  )
  if (anyMsNatural) return anyMsNatural

  // Priority 4: Google US English & Google UK English (Chrome / Android)
  const googleEnglish = voices.find(
    (v) =>
      (v.name.includes('Google') || v.name.includes('Chrome')) &&
      (v.name.includes('US English') ||
        v.name.includes('UK English') ||
        v.lang.toLowerCase() === 'en-us' ||
        v.lang.toLowerCase() === 'en-gb')
  )
  if (googleEnglish) return googleEnglish

  // Priority 5: Apple Premium / Natural English Voices (Samantha, Alex, Daniel, Ava, Karen)
  const appleEnglish = voices.find(
    (v) =>
      (v.name.includes('Samantha') ||
        v.name.includes('Alex') ||
        v.name.includes('Daniel') ||
        v.name.includes('Ava') ||
        v.name.includes('Karen')) &&
      v.lang.startsWith('en')
  )
  if (appleEnglish) return appleEnglish

  // Priority 6: Any voice matching en-US
  const anyUS = voices.find((v) => v.lang.toLowerCase().replace(/_/g, '-') === 'en-us')
  if (anyUS) return anyUS

  // Priority 7: Any voice matching en-GB
  const anyGB = voices.find((v) => v.lang.toLowerCase().replace(/_/g, '-') === 'en-gb')
  if (anyGB) return anyGB

  // Priority 8: Any English voice
  const anyEnglish = voices.find((v) => (v.lang || '').toLowerCase().startsWith('en'))
  if (anyEnglish) return anyEnglish

  return voices[0]
}

function splitTextIntoSentences(text) {
  // Split along sentence boundaries so long paragraphs don't freeze the browser
  const matches = text.match(/[^.!?:]+[.!?:]+/g)
  if (!matches || matches.length === 0) return [text]
  const cleaned = matches.map((m) => m.trim()).filter((m) => m.length > 0)
  return cleaned.length > 0 ? cleaned : [text]
}

/**
 * Speaks the provided text using the most articulate, natural English voice available with perfect pronunciation.
 * Supports Microsoft Azure Neural TTS (en-US-JennyNeural) if keys are provided,
 * and high-fidelity browser Neural SpeechSynthesis with chunked continuous playback as native fallback.
 */
export async function speakText(rawText, { onStart, onEnd, onError } = {}) {
  // Stop any currently active speech first
  stopSpeaking()

  const cleanSpeechText = cleanTextForSpeech(rawText)
  if (!cleanSpeechText) {
    onEnd?.()
    return
  }

  // Option 1: Microsoft Azure Cognitive Services US English Neural TTS
  if (
    AZURE_SPEECH_KEY &&
    AZURE_SPEECH_KEY.trim() !== '' &&
    AZURE_SPEECH_KEY !== 'your_azure_speech_key_here'
  ) {
    try {
      const SpeechSDK = await import('microsoft-cognitiveservices-speech-sdk')
      const speechConfig = SpeechSDK.SpeechConfig.fromSubscription(
        AZURE_SPEECH_KEY.trim(),
        AZURE_SPEECH_REGION.trim()
      )
      // Use world-class realistic English neural voice with perfect pronunciation
      speechConfig.speechSynthesisVoiceName = 'en-US-JennyNeural'
      const audioConfig = SpeechSDK.AudioConfig.fromDefaultSpeakerOutput()
      const synthesizer = new SpeechSDK.SpeechSynthesizer(speechConfig, audioConfig)
      activeAzureSynthesizer = synthesizer

      onStart?.({ voiceName: 'Jenny Neural (Clear English)' })

      synthesizer.speakTextAsync(
        cleanSpeechText,
        (result) => {
          if (result.reason === SpeechSDK.ResultReason.SynthesizingAudioCompleted) {
            synthesizer.close()
            activeAzureSynthesizer = null
            onEnd?.()
          } else {
            synthesizer.close()
            activeAzureSynthesizer = null
            onEnd?.()
          }
        },
        (err) => {
          console.warn('Azure TTS notice:', err)
          synthesizer.close()
          activeAzureSynthesizer = null
          // Fall back to Web Speech Synthesis on error
          speakWithBrowserSynthesis(cleanSpeechText, { onStart, onEnd, onError })
        }
      )
      return
    } catch (e) {
      console.warn('Failed Azure TTS, falling back to browser synthesis:', e)
    }
  }

  // Option 2: Browser Natural Neural Speech Synthesis with Sentence Chunking
  speakWithBrowserSynthesis(cleanSpeechText, { onStart, onEnd, onError })
}

function speakWithBrowserSynthesis(cleanSpeechText, { onStart, onEnd, onError } = {}) {
  if (!('speechSynthesis' in window)) {
    console.warn('speechSynthesis not supported in this browser.')
    onError?.('Speech synthesis not supported')
    return
  }

  window.speechSynthesis.cancel()
  isCancelingSpeech = false

  const sentences = splitTextIntoSentences(cleanSpeechText)

  const playUtteranceQueue = () => {
    if (isCancelingSpeech) return

    const voices = window.speechSynthesis.getVoices()
    const bestVoice = getBestNaturalVoice(voices)

    let currentIndex = 0
    let hasNotifiedStart = false

    startSpeechKeepAlive()

    const speakNextSentence = () => {
      if (isCancelingSpeech || currentIndex >= sentences.length) {
        stopSpeechKeepAlive()
        onEnd?.()
        return
      }

      const sentenceText = sentences[currentIndex]
      const utterance = new SpeechSynthesisUtterance(sentenceText)

      if (bestVoice) {
        utterance.voice = bestVoice
        utterance.lang = bestVoice.lang || 'en-US'
      } else {
        utterance.lang = 'en-US'
      }

      // Natural, conversational English rhythm and clear articulation
      utterance.rate = 1.0
      utterance.pitch = 1.0
      utterance.volume = 1.0

      utterance.onstart = () => {
        if (!hasNotifiedStart) {
          hasNotifiedStart = true
          onStart?.({ voiceName: bestVoice?.name || 'Natural English Voice' })
        }
      }

      utterance.onend = () => {
        currentIndex++
        // Natural brief inter-sentence breath pause
        setTimeout(() => {
          if (!isCancelingSpeech) {
            speakNextSentence()
          }
        }, 50)
      }

      utterance.onerror = (e) => {
        if (e.error !== 'interrupted' && e.error !== 'canceled') {
          console.warn('SpeechSynthesis error:', e)
          onError?.(e.error)
        }
        stopSpeechKeepAlive()
        onEnd?.()
      }

      window.speechSynthesis.speak(utterance)
    }

    speakNextSentence()
  }

  // If voices are already loaded, speak immediately
  const availableVoices = window.speechSynthesis.getVoices()
  if (availableVoices && availableVoices.length > 0) {
    playUtteranceQueue()
  } else {
    // Wait for voices to populate asynchronously (Chrome/Edge)
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.onvoiceschanged = null
      playUtteranceQueue()
    }
    // Fallback safety timeout in case onvoiceschanged doesn't fire
    setTimeout(() => {
      if (!window.speechSynthesis.speaking && !isCancelingSpeech) {
        playUtteranceQueue()
      }
    }, 200)
  }
}

/**
 * Immediately halts any ongoing speech playback.
 */
export function stopSpeaking() {
  isCancelingSpeech = true
  stopSpeechKeepAlive()
  if (activeAzureSynthesizer) {
    try {
      activeAzureSynthesizer.close()
    } catch (e) {
      console.warn('Error closing synthesizer:', e)
    }
    activeAzureSynthesizer = null
  }
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel()
  }
}

/**
 * Returns whether speech is currently playing.
 */
export function isSpeaking() {
  return (
    activeAzureSynthesizer !== null ||
    ('speechSynthesis' in window && window.speechSynthesis.speaking)
  )
}
