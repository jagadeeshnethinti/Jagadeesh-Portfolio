import { useEffect, useRef, useState } from 'react'
import VideoBackground from './VideoBackground.jsx'
import Dashboards from './Dashboards.jsx'
import Counter from './Counter.jsx'
import ProjectModal from './ProjectModal.jsx'
import CustomCursor from './CustomCursor.jsx'
import {
  PaletteIcon,
  GooglePlayIcon,
  ArrowRightIcon,
  ExternalLinkIcon,
  LinkedInIcon,
  MailIcon,
  PhoneIcon,
  DownloadIcon,
  PowerBIIcon,
  FinanceCertIcon,
  DegreeIcon,
} from './Icons.jsx'

const RESUME = '/Jagadeesh_Nethinti_Resume.pdf'

/* ------------------------------------------------------------------ *
 *  Content
 * ------------------------------------------------------------------ */
const SKILLS = [
  {
    title: 'Generative AI & Foundation Models',
    items: [
      'Anthropic Claude API',
      'OpenAI / ChatGPT API',
      'Local LLM Hosting (Ollama)',
      'Hugging Face Transformers',
      'Autonomous Chatbot Systems',
      'Prompt Engineering & Guardrails',
      'Context Optimization & Few-Shot Modeling',
    ],
  },
  {
    title: 'Mobile & Frontend Architecture',
    items: [
      'React Native (iOS & Android)',
      'TypeScript',
      'Modern JavaScript (ES6+)',
      'Redux Toolkit & State Normalization',
      'Responsive & Accessible UI Systems',
      'React.js',
      'Runtime & Re-render Optimization',
    ],
  },
  {
    title: 'Backend Engineering & Distributed Systems',
    items: [
      'NestJS (Microservices Architecture)',
      'Node.js Runtime',
      'RESTful API Design & OpenAPI',
      'Cryptographic JWT Authentication & RBAC',
      'Real-Time Geospatial Telemetry (WebSockets)',
      'Linux Server Administration',
      'Version Control (Git & GitHub Flow)',
    ],
  },
  {
    title: 'Database Architecture & Cloud Data',
    items: [
      'PostgreSQL',
      'MySQL',
      'Firebase Realtime & Firestore',
      'Advanced SQL (Window Functions, CTEs, Indexing)',
      'Relational Data Modeling',
      'Automated ETL Pipelines',
    ],
  },
  {
    title: 'Data Intelligence & Advanced Analytics',
    items: [
      'Python (Pandas, NumPy)',
      'Power BI (DAX, Star Schema Modeling)',
      'Statistical Hypothesis Testing',
      'Jupyter Notebook & Exploratory Data Analysis',
      'Advanced Excel (Power Query, VBA Automation)',
    ],
  },
  {
    title: 'System Design & Engineering Methodologies',
    items: [
      'Full-Lifecycle System Architecture',
      'Google Play Production Deployment',
      'Application Performance Profiling',
      'Event-Driven Microservices',
      'Agile / Rapid Prototyping Methodologies',
      'Cross-Functional Stakeholder Alignment',
    ],
  },
]

const EXPERIENCE = [
  {
    role: 'Full Stack & AI Software Engineer',
    company: 'Pengwin Solutions Pvt. Ltd., Hyderabad',
    period: 'Jul 2024 – Present',
    note: 'Core Full-Stack & AI Engineer on a high-velocity 2-person engineering team',
    points: [
      'Spearheaded the architectural design and deployment of 11+ mobile client applications and NestJS microservices over 2.3 years, ensuring high system availability and sub-second response times.',
      'Developed 20+ modular, accessible, and high-performance screens in React Native utilizing Redux Toolkit, slashing redundant re-renders and optimizing memory consumption.',
      'Integrated enterprise-grade generative AI capabilities via Anthropic Claude and OpenAI / ChatGPT APIs — engineering prompt orchestration layers, output validation guardrails, and autonomous conversational agents.',
      'Architected resilient authorization microservices incorporating cryptographic JWT authentication, role-based access controls (RBAC), and normalized relational schemas across PostgreSQL and MySQL.',
      'Engineered automated ETL pipelines and executive Power BI dashboards with custom dimensional DAX measures, providing C-level stakeholders with real-time visibility into revenue, user retention, and campaign metrics.',
      'Conducted rigorous statistical and behavioral data analysis using advanced SQL (window functions, common table expressions) and Python — identifying SUVs as the primary revenue generator (35% of gross revenue) and driving a 15% efficiency lift in customer acquisition campaigns.',
    ],
  },
]

const REVENUE_DATA = [
  ['SUV', 35],
  ['Sedan', 24],
  ['Hatchback', 18],
  ['Luxury', 14],
  ['Van', 9],
]

