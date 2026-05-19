import type { Page } from "../types"

type HeroProps = {
  onNavigate: (page: Page) => void
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <section
      className="relative flex items-center overflow-hidden"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1400&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "600px",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#04080f] via-[#04080fcc] to-[#04080f80]" />

      <div className="relative z-10 max-w-6xl mx-auto w-full px-8 py-16">
        <h1 className="font-black text-5xl md:text-6xl uppercase leading-none tracking-widest text-slate-100 mb-4">
          Equipos y<br />
          <span className="text-blue-500">resultados</span>
        </h1>
        <p className="text-slate-400 text-sm mb-6 max-w-sm">
          Sigue los últimos partidos y resultados de la Champions League.
        </p>
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() => onNavigate("results")}
            className="bg-blue-500 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-md cursor-pointer border-none transition-colors"
          >
            📅 Ver partidos
          </button>
          <button
            onClick={() => onNavigate("standings")}
            className="bg-transparent hover:bg-white/5 text-slate-100 text-sm font-semibold px-5 py-2.5 rounded-md cursor-pointer border border-white/30 transition-colors"
          >
            📊 Ver clasificación
          </button>
        </div>
      </div>
    </section>
  )
}