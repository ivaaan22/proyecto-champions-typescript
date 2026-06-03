import { matches } from "../data/Matches"
import { standings } from "../data/Standings"
import { getCrest } from "../utils/getCrest"
import MatchCard from "./MatchCard"
import type { Page } from "../types"

type HomeResultsProps = {
  onNavigate: (page: Page) => void
}

export default function HomeResults({ onNavigate }: HomeResultsProps) {
  const done = matches.filter(m => m.status === "done").slice(0, 4)
  const upcoming = matches.filter(m => m.status === "upcoming")

  return (
    <div className="max-w-6xl mx-auto px-8 py-10 flex flex-col gap-6">

      {/* ÚLTIMOS RESULTADOS */}
      <div className="bg-[#060e1e] border border-[#1e3a5f] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-bold text-slate-100">Últimos resultados</h2>
          <button
            onClick={() => onNavigate("results")}
            className="text-sm text-blue-400 font-medium bg-transparent border-none cursor-pointer hover:underline"
          >
            Ver todos los resultados →
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {done.map(match => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
        <div className="flex justify-center">
          <button
            onClick={() => onNavigate("results")}
            className="bg-transparent border border-blue-500/40 text-blue-400 text-sm font-semibold px-20 py-2.5 rounded-lg cursor-pointer hover:bg-blue-500/10 hover:border-blue-400 transition-all duration-200"
          >
            Ver más resultados
          </button>
        </div>
      </div>

      {/* CLASIFICACIÓN + PRÓXIMOS PARTIDOS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* CLASIFICACIÓN */}
        <div className="bg-[#060e1e] border border-[#1e3a5f] rounded-2xl p-6">
          <h2 className="text-base font-bold text-slate-100 mb-4">Clasificación</h2>
          <table className="w-full">
            <thead>
              <tr className="text-xs text-slate-500 uppercase tracking-wider">
                <th className="text-left pb-2 w-6">#</th>
                <th className="text-left pb-2">Equipo</th>
                <th className="text-center pb-2">PJ</th>
                <th className="text-center pb-2">DG</th>
                <th className="text-center pb-2">PTS</th>
              </tr>
            </thead>
            <tbody>
              {standings.map(s => (
                <tr key={s.pos} className="border-t border-[#1e3a5f] hover:bg-blue-500/5 transition-colors">
                  <td className="py-2 text-xs font-bold text-slate-400">{s.pos}</td>
                  <td className="py-2">
                    <div className="flex items-center gap-2">
                      <img src={getCrest(s.team)} alt={s.team} className="w-5 h-5 object-contain" />
                      <span className="text-sm font-semibold text-slate-100">{s.team}</span>
                    </div>
                  </td>
                  <td className="py-2 text-center text-sm text-slate-300">{s.pj}</td>
                  <td className="py-2 text-center text-sm text-slate-300">{s.dg}</td>
                  <td className="py-2 text-center text-sm font-black text-slate-100">{s.pts}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={() => onNavigate("standings")}
            className="text-sm text-blue-400 font-medium bg-transparent border-none cursor-pointer hover:underline mt-4 block"
          >
            Ver clasificación completa →
          </button>
        </div>

        {/* PRÓXIMOS PARTIDOS */}
        <div className="bg-[#060e1e] border border-[#1e3a5f] rounded-2xl p-6">
          <h2 className="text-base font-bold text-slate-100 mb-4">Próximos partidos</h2>
          <div className="flex flex-col gap-4">
            {upcoming.map(match => (
              <div key={match.id} className="border-b border-[#1e3a5f] pb-4 last:border-0 last:pb-0">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs text-slate-400">📅 {match.date}</span>
                  <span className="text-slate-600">•</span>
                  <span className="text-xs text-blue-400 font-bold uppercase tracking-wider">{match.phase}</span>
                </div>
                <div className="grid grid-cols-3 items-center">
                  <div className="flex items-center gap-3">
                    <img src={getCrest(match.home)} alt={match.home} className="w-9 h-9 object-contain" />
                    <span className="text-sm font-bold text-slate-100">{match.home}</span>
                  </div>
                  <div className="text-center">
                    <span className="text-2xl font-black text-amber-400">{match.time}</span>
                  </div>
                  <div className="flex items-center gap-3 justify-end">
                    <span className="text-sm font-bold text-slate-100">{match.away}</span>
                    <img src={getCrest(match.away)} alt={match.away} className="w-9 h-9 object-contain" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            onClick={() => onNavigate("matches")}
            className="text-sm text-blue-400 font-medium bg-transparent border-none cursor-pointer hover:underline mt-4 block"
          >
            Ver todos los partidos →
          </button>
        </div>

      </div>

      {/* FOOTER INFO */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#060e1e] border border-[#1e3a5f] rounded-2xl p-5 flex items-center gap-4">
          <span className="text-2xl">📊</span>
          <div>
            <p className="text-sm font-bold text-slate-100">Estadísticas en tiempo real</p>
            <p className="text-xs text-slate-400">Datos actualizados al instante</p>
          </div>
        </div>
        <div className="bg-[#060e1e] border border-[#1e3a5f] rounded-2xl p-5 flex items-center gap-4">
          <span className="text-2xl">⭐</span>
          <div>
            <p className="text-sm font-bold text-slate-100">Cobertura completa</p>
            <p className="text-xs text-slate-400">Todos los partidos, todas las jornadas</p>
          </div>
        </div>
        <div className="bg-[#060e1e] border border-[#1e3a5f] rounded-2xl p-5 flex items-center gap-4">
          <span className="text-2xl">📱</span>
          <div>
            <p className="text-sm font-bold text-slate-100">Disponible en la app</p>
            <p className="text-xs text-slate-400">Lleva la Champions contigo</p>
          </div>
        </div>
      </div>

    </div>
  )
}