const PROJECTS = [
  {
    name: 'Radii — AI Healthcare Nutrition Platform',
    category: 'AI Systems · Mobile · Clinical Tech',
    mono: 'Ra',
    grad: 'linear-gradient(135deg, #0fbf8f 0%, #0a6d8c 100%)',
    img: '/projects/radii-icon.svg',
    stack: ['React Native', 'NestJS', 'Claude API', 'ChatGPT API', 'Python', 'SQL', 'Power BI'],
    blurb:
      'Clinical-grade dietary recommendation ecosystem driven by orchestrated Anthropic Claude and OpenAI ChatGPT APIs. Supported by high-throughput NestJS microservices, automated Python nutritional normalization, and administrative Power BI telemetry.',
    metric: 'Multi-LLM Clinical Engine',
    access: 'Enterprise AI Platform',
    telemetry: {
      badge: 'Multi-LLM Pipeline',
      title: 'Clinical AI Telemetry',
      kpis: [
        { label: 'Inference Latency', value: '240ms', sub: 'Claude & ChatGPT multi-model pipeline' },
        { label: 'Verification Rate', value: '99.8%', sub: 'zero-hallucination validation' },
      ],
      type: 'radii',
      insight: 'Sub-second multi-turn response streaming with strict clinical prompt guardrails across chronic patient cohorts.',
    },
    details: [
      'Architected a high-concurrency mobile application delivering individualized clinical nutritional regimens synthesized from user diagnostic markers (e.g., Type-2 Diabetes, Hypertension).',
      'Orchestrated multi-model foundation LLM pipelines (Anthropic Claude & OpenAI ChatGPT) backed by NestJS services to enforce strict clinical prompt guardrails and zero-hallucination thresholds.',
      'Constructed relational SQL schemas for comprehensive micronutrient catalogs and implemented automated Python data pipelines for nutritional feature engineering.',
      'Engineered responsive React Native client interfaces with real-time biometric intake validation and sub-second recommendation streaming.',
      'Designed administrative telemetry dashboards in Power BI monitoring cohort adherence, model interaction latency, and diagnostic feedback loops.',
    ],
  },
  {
    name: 'SM Lorry — Freight Logistics & Telemetry Ecosystem',
    category: 'Enterprise Mobile · NestJS · Real-Time GPS · AI',
    mono: 'SM',
    grad: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
    img: '/projects/smlorry-icon.png',
    shots: ['/projects/smlorry-1.png', '/projects/smlorry-2.png', '/projects/smlorry-3.png'],
    stack: ['React Native', 'NestJS', 'AI Chatbot', 'SQL', 'Real-Time Tracking', 'Google Play'],
    blurb:
      'Dual-application freight logistics ecosystem deployed on Google Play (Simhadri Transport). Features continuous GPS telemetry, asynchronous driver dispatch, event-driven NestJS microservices, and an integrated LLM conversational agent for automated freight quote generation.',
    metric: '2 Production Apps on Google Play',
    access: 'Live on Google Play',
    link: 'https://play.google.com/store/apps/details?id=com.simhadritransport.customer',
    linkLabel: 'Google Play',
    telemetry: {
      badge: 'WebSockets Telemetry',
      title: 'Freight Dispatch & Fleet GPS',
      kpis: [
        { label: 'Dispatch Fulfillment', value: '99.4%', sub: 'real-time WebSockets driver tracking' },
        { label: 'Response Latency', value: '< 800ms', sub: 'sub-second driver matching' },
      ],
      type: 'smlorry',
      insight: 'Continuous GPS telemetry and geospatial driver tracking across interstate heavy freight routes.',
    },
    links: [
      {
        label: 'Customer App (Google Play)',
        badgeLabel: 'Customer App',
        url: 'https://play.google.com/store/apps/details?id=com.simhadritransport.customer',
      },
      {
        label: 'Driver App (Google Play)',
        badgeLabel: 'Driver App',
        url: 'https://play.google.com/store/apps/details?id=com.simhadritransport.driver',
      },
    ],
    details: [
      'Architected and shipped two production-grade mobile applications on Google Play: the Customer Freight Booking platform and the Driver Logistics Dispatch portal.',
      'Engineered scalable NestJS backend microservices managing distributed order state machines, driver matching algorithms, and automated freight rate calculations.',
      'Integrated an autonomous AI conversational agent providing 24/7 client freight consultations and programmatic haul estimations based on distance and vehicle tonnage.',
      'Structured relational PostgreSQL schemas with spatial indexing for real-time driver tracking, waypoint logging, and multi-checkpoint route optimization.',
      'Implemented bidirectional WebSockets and real-time geospatial telemetry for live vehicle coordinates streaming during active transport.',
      'Published on Google Play Store with verified active production distribution.',
    ],
  },
  {
    name: 'Hailo Cabs — On-Demand Ride Hailing & Mobility Ecosystem',
    category: 'Ride Hailing · Real-Time Dispatch · Multi-Modal Mobility · Google Play',
    mono: 'Hc',
    grad: 'linear-gradient(135deg, #eab308 0%, #ca8a04 100%)',
    img: '/projects/hailo-icon.png',
    shots: ['/projects/hailo-1.png', '/projects/hailo-2.png', '/projects/hailo-3.png'],
    stack: ['React Native', 'NestJS', 'PostgreSQL', 'WebSockets', 'Google Maps API', 'Google Play'],
    blurb:
      'Dual-application urban mobility and ride-hailing ecosystem deployed on Google Play (Hailo Cabs & Hailo Driver). Features multi-modal ride booking (Cabs, Autos, Bike Taxis, Outstation Rentals), upfront dynamic fare engines, and sub-second geospatial driver dispatch telemetry.',
    metric: '2 Production Apps on Google Play',
    access: 'Live on Google Play',
    link: 'https://play.google.com/store/apps/details?id=com.hailouser',
    linkLabel: 'User App',
    links: [
      {
        label: 'User App (Google Play)',
        badgeLabel: 'User App',
        url: 'https://play.google.com/store/apps/details?id=com.hailouser',
      },
      {
        label: 'Driver App (Google Play)',
        badgeLabel: 'Driver App',
        url: 'https://play.google.com/store/apps/details?id=com.hailodriver',
      },
    ],
    telemetry: {
      badge: 'Geospatial Telemetry',
      title: 'Dispatch Latency & Ride Fulfillment',
      kpis: [
        { label: 'Driver Match Latency', value: '< 650ms', sub: 'spatial radius driver indexing' },
        { label: 'Trip Fulfillment Rate', value: '98.9%', sub: 'live WebSockets trip telemetry' },
      ],
      type: 'hailo',
      insight: 'Engineered sub-second driver matching using spatial geospatial indexing and dynamic surge pricing state machines.',
    },
    details: [
      'Architected and delivered two production mobile applications on Google Play: the Hailo Rider User App and the Hailo Driver Partner Portal for Pengwin Solutions.',
      'Constructed a high-concurrency dispatch engine in NestJS with geospatial PostgreSQL queries, matching incoming rider ride requests to the nearest verified cabs, autos, or bike taxis within a 3km dynamic radius in under 650ms.',
      'Implemented real-time bidirectional WebSockets pipelines for live turn-by-turn vehicle tracking, route polylines, and continuous coordinate streaming.',
      'Engineered an automated dynamic fare calculation microservice factoring in distance, estimated trip duration, base tariffs, and peak-hour surge multipliers.',
      'Built driver payout ledger schemas with transactional integrity, trip history reporting, and instant daily earnings settlement workflows.',
      'Published both Rider and Driver platforms on Google Play Store with active urban transit adoption.',
    ],
  },
  {
    name: 'Portda — Maritime Port Shipments & Vessel Logistics Ecosystem',
    category: 'Maritime Systems · Port Logistics · Dual Mobile Architecture · Google Play',
    mono: 'Pd',
    grad: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
    img: '/projects/portda-icon.png',
    shots: ['/projects/portda-1.png', '/projects/portda-2.png', '/projects/portda-3.png'],
    stack: ['React Native', 'NestJS', 'PostgreSQL', 'Redux Toolkit', 'WebSockets', 'REST APIs', 'Google Play'],
    blurb:
      'Dual-platform maritime logistics ecosystem deployed on Google Play connecting vessel operators, shipping agents, and ship owners with certified port service contractors across international and domestic ports for streamlined ship services, supplies, technical maintenance, and vessel transport.',
    metric: '2 Production Apps on Google Play',
    access: 'Live on Google Play',
    link: 'https://play.google.com/store/apps/details?id=com.portda',
    linkLabel: 'Customer App',
    links: [
      {
        label: 'Customer App (Google Play)',
        badgeLabel: 'Customer App',
        url: 'https://play.google.com/store/apps/details?id=com.portda',
      },
      {
        label: 'Vendor App (Google Play)',
        badgeLabel: 'Vendor App',
        url: 'https://play.google.com/store/apps/details?id=com.portda.vendor',
      },
    ],
    telemetry: {
      badge: 'Maritime Telemetry',
      title: 'Port Shipments & Vessel Operations',
      kpis: [
        { label: 'Dispatch Fulfillment', value: '99.2%', sub: 'verified port service completion' },
        { label: 'Coordination Overhead', value: '−55%', sub: 'digital port marketplace acceleration' },
      ],
      type: 'portda',
      insight: 'Eliminated fragmented manual email/phone port coordination with centralized port-indexed digital service scheduling.',
    },
    details: [
      'Architected and delivered two production mobile applications on Google Play: the Portda Vessel Customer Booking App and the Portda Maritime Vendor Portal for Pengwin Solutions.',
      'Constructed a dual-sided marketplace architecture enabling ship owners and agents to discover certified port vendors, request ship maintenance, supplies, and logistics, and track service status during port calls.',
      'Engineered port-geofenced service catalogs in PostgreSQL with spatial indexing, mapping specialized maritime contractors to active commercial and cargo port terminals.',
      'Implemented real-time bidirectional order state machines and WebSockets dispatch for vessel service RFQs, vendor bidding, schedule confirmation, and operational milestone tracking.',
      'Designed high-availability NestJS backend APIs with strict JWT cryptographic authentication, role-based access control (RBAC), and offline-resilient Redux Toolkit state normalization.',
      'Published both Customer and Vendor platforms on Google Play Store with active commercial maritime adoption.',
    ],
  },
  {
    name: 'Lisa — Social Commerce & Local Business Platform',
    category: 'Social Commerce · Local Business Discovery · Mobile Marketplace · Google Play',
    mono: 'Ls',
    grad: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
    img: '/projects/lisa-icon.png',
    shots: [
      '/projects/lisa-screen1.webp',
      '/projects/lisa-screen2.webp',
      '/projects/lisa-screen3.webp',
      '/projects/lisa-screen4.webp',
    ],
    stack: ['React Native', 'NestJS', 'PostgreSQL', 'Redux Toolkit', 'REST APIs', 'Cloudinary / CDN', 'Google Play'],
    blurb:
      'Interactive social commerce and local business discovery ecosystem deployed on Google Play. Bridges social engagement, dynamic media feeds, and in-app service/product purchasing — enabling local merchants, freelancers, and businesses to showcase offerings through engaging posts and real-time commerce.',
    metric: 'Live on Google Play Store',
    access: 'Live on Google Play',
    link: 'https://play.google.com/store/apps/details?id=com.lisa.online',
    linkLabel: 'Google Play',
    telemetry: {
      badge: 'Social Commerce Telemetry',
      title: 'Feed Discovery & In-App Checkout',
      kpis: [
        { label: 'Feed Latency', value: '< 210ms', sub: 'CDN-cached media streaming' },
        { label: 'Conversion Lift', value: '+41%', sub: 'in-app social storefront conversion' },
      ],
      type: 'lisa',
      insight: 'Integrated social media discovery directly with in-app checkout, reducing purchase abandonment between discovery and merchant transaction.',
    },
    details: [
      'Architected and delivered the production Lisa social commerce mobile application on Google Play for Pengwin Solutions, integrating social media discovery with transactional e-commerce.',
      'Constructed modular React Native client interfaces utilizing Redux Toolkit state normalization for low-latency media feed browsing, instant catalog searching, and frictionless in-app booking.',
      'Engineered backend relational PostgreSQL schemas supporting local business catalogs, product inventory, service listings, user reviews, and order state machines.',
      'Implemented real-time merchant engagement features enabling local businesses, creators, and service providers to broadcast video demonstrations and story updates directly to targeted local customer feeds.',
      'Integrated low-latency media caching and CDN pipelines ensuring instantaneous loading of multimedia merchant reels, high-resolution product photos, and verified customer testimonials.',
      'Published on Google Play Store with active commercial business onboarding and local marketplace adoption.',
    ],
  },
  {
    name: 'Serum Healthcare — Clinical Diagnostics Platform',
    category: 'Mobile Systems · Healthcare · Production',
    mono: 'Se',
    grad: 'linear-gradient(135deg, #ff5f6d 0%, #c11533 100%)',
    img: '/projects/serum-icon.png',
    shots: ['/projects/serum-1.png', '/projects/serum-2.png', '/projects/serum-3.png'],
    stack: ['React Native', 'NestJS', 'Redux Toolkit', 'REST APIs', 'SQL'],
    blurb:
      'High-availability healthcare diagnostics platform deployed on Google Play, streamlining doorstep phlebotomy dispatch and automated digital pathology report delivery. Architected with React Native, resilient offline-tolerant state management, and HIPAA-conscious REST APIs.',
    metric: 'Live on Google Play Store',
    access: 'Live on Google Play',
    link: 'https://play.google.com/store/apps/details?id=in.serumhealthcare',
    linkLabel: 'Google Play',
    telemetry: {
      badge: 'Diagnostic Telemetry',
      title: 'Clinical Diagnostics Fulfillment',
      kpis: [
        { label: 'Doorstep Fulfillment', value: '98.6%', sub: 'phlebotomist dispatch completion' },
        { label: 'Delivery Turnaround', value: '−45%', sub: 'automated digital pathology delivery' },
      ],
      type: 'serum',
      insight: 'Accelerated patient diagnostic report delivery with HIPAA-compliant encrypted pipelines.',
    },
    details: [
      'Engineered the consumer-facing React Native mobile architecture for doorstep phlebotomy dispatch and multi-parameter diagnostic test scheduling.',
      'Constructed end-to-end encrypted medical report distribution workflows enabling patients to securely inspect, filter, and archive digital diagnostic records.',
      'Implemented resilient offline-tolerant state normalization using Redux Toolkit to guarantee seamless order submission under intermittent network connectivity.',
      'Integrated token-authenticated RESTful services upholding strict healthcare regulatory compliance and data confidentiality standards.',
      'Published on Google Play Store with verified active patient adoption.',
    ],
  },
  {
    name: 'Socialpost Telecaller — Clinical CRM & Patient Outreach Engine',
    category: 'Healthcare CRM · Mobile Architecture · Telephony · Google Play',
    mono: 'Sp',
    grad: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
    img: '/projects/socialpost-icon.png',
    shots: ['/projects/socialpost-1.png', '/projects/socialpost-2.png', '/projects/socialpost-3.png'],
    stack: ['React Native', 'NestJS', 'PostgreSQL', 'Redux Toolkit', 'REST APIs', 'Google Play'],
    blurb:
      'High-throughput clinical telecalling and patient lead management system deployed on Google Play. Built for healthcare outreach teams to manage inbound patient pipelines, schedule follow-ups, record clinical referrals, and track conversion funnels.',
    metric: 'Live on Google Play Store',
    access: 'Live on Google Play',
    link: 'https://play.google.com/store/apps/details?id=com.socialpost.telecalling',
    linkLabel: 'Google Play',
    telemetry: {
      badge: 'Healthcare CRM Telemetry',
      title: 'Patient Lead Conversion & Outreach',
      kpis: [
        { label: 'Follow-Up Adherence', value: '96.8%', sub: 'automated scheduled callback completion' },
        { label: 'Lead Conversion Lift', value: '+32%', sub: 'structured clinical referral tracking' },
      ],
      type: 'socialpost',
      insight: 'Streamlined patient lead pipelines, eliminating missed follow-ups with scheduled queue state machines and referral tracking.',
    },
    details: [
      'Architected and shipped the production Socialpost Telecaller mobile application on Google Play for enterprise healthcare outreach and patient communication teams.',
      'Constructed modular React Native client interfaces utilizing Redux Toolkit state normalization for low-latency call logging, patient record filtering, and disposition tagging.',
      'Engineered backend relational PostgreSQL schemas supporting patient lead lifecycle states (inbound, contacted, follow-up scheduled, referred, converted).',
      'Implemented automated follow-up scheduling queues and reminder state machines, boosting agent callback adherence to 96.8%.',
      'Structured end-to-end referral management tracking doctor and hospital patient referrals with audit logs and conversion funnel analytics.',
      'Published on Google Play Store with active clinical operations adoption.',
    ],
  },
  {
    name: 'CarHive — Fleet Logistics & Telemetry Platform',
    category: 'Mobile Architecture · Full Stack · Telemetry',
    mono: 'Ch',
    grad: 'linear-gradient(135deg, #2a6df0 0%, #6a3df0 100%)',
    img: '/projects/carhive-icon.png',
    shots: ['/projects/carhive-1.png', '/projects/carhive-2.png', '/projects/carhive-3.png'],
    stack: ['React Native', 'Redux Toolkit', 'JWT Auth', 'SQL', 'Power BI'],
    blurb:
      'Production fleet rental mobile application on Google Play engineered with real-time vehicle dispatch, cryptographic JWT session management, and normalized Redux Toolkit state architecture. Backed by relational telemetry revealing SUVs as the 35% primary revenue driver.',
    metric: 'Live on Google Play Store',
    access: 'Live on Google Play',
    link: 'https://play.google.com/store/apps/details?id=com.carhive.user',
    linkLabel: 'Google Play',
    chart: 'revenue',
    telemetry: {
      badge: 'Power BI · DAX',
      title: 'Fleet Segment Revenue Telemetry',
      kpis: [
        { label: 'Primary Revenue Driver', value: '35%', sub: 'SUV fleet gross revenue contribution' },
        { label: 'Campaign Efficiency', value: '+15%', sub: 'targeted customer acquisition lift' },
      ],
      type: 'revenue',
      insight: 'Discovered that SUV inventory generated 35% of platform gross revenue, directly steering fleet acquisition.',
    },
    details: [
      'Engineered a mission-critical mobile fleet rental application featuring real-time vehicle inventory synchronization, reservations, and cryptographic JWT authentication.',
      'Optimized client-side rendering performance via Redux Toolkit selector memoization, eliminating redundant component lifecycle re-renders across high-traffic screens.',
      'Formulated complex SQL queries (window functions, recursive CTEs) analyzing vehicle turnover rate and fleet utilization patterns.',
      'Engineered executive Power BI business intelligence dashboards demonstrating that SUV inventory represented 35% of platform gross revenue, directly steering fleet acquisition.',
      'Published on Google Play Store with active production distribution.',
    ],
  },
  {
    name: 'Retail Sales Performance Tracker',
    category: 'Enterprise Automation · ETL · Operations',
    mono: 'Rt',
    grad: 'linear-gradient(135deg, #b07cff 0%, #6a3df0 100%)',
    img: '/projects/retail-icon.png',
    shots: ['/projects/retail-1.png', '/projects/retail-2.png', '/projects/retail-3.png'],
    stack: ['React Native', 'Excel', 'Power Query', 'VBA', 'SQL'],
    blurb:
      'Automated enterprise business operations tracker consolidating multi-source transactional datasets via Power Query ETL pipelines, dynamic dimensional models, and programmatic VBA macros — accelerating reporting velocity by 70%.',
    metric: '−70% Report Generation Turnaround',
    access: 'Live on Google Play',
    link: 'https://play.google.com/store/apps/details?id=com.askrdukan.screentime',
    linkLabel: 'Google Play',
    chart: 'time',
    telemetry: {
      badge: 'Power Query · VBA',
      title: 'Automated ETL Pipeline Telemetry',
      kpis: [
        { label: 'Turnaround Reduction', value: '−70%', sub: 'automated multi-source ETL pipeline' },
        { label: 'Monthly Records', value: '50k+', sub: 'consolidated transactional logs' },
      ],
      type: 'time',
      insight: 'Replaced manual workbook compilation with programmatic VBA and Power Query pipelines.',
    },
    details: [
      'Architected an automated multi-source ETL pipeline leveraging Power Query to ingest and consolidate distributed monthly sales transactional logs without manual intervention.',
      'Engineered dynamic dimensional financial models incorporating dynamic lookup indexing, conditional thresholds, and anomaly detection.',
      'Automated end-to-end report generation and executive workbook compilation via programmatic VBA macros, reducing processing overhead by over 70%.',
      'Authored comprehensive technical and operational documentation enabling self-service maintenance across cross-functional business stakeholders.',
      'Published on Google Play Store with enterprise adoption.',
    ],
  },
  {
    name: 'Pizza Sales Customer Intelligence',
    category: 'SQL Engineering · Behavioral Analytics · BI',
    mono: 'Pz',
    grad: 'linear-gradient(135deg, #ff8a5b 0%, #d6263b 100%)',
    img: '/projects/pizza-icon.svg',
    stack: ['SQL', 'Python', 'Power BI', 'Tableau', 'Excel'],
    blurb:
      'End-to-end transactional data engineering and exploratory data analysis across 12+ months of enterprise sales logs. Formulated advanced SQL models, Python data validation pipelines, and executive Power BI dashboards to optimize inventory allocation and demand forecasting.',
    metric: '+20% Reporting Accuracy',
    access: 'Analytical Case Study',
    chart: 'pizza',
    telemetry: {
      badge: 'Tableau · SQL',
      title: 'Hourly Demand & Customer CLV',
      kpis: [
        { label: 'Peak Demand Windows', value: '1 PM & 8 PM', sub: 'operational staffing alignment' },
        { label: 'Downstream Accuracy', value: '+20%', sub: 'SQL & Python data validation' },
      ],
      type: 'pizza',
      insight: 'Mapped temporal order clusters and formulated CLV models to optimize operational margins.',
    },
    details: [
      'Conducted deep exploratory data analysis on 12+ months of transactional sales records, identifying top-margin SKUs, temporal demand clustering, and purchase frequency distributions.',
      'Engineered production Power BI and Tableau dashboards tracking revenue velocity, hourly order distributions, and regional performance indicators.',
      'Authored complex analytical SQL scripts (multi-table joins, subqueries, aggregation windows) establishing Customer Lifetime Value (CLV) and Average Order Value (AOV).',
      'Implemented Python (Pandas/NumPy) data cleaning pipelines mitigating data drift and anomalies, establishing a ~20% improvement in downstream reporting accuracy.',
    ],
  },
]

