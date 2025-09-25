/*
  Archived legacy landing page. Not routed by default.
  Preserves the initial hero + placeholder sections that were replaced.
*/

function Placeholder({ className = '', children = 'Image Placeholder' }) {
  return <div className={`img-placeholder ${className}`}>{children}</div>
}

export default function LegacyLanding() {
  return (
    <div className="min-h-screen w-full bg-white">
      {/* LEGACY HERO (smaller version) */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-700 via-purple-600 to-fuchsia-400" />
        <div className="relative max-w-6xl mx-auto px-6 sm:px-8 py-12 md:py-20">
          <div className="flex items-center gap-3 md:gap-4">
            <Placeholder className="h-8 w-24 rounded-md">ee&vm</Placeholder>
            <span className="text-white/80 text-xl">×</span>
            <Placeholder className="h-10 w-28 rounded-md">HackATL</Placeholder>
          </div>
          <div className="mt-6 md:mt-10">
            <div className="relative">
              <div className="w-[680px] max-w-full aspect-square bg-[#0e1230] rounded-full shadow-2xl flex items-center">
                <div className="pl-10 pr-6 md:pl-16">
                  <h1 className="text-white text-[54px] leading-[1] sm:text-[72px] md:text-[92px] font-extrabold tracking-tight">
                    HackATL
                    <br />
                    <span className="block">2025</span>
                  </h1>
                  <div className="mt-8 inline-flex items-center gap-4">
                    <a
                      href="https://docs.google.com/forms/d/e/1FAIpQLSfvLt2ExtqgtWa8NWj25WveqK2UzSRW7Ni6b6NLpv08r3lk7A/viewform"
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center rounded-full bg-fuchsia-500 text-white font-semibold px-8 py-3 shadow-lg"
                    >
                      SIGN UP NOW
                    </a>
                    <span className="text-white/80 uppercase tracking-wider text-xs">Dates & Location go here</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LEGACY ABOUT */}
      <section className="relative bg-gradient-to-b from-[#d9c9f0] via-[#e8dbf7] to-[#e8dbf7]">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-14 md:py-20">
          <div className="grid md:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-4xl md:text-[44px] font-extrabold text-indigo-900 tracking-tight">About <span className="text-indigo-700">HackATL</span></h2>
              <p className="mt-5 text-indigo-900/90 leading-relaxed">
                Legacy about content placeholder. Early copy describing HackATL.
              </p>
              <div className="mt-10 w-52">
                <Placeholder className="w-full aspect-[4/3] rounded-xl">Logo</Placeholder>
              </div>
            </div>
            <div className="flex flex-col items-center md:items-end gap-6">
              <div className="w-full max-w-md">
                <div className="rounded-xl overflow-hidden shadow-xl ring-1 ring-indigo-600/30">
                  <Placeholder className="w-full aspect-[16/10]">About Photo</Placeholder>
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
                <span className="text-indigo-900 font-medium">HackATL@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LEGACY DIRECTORY CARDS */}
      <section className="relative bg-gradient-to-b from-[#c7f2d0] via-[#c9e8ff] to-[#cde0ff]">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-16">
          <h3 className="text-center text-5xl font-extrabold text-indigo-900">Directory</h3>
          <div className="mt-12 grid md:grid-cols-3 gap-8">
            {[1,2,3].map((i) => (
              <div key={i} className="bg-[#1b1570] rounded-2xl p-5 shadow-card ring-4 ring-indigo-900/40">
                <div className="rounded-xl overflow-hidden">
                  <Placeholder className="w-full h-36 md:h-44">Card Image</Placeholder>
                </div>
                <div className="mt-5">
                  <h4 className="text-white text-xl font-extrabold">Card Title</h4>
                  <p className="text-indigo-100/90 mt-2 text-sm leading-relaxed">Card description placeholder text.</p>
                </div>
                <div className="mt-6">
                  <button className="text-teal-300 text-sm font-semibold tracking-wide">
                    CHECK IT OUT &gt;
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
