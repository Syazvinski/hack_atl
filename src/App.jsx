function Placeholder({ className = '', children = 'Image Placeholder' }) {
  return (
    <div className={`img-placeholder ${className}`}>{children}</div>
  )
}

function App() {
  return (
    <div className="min-h-screen w-full bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden min-h-screen">
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-700 via-purple-600 to-fuchsia-400" />

        {/* Left offset full-height dark circle */}
        <div
          className="pointer-events-none absolute left-0 top-1/2 -translate-x-[35%] -translate-y-1/2 w-[100vh] h-[100vh] bg-[#0e1230] rounded-full shadow-2xl"
          aria-hidden
        />

        {/* Top-right circular group photo matching full-height footprint */}
        <div className="pointer-events-none absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-[90vh] h-[90vh] md:w-[100vh] md:h-[100vh] rounded-full overflow-hidden border-[10px] border-white/40 shadow-2xl">
          <img
            src="https://www.emorybusiness.com/wp-content/uploads/2021/11/HACKAtl-team-scaled.jpg"
            alt="HackATL team group"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 sm:px-8 py-12 md:py-20 pt-24 md:pt-32 lg:pt-40">
          {/* Logos row positioned inside the left circle */}
          <div className="relative z-10 mt-10 md:mt-14 lg:mt-16 w-[38vh] sm:w-[42vh] lg:w-[46vh] max-w-[680px] -ml-4 sm:-ml-10 lg:-ml-24 xl:-ml-40">
            <div className="flex items-center gap-4 md:gap-6 lg:gap-8">
              <img
                src="https://www.eevm.org/logos/eevm_partial-h128.webp"
                alt="EEVM logo"
                className="h-10 md:h-14 lg:h-20 w-auto"
              />
              <span className="text-white/80 text-2xl md:text-3xl">×</span>
              <img
                src="https://www.eevm.org/hack-logos/hack_logo_2025-h160.webp"
                alt="HackATL 2025 logo"
                className="h-12 md:h-16 lg:h-24 w-auto"
              />
            </div>
          </div>

          {/* Headline and CTA sitting over circle */}
          <div className="mt-12 md:mt-16 lg:mt-24 relative z-10">
            {/* Constrain the text block to the visible right-half of the circle */}
            <div className="w-[38vh] sm:w-[42vh] lg:w-[46vh] max-w-[680px] -ml-4 sm:-ml-10 lg:-ml-24 xl:-ml-40">
              <h1 className="text-white text-[46px] sm:text-[68px] md:text-[92px] leading-[0.95] font-extrabold tracking-tight drop-shadow">
                HackATL
                <br />
                <span className="block">2025</span>
              </h1>
              <div className="mt-8 inline-flex items-center gap-4">
                <a href="#" className="inline-flex items-center rounded-full bg-fuchsia-500 hover:bg-fuchsia-400 text-white font-semibold px-8 py-3 shadow-lg transition-colors">
                  SIGN UP NOW
                </a>
                <span className="text-white/80 uppercase tracking-wider text-xs">Dates & Location go here</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="relative bg-gradient-to-b from-[#d9c9f0] via-[#e8dbf7] to-[#e8dbf7]">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-14 md:py-20">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-4xl md:text-[44px] font-extrabold text-indigo-900 tracking-tight">About <span className="text-indigo-700">HackATL</span></h2>
              <p className="mt-5 text-indigo-900/90 leading-relaxed">
                HackATL is the most prominent business hackathon in the southeast, attracting hundreds of students from dozens of top universities to compete for $13k+. Participants are given 48 hours to develop a prototype and pitch to judges, angel investors, and venture capitalists. After HackATL, participants are given access to further resources and funding to take ideas to life. This year's hackathon theme is zero to one— We can't wait to see what you build.
              </p>
              {/* removed inline logo per request */}
            </div>

            <div className="flex flex-col items-center md:items-end gap-6">
              <div className="w-full max-w-md">
                <div className="rounded-xl overflow-hidden shadow-xl ring-1 ring-indigo-600/30">
                  <img
                    src="https://www.eevm.org/homepage/eevm_group.webp"
                    alt="EEVM group"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="flex items-center justify-center gap-2 mt-4">
                  <span className="h-2 w-6 rounded-full bg-indigo-500" />
                  <span className="h-2 w-2 rounded-full bg-indigo-300" />
                  <span className="h-2 w-2 rounded-full bg-indigo-300" />
                  <span className="h-2 w-2 rounded-full bg-indigo-300" />
                </div>
              </div>
              <div className="flex items-center gap-3 self-end">
                <Placeholder className="h-7 w-7 rounded-full">IG</Placeholder>
                <a href="mailto:HackATL@gmail.com" className="text-indigo-900 font-medium">HackATL@gmail.com</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DIRECTORY CARDS */}
      <section className="relative bg-gradient-to-b from-[#c7f2d0] via-[#c9e8ff] to-[#cde0ff]">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-16">
          <h3 className="text-center text-5xl font-extrabold text-indigo-900">Directory</h3>

          <div className="mt-12 grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'EEVM & History',
                desc: 'All our upcoming events for the month of October to December',
                cta: 'CHECK IT OUT >',
                img: 'https://www.eevm.org/homepage/eevm_group.webp',
              },
              {
                title: 'Sponsorship',
                desc: 'Recommended courses, curated just for you!',
                cta: 'START LEARNING >',
                img: 'https://www.eevm.org/logos/eevm_partial-h128.webp',
              },
              {
                title: 'Past Winners',
                desc: 'Past 3-4 Years',
                cta: 'SEE WINNERS >',
                img: 'https://news.ua.edu/wp-content/uploads/2017/12/HackATL.jpg',
              },
            ].map((card, i) => (
              <div key={i} className="bg-[#1b1570] rounded-2xl p-5 shadow-card ring-4 ring-indigo-900/40">
                <div className="rounded-xl overflow-hidden">
                  <img src={card.img} alt="card visual" className="w-full h-36 md:h-44 object-cover" />
                </div>
                <div className="mt-5">
                  <h4 className="text-white text-xl font-extrabold">{card.title}</h4>
                  <p className="text-indigo-100/90 mt-2 text-sm leading-relaxed">{card.desc}</p>
                </div>
                <div className="mt-6">
                  <button className="text-teal-300 text-sm font-semibold tracking-wide">
                    {card.cta.replace('>', '')} &gt;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECOND ROW (SPONSORS / PHOTOS) */}
      <section className="relative bg-gradient-to-b from-[#cde0ff] via-[#c8e6ff] to-[#bcdfff]">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-10 md:py-16">
          <h3 className="text-center text-4xl md:text-5xl font-extrabold text-indigo-900">Directory</h3>

          <div className="mt-10 grid md:grid-cols-2 gap-10">
            <div className="bg-white/60 rounded-2xl p-5 shadow-card">
              <div className="rounded-2xl overflow-hidden">
                <img
                  src="https://www.eevm.org/homepage/eevm_group.webp"
                  alt="EEVM photo"
                  className="w-full h-auto object-cover"
                />
              </div>
              <p className="mt-4 text-indigo-900 font-semibold">say sum about 13th year hack atl</p>
              <button className="mt-2 text-teal-600 text-sm font-semibold">START LEARNING &gt;</button>
            </div>
            <div className="bg-white/60 rounded-2xl p-5 shadow-card">
              <div className="rounded-2xl overflow-hidden">
                <Placeholder className="w-full aspect-[16/9]">Sponsor Logos</Placeholder>
              </div>
              <p className="mt-4 text-indigo-900 font-semibold">look @ back of hackatl shirt to see how logos are collaged/scattered, mimic that here</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}

export default App