const STATS = [
  { end: 17, suffix: '+', label: 'Systems & Mobile Apps Deployed' },
  { end: 11, suffix: '+', label: 'Verified Google Play Releases' },
  { end: 15, prefix: '+', suffix: '%', label: 'Customer Acquisition Lift' },
  { end: 35, suffix: '%', label: 'Primary Revenue Driver Identified' },
  { end: 2.3, decimals: 1, suffix: ' yrs', label: 'Software & AI Engineering' },
]

/* ------------------------------------------------------------------ *
 *  Scroll reveal & 3D card tilt hooks
 * ------------------------------------------------------------------ */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.18 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function useCardTilt() {
  useEffect(() => {
    const isTouch =
      window.matchMedia('(hover: none) and (pointer: coarse)').matches ||
      'ontouchstart' in window
    if (isTouch) return

    const cards = document.querySelectorAll('.project, .viz-card, .skill-card, .cred')
    const cleanups = []

    cards.forEach((card) => {
      const handleMove = (e) => {
        const r = card.getBoundingClientRect()
        const x = (e.clientX - r.left) / r.width - 0.5
        const y = (e.clientY - r.top) / r.height - 0.5
        card.style.setProperty('--tilt-x', `${(x * 9).toFixed(2)}deg`)
        card.style.setProperty('--tilt-y', `${(-y * 9).toFixed(2)}deg`)
        card.style.setProperty('--spot-x', `${((x + 0.5) * 100).toFixed(1)}%`)
        card.style.setProperty('--spot-y', `${((y + 0.5) * 100).toFixed(1)}%`)
      }
      const handleLeave = () => {
        card.style.setProperty('--tilt-x', '0deg')
        card.style.setProperty('--tilt-y', '0deg')
      }
      card.addEventListener('mousemove', handleMove, { passive: true })
      card.addEventListener('mouseleave', handleLeave)
      cleanups.push(() => {
        card.removeEventListener('mousemove', handleMove)
        card.removeEventListener('mouseleave', handleLeave)
      })
    })

    return () => cleanups.forEach((fn) => fn())
  }, [])
}

