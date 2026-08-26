import { useEffect, useState } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { EVENT } from './data/event'
import { EVENT_SCHEDULE } from './data/schedule'

const COUNTDOWN_UNITS = [
  { key: 'days', label: 'Days' },
  { key: 'hours', label: 'Hours' },
  { key: 'minutes', label: 'Minutes' },
  { key: 'seconds', label: 'Seconds' },
]

const NAV_LINKS = [
  { href: '#about', label: 'About' },
  { href: '#schedule', label: 'Schedule' },
  { href: '#faq', label: 'FAQ' },
]

function getCountdownParts(targetMs) {
  const diff = Math.max(0, targetMs - Date.now())
  const totalSeconds = Math.floor(diff / 1000)
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    done: diff === 0,
  }
}

function pad2(n) {
  return String(n).padStart(2, '0')
}

function useCountdown(targetIso) {
  const targetMs = new Date(targetIso).getTime()
  const [parts, setParts] = useState(() => getCountdownParts(targetMs))

  useEffect(() => {
    const tick = () => setParts(getCountdownParts(targetMs))
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [targetMs])

  return parts
}

function CountdownCompact({ parts, className = '' }) {
  if (parts.done) {
    return (
      <span className={`header-countdown header-countdown-live ${className}`} aria-live="polite">
        Live now
      </span>
    )
  }

  return (
    <a
      href="#countdown"
      className={`header-countdown ${className}`}
      aria-label={`${parts.days} days, ${parts.hours} hours, ${parts.minutes} minutes, ${parts.seconds} seconds until kickoff`}
    >
      <span className="header-countdown-block">
        <span className="header-countdown-num">{parts.days}</span>
        <span className="header-countdown-unit">d</span>
      </span>
      <span className="header-countdown-block">
        <span className="header-countdown-num">{pad2(parts.hours)}</span>
        <span className="header-countdown-unit">h</span>
      </span>
      <span className="header-countdown-block">
        <span className="header-countdown-num">{pad2(parts.minutes)}</span>
        <span className="header-countdown-unit">m</span>
      </span>
      <span className="header-countdown-block header-countdown-secs">
        <span className="header-countdown-num">{pad2(parts.seconds)}</span>
        <span className="header-countdown-unit">s</span>
      </span>
    </a>
  )
}

function SiteHeader() {
  const parts = useCountdown(EVENT.startsAt)
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  return (
    <header className={`site-header${scrolled || menuOpen ? ' site-header-solid' : ''}`}>
      <div className="site-header-inner">
        <a href="#top" className="site-header-logo" onClick={closeMenu}>
          <img
            src="/images/hackatl/temp-logo.png"
            alt={`HackATL ${EVENT.year}`}
            className="site-header-logo-img"
          />
        </a>

        <nav className="site-header-nav" aria-label="Page">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="site-header-link">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="site-header-actions">
          <CountdownCompact parts={parts} className="site-header-countdown-desk" />
          <a
            href={EVENT.links.registration}
            target="_blank"
            rel="noreferrer"
            className="btn-primary site-header-cta"
          >
            Sign up
          </a>
          <button
            type="button"
            className="site-header-menu-btn"
            aria-expanded={menuOpen}
            aria-controls="site-header-drawer"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className={`site-header-menu-icon${menuOpen ? ' is-open' : ''}`} aria-hidden />
          </button>
        </div>
      </div>

      <div
        id="site-header-drawer"
        className={`site-header-drawer${menuOpen ? ' is-open' : ''}`}
        hidden={!menuOpen}
      >
        <CountdownCompact parts={parts} className="site-header-countdown-mobile" />
        <nav className="site-header-drawer-nav" aria-label="Page mobile">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="site-header-drawer-link" onClick={closeMenu}>
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href={EVENT.links.registration}
          target="_blank"
          rel="noreferrer"
          className="btn-primary site-header-drawer-cta"
          onClick={closeMenu}
        >
          Sign up now
        </a>
      </div>
    </header>
  )
}

function CountdownHero() {
  const parts = useCountdown(EVENT.startsAt)

  return (
    <section
      id="countdown"
      className="countdown-hero relative overflow-hidden"
      aria-labelledby="countdown-heading"
    >
      <div className="countdown-hero-ambient" aria-hidden>
        <div className="countdown-hero-mesh" />
        <div className="countdown-hero-line" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 sm:px-8 py-20 md:py-28 text-center">
        <p className="countdown-kicker">HackATL {EVENT.year}</p>
        <h2 id="countdown-heading" className="countdown-heading">
          {parts.done ? 'We are live' : 'Until kickoff'}
        </h2>
        <p className="countdown-sub">
          {parts.done
            ? `Welcome to ${EVENT.dates} at ${EVENT.locationShort}.`
            : `${EVENT.dates} · ${EVENT.locationShort}`}
        </p>

        <div
          className="countdown-grid"
          role="timer"
          aria-live="polite"
          aria-atomic="true"
          aria-label={
            parts.done
              ? 'HackATL has started'
              : `${parts.days} days, ${parts.hours} hours, ${parts.minutes} minutes, ${parts.seconds} seconds remaining`
          }
        >
          {COUNTDOWN_UNITS.map(({ key, label }, i) => (
            <div key={key} className="countdown-unit">
              {i > 0 && (
                <span className="countdown-sep" aria-hidden>
                  :
                </span>
              )}
              <div className="countdown-unit-inner">
                <span className={`countdown-value${key === 'seconds' ? ' countdown-value-live' : ''}`}>
                  {key === 'days' ? parts[key] : pad2(parts[key])}
                </span>
                <span className="countdown-label">{label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Placeholder({ className = '', children = 'Image Placeholder' }) {
  return (
    <div className={`img-placeholder ${className}`}>{children}</div>
  )
}

function CalendarIcon({ label = 'Day' }) {
  const short = label.slice(0, 3)
  return (
    <div className="w-16 h-16 rounded-lg bg-white/10 ring-1 ring-hackatl-pink/30 shadow overflow-hidden flex flex-col">
      <div className="h-4 bg-hackatl-pink" />
      <div className="flex-1 flex items-center justify-center text-hackatl-pink font-extrabold text-sm tracking-wide">
        {short}
      </div>
    </div>
  )
}

const Icon = ({ children, className = 'w-4 h-4 text-hackatl-pink' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    {children}
  </svg>
)

const PinIcon = (props) => (
  <Icon {...props}>
    <path d="M12 21s-6-5.1-6-9a6 6 0 1 1 12 0c0 3.9-6 9-6 9Z" />
    <circle cx="12" cy="12" r="2.5" />
  </Icon>
)

const ClockIcon = (props) => (
  <Icon {...props}>
    <circle cx="12" cy="12" r="8" />
    <path d="M12 8v5l3 2" />
  </Icon>
)

const TrophyIcon = (props) => (
  <Icon {...props}>
    <path d="M8 4h8v2a4 4 0 0 1-8 0V4Z" />
    <path d="M8 4H5a3 3 0 0 0 3 3" />
    <path d="M16 4h3a3 3 0 0 1-3 3" />
    <path d="M12 14v4" />
    <path d="M9 21h6" />
  </Icon>
)

const BulbIcon = (props) => (
  <Icon {...props}>
    <path d="M9 18h6" />
    <path d="M9.5 14a5 5 0 1 1 5 0c-.8.6-1.5 1.2-1.7 2H11.2c-.2-.8-.9-1.4-1.7-2Z" />
  </Icon>
)

const RocketIcon = (props) => (
  <Icon {...props}>
    <path d="M5 19c1-3 4-5 7-5s6 2 7 5" />
    <path d="M12 4l2 4-4 2 2-6Z" />
  </Icon>
)

function HeroTechLayer() {
  const nodes = [
    [120, 180], [200, 140], [280, 200], [160, 280], [240, 320], [100, 360], [320, 380],
  ]
  const edges = [
    [0, 1], [1, 2], [0, 3], [3, 4], [1, 4], [2, 6], [4, 5], [3, 5], [4, 6],
  ]

  return (
    <div className="hero-tech-layer" aria-hidden>
      <svg
        className="hero-tech-svg"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Left — neural network */}
        <g className="hero-tech-neural" opacity="0.35">
          {edges.map(([a, b], i) => (
            <line
              key={`e-${i}`}
              x1={nodes[a][0]}
              y1={nodes[a][1]}
              x2={nodes[b][0]}
              y2={nodes[b][1]}
              stroke="#E8327C"
              strokeWidth="0.8"
            />
          ))}
          {nodes.map(([x, y], i) => (
            <g key={`n-${i}`}>
              <circle cx={x} cy={y} r="4" fill="#E8327C" opacity="0.5" className="hero-tech-node" style={{ animationDelay: `${i * 0.4}s` }} />
              <circle cx={x} cy={y} r="8" stroke="#E8327C" strokeWidth="0.5" opacity="0.25" />
            </g>
          ))}
        </g>

        {/* Right — circuit traces */}
        <g className="hero-tech-circuit" opacity="0.3" stroke="#E8327C" strokeWidth="0.9" strokeLinecap="round">
          <path d="M980 120 H1080 V200 H1020 V280 H1140" className="hero-tech-trace" />
          <path d="M920 240 H1000 V160 H880 V320 H960 V400" className="hero-tech-trace" style={{ animationDelay: '1s' }} />
          <path d="M1040 360 H920 V440 H1100 V520" className="hero-tech-trace" style={{ animationDelay: '2s' }} />
          <circle cx="1080" cy="200" r="3" fill="#E8327C" />
          <circle cx="1020" cy="280" r="3" fill="#E8327C" />
          <circle cx="960" cy="400" r="3" fill="#E8327C" />
          <circle cx="1100" cy="520" r="3" fill="#E8327C" />
        </g>

        {/* Top — binary stream */}
        <g className="hero-tech-binary" opacity="0.18" fill="#E8327C" fontSize="10" fontFamily="monospace">
          <text x="180" y="90">01101001</text>
          <text x="420" y="70">11010010</text>
          <text x="720" y="95">00101101</text>
          <text x="960" y="75">10110100</text>
        </g>

        {/* Corner iconography — poster-inspired */}
        <g transform="translate(88, 520)">
          <g className="hero-tech-icon" opacity="0.22">
            <path d="M24 14c-6 0-10 4-10 9 0 3 1 5 3 7-2 1-3 3-3 5 0 4 4 7 10 7s10-3 10-7c0-2-1-4-3-5 2-2 3-4 3-7 0-5-4-9-10-9Z" stroke="#E8327C" strokeWidth="1.2" />
            <path d="M24 22v8M18 26h12M20 30h8" stroke="#E8327C" strokeWidth="0.8" />
            <circle cx="20" cy="18" r="1.5" fill="#E8327C" />
            <circle cx="28" cy="18" r="1.5" fill="#E8327C" />
          </g>
        </g>

        <g transform="translate(1050, 160)">
          <g className="hero-tech-icon" opacity="0.2" style={{ animationDelay: '2s' }}>
            <rect x="8" y="8" width="32" height="32" rx="4" stroke="#E8327C" strokeWidth="1.2" />
            {[0, 1, 2, 3].map((i) => (
              <g key={i}>
                <line x1={14 + i * 8} y1="4" x2={14 + i * 8} y2="8" stroke="#E8327C" strokeWidth="1" />
                <line x1={14 + i * 8} y1="40" x2={14 + i * 8} y2="44" stroke="#E8327C" strokeWidth="1" />
                <line x1="4" y1={14 + i * 8} x2="8" y2={14 + i * 8} stroke="#E8327C" strokeWidth="1" />
                <line x1="40" y1={14 + i * 8} x2="44" y2={14 + i * 8} stroke="#E8327C" strokeWidth="1" />
              </g>
            ))}
            <text x="16" y="30" fill="#E8327C" fontSize="9" fontFamily="monospace" fontWeight="600">AI</text>
          </g>
        </g>

        <g transform="translate(1020, 580)">
          <g className="hero-tech-icon" opacity="0.2" style={{ animationDelay: '4s' }}>
            <path d="M16 10 L8 24 L16 38" stroke="#E8327C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M32 10 L40 24 L32 38" stroke="#E8327C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="26" y1="8" x2="22" y2="40" stroke="#E8327C" strokeWidth="0.8" opacity="0.6" />
          </g>
        </g>

        <g transform="translate(130, 120)">
          <g className="hero-tech-icon" opacity="0.18" style={{ animationDelay: '1s' }}>
            <circle cx="24" cy="24" r="6" stroke="#E8327C" strokeWidth="1" />
            <ellipse cx="24" cy="24" rx="20" ry="8" stroke="#E8327C" strokeWidth="0.8" transform="rotate(30 24 24)" />
            <ellipse cx="24" cy="24" rx="20" ry="8" stroke="#E8327C" strokeWidth="0.8" transform="rotate(-40 24 24)" />
          </g>
        </g>

        {/* Center-adjacent data particles */}
        <g opacity="0.25">
          {[
            [540, 200], [660, 240], [580, 340], [700, 180], [480, 260],
          ].map(([x, y], i) => (
            <rect
              key={i}
              x={x}
              y={y}
              width="5"
              height="5"
              fill="#E8327C"
              opacity={0.3 + i * 0.08}
              className="hero-tech-pixel"
              style={{ animationDelay: `${i * 0.6}s` }}
            />
          ))}
        </g>
      </svg>
    </div>
  )
}

function HeroGlobe() {
  const cx = 240
  const cy = 228

  return (
    <div className="hero-globe-wrap pointer-events-none absolute inset-0 z-[2] flex items-center justify-center" aria-hidden>
      <div className="hero-globe-halo" />
      <svg
        className="hero-globe-svg"
        viewBox="0 0 480 480"
        overflow="visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="globe-fill" cx="50%" cy="42%" r="50%">
            <stop offset="0%" stopColor="#1a0a2e" />
            <stop offset="55%" stopColor="#0d0618" />
            <stop offset="100%" stopColor="#050208" />
          </radialGradient>
          <radialGradient id="globe-highlight" cx="38%" cy="32%" r="45%">
            <stop offset="0%" stopColor="rgba(232,50,124,0.12)" />
            <stop offset="100%" stopColor="rgba(232,50,124,0)" />
          </radialGradient>
          <linearGradient id="horizon-glow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(232,50,124,0)" />
            <stop offset="100%" stopColor="rgba(232,50,124,0.55)" />
          </linearGradient>
          <filter id="pink-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Orbital rings — spin group rotates around globe center; ellipse tilt is fixed inside */}
        <g transform={`translate(${cx} ${cy})`}>
          <g>
            <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="24s" repeatCount="indefinite" />
            <ellipse cx="0" cy="0" rx="155" ry="48" stroke="#E8327C" strokeWidth="1.5" opacity="0.55" />
          </g>
          <g>
            <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="-360 0 0" dur="32s" repeatCount="indefinite" />
            <ellipse cx="0" cy="0" rx="140" ry="78" stroke="#FF2D6B" strokeWidth="1.2" opacity="0.4" transform="rotate(55)" />
          </g>
          <g>
            <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="20s" repeatCount="indefinite" />
            <ellipse cx="0" cy="0" rx="162" ry="34" stroke="#E8327C" strokeWidth="1" opacity="0.35" transform="rotate(-35)" />
          </g>
        </g>

        {/* Globe */}
        <circle cx={cx} cy={cy} r="88" fill="url(#globe-fill)" />
        <circle cx={cx} cy={cy} r="88" fill="url(#globe-highlight)" />
        <circle cx={cx} cy={cy} r="88" stroke="#E8327C" strokeWidth="1.2" opacity="0.45" filter="url(#pink-glow)" />

        {/* Continent hints */}
        <path d="M200 210c8-12 28-18 42-10 10 6 8 22-4 28-14 8-32 2-38-18Z" fill="rgba(232,50,124,0.08)" />
        <path d="M258 248c6 10 18 14 28 8 8-5 6-16-4-20-12-5-26 2-24 12Z" fill="rgba(255,45,107,0.07)" />

        {/* Pixel arrow */}
        <g className="hero-pixel-arrow" opacity="0.85">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect key={i} x={292 + i * 10} y={166 - i * 10} width="7" height="7" fill="#E8327C" opacity={0.5 + i * 0.08} />
          ))}
        </g>

        {/* Planet horizon arc */}
        <path
          d="M 40 340 Q 240 290 440 340"
          stroke="url(#horizon-glow)"
          strokeWidth="2.5"
          fill="none"
          opacity="0.7"
        />
        <ellipse cx={cx} cy="355" rx="200" ry="28" fill="rgba(232,50,124,0.06)" />
      </svg>
    </div>
  )
}

function HeroSkyline() {
  const buildings = [
    [0, 130, 45, 90], [45, 145, 35, 75], [80, 120, 40, 100], [120, 150, 30, 70],
    [150, 110, 50, 110], [200, 140, 35, 80], [235, 95, 40, 125], [275, 125, 45, 95],
    [320, 155, 30, 65], [350, 105, 55, 115], [405, 135, 38, 85], [443, 115, 42, 105],
    [485, 145, 35, 75], [520, 90, 48, 130], [568, 130, 40, 90], [608, 150, 32, 70],
    [640, 100, 52, 120], [692, 140, 38, 80], [730, 120, 44, 100], [774, 155, 36, 65],
    [810, 85, 50, 135], [860, 125, 42, 95], [902, 145, 35, 75], [937, 110, 48, 110],
    [985, 135, 40, 85], [1025, 150, 35, 70],
  ]

  return (
    <div className="hero-skyline-wrap" aria-hidden>
      <div className="hero-skyline-glow" />
      <svg
        className="hero-skyline-svg"
        viewBox="0 0 1200 220"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {buildings.map(([x, y, w, h], i) => (
          <rect key={i} x={x} y={y} width={w} height={h} fill="#0a0612" />
        ))}
        <rect x="0" y="170" width="1200" height="50" fill="#0a0612" />
        {/* SkyView Ferris wheel */}
        <circle cx="1100" cy="112" r="48" fill="none" stroke="#E8327C" strokeWidth="1.2" opacity="0.4" />
        <circle cx="1100" cy="112" r="38" fill="none" stroke="#E8327C" strokeWidth="0.7" opacity="0.22" />
        {[0, 60, 120, 180, 240, 300].map((deg) => {
          const rad = (deg * Math.PI) / 180
          return (
            <line
              key={deg}
              x1="1100"
              y1="112"
              x2={1100 + Math.cos(rad) * 48}
              y2={112 + Math.sin(rad) * 48}
              stroke="#E8327C"
              strokeWidth="0.7"
              opacity="0.28"
            />
          )
        })}
        <rect x="1094" y="112" width="12" height="58" fill="#0a0612" />
      </svg>
    </div>
  )
}

function App() {
  const [activeDay, setActiveDay] = useState(EVENT_SCHEDULE[0].day)
  const [openFaqs, setOpenFaqs] = useState(() => new Set())
  const selectedDay = EVENT_SCHEDULE.find((day) => day.day === activeDay) ?? EVENT_SCHEDULE[0]

  const toggleFaq = (index) => {
    setOpenFaqs((current) => {
      const next = new Set(current)
      if (next.has(index)) {
        next.delete(index)
      } else {
        next.add(index)
      }
      return next
    })
  }

  const FAQS = [
    {q:'Who can apply?', a:'Students (undergrad/grad) from Emory and other universities. Multidisciplinary teams are encouraged; solo applicants can find teammates at kickoff.'},
    {q:'Do I have to code?', a:'No. Teams need builders, designers, and business leads. Non‑technical contributors are essential.'},
    {q:'How big are teams?', a:'Teams form at the event; most groups mix 3–5 people across skills (final team sizes and rules announced at kickoff).'},
    {q:'What support will I get?', a:'Workshops, mentor hours, and structured feedback sessions run throughout Saturday; Sunday focuses on pitch prep.'},
    {q:'What do winners receive?', a:'Cash awards (historically $13K+ across prizes) and access to Emory’s entrepreneurship ecosystem; standout teams often continue via campus programs.'},
    {q:'What are past themes?', a:'Examples include The Great Hacksby (2021) and a Smart Cities prompt (2024).'},
    {q:'Is it only for Emory students?', a:'No—HackATL regularly draws students from many universities across the Southeast (and beyond).'},
    {q:'Where is it on campus?', a:'Goizueta Business School, Emory University (Atlanta).'},
    {q:'What do I need for the event?', a:"We recommend bringing a laptop, charger, headphones, and anything else you'll need over the weekend. We'll provide meals, snacks, swag, and good vibes."},
    {q:'I have more questions.', a:'Contact us at contact@eevm.org.'},
  ]

  return (
    <div id="top" className="min-h-screen w-full bg-midnight">
      <SiteHeader />

      {/* HERO */}
      <section className="hero-space relative min-h-[100svh] flex items-center justify-center">
        {/* Ambient background layers */}
        <div className="hero-ambient" aria-hidden>
          <div className="hero-mesh" />
          <div className="hero-orb hero-orb-1" />
          <HeroSkyline />
        </div>

        <div className="hero-space-glow" aria-hidden />
        <div className="hero-stars" aria-hidden />
        <HeroTechLayer />
        <HeroGlobe />

        <div className="hero-content relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-8 py-24 sm:py-28">
          <h1 className="hero-fade-in hero-fade-in-1">
            <span className="hero-headline-main">HackATL {EVENT.year}</span>
            <span className="hero-headline-accent">{EVENT.theme.subtitle}</span>
          </h1>

          <p className="hero-tagline hero-fade-in hero-fade-in-2">
            Build a business in 48 hours
          </p>

          <div className="hero-meta hero-fade-in hero-fade-in-3">
            <span>{EVENT.dates}</span>
            <span className="hero-meta-dot" aria-hidden />
            <span>{EVENT.locationShort}</span>
          </div>

          <div className="hero-fade-in hero-fade-in-4 relative z-10 mt-10">
            <a
              href={EVENT.links.registration}
              target="_blank"
              rel="noreferrer"
              className="btn-primary btn-breathe px-8 sm:px-10 py-3.5 sm:py-4 text-base sm:text-lg font-semibold uppercase tracking-wide"
            >
              Sign up now
            </a>
          </div>
        </div>
      </section>

      <CountdownHero />

      {/* WHAT IS HACKATL */}
      <section id="about" className="what-is-section relative bg-gradient-to-b from-midnight via-cosmic to-cosmic">
        <div className="relative max-w-5xl mx-auto px-6 sm:px-8 py-20 md:py-28 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            What is HackATL?
          </h2>
          <p className="mt-5 max-w-2xl mx-auto text-white/80 text-lg leading-relaxed">
            Emory’s student-run business hackathon — powered by EEVM — where students build a venture from idea to pitch in 48 hours.
          </p>

          <div className="mt-14 md:mt-16 flex flex-col sm:flex-row items-center justify-center gap-10 sm:gap-14 md:gap-20">
            <a
              href={EVENT.links.eevm}
              target="_blank"
              rel="noreferrer"
              className="group what-is-logo"
            >
              <img
                src="/images/hackatl/eevm_icon.webp"
                alt="EEVM — Emory Entrepreneurship & Venture Management"
                className="h-20 sm:h-24 md:h-32 w-auto object-contain transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              />
            </a>
            <span className="hidden sm:block h-16 md:h-24 w-px bg-gradient-to-b from-transparent via-hackatl-pink/40 to-transparent" aria-hidden />
            <div className="what-is-logo">
              <img
                src="/images/hackatl/temp-logo.png"
                alt="HackATL"
                className="h-36 sm:h-44 md:h-56 w-auto object-contain"
              />
            </div>
          </div>

          <p className="mt-12 md:mt-14 max-w-3xl mx-auto text-white/70 leading-relaxed">
            Since 2013, HackATL has brought thousands of students from across the Southeast to Goizueta Business School to prototype, validate business models, and pitch to angels, VCs, and industry leaders — with a prize pool of up to $13,000.
          </p>
        </div>
      </section>

      {/* WEEKEND SCHEDULE */}
      <section id="schedule" className="relative bg-gradient-to-b from-midnight via-cosmic to-midnight">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-16 md:py-24">
          <div className="max-w-3xl">
            <h3 className="text-3xl md:text-4xl font-extrabold text-white">Weekend Schedule</h3>
            <p className="mt-3 text-white/80 leading-relaxed">
              The full run of show for HackATL {EVENT.year} — meals, workshops, mentor hours, and deadlines.
            </p>
          </div>

          <div className="mt-8 rounded-3xl bg-white/[0.04] ring-1 ring-hackatl-pink/20 shadow-card overflow-hidden">
            <div
              className="grid grid-cols-3 border-b border-hackatl-pink/15"
              role="tablist"
              aria-label="Schedule by day"
            >
              {EVENT_SCHEDULE.map((day) => {
                const isActive = activeDay === day.day
                return (
                  <button
                    key={day.day}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    id={`schedule-tab-${day.day.toLowerCase()}`}
                    onClick={() => setActiveDay(day.day)}
                    className={`relative px-3 py-4 sm:px-6 sm:py-5 text-center transition-colors duration-300 ${
                      isActive
                        ? 'bg-hackatl-pink/15 text-white'
                        : 'text-white/55 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    <span className="block text-base sm:text-xl font-extrabold tracking-tight">
                      {day.day}
                    </span>
                    <span className="mt-0.5 block text-xs sm:text-sm font-medium tracking-wide opacity-70">
                      {day.date}
                    </span>
                    <span
                      aria-hidden
                      className={`absolute inset-x-0 bottom-0 h-0.5 bg-hackatl-pink transition-opacity duration-300 ${
                        isActive ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                  </button>
                )
              })}
            </div>

            <div
              key={selectedDay.day}
              role="tabpanel"
              aria-labelledby={`schedule-tab-${selectedDay.day.toLowerCase()}`}
              className="schedule-day-panel p-5 sm:p-8 md:p-10"
            >
              <div className="flex items-start gap-4 sm:gap-5">
                <CalendarIcon label={selectedDay.day} />
                <div>
                  <h4 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    {selectedDay.day}
                  </h4>
                  <p className="mt-2 text-white/70 leading-relaxed max-w-2xl">
                    {selectedDay.summary}
                  </p>
                </div>
              </div>

              <ol className="mt-8 space-y-0">
                {selectedDay.items.map((item, index) => (
                  <li
                    key={`${selectedDay.day}-${index}`}
                    className="schedule-item group relative grid grid-cols-[auto_1fr] gap-x-4 sm:gap-x-6 py-4 sm:py-5"
                    style={{ animationDelay: `${index * 40}ms` }}
                  >
                    <div className="relative flex flex-col items-center" aria-hidden>
                      <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-hackatl-pink ring-4 ring-hackatl-pink/20" />
                      {index < selectedDay.items.length - 1 && (
                        <span className="mt-2 w-px flex-1 bg-gradient-to-b from-hackatl-pink/40 to-hackatl-pink/10" />
                      )}
                    </div>
                    <div className="min-w-0 pb-1">
                      <div className="text-xs sm:text-sm font-semibold uppercase tracking-wide text-hackatl-pink">
                        {item.time}
                      </div>
                      <div className="mt-1 text-base sm:text-lg text-white font-semibold leading-snug">
                        {item.title}
                      </div>
                      {item.notes && (
                        <p className="mt-1.5 text-white/65 text-sm leading-relaxed">{item.notes}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>


      {/* WHAT YOU DO */}
      <section className="relative bg-gradient-to-b from-midnight via-cosmic to-cosmic">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div>
              <h3 className="text-3xl md:text-4xl font-extrabold text-white">What You Do</h3>
              <p className="mt-4 text-white/90 leading-relaxed">
                Take a venture from concept to pitch: identify a customer problem, develop a solution, design a business model, and present to judges. Teams are intentionally interdisciplinary, bringing together builders, business strategists, and designers so that everyone, whether coding or not, contributes to the idea.
              </p>
              <ul className="mt-6 space-y-3 text-white/90">
                <li className="flex items-center gap-3"><BulbIcon /> <span>Problem discovery and validation</span></li>
                <li className="flex items-center gap-3"><RocketIcon /> <span>Prototype and demo</span></li>
                <li className="flex items-center gap-3"><Icon><path d="M3 12h18" /><path d="M7 8h10" /><path d="M9 16h6" /></Icon> <span>Business model and go‑to‑market</span></li>
                <li className="flex items-center gap-3"><TrophyIcon /> <span>Pitch to investors and experts</span></li>
              </ul>
            </div>
            <div>
              <img src="/images/hackatl/teamwork.webp" alt="Team working" className="w-full h-64 object-cover rounded-2xl" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* WHO PARTICIPATES */}
      <section className="relative bg-gradient-to-b from-cosmic via-nebula/30 to-midnight">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <img src="/images/hackatl/crowd.webp" alt="Crowd" className="w-full h-72 object-cover rounded-2xl" loading="lazy" />
            </div>
            <div>
              <h3 className="text-3xl md:text-4xl font-extrabold text-white">Who Participates</h3>
              <p className="mt-4 text-white/90 leading-relaxed">
                Undergrads and grads from Emory and dozens of other universities across the Southeast; prior cohorts included students from pre‑med, computer science, pre‑law, and business. Beginners are welcome—the event is designed as a crash course in entrepreneurship.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* JUDGING & PRIZES */}
      <section className="relative bg-gradient-to-b from-midnight via-cosmic to-nebula/30">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-16 md:py-24">
          <div className="space-y-8">
            <div className="section-card p-10">
              <div className="md:flex md:items-start md:gap-10">
                <div className="md:flex-1">
                  <h3 className="text-3xl md:text-4xl font-extrabold text-white">Meet the Judges</h3>
                  <p className="mt-2 text-hackatl-pink font-semibold tracking-wide uppercase">Prize Money • Up to $13K</p>
                  <p className="mt-4 text-white/90 leading-relaxed">
                    A diverse judging panel—investors, entrepreneurs, professors, and civic leaders—evaluates teams on problem fit, product, and go‑to‑market.
                  </p>
                  <ul className="mt-5 space-y-2 text-white/90">
                    <li className="flex items-center gap-2"><TrophyIcon className="w-4 h-4" /> <span>Category and overall awards</span></li>
                    <li className="flex items-center gap-2"><Icon><path d="M5 12l4 4L19 6" /></Icon> <span>Real feedback from experts</span></li>
                    <li className="flex items-center gap-2"><Icon><circle cx="12" cy="12" r="9" /><path d="M12 7v10" /><path d="M7 12h10" /></Icon> <span>Access to Emory’s venture ecosystem</span></li>
                  </ul>
                </div>
                <div className="mt-8 md:mt-0 w-full h-56 md:w-[28rem] md:h-60 rounded-xl overflow-hidden shadow-card ring-1 ring-hackatl-pink/15">
                  <img
                    src="/images/hackatl/IMG_2578.webp"
                    alt="HackATL judges listening to pitches"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRACK RECORD */}
      <section className="relative bg-gradient-to-b from-nebula/30 via-cosmic to-midnight">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-16 md:py-24">
          <h3 className="text-3xl md:text-4xl font-extrabold text-white">Track Record</h3>
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="section-card p-6">
              <h4 className="text-xl font-bold text-white">2021 — The Great Hacksby</h4>
              <ul className="mt-3 text-white/90 space-y-1">
                <li>1st — Team Clip ($5,000)</li>
                <li>2nd — Trident ($3,000)</li>
                <li>3rd — Eco Friends ($2,000)</li>
              </ul>
            </div>
            <div className="section-card p-6">
              <h4 className="text-xl font-bold text-white">2024 — Smart Cities</h4>
              <p className="mt-3 text-white/90">300+ students; prompt centered on Smart Cities; $13K+ awarded.</p>
            </div>
          </div>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <img src="/images/hackatl/IMG_2623.webp" alt="Past winner 1" className="w-full h-40 object-cover rounded-xl" loading="lazy" />
            <img src="/images/hackatl/IMG_2619.webp" alt="Past winner 2" className="w-full h-40 object-cover rounded-xl" loading="lazy" />
            <img src="/images/hackatl/IMG_2622.webp" alt="Past winner 3" className="w-full h-40 object-cover rounded-xl" loading="lazy" />
          </div>
        </div>
      </section>

      {/* WHEN & WHERE */}
      <section className="relative bg-gradient-to-b from-cosmic via-midnight to-midnight">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <h3 className="text-3xl md:text-4xl font-extrabold text-white">When & Where</h3>
              <p className="mt-4 text-white/90 leading-relaxed">
                HackATL typically runs over a weekend in October during the InnovATL season, at Goizueta Business School, 1300 Clifton Rd NE, Atlanta, GA 30322. Exact dates vary—check the current registration page.
              </p>
              <div className="mt-4 text-white/80 flex items-center gap-2">
                <PinIcon />
                <span>Goizueta Business School, Emory University</span>
              </div>
            </div>
            <div>
              <img src="/images/hackatl/building.webp" alt="Goizueta" className="w-full h-64 object-cover rounded-2xl" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* WHO RUNS */}
      <section className="relative bg-gradient-to-b from-midnight via-cosmic to-cosmic">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-extrabold text-white">Who Runs HackATL</h3>
              <p className="mt-4 text-white/90 leading-relaxed">
                HackATL is organized by EEVM in partnership with Goizueta’s Center for Entrepreneurship & Innovation, with support from InnovATL and the City of Atlanta.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <a href={EVENT.links.eevm} target="_blank" rel="noreferrer" className="bg-white/5 rounded-lg ring-1 ring-hackatl-pink/15 shadow-card flex items-center justify-center p-3 hover:ring-hackatl-pink/30 transition">
                <img src="https://www.eevm.org/logos/eevm_partial-h128.webp" alt="EEVM" className="h-14 w-auto" />
              </a>
              <a href={EVENT.links.goizueta} target="_blank" rel="noreferrer" className="bg-white/5 rounded-lg ring-1 ring-hackatl-pink/15 shadow-card flex items-center justify-center p-3 hover:ring-hackatl-pink/30 transition">
                <img src="https://phosphor.utils.elfsightcdn.com/?url=https%3A%2F%2Fmedia.licdn.com%2Fdms%2Fimage%2Fv2%2FD560BAQFaNy5L-LlQug%2Fcompany-logo_400_400%2Fcompany-logo_400_400%2F0%2F1700246347989%2Frcgcei_logo%3Fe%3D1760572800%26v%3Dbeta%26t%3DPIqxNkl3Gx32ZycNrBPJYpOIo0g8vtkeDur-abtBHVs" alt="CEI • Goizueta" className="h-14 md:h-16 w-auto" />
              </a>
              <a href={EVENT.links.innovatl} target="_blank" rel="noreferrer" className="bg-white/5 rounded-lg ring-1 ring-hackatl-pink/15 shadow-card flex items-center justify-center p-3 hover:ring-hackatl-pink/30 transition">
                <img src="/images/hackatl/innovate_atl.webp" alt={`InnovATL ${EVENT.year}`} className="h-14 md:h-16 w-auto object-contain" loading="lazy" />
              </a>
              <a href="https://upload.wikimedia.org/wikipedia/commons/8/80/Seal_of_Atlanta.png" target="_blank" rel="noreferrer" className="bg-white/5 rounded-lg ring-1 ring-hackatl-pink/15 shadow-card flex items-center justify-center p-3 hover:ring-hackatl-pink/30 transition">
                <img src="https://upload.wikimedia.org/wikipedia/commons/8/80/Seal_of_Atlanta.png" alt="City of Atlanta" className="h-16 w-auto" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* WHY DIFFERENT */}
      <section className="relative bg-gradient-to-b from-cosmic via-midnight to-midnight">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-16 md:py-24">
          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            <div className="md:col-span-2 bg-nebula ring-1 ring-hackatl-pink/25 text-white rounded-3xl p-10 shadow-glow">
              <h3 className="text-3xl md:text-4xl font-extrabold">Why HackATL is Different</h3>
              <p className="mt-4 text-white/80 leading-relaxed">
                Unlike code‑only hackathons, HackATL balances business rigor with technical build, mixing workshops, mentorship, and investor‑style pitching so teams leave with both a prototype and an executable plan.
              </p>
            </div>
            <img src="/images/hackatl/IMG_2634.webp" alt="HackATL experience" className="w-full h-64 md:h-auto object-cover rounded-3xl shadow-card" loading="lazy" />
          </div>
        </div>
      </section>

      {/* FAQS */}
      <section id="faq" className="relative bg-gradient-to-b from-midnight via-cosmic to-midnight">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 py-16 md:py-24">
          <h3 className="text-3xl md:text-4xl font-extrabold text-white text-center">FAQs</h3>
          <div className="mt-8 divide-y divide-white/10 rounded-2xl bg-white/5 shadow-card ring-1 ring-hackatl-pink/15">
            {FAQS.map((item, i) => {
              const isOpen = openFaqs.has(i)
              return (
                <div key={i} className="p-6">
                  <button
                    type="button"
                    onClick={() => toggleFaq(i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between text-left text-white font-semibold"
                  >
                    <span>{item.q}</span>
                    <span
                      aria-hidden
                      className={`ml-4 flex h-9 w-9 items-center justify-center rounded-full text-lg font-bold transition-colors ${
                        isOpen ? 'bg-hackatl-pink text-white' : 'bg-white/10 text-hackatl-pink'
                      }`}
                    >
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] ${
                      isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p
                        className={`text-white/80 leading-relaxed transition-all duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] transform ${
                          isOpen ? 'mt-3 opacity-100 translate-y-0' : 'mt-0 opacity-0 -translate-y-1'
                        }`}
                      >
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* GET INVOLVED */}
      <section className="relative overflow-hidden bg-midnight">
        <div className="pointer-events-none absolute inset-x-0 -top-24 h-32 bg-gradient-to-b from-cosmic via-midnight to-transparent" />
        <div className="pointer-events-none absolute inset-x-0 -top-16 h-40 opacity-20 [background:radial-gradient(circle,#E8327C_0.5px,transparent_0.5px)] [background-size:28px_28px]" />
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-16 md:py-24">
          <h3 className="text-3xl md:text-4xl font-extrabold text-white text-center">Get Involved</h3>
          <div className="mt-10">
            <div className="section-card p-6 flex flex-col md:flex-row md:items-center md:gap-8">
              <img src="/images/hackatl/mentor.webp" alt="Mentor / Judge / Sponsor" className="w-full md:w-72 h-40 object-cover rounded-xl mb-4 md:mb-0" loading="lazy" />
              <div className="flex-1 md:min-w-0">
                <h4 className="text-xl font-bold text-white">Mentor / Judge / Sponsor</h4>
                <p className="mt-2 text-white/80 leading-relaxed">Each year’s panel and sponsors vary; interested partners connect through Goizueta’s entrepreneurship center.</p>
              </div>
              <div className="mt-4 md:mt-0">
                <a
                  href={EVENT.links.sponsorPacket}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary gap-2 px-5 py-2 text-sm shadow"
                >
                  <RocketIcon className="w-4 h-4 text-white" /> Learn more
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Analytics />
    </div>
  )
}

export default App
