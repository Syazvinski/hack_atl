function Placeholder({ className = '', children = 'Image Placeholder' }) {
  return (
    <div className={`img-placeholder ${className}`}>{children}</div>
  )
}

function CalendarIcon({ label = 'Day' }) {
  const short = label.slice(0, 3)
  return (
    <div className="w-16 h-16 rounded-lg bg-white ring-1 ring-[#0B3D91]/30 shadow overflow-hidden flex flex-col">
      <div className="h-4 bg-[#0B3D91]" />
      <div className="flex-1 flex items-center justify-center text-[#0B3D91] font-extrabold text-sm tracking-wide">
        {short}
      </div>
    </div>
  )
}

// Subtle inline icons (NASA-themed)
const Icon = ({ children, className = 'w-4 h-4 text-[#0B3D91]' }) => (
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
import { Analytics } from '@vercel/analytics/react'
import { EVENT } from './data/event'

function App() {
  return (
    <div className="min-h-screen w-full bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden min-h-[100svh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-tr from-[#001A3A] via-[#0B3D91] to-[#0B3D91]" />

        {/* Left offset full-height dark circle */}
        <div
          className="pointer-events-none absolute left-0 top-1/2 -translate-x-[35%] -translate-y-1/2 w-[110vw] h-[110vw] sm:w-[90vw] sm:h-[90vw] md:w-[92vh] md:h-[92vh] bg-[#001A3A] rounded-full shadow-2xl"
          aria-hidden
        />

        {/* Top-right circular group photo matching full-height footprint */}
        <div className="pointer-events-none absolute top-1/2 -translate-y-1/2 right-2 sm:right-8 md:right-16 w-[70vw] h-[70vw] sm:w-[60vw] sm:h-[60vw] md:w-[65vh] md:h-[65vh] lg:w-[75vh] lg:h-[75vh] xl:w-[80vh] xl:h-[80vh] rounded-full overflow-hidden border-[10px] border-white/40 shadow-2xl">
          <img src="https://www.emorybusiness.com/wp-content/uploads/2021/11/HACKAtl-team-scaled.jpg" alt="HackATL team group" className="w-full h-full object-cover" />
        </div>

        <div className="relative w-full max-w-6xl mx-auto px-6 sm:px-8 py-8 sm:py-12 md:py-16 lg:py-24">
          {/* Logos row positioned inside the left circle */}
          <div className="relative z-10 mt-4 sm:mt-8 md:mt-12 lg:mt-16 w-full max-w-xl sm:max-w-2xl lg:max-w-[680px] lg:-ml-16 xl:-ml-24">
            <div className="flex items-center gap-4 md:gap-6 lg:gap-8">
              <img
                src="https://www.eevm.org/logos/eevm_partial-h128.webp"
                alt="EEVM logo"
                className="h-10 md:h-14 lg:h-20 w-auto"
              />
              <span className="text-white/80 text-2xl md:text-3xl">×</span>
            <img
              src="/images/hackatl/hackatl_logo_whitefill.webp"
              alt="HackATL 2025 logo"
              className="h-12 md:h-16 lg:h-24 w-auto"
              loading="lazy"
            />
            </div>
          </div>

          {/* Headline and CTA sitting over circle */}
          <div className="mt-6 sm:mt-10 md:mt-14 lg:mt-20 relative z-10">
            {/* Constrain the text block to the visible right-half of the circle */}
            <div className="w-full max-w-xl sm:max-w-2xl lg:max-w-[680px] lg:-ml-16 xl:-ml-24">
              <h1 className="text-white text-[46px] sm:text-[68px] md:text-[92px] leading-[0.95] font-extrabold tracking-tight drop-shadow">
                HackATL
                <br />
                <span className="block">2025</span>
              </h1>
              <div className="mt-6 sm:mt-8 inline-flex flex-wrap items-center gap-3 sm:gap-4">
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSfvLt2ExtqgtWa8NWj25WveqK2UzSRW7Ni6b6NLpv08r3lk7A/viewform"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center rounded-full bg-teal-500 hover:bg-teal-400 text-white font-semibold whitespace-nowrap px-6 sm:px-7 md:px-8 py-3 sm:py-3.5 text-base sm:text-lg shadow-xl hover:shadow-[0_0_20px_rgba(20,184,166,0.4)] transition-all duration-300 transform hover:scale-105 ring-2 ring-white/20"
                >
                  SIGN UP NOW
                </a>
                <div className="text-white/90 tracking-wide text-sm sm:text-base md:text-lg font-medium">
                  <div>{EVENT.dates}</div>
                  <div>{EVENT.locationShort}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="relative bg-gradient-to-b from-[#e6efff] via-[#f1f6ff] to-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-4xl md:text-[44px] font-extrabold text-indigo-900 tracking-tight">
                HackATL @ Emory — Build a Startup in 48 Hours
              </h2>
              <p className="mt-5 text-indigo-950/90 leading-relaxed">
                HackATL is Emory University’s student-run business hackathon where hundreds of students from across the Southeast come together to turn ideas into real, pitch-ready startups in just 48 hours. It’s hosted at Goizueta Business School and features workshops, mentoring, and a final pitch to a panel of investors and industry leaders, with a prize pool of $13K+.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#e6efff] text-[#0B3D91] px-3 py-1 text-sm font-medium ring-1 ring-[#b9ccff]"><PinIcon /> Goizueta Business School</span>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#ffe9e5] text-[#C62E15] px-3 py-1 text-sm font-medium ring-1 ring-[#ffd3cb]"><ClockIcon className="w-4 h-4 text-[#C62E15]" /> 48 Hours</span>
                <span className="inline-flex items-center gap-2 rounded-full bg-[#ffe9e5] text-[#C62E15] px-3 py-1 text-sm font-medium ring-1 ring-[#ffd3cb]"><TrophyIcon className="w-4 h-4 text-[#C62E15]" /> $13K+ Prizes</span>
              </div>
            </div>
            <div className="md:pl-6">
              <div className="rounded-2xl overflow-hidden shadow-card ring-1 ring-[#0B3D91]/10">
                <img src="/images/hackatl/overview.webp" alt="Overview" className="w-full h-auto object-cover" loading="lazy" />
              </div>
            </div>
          </div>

          <div className="mt-14 grid md:grid-cols-3 gap-6">
            {[
<<<<<<< HEAD
              {t:'Workshops', img:'/images/hackatl/workshops.jpg'},
              {t:'Mentoring', img:'/images/hackatl/DSC08306.jpg'},
              {t:'Investor Panel', img:'/images/hackatl/DSC08341.jpg'},
=======
              {t:'Workshops', img:'/images/hackatl/workshops.webp'},
              {t:'Mentoring', img:'/images/hackatl/mentoring2.webp'},
              {t:'Investor Panel', img:'/images/hackatl/investor.webp'},
>>>>>>> 1497ce3fbe5c8963c74a14bfbe8eaccc32eb01f8
            ].map((c,i)=> (
              <div key={i} className="bg-white rounded-xl p-6 shadow-card ring-1 ring-[#0B3D91]/10">
                <img src={c.img} alt={c.t} className="w-full h-32 object-cover rounded-lg mb-4" loading="lazy" />
                <p className="text-indigo-900 font-semibold">{c.t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT IS HACKATL */}
      <section className="relative bg-gradient-to-b from-white via-[#eaf2ff] to-[#eaf2ff]">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-16 md:py-24">
          <h3 className="text-3xl md:text-4xl font-extrabold text-indigo-900">What is HackATL?</h3>
          <div className="mt-6 grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <p className="text-indigo-900/90 leading-relaxed">
                HackATL is the region’s most prominent business hackathon—since 2013, it’s helped thousands of students build prototypes, validate business models, and pitch to judges, angels, and VCs. The event is powered by Emory Entrepreneurship & Venture Management (EEVM) and supported by Goizueta’s Center for Entrepreneurship & Innovation. Recent editions have partnered with InnovATL and the City of Atlanta.
              </p>
            </div>
            <div>
<<<<<<< HEAD
              <img src="/images/hackatl/DSC08259.jpg" alt="Partners" className="w-full h-40 object-cover rounded-xl" />
=======
              <img src="/images/hackatl/partners.webp" alt="Partners" className="w-full h-40 object-cover rounded-xl" loading="lazy" />
>>>>>>> 1497ce3fbe5c8963c74a14bfbe8eaccc32eb01f8
            </div>
          </div>
        </div>
      </section>

      {/* WEEKEND FLOW */}
      <section className="relative bg-gradient-to-b from-[#eaf2ff] via-[#e6efff] to-[#eef6ff]">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-16 md:py-24">
          <h3 className="text-3xl md:text-4xl font-extrabold text-indigo-900">How it Works</h3>
          <p className="mt-3 text-indigo-900/80">Weekend flow at a glance</p>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {[{
              t:'Friday',
              d:'Kickoff, theme reveal, team formation, ideation.'
            },{
              t:'Saturday',
              d:'Heads-down building plus workshops and mentor office hours.'
            },{
              t:'Sunday',
              d:'Pitch polish, semifinals, and finale on stage to judges.'
            }].map((s,i)=> (
              <div key={i} className="bg-white rounded-2xl p-6 shadow-card ring-1 ring-[#0B3D91]/10">
                <div className="flex items-center gap-4">
                  <CalendarIcon label={s.t} />
                  <h4 className="sr-only">{s.t}</h4>
                </div>
                <p className="mt-4 text-indigo-900/80 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-indigo-900/80">Expect hands-on guidance, cross-campus networking, and real feedback focused on both technical and business execution.</p>
        </div>
      </section>

      {/* WHAT YOU DO */}
      <section className="relative bg-gradient-to-b from-[#eef5ff] via-white to-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div>
              <h3 className="text-3xl md:text-4xl font-extrabold text-indigo-900">What You Do</h3>
              <p className="mt-4 text-indigo-900/90 leading-relaxed">
                Build a venture from zero to pitch: define a customer problem, prototype a solution, craft a business model, and present to judges. Teams are intentionally interdisciplinary—hackers (builders), hustlers (business), and hipsters (design/UX)—so non-coders and coders alike add value.
              </p>
              <ul className="mt-6 space-y-3 text-indigo-900/90">
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
      <section className="relative bg-gradient-to-b from-white via-[#eaf3ff] to-[#e0eeff]">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <img src="/images/hackatl/crowd.webp" alt="Crowd" className="w-full h-72 object-cover rounded-2xl" loading="lazy" />
            </div>
            <div>
              <h3 className="text-3xl md:text-4xl font-extrabold text-indigo-900">Who Participates</h3>
              <p className="mt-4 text-indigo-900/90 leading-relaxed">
                Undergrads and grads from Emory and dozens of other universities across the Southeast; prior cohorts included students from pre‑med, computer science, pre‑law, and business. Beginners are welcome—the event is designed as a crash course in entrepreneurship.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* JUDGING & PRIZES */}
      <section className="relative bg-gradient-to-b from-[#e0eeff] via-white to-[#eaf3ff]">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-16 md:py-24">
          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            <div className="md:col-span-2 bg-white rounded-2xl p-8 shadow-card ring-1 ring-[#0B3D91]/10">
              <h3 className="text-3xl md:text-4xl font-extrabold text-indigo-900">Judging & Prizes</h3>
              <p className="mt-4 text-indigo-900/90 leading-relaxed">
                A diverse judging panel—investors, entrepreneurs, professors, and civic leaders—evaluates teams on problem fit, product, and go‑to‑market.
              </p>
              <ul className="mt-5 space-y-2 text-indigo-900/90">
                <li className="flex items-center gap-2"><TrophyIcon className="w-4 h-4" /> <span>Category and overall awards</span></li>
                <li className="flex items-center gap-2"><Icon><path d="M5 12l4 4L19 6" /></Icon> <span>Real feedback from experts</span></li>
                <li className="flex items-center gap-2"><Icon><circle cx="12" cy="12" r="9" /><path d="M12 7v10" /><path d="M7 12h10" /></Icon> <span>Access to Emory’s venture ecosystem</span></li>
              </ul>
            </div>
            <div className="bg-[#0B3D91] text-white rounded-2xl p-8 shadow-card flex flex-col justify-center">
              <div className="text-5xl font-extrabold">$13K+</div>
              <div className="mt-2 text-indigo-100">Prize pool</div>
              <img src="/images/hackatl/trophy.webp" alt="Trophy" className="mt-6 w-full h-24 object-cover rounded-xl" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      {/* TRACK RECORD */}
      <section className="relative bg-gradient-to-b from-[#eef4ff] via-[#f6f9ff] to-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-16 md:py-24">
          <h3 className="text-3xl md:text-4xl font-extrabold text-indigo-900">Track Record</h3>
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-card ring-1 ring-[#0B3D91]/10">
              <h4 className="text-xl font-bold text-indigo-900">2021 — The Great Hacksby</h4>
              <ul className="mt-3 text-indigo-900/90 space-y-1">
                <li>1st — Team Clip ($5,000)</li>
                <li>2nd — Trident ($3,000)</li>
                <li>3rd — Eco Friends ($2,000)</li>
              </ul>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-card ring-1 ring-[#0B3D91]/10">
              <h4 className="text-xl font-bold text-indigo-900">2024 — Smart Cities</h4>
              <p className="mt-3 text-indigo-900/90">300+ students; prompt centered on Smart Cities; $13K+ awarded.</p>
            </div>
          </div>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
<<<<<<< HEAD
            <img src="/images/hackatl/DSC08340.jpg" alt="Past winner 1" className="w-full h-40 object-cover rounded-xl" />
            <img src="images/hackatl/IMG_2623.JPG" alt="Past winner 2" className="w-full h-40 object-cover rounded-xl" />
            <img src="/images/hackatl/IMG_2634.JPG" alt="Past winner 3" className="w-full h-40 object-cover rounded-xl" />
=======
            <img src="/images/hackatl/past1.webp" alt="Past winner 1" className="w-full h-40 object-cover rounded-xl" loading="lazy" />
            <img src="/images/hackatl/past2.webp" alt="Past winner 2" className="w-full h-40 object-cover rounded-xl" loading="lazy" />
            <img src="/images/hackatl/past3.webp" alt="Past winner 3" className="w-full h-40 object-cover rounded-xl" loading="lazy" />
>>>>>>> 1497ce3fbe5c8963c74a14bfbe8eaccc32eb01f8
          </div>
        </div>
      </section>

      {/* WHEN & WHERE */}
      <section className="relative bg-gradient-to-b from-white via-[#eaf3ff] to-[#e3eeff]">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <h3 className="text-3xl md:text-4xl font-extrabold text-indigo-900">When & Where</h3>
              <p className="mt-4 text-indigo-900/90 leading-relaxed">
                HackATL typically runs over a weekend in October during the InnovATL season, at Goizueta Business School, 1300 Clifton Rd NE, Atlanta, GA 30322. Exact dates vary—check the current registration page.
              </p>
              <div className="mt-4 text-indigo-900/80 flex items-center gap-2">
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
      <section className="relative bg-gradient-to-b from-[#e3eeff] via-[#eaf3ff] to-white">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-extrabold text-indigo-900">Who Runs HackATL</h3>
              <p className="mt-4 text-indigo-900/90 leading-relaxed">
                HackATL is organized by EEVM in partnership with Goizueta’s Center for Entrepreneurship & Innovation, with support from InnovATL and the City of Atlanta.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <a href="https://www.eevm.org/" target="_blank" rel="noreferrer" className="bg-white rounded-lg ring-1 ring-[#0B3D91]/10 shadow-card flex items-center justify-center p-3 hover:ring-[#0B3D91]/30 transition">
                <img src="https://www.eevm.org/logos/eevm_partial-h128.webp" alt="EEVM" className="h-14 w-auto" />
              </a>
              <a href="https://goizueta.emory.edu/faculty/entrepreneurship-innovation/programs" target="_blank" rel="noreferrer" className="bg-white rounded-lg ring-1 ring-[#0B3D91]/10 shadow-card flex items-center justify-center p-3 hover:ring-[#0B3D91]/30 transition">
                <img src="https://phosphor.utils.elfsightcdn.com/?url=https%3A%2F%2Fmedia.licdn.com%2Fdms%2Fimage%2Fv2%2FD560BAQFaNy5L-LlQug%2Fcompany-logo_400_400%2Fcompany-logo_400_400%2F0%2F1700246347989%2Frcgcei_logo%3Fe%3D1760572800%26v%3Dbeta%26t%3DPIqxNkl3Gx32ZycNrBPJYpOIo0g8vtkeDur-abtBHVs" alt="CEI • Goizueta" className="h-14 md:h-16 w-auto" />
              </a>
              <a href="https://innovatl2025.com/" target="_blank" rel="noreferrer" className="bg-white rounded-lg ring-1 ring-[#0B3D91]/10 shadow-card flex items-center justify-center p-3 hover:ring-[#0B3D91]/30 transition">
                <img src="/images/hackatl/innovate_atl.webp" alt="InnovATL 2025" className="h-14 md:h-16 w-auto object-contain" loading="lazy" />
              </a>
              <a href="https://upload.wikimedia.org/wikipedia/commons/8/80/Seal_of_Atlanta.png" target="_blank" rel="noreferrer" className="bg-white rounded-lg ring-1 ring-[#0B3D91]/10 shadow-card flex items-center justify-center p-3 hover:ring-[#0B3D91]/30 transition">
                <img src="https://upload.wikimedia.org/wikipedia/commons/8/80/Seal_of_Atlanta.png" alt="City of Atlanta" className="h-16 w-auto" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* WHY DIFFERENT */}
      <section className="relative bg-gradient-to-b from-white via-[#eaf3ff] to-[#e3eeff]">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-16 md:py-24">
          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            <div className="md:col-span-2 bg-[#0B3D91] text-white rounded-3xl p-10 shadow-card">
              <h3 className="text-3xl md:text-4xl font-extrabold">Why HackATL is Different</h3>
              <p className="mt-4 text-indigo-100 leading-relaxed">
                Unlike code‑only hackathons, HackATL balances business rigor with technical build, mixing workshops, mentorship, and investor‑style pitching so teams leave with both a prototype and an executable plan.
              </p>
            </div>
            <img src="/images/hackatl/hero1.webp" alt="HackATL experience" className="w-full h-64 md:h-auto object-cover rounded-3xl shadow-card" loading="lazy" />
          </div>
        </div>
      </section>

      {/* FAQS */}
      <section className="relative bg-gradient-to-b from-[#e3eeff] via-[#f2f7ff] to-white">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 py-16 md:py-24">
          <h3 className="text-3xl md:text-4xl font-extrabold text-indigo-900 text-center">FAQs</h3>
          <div className="mt-8 divide-y divide-[#c0cff1] rounded-2xl bg-white shadow-card ring-1 ring-[#0B3D91]/10">
            {[
              {q:'Who can apply?', a:'Students (undergrad/grad) from Emory and other universities. Multidisciplinary teams are encouraged; solo applicants can find teammates at kickoff.'},
              {q:'Do I have to code?', a:'No. Teams need builders, designers, and business leads. Non‑technical contributors are essential.'},
              {q:'How big are teams?', a:'Teams form at the event; most groups mix 3–5 people across skills (final team sizes and rules announced at kickoff).'},
              {q:'What support will I get?', a:'Workshops, mentor hours, and structured feedback sessions run throughout Saturday; Sunday focuses on pitch prep.'},
              {q:'What do winners receive?', a:'Cash awards (historically $13K+ across prizes) and access to Emory’s entrepreneurship ecosystem; standout teams often continue via campus programs.'},
              {q:'What are past themes?', a:'Examples include The Great Hacksby (2021) and a Smart Cities prompt (2024).'},
              {q:'Is it only for Emory students?', a:'No—HackATL regularly draws students from many universities across the Southeast (and beyond).'},
              {q:'Where is it on campus?', a:'Goizueta Business School, Emory University (Atlanta).'},
            ].map((item, i) => (
              <details key={i} className="group p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between text-indigo-900 font-semibold">{item.q}
                  <span className="ml-4 text-indigo-400 group-open:hidden">+</span>
                  <span className="ml-4 text-indigo-400 hidden group-open:inline">−</span>
                </summary>
                <p className="mt-3 text-indigo-900/80 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* GET INVOLVED */}
      <section className="relative overflow-hidden bg-white">
        {/* Soft transition band from FAQs */}
        <div className="pointer-events-none absolute inset-x-0 -top-24 h-32 bg-gradient-to-b from-[#e3eeff] via-white to-transparent" />
        {/* subtle star field accents */}
        <div className="pointer-events-none absolute inset-x-0 -top-16 h-40 opacity-20 [background:radial-gradient(circle,#0B3D91_0.5px,transparent_0.5px)] [background-size:28px_28px]" />
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-16 md:py-24">
          <h3 className="text-3xl md:text-4xl font-extrabold text-indigo-900 text-center">Get Involved</h3>
          <div className="mt-10">
            <div className="bg-white rounded-2xl p-6 shadow-card ring-1 ring-[#0B3D91]/10 flex flex-col md:flex-row md:items-center md:gap-8">
              <img src="/images/hackatl/mentor.webp" alt="Mentor / Judge / Sponsor" className="w-full md:w-72 h-40 object-cover rounded-xl mb-4 md:mb-0" loading="lazy" />
              <div className="flex-1 md:min-w-0">
                <h4 className="text-xl font-bold text-indigo-900">Mentor / Judge / Sponsor</h4>
                <p className="mt-2 text-indigo-900/80 leading-relaxed">Each year’s panel and sponsors vary; interested partners connect through Goizueta’s entrepreneurship center.</p>
              </div>
              <div className="mt-4 md:mt-0">
                <a
                  href="https://f005.backblazeb2.com/file/syazvin/HackATL+Corporate+Packet+2025.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-teal-500 hover:bg-teal-400 text-white font-semibold px-5 py-2 text-sm shadow"
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