const NAV_LINKS = [
  ['About', 'about'],
  ['Telemetry', 'dashboards'],
  ['Toolkit', 'skills'],
  ['Experience', 'experience'],
  ['Systems', 'projects'],
  ['Contact', 'contact'],
]

const THEMES = [
  { key: 'water', label: 'Water', sw: 'linear-gradient(135deg,#2fe0ff,#7affd6)' },
  { key: 'aqua', label: 'Aqua', sw: 'linear-gradient(135deg,#41ecdf,#7cc5ff)' },
  { key: 'cobalt', label: 'Cobalt', sw: 'linear-gradient(135deg,#3b82f6,#93c5fd)' },
  { key: 'sapphire', label: 'Sapphire', sw: 'linear-gradient(135deg,#0284c7,#38bdf8)' },
  { key: 'emerald', label: 'Emerald', sw: 'linear-gradient(135deg,#10b981,#6ee7b7)' },
  { key: 'teal', label: 'Teal', sw: 'linear-gradient(135deg,#0d9488,#2dd4bf)' },
  { key: 'forest', label: 'Forest', sw: 'linear-gradient(135deg,#059669,#34d399)' },
  { key: 'indigo', label: 'Indigo', sw: 'linear-gradient(135deg,#6366f1,#a5b4fc)' },
  { key: 'amber', label: 'Amber', sw: 'linear-gradient(135deg,#f59e0b,#fde047)' },
  { key: 'citron', label: 'Citron', sw: 'linear-gradient(135deg,#84cc16,#bef264)' },
  { key: 'arctic', label: 'Arctic', sw: 'linear-gradient(135deg,#38bdf8,#e0f2fe)' },
  { key: 'mono', label: 'Mono', sw: 'linear-gradient(135deg,#cbd5e1,#ffffff)' },
]

const VALID_THEME_KEYS = [
  'water', 'aqua', 'cobalt', 'sapphire', 'emerald', 'teal',
  'forest', 'indigo', 'amber', 'citron', 'arctic', 'mono', 'custom'
]

function hexToRgb(hex) {
  let c = hex.replace('#', '')
  if (c.length === 3) c = c.split('').map(x => x + x).join('')
  const num = parseInt(c, 16)
  return [num >> 16, (num >> 8) & 255, num & 255]
}

function hexToHsl(hex) {
  let [r, g, b] = hexToRgb(hex)
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h = 0, s = 0, l = (max + min) / 2
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break
      case g: h = (b - r) / d + 2; break
      case b: h = (r - g) / d + 4; break
    }
    h *= 60
  }
  return [Math.round(h), Math.round(s * 100), Math.round(l * 100)]
}

function hslToHex(h, s, l) {
  h = ((h % 360) + 360) % 360
  s /= 100
  l /= 100
  const k = n => (n + h / 30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
  const toHex = x => Math.round(x * 255).toString(16).padStart(2, '0')
  return `#${toHex(f(0))}${toHex(f(8))}${toHex(f(4))}`
}

function applyCustomColor(hex) {
  const [h, s, l] = hexToHsl(hex)
  const primary = hex
  const secondary = hslToHex(h + 24, Math.min(s + 10, 100), Math.max(l - 5, 20))
  const tertiary = hslToHex(h + 48, Math.min(s, 100), Math.min(l + 12, 85))

  const dark1 = hslToHex(h, Math.min(s + 20, 85), 14)
  const dark2 = hslToHex(h, Math.min(s + 15, 80), 8)
  const bgDeep = hslToHex(h, Math.min(s + 20, 80), 4)

  const hueShift = ((h - 190) + 360) % 360

  const doc = document.documentElement
  doc.style.setProperty('--accent-primary', primary)
  doc.style.setProperty('--accent-secondary', secondary)
  doc.style.setProperty('--accent-tertiary', tertiary)
  doc.style.setProperty('--cyan', primary)
  doc.style.setProperty('--orange', tertiary)
  doc.style.setProperty('--grad', `linear-gradient(110deg, ${primary} 0%, ${secondary} 50%, ${tertiary} 100%)`)
  doc.style.setProperty('--grad-subtle', `linear-gradient(110deg, ${primary}26 0%, ${tertiary}26 100%)`)
  doc.style.setProperty('--accent-glow', `${primary}73`)
  doc.style.setProperty('--accent-glow-subtle', `${primary}2e`)
  doc.style.setProperty('--accent-border', `${primary}59`)
  doc.style.setProperty('--b1', primary)
  doc.style.setProperty('--b2', secondary)
  doc.style.setProperty('--b3', tertiary)
  doc.style.setProperty('--b4', secondary)
  doc.style.setProperty('--video-tint', `${primary}59`)
  doc.style.setProperty('--video-filter', `brightness(1.1) contrast(1.15) saturate(1.35) hue-rotate(${hueShift}deg)`)
  doc.style.setProperty('--bg-grad', `radial-gradient(circle at 50% 20%, ${dark1} 0%, ${dark2} 55%, ${bgDeep} 100%)`)
  doc.style.setProperty('--body-bg', bgDeep)
  doc.style.setProperty('--glass-bg', `linear-gradient(135deg, ${dark1}80 0%, ${dark2}cc 100%)`)
  doc.style.setProperty('--glass-border', `1px solid ${primary}4d`)
}

function clearCustomColor() {
  const doc = document.documentElement
  const props = [
    '--accent-primary', '--accent-secondary', '--accent-tertiary',
    '--cyan', '--orange', '--grad', '--grad-subtle', '--accent-glow',
    '--accent-glow-subtle', '--accent-border', '--b1', '--b2',
    '--b3', '--b4', '--video-tint', '--video-filter', '--bg-grad', '--body-bg',
    '--glass-bg', '--glass-border'
  ]
  props.forEach(p => doc.style.removeProperty(p))
}

function ThemePicker() {
  const [open, setOpen] = useState(false)
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('bg-theme-v2')
    return VALID_THEME_KEYS.includes(saved) ? saved : 'water'
  })
  const [customColor, setCustomColor] = useState(() => localStorage.getItem('custom-theme-color') || '#2fe0ff')
  const pickerRef = useRef(null)

  // Close on outside click
  useEffect(() => {
    const onDocClick = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('click', onDocClick)
    return () => document.removeEventListener('click', onDocClick)
  }, [])

  // Apply active theme
  useEffect(() => {
    if (theme === 'custom') {
      document.documentElement.setAttribute('data-theme', 'custom')
      applyCustomColor(customColor)
    } else {
      clearCustomColor()
      document.documentElement.setAttribute('data-theme', theme)
    }
    localStorage.setItem('bg-theme-v2', theme)
  }, [theme, customColor])

  const selectPreset = (key) => {
    setTheme(key)
  }

  const handleCustomColorChange = (e) => {
    const val = e.target.value
    setCustomColor(val)
    setTheme('custom')
    localStorage.setItem('custom-theme-color', val)
  }

  return (
    <div className={`theme-picker ${open ? 'open' : ''}`} ref={pickerRef}>
      <button
        className="theme-toggle"
        onClick={() => setOpen((o) => !o)}
        aria-label="Customize theme and background color"
        title="Customize Color Palette & Ambience"
      >
        <PaletteIcon size={15} style={{ marginRight: '6px' }} />
        <span>Theme</span>
        <span className="theme-toggle-swatch" />
      </button>

      <div className="theme-menu">
        <div className="theme-menu-head">
          <span className="theme-menu-title">
            <PaletteIcon size={14} style={{ marginRight: '8px' }} />Color Ambience
          </span>
          <span style={{ fontSize: '0.72rem', color: 'var(--accent-primary)', fontWeight: 600 }}>
            {theme === 'custom' ? 'Custom' : theme.toUpperCase()}
          </span>
        </div>

        {/* Preset Palette Swatches */}
        <div className="theme-swatch-grid">
          {THEMES.map((t) => (
            <button
              key={t.key}
              className={`swatch-btn ${theme === t.key ? 'active' : ''}`}
              title={t.label}
              onClick={() => selectPreset(t.key)}
            >
              <span className="swatch-circle" style={{ background: t.sw }} />
              <span className="swatch-name">{t.label}</span>
            </button>
          ))}
        </div>

        {/* Live Custom Color Picker */}
        <div className="custom-color-card">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span className="custom-color-label">Custom Palette</span>
            <span style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>Live color preview</span>
          </div>
          <div className="custom-color-controls">
            <div className="custom-color-input-wrap">
              <input
                type="color"
                className="custom-color-input"
                value={customColor}
                onChange={handleCustomColorChange}
                aria-label="Pick custom background color"
              />
            </div>
            <div className="custom-color-desc">
              <span className="custom-color-hex">{customColor.toUpperCase()}</span>
              <span className="custom-color-hint">Live reactive palette</span>
            </div>
          </div>
        </div>

        <button
          className="theme-reset-btn"
          onClick={() => selectPreset('water')}
          title="Reset to default water theme"
        >
          Reset to Water Default
        </button>
      </div>
    </div>
  )
}

