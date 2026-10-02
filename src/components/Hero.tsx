export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 pb-16">
      <div className="relative rounded-2xl bg-gradient-to-br from-[#111] to-[#0a0a0a] border border-white/5 p-8 sm:p-12 overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Left — Text Content */}
          <div>
            <span className="inline-block text-[10px] tracking-widest font-semibold text-[#ccff00] border border-[#ccff00]/30 rounded-full px-3 py-1 mb-6">
              WORKOUT LIBRARY
            </span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-4">
              TRAIN WITH INTENT. <br />
              LOG EVERY SET.
            </h1>
            <p className="text-gray-400 max-w-md mb-8">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
              into today's plan, and watch the week's work add up.
            </p>
            <a
              href="#library"
              className="inline-block bg-[#ccff00] text-black font-semibold text-sm px-6 py-3 rounded-lg hover:bg-[#b8e600] transition-colors"
            >
              BROWSE WORKOUTS
            </a>
          </div>

          {/* Right — Muscle Figure Image */}
          <div className="hidden lg:flex justify-center items-center">
            <img
              src="/hero-muscle.png"
              alt="Muscle figure on workout machine"
              className="max-h-[360px] w-auto object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}