function Nav({ motion, onToggleMotion }) {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  // scrollspy — highlight the section currently in view
  useEffect(() => {
    const ids = NAV_LINKS.map(([, id]) => id)
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  return (
    <nav className="nav">
      <a href="#top" className="brand">
        <span className="brand-mark">JN</span> Jagadeesh Nethinti
      </a>
      <button
        className={`nav-toggle ${open ? 'open' : ''}`}
        onClick={() => setOpen((o) => !o)}
        aria-label="Menu"
      >
        <span /><span /><span />
      </button>
      <div className={`nav-links ${open ? 'open' : ''}`}>
        {NAV_LINKS.map(([label, id]) => (
          <a
            key={id}
            href={`#${id}`}
            className={active === id ? 'active' : ''}
            onClick={() => setOpen(false)}
          >
            {label}
          </a>
        ))}
        <button
          className="motion-toggle"
          onClick={onToggleMotion}
          aria-label={motion ? 'Pause background motion' : 'Play background motion'}
          title={motion ? 'Pause background motion' : 'Play background motion'}
        >
          {motion ? (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#38bdf8" aria-hidden="true">
              <rect x="5" y="3" width="4.5" height="18" rx="2" />
              <rect x="14.5" y="3" width="4.5" height="18" rx="2" />
            </svg>
          ) : (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#34d399" aria-hidden="true" style={{ marginLeft: '1px' }}>
              <path d="M6 4.5v15c0 .85.92 1.38 1.66.95l12-7.5c.74-.46.74-1.54 0-2l-12-7.5C6.92 3.12 6 3.65 6 4.5z" />
            </svg>
          )}
        </button>
        <ThemePicker />
        <a
          href="https://www.linkedin.com/in/jagadesh-nethinti-09364b235"
          target="_blank"
          rel="noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center' }}
        >
          <LinkedInIcon size={14} style={{ marginRight: '5px' }} />
          <span>LinkedIn</span>
        </a>
        <a className="nav-cta" href={RESUME} download style={{ display: 'inline-flex', alignItems: 'center' }}>
          <DownloadIcon size={14} style={{ marginRight: '6px' }} />
          <span>Curriculum Vitae</span>
        </a>
      </div>
    </nav>
  )
}

const ROTATE_WORDS = [
  'mission-critical AI architectures',
  'scalable NestJS microservices',
  'autonomous LLM orchestration',
  'real-time geospatial telemetry',
  'high-concurrency mobile systems',
]

function Rotator() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return
    const id = setInterval(() => setI((v) => (v + 1) % ROTATE_WORDS.length), 2200)
    return () => clearInterval(id)
  }, [])
  return (
    <span className="rotator">
      {ROTATE_WORDS.map((w, idx) => (
        <span key={w} className={`rot-word ${idx === i ? 'on' : ''}`}>
          {w}
        </span>
      ))}
    </span>
  )
}

function Portrait() {
  const ref = useRef(null)
  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.setProperty('--ry', `${(x * 14).toFixed(2)}deg`)
    el.style.setProperty('--rx', `${(-y * 12).toFixed(2)}deg`)
  }
  const reset = () => {
    const el = ref.current
    if (!el) return
    el.style.setProperty('--ry', '0deg')
    el.style.setProperty('--rx', '0deg')
  }
  return (
    <div className="portrait-wrap reveal">
      <div className="portrait-float">
        <div
          className="portrait"
          ref={ref}
          onMouseMove={onMove}
          onMouseLeave={reset}
        >
          <img src="/profile.jpg" alt="Jagadeesh Nethinti" />
          <span className="portrait-badge">AI Software Engineer</span>
        </div>
      </div>
    </div>
  )
}

function AppMiniChart({ type }) {
  if (type === 'radii') {
    return (
      <div className="mini-chart">
        <div className="mini-bars-header">
          <span>AI Foundation Model Latency</span>
          <span style={{ color: 'var(--cyan)' }}>Sub-second Streaming</span>
        </div>
        <div className="mini-bar-list">
          <div className="mini-bar-item">
            <span className="mini-lbl">Claude 3.5</span>
            <div className="mini-track">
              <div className="mini-fill" style={{ width: '48%', background: 'linear-gradient(90deg, #0fbf8f, #41ecdf)' }} />
            </div>
            <span className="mini-val" style={{ color: 'var(--cyan)' }}>240ms</span>
          </div>
          <div className="mini-bar-item">
            <span className="mini-lbl">GPT-4o</span>
            <div className="mini-track">
              <div className="mini-fill" style={{ width: '56%', background: 'linear-gradient(90deg, #10a37f, #2dd4bf)' }} />
            </div>
            <span className="mini-val">280ms</span>
          </div>
          <div className="mini-bar-item">
            <span className="mini-lbl">Ollama / Local</span>
            <div className="mini-track">
              <div className="mini-fill" style={{ width: '78%', background: 'linear-gradient(90deg, #6366f1, #818cf8)' }} />
            </div>
            <span className="mini-val">390ms</span>
          </div>
        </div>
      </div>
    )
  }

  if (type === 'smlorry') {
    return (
      <div className="mini-chart">
        <div className="mini-bars-header">
          <span>Interstate Fleet GPS &amp; Dispatch Telemetry</span>
          <span style={{ color: '#f59e0b', fontWeight: 600 }}>Live WebSockets</span>
        </div>
        <svg viewBox="0 0 280 60" preserveAspectRatio="none" style={{ height: '54px', width: '100%', margin: '4px 0' }}>
          <defs>
            <linearGradient id="smlGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f59e0b" stopOpacity="0.45" />
              <stop offset="1" stopColor="#f59e0b" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0,48 Q70,16 140,32 T280,10 L280,60 L0,60 Z" fill="url(#smlGrad)" />
          <path d="M0,48 Q70,16 140,32 T280,10" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="280" cy="10" r="4.5" fill="#f59e0b" />
          <circle cx="140" cy="32" r="3" fill="#fbbf24" />
          <circle cx="70" cy="22" r="3" fill="#fbbf24" />
        </svg>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'var(--muted)' }}>
          <span>Kakinada Hub</span>
          <span>Vijayawada Transit</span>
          <span style={{ color: '#f59e0b', fontWeight: 600 }}>Hyderabad (Active)</span>
        </div>
      </div>
    )
  }

  if (type === 'hailo') {
    return (
      <div className="mini-chart">
        <div className="mini-bars-header">
          <span>Driver Dispatch &amp; Matching Latency</span>
          <span style={{ color: '#eab308', fontWeight: 600 }}>Sub-second Match</span>
        </div>
        <svg viewBox="0 0 280 60" preserveAspectRatio="none" style={{ height: '54px', width: '100%', margin: '4px 0' }}>
          <defs>
            <linearGradient id="hailoGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#eab308" stopOpacity="0.45" />
              <stop offset="1" stopColor="#eab308" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0,50 Q60,18 120,38 T240,12 L280,8 L280,60 L0,60 Z" fill="url(#hailoGrad)" />
          <path d="M0,50 Q60,18 120,38 T240,12 L280,8" fill="none" stroke="#eab308" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="280" cy="8" r="4.5" fill="#eab308" />
          <circle cx="240" cy="12" r="3" fill="#fde047" />
          <circle cx="120" cy="38" r="3" fill="#fde047" />
          <circle cx="60" cy="22" r="3" fill="#fde047" />
        </svg>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'var(--muted)' }}>
          <span>Search (120ms)</span>
          <span>Radius Match (380ms)</span>
          <span style={{ color: '#eab308', fontWeight: 600 }}>Dispatched (610ms)</span>
        </div>
      </div>
    )
  }

  if (type === 'portda') {
    return (
      <div className="mini-chart">
        <div className="mini-bars-header">
          <span>Port Service Fulfillment Velocity</span>
          <span style={{ color: '#38bdf8' }}>−55% Coordination Time</span>
        </div>
        <div className="mini-bar-list">
          <div className="mini-bar-item">
            <span className="mini-lbl">Manual Port Call</span>
            <div className="mini-track">
              <div className="mini-fill" style={{ width: '100%', background: 'rgba(255,255,255,0.18)' }} />
            </div>
            <span className="mini-val">6.2 hrs</span>
          </div>
          <div className="mini-bar-item">
            <span className="mini-lbl">Portda App</span>
            <div className="mini-track">
              <div className="mini-fill" style={{ width: '45%', background: 'linear-gradient(90deg, #0284c7, #38bdf8)' }} />
            </div>
            <span className="mini-val" style={{ color: '#38bdf8', fontWeight: 700 }}>2.1 hrs</span>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'var(--muted)', marginTop: '2px' }}>
          <span>Vessel Maintenance &amp; Supplies</span>
          <span style={{ color: '#38bdf8', fontWeight: 600 }}>99.2% Port Dispatch Fulfillment</span>
        </div>
      </div>
    )
  }

  if (type === 'lisa') {
    return (
      <div className="mini-chart">
        <div className="mini-bars-header">
          <span>Social Feed to Checkout Conversion</span>
          <span style={{ color: '#ec4899', fontWeight: 600 }}>+41% Conversion Lift</span>
        </div>
        <div className="mini-bar-list">
          <div className="mini-bar-item">
            <span className="mini-lbl">Post Discovery</span>
            <div className="mini-track">
              <div className="mini-fill" style={{ width: '100%', background: 'rgba(255,255,255,0.22)' }} />
            </div>
            <span className="mini-val">100%</span>
          </div>
          <div className="mini-bar-item">
            <span className="mini-lbl">Product View</span>
            <div className="mini-track">
              <div className="mini-fill" style={{ width: '76%', background: 'linear-gradient(90deg, #f43f5e, #ec4899)' }} />
            </div>
            <span className="mini-val" style={{ color: '#f43f5e' }}>76%</span>
          </div>
          <div className="mini-bar-item">
            <span className="mini-lbl">In-App Checkout</span>
            <div className="mini-track">
              <div className="mini-fill" style={{ width: '52%', background: 'linear-gradient(90deg, #ec4899, #8b5cf6)' }} />
            </div>
            <span className="mini-val" style={{ color: '#ec4899', fontWeight: 700 }}>52%</span>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'var(--muted)', marginTop: '2px' }}>
          <span>Direct Social Storefronts</span>
          <span style={{ color: '#ec4899', fontWeight: 600 }}>&lt; 210ms Feed Streaming</span>
        </div>
      </div>
    )
  }

  if (type === 'serum') {
    return (
      <div className="mini-chart">
        <div className="mini-bars-header">
          <span>Diagnostics Report Turnaround Velocity</span>
          <span style={{ color: '#ff5f6d' }}>−45% Acceleration</span>
        </div>
        <div className="mini-bar-list">
          <div className="mini-bar-item">
            <span className="mini-lbl">Traditional</span>
            <div className="mini-track">
              <div className="mini-fill" style={{ width: '100%', background: 'rgba(255,255,255,0.18)' }} />
            </div>
            <span className="mini-val">24 hrs</span>
          </div>
          <div className="mini-bar-item">
            <span className="mini-lbl">Serum App</span>
            <div className="mini-track">
              <div className="mini-fill" style={{ width: '55%', background: 'linear-gradient(90deg, #ff5f6d, #c11533)' }} />
            </div>
            <span className="mini-val" style={{ color: '#ff5f6d', fontWeight: 700 }}>13 hrs</span>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'var(--muted)', marginTop: '2px' }}>
          <span>Doorstep Phlebotomy Dispatch</span>
          <span style={{ color: '#ff5f6d', fontWeight: 600 }}>98.6% On-Time Fulfillment</span>
        </div>
      </div>
    )
  }

  if (type === 'socialpost') {
    return (
      <div className="mini-chart">
        <div className="mini-bars-header">
          <span>Patient Conversion &amp; Outreach Funnel</span>
          <span style={{ color: '#10b981' }}>+32% Conversion Lift</span>
        </div>
        <div className="mini-bar-list">
          <div className="mini-bar-item">
            <span className="mini-lbl">Inbound Leads</span>
            <div className="mini-track">
              <div className="mini-fill" style={{ width: '100%', background: 'rgba(255,255,255,0.22)' }} />
            </div>
            <span className="mini-val">100%</span>
          </div>
          <div className="mini-bar-item">
            <span className="mini-lbl">Contacted</span>
            <div className="mini-track">
              <div className="mini-fill" style={{ width: '84%', background: 'linear-gradient(90deg, #34d399, #10b981)' }} />
            </div>
            <span className="mini-val" style={{ color: '#34d399' }}>84%</span>
          </div>
          <div className="mini-bar-item">
            <span className="mini-lbl">Scheduled / Conf</span>
            <div className="mini-track">
              <div className="mini-fill" style={{ width: '68%', background: 'linear-gradient(90deg, #10b981, #047857)' }} />
            </div>
            <span className="mini-val" style={{ color: '#10b981', fontWeight: 700 }}>68%</span>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'var(--muted)', marginTop: '2px' }}>
          <span>Automated Queue Reminders</span>
          <span style={{ color: '#10b981', fontWeight: 600 }}>96.8% Callback Adherence</span>
        </div>
      </div>
    )
  }

  if (type === 'revenue') {
    return (
      <div className="mini-chart">
        <div className="mini-bars-header">
          <span>Fleet Segment Gross Revenue Contribution</span>
          <span style={{ color: 'var(--cyan)' }}>SUV #1 Driver</span>
        </div>
        <div className="mini-bar-list">
          {REVENUE_DATA.slice(0, 3).map(([k, v], idx) => (
            <div className="mini-bar-item" key={k}>
              <span className="mini-lbl">{k}</span>
              <div className="mini-track">
                <div
                  className="mini-fill"
                  style={{
                    width: `${(v / 35) * 100}%`,
                    background: idx === 0 ? 'var(--grad)' : 'rgba(255,255,255,0.22)',
                  }}
                />
              </div>
              <span className="mini-val" style={idx === 0 ? { color: 'var(--cyan)', fontWeight: 700 } : {}}>
                {v}%
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (type === 'time') {
    return (
      <div className="mini-chart">
        <div className="mini-bars-header">
          <span>ETL Processing &amp; Reporting Velocity</span>
          <span style={{ color: '#b07cff' }}>−70% Reduction</span>
        </div>
        <div className="mini-bar-list">
          <div className="mini-bar-item">
            <span className="mini-lbl">Manual ETL</span>
            <div className="mini-track">
              <div className="mini-fill" style={{ width: '100%', background: 'rgba(255,255,255,0.18)' }} />
            </div>
            <span className="mini-val">4.5 hrs</span>
          </div>
          <div className="mini-bar-item">
            <span className="mini-lbl">Automated</span>
            <div className="mini-track">
              <div className="mini-fill" style={{ width: '30%', background: 'linear-gradient(90deg, #b07cff, #6a3df0)' }} />
            </div>
            <span className="mini-val" style={{ color: '#b07cff', fontWeight: 700 }}>1.3 hrs</span>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'var(--muted)', marginTop: '2px' }}>
          <span>50k+ Transaction Logs</span>
          <span style={{ color: '#b07cff', fontWeight: 600 }}>VBA &amp; Power Query Pipeline</span>
        </div>
      </div>
    )
  }

  if (type === 'pizza') {
    return (
      <div className="mini-chart">
        <div className="mini-bars-header">
          <span>Temporal Order Clustering &amp; CLV</span>
          <span style={{ color: '#ff8a5b' }}>Dual Peaks</span>
        </div>
        <svg viewBox="0 0 280 60" preserveAspectRatio="none" style={{ height: '54px', width: '100%', margin: '4px 0' }}>
          <defs>
            <linearGradient id="pizMiniGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ff8a5b" stopOpacity="0.45" />
              <stop offset="1" stopColor="#ff8a5b" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0,52 L25,48 L50,32 L75,26 L100,20 L125,29 L150,37 L175,32 L200,23 L225,15 L250,11 L275,21 L280,37 L280,60 L0,60 Z" fill="url(#pizMiniGrad)" />
          <path d="M0,52 L25,48 L50,32 L75,26 L100,20 L125,29 L150,37 L175,32 L200,23 L225,15 L250,11 L275,21 L280,37" fill="none" stroke="#ff8a5b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'var(--muted)' }}>
          <span>11 AM</span>
          <span style={{ color: '#ff8a5b', fontWeight: 600 }}>Lunch (1 PM)</span>
          <span>4 PM</span>
          <span style={{ color: '#ff8a5b', fontWeight: 600 }}>Dinner (8 PM)</span>
          <span>11 PM</span>
        </div>
      </div>
    )
  }

  return null
}

function ProjectCard({ p, i, setActiveProject, globalMode }) {
  const [tab, setTab] = useState(globalMode === 'telemetry' ? 'telemetry' : 'arch')

  useEffect(() => {
    if (globalMode === 'telemetry') {
      setTab('telemetry')
    } else if (globalMode === 'all') {
      setTab('arch')
    }
  }, [globalMode])

  return (
    <article
      className="project reveal glass"
      style={{ transitionDelay: `${(i % 2) * 90}ms` }}
      role="button"
      tabIndex={0}
      onClick={() => setActiveProject(p)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          setActiveProject(p)
        }
      }}
    >
      <div className="project-thumb" style={{ background: p.grad }}>
        {p.img ? (
          <img className="thumb-app" src={p.img} alt={`${p.name} logo`} loading="lazy" />
        ) : (
          <span className="thumb-mono big">{p.mono}</span>
        )}
        <span className="thumb-mono">{p.mono}</span>
        <span className="thumb-metric">{p.metric}</span>
        {p.link && <span className="live-badge">Live</span>}
      </div>

      <div className="project-body">
        <div className="card-tab-bar" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            className={`card-tab ${tab === 'arch' ? 'active' : ''}`}
            onClick={() => setTab('arch')}
          >
            Architecture
          </button>
          <button
            type="button"
            className={`card-tab ${tab === 'telemetry' ? 'active' : ''}`}
            onClick={() => setTab('telemetry')}
          >
            Telemetry Dashboard
          </button>
        </div>

        <span className="project-cat">{p.category}</span>
        <h3>{p.name}</h3>

        {tab === 'arch' ? (
          <>
            <p className="prose">{p.blurb}</p>

            {p.telemetry && (
              <button
                type="button"
                className="telemetry-pill-btn"
                onClick={(e) => {
                  e.stopPropagation()
                  setTab('telemetry')
                }}
                title="Open Telemetry Dashboard for this app"
              >
                <span>
                  <b>{p.telemetry.badge}</b>: {p.telemetry.kpis[0].value} {p.telemetry.kpis[0].label}
                </span>
                <span className="pill-arrow" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <span>Dashboard</span>
                  <ArrowRightIcon size={12} color="var(--accent-primary)" />
                </span>
              </button>
            )}

            <ul className="stack">
              {p.stack.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </>
        ) : (
          <div className="card-telemetry-panel" onClick={(e) => e.stopPropagation()}>
            <div className="card-telemetry-head">
              <span className="card-telemetry-tag">{p.telemetry.title}</span>
              <span className="card-telemetry-badge">{p.telemetry.badge}</span>
            </div>

            <div className="card-telemetry-kpis">
              {p.telemetry.kpis.map((kpi, kIdx) => (
                <div className="card-telemetry-kpi" key={kIdx}>
                  <span className="kpi-val grad">{kpi.value}</span>
                  <span className="kpi-lbl">{kpi.label}</span>
                  <span className="kpi-sub-lbl">{kpi.sub}</span>
                </div>
              ))}
            </div>

            <div className="card-telemetry-chart">
              <AppMiniChart type={p.telemetry.type} />
            </div>

            <p className="card-telemetry-insight">
              <span className="insight-lead">Finding:</span> {p.telemetry.insight}
            </p>
          </div>
        )}

        <div className="project-foot">
          {p.links ? (
            <div className="dual-links" onClick={(e) => e.stopPropagation()}>
              {p.links.map((lk) => (
                <a
                  key={lk.url}
                  className="store-badge"
                  href={lk.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  <GooglePlayIcon size={13} />
                  <span>{lk.badgeLabel || lk.label}</span>
                </a>
              ))}
            </div>
          ) : p.link ? (
            <a
              className="store-badge"
              href={p.link}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              <GooglePlayIcon size={13} />
              <span>{p.linkLabel}</span>
            </a>
          ) : (
            <span className="access-tag">{p.access}</span>
          )}
          <span className="project-link">
            <span>{tab === 'telemetry' ? 'Inspect Telemetry' : 'Explore Architecture'}</span>
            <ArrowRightIcon size={13} color="var(--cyan)" />
          </span>
        </div>
      </div>
    </article>
  )
}

export default function App() {
  useReveal()
  useCardTilt()
  const scrollRef = useRef(null)
  const [activeProject, setActiveProject] = useState(null)
  const [globalMode, setGlobalMode] = useState('all')

  const [motion, setMotion] = useState(() => {
    const saved = localStorage.getItem('bg-motion')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    return saved ? saved === 'on' : !reduce
  })
  useEffect(() => {
    document.documentElement.setAttribute('data-motion', motion ? 'on' : 'off')
    localStorage.setItem('bg-motion', motion ? 'on' : 'off')
  }, [motion])

  // progress bar
  useEffect(() => {
    const bar = scrollRef.current
    const onScroll = () => {
      const h = document.documentElement
      const top = h.scrollTop
      const p = top / (h.scrollHeight - h.clientHeight || 1)
      if (bar) bar.style.transform = `scaleX(${p})`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div id="top">
      <CustomCursor />
      <div className="scroll-progress" ref={scrollRef} />
      <VideoBackground />
      <div className="bg-vignette" />
      <Nav motion={motion} onToggleMotion={() => setMotion((m) => !m)} />

      <main className="site">
        {/* ---------- HERO ---------- */}
        <header className="hero" id="hero">
          <div className="hero-glass-card glass">
            <div className="hero-top-row">
              <div className="hero-eyebrow">
                <span className="dot" />
                <span>Senior Full-Stack &amp; AI Systems Engineer · Hyderabad, India</span>
              </div>
              <div className="hero-status-pill">
                <span className="status-live-ring" />
                <span>Available for High-Scale Roles &amp; AI Architecture</span>
              </div>
            </div>

            <h1 className="hero-title">
              Architecting <span className="grad">AI-Native Platforms</span> —
              <br /> Scaled into <span className="grad">High-Performance Production</span>.
            </h1>

            <p className="hero-build">
              Architecting <Rotator /> engineered for mission-critical scale.
            </p>

            <p className="hero-lede">
              Senior Full-Stack &amp; AI Systems Engineer with <span className="hl">2.3+ years</span> of
              production experience architecting <span className="hl">17+ mobile systems &amp; microservices</span> using
              React Native, NestJS, and Node.js. Specializing in autonomous multi-LLM orchestration (<span className="hl">Anthropic Claude &amp; ChatGPT</span>),
              edge inference (<span className="hl">Ollama &amp; Hugging Face</span>), cryptographic auth, and real-time geospatial telemetry.
            </p>

            <div className="hero-actions">
              <a className="btn primary" href="#projects">
                <span>Explore Production Systems</span>
                <ArrowRightIcon size={15} style={{ marginLeft: '6px' }} />
              </a>
              <a className="btn ghost" href={RESUME} download>
                <DownloadIcon size={15} style={{ marginRight: '6px' }} />
                <span>Download Technical CV</span>
              </a>
              <a className="btn ghost" href="#contact">
                <MailIcon size={15} style={{ marginRight: '6px' }} />
                <span>Get In Touch</span>
              </a>
            </div>

            <div className="hero-metrics-grid">
              <div className="hero-metric-card">
                <span className="metric-val grad">17+</span>
                <span className="metric-label">Production Client Apps &amp; NestJS Backends Delivered</span>
              </div>
              <div className="hero-metric-card">
                <span className="metric-val grad">11+</span>
                <span className="metric-label">Verified Production Releases on Google Play Store</span>
              </div>
              <div className="hero-metric-card">
                <span className="metric-val grad">Multi-LLM</span>
                <span className="metric-label">Claude, GPT-4 &amp; Local Quantized Inference (Ollama)</span>
              </div>
              <div className="hero-metric-card">
                <span className="metric-val grad">2.3+ Yrs</span>
                <span className="metric-label">Mission-Critical Enterprise Distributed Systems</span>
              </div>
            </div>

            <div className="hero-tech-strip">
              <div className="tech-strip-item">
                <span className="tech-strip-k">CORE FRAMEWORKS</span>
                <span className="tech-strip-v">React Native · NestJS · Node.js</span>
              </div>
              <div className="tech-strip-item">
                <span className="tech-strip-k">AI FOUNDATIONS</span>
                <span className="tech-strip-v">Claude API · ChatGPT · Ollama Edge</span>
              </div>
              <div className="tech-strip-item">
                <span className="tech-strip-k">DATA &amp; CLOUD</span>
                <span className="tech-strip-v">PostgreSQL · Python ETL · Power BI</span>
              </div>
              <div className="tech-strip-item">
                <span className="tech-strip-k">SECURITY &amp; TELEMETRY</span>
                <span className="tech-strip-v">Cryptographic JWT · RBAC · WebSockets</span>
              </div>
            </div>
          </div>
        </header>

        {/* ---------- STATS ---------- */}
        <section className="section stats-wrap">
          <div className="container stats reveal glass">
            {STATS.map((s) => (
              <div className="stat" key={s.label}>
                <Counter
                  className="stat-value grad"
                  end={s.end}
                  decimals={s.decimals || 0}
                  prefix={s.prefix || ''}
                  suffix={s.suffix || ''}
                />
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ---------- ABOUT ---------- */}
        <section id="about" className="section">
          <div className="container about-grid">
            <Portrait />
            <div className="reveal">
              <p className="kicker">01 — Engineering Profile</p>
              <h2 className="section-title">
                AI-native architecture, full-stack engineering precision.
              </h2>
              <p className="prose">
                I am a <strong>Senior Full-Stack &amp; AI Systems Engineer</strong> with <span className="hl">2.3+ years</span> of
                rigorous production experience architecting and deploying <span className="hl">17+ mobile client systems</span> and
                backend microservices utilizing <strong>React Native, NestJS, and Node.js</strong>.
                Operating as the primary core engineer on a high-velocity 2-person team at Pengwin Solutions, I spearhead
                end-to-end distributed system architecture, database schema design, and production client applications.
              </p>
              <p className="prose">
                My technical specialization focuses on integrating enterprise foundation models into live production workflows:
                orchestrating <span className="hl">Anthropic Claude &amp; OpenAI ChatGPT APIs</span>, engineering multi-turn context guardrails,
                deploying local quantized inference via <span className="hl">Ollama &amp; Hugging Face</span>, and delivering zero-hallucination conversational agents.
                Across <span className="hl">11+ verified production applications on Google Play</span> (including Lisa Social Commerce, the Hailo Cabs Mobility Ecosystem, Socialpost Telecaller, the Portda Maritime Ecosystem, Simhadri Transport Freight Ecosystem,
                Serum Healthcare, CarHive, and AskrDukan), I have implemented real-time WebSockets telemetry, sub-second GPS tracking, and cryptographic JWT authorization.
              </p>
              <p className="prose">
                In tandem with core systems engineering, I bridge software architecture with quantitative intelligence — formulating analytical SQL models
                (window functions, recursive CTEs), high-throughput Python (Pandas/NumPy) transformation pipelines, and executive Power BI dimensional reporting.
                This unified data-driven paradigm directly accelerates product outcomes, such as discovering that SUV inventory drove <span className="hl">35% of platform gross revenue</span>.
              </p>
              <ul className="chips">
                <li>Claude &amp; ChatGPT APIs</li>
                <li>Local LLMs &amp; Ollama</li>
                <li>NestJS Microservices</li>
                <li>React Native Architecture</li>
                <li>Context &amp; Prompt Engineering</li>
                <li>PostgreSQL &amp; Spatial Telemetry</li>
                <li>Cryptographic JWT &amp; RBAC</li>
                <li>Executive BI &amp; Python ETL</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ---------- DASHBOARDS ---------- */}
        <Dashboards />

        {/* ---------- SKILLS ---------- */}
        <section id="skills" className="section">
          <div className="container">
            <p className="kicker reveal">03 — Core Competencies</p>
            <h2 className="section-title reveal">Technical Architecture &amp; Engineering Stack</h2>
            <div className="skill-grid">
              {SKILLS.map((g, i) => (
                <div
                  className="skill-card reveal glass"
                  key={g.title}
                  style={{ transitionDelay: `${i * 80}ms` }}
                >
                  <h3>{g.title}</h3>
                  <ul>
                    {g.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- EXPERIENCE ---------- */}
        <section id="experience" className="section">
          <div className="container">
            <p className="kicker reveal">04 — Professional Experience</p>
            <h2 className="section-title reveal">Engineering Track Record &amp; Impact</h2>
            <div className="timeline">
              {EXPERIENCE.map((job) => (
                <div className="job reveal glass" key={job.role}>
                  <div className="job-head">
                    <div>
                      <h3>{job.role}</h3>
                      <p className="company">{job.company}</p>
                      <p className="note">{job.note}</p>
                    </div>
                    <span className="period">{job.period}</span>
                  </div>
                  <ul className="job-points">
                    {job.points.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------- PROJECTS ---------- */}
        <section id="projects" className="section">
          <div className="container">
            <div className="projects-header-row">
              <div>
                <p className="kicker reveal">05 — Production Systems</p>
                <h2 className="section-title reveal">Featured Engineering Deliverables</h2>
              </div>
              <div className="projects-view-toggle reveal">
                <button
                  type="button"
                  className={`view-toggle-btn ${globalMode === 'all' ? 'active' : ''}`}
                  onClick={() => setGlobalMode('all')}
                >
                  Architecture
                </button>
                <button
                  type="button"
                  className={`view-toggle-btn ${globalMode === 'telemetry' ? 'active' : ''}`}
                  onClick={() => setGlobalMode('telemetry')}
                >
                  Production Telemetry
                </button>
              </div>
            </div>

            <div className="project-grid">
              {PROJECTS.map((p, i) => (
                <ProjectCard
                  key={p.name}
                  p={p}
                  i={i}
                  setActiveProject={setActiveProject}
                  globalMode={globalMode}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ---------- CERTS / EDUCATION ---------- */}
        <section className="section">
          <div className="container two-col">
            <div className="reveal">
              <p className="kicker">06 — Credentials &amp; Academics</p>
              <h2 className="section-title">Certifications &amp; Academic Foundation</h2>
            </div>
            <div className="reveal cred-list">
              <div className="cred glass">
                <div className="cred-title-row">
                  <PowerBIIcon size={24} />
                  <h3>Microsoft Certified: Power BI Data Analyst</h3>
                </div>
                <p>Simplilearn / Microsoft Curriculum · 2024</p>
                <p className="muted">
                  Focus: Star Schema Dimensional Modeling, Advanced DAX, Enterprise Data Pipelines &amp; DirectQuery Telemetry
                </p>
              </div>
              <div className="cred glass">
                <div className="cred-title-row">
                  <FinanceCertIcon size={24} />
                  <h3>Advanced Financial &amp; Operational Modeling</h3>
                </div>
                <p>Simplilearn Professional Certification · 2024</p>
                <p className="muted">
                  Focus: Automated Power Query ETL, Programmatic VBA Macros, Statistical Anomaly Detection
                </p>
              </div>
              <div className="cred glass">
                <div className="cred-title-row">
                  <DegreeIcon size={24} />
                  <h3>B.Sc. in Computer Science — Artificial Intelligence &amp; Robotics</h3>
                </div>
                <p>Aditya Degree College, Kakinada · 2021 – 2024</p>
                <p className="muted">
                  Core Foundations: Distributed Systems Architecture, Deep Learning &amp; Neural Models, Relational DBMS, Data Structures &amp; Algorithms, Statistical Inference
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- CONTACT ---------- */}
        <section id="contact" className="section contact">
          <div className="container">
            <div className="contact-box glass reveal">
              <p className="kicker">07 — Collaboration &amp; Inquiries</p>
              <h2 className="big-cta">
                Architecting the Next Generation of <span className="grad">Intelligent Software</span>
              </h2>
              <p className="lede center">
                Actively considering roles in Senior Full-Stack Engineering, AI Systems Architecture,
                and High-Scale Mobile Development. Let’s collaborate to build mission-critical, enterprise-grade platforms.
              </p>
              <div className="contact-actions">
                <a className="btn primary" href="mailto:jagadeeshnethinti809@gmail.com">
                  <MailIcon size={16} />
                  <span>jagadeeshnethinti809@gmail.com</span>
                </a>
                <a className="btn ghost" href="tel:+919392696206">
                  <PhoneIcon size={16} />
                  <span>+91 93926 96206</span>
                </a>
                <a
                  className="btn ghost"
                  href="https://www.linkedin.com/in/jagadesh-nethinti-09364b235"
                  target="_blank"
                  rel="noreferrer"
                >
                  <LinkedInIcon size={16} />
                  <span>LinkedIn Profile</span>
                  <ExternalLinkIcon size={13} color="var(--accent-primary)" />
                </a>
                <a className="btn ghost" href={RESUME} download>
                  <DownloadIcon size={16} />
                  <span>Download Technical CV</span>
                </a>
              </div>
            </div>
          </div>
          <footer className="footer">
            <span>© {new Date().getFullYear()} Jagadeesh Nethinti</span>
            <span>Hyderabad, India · Senior Full-Stack &amp; AI Systems Engineer</span>
          </footer>
        </section>
      </main>

      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />
    </div>
  )
}
