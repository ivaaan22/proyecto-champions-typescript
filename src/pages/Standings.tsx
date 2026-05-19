import { standings } from "../data/Standings"
import { matches } from "../data/Matches"
import { getCrest } from "../utils/getCrest"
import type { Match, Page } from "../types"

type StandingsProps = {
  onNavigate: (page: Page) => void
}

function UpcomingCard({ match }: { match: Match }) {
  return (
    <div className="bg-[#060e1e] border border-[#1e3a5f] rounded-xl p-4">
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
  )
}

export default function Standings({ onNavigate }: StandingsProps) {
  const upcoming = matches.filter(m => m.status === "upcoming")

  return (
    <div className="max-w-6xl mx-auto px-8 py-10 flex flex-col gap-6">

      <h2 className="text-2xl font-black text-slate-100 uppercase tracking-widest">
        Clasificación
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* TABLA CLASIFICACIÓN */}
        <div className="bg-[#060e1e] border border-[#1e3a5f] rounded-2xl p-6">
          <h3 className="text-base font-bold text-slate-100 mb-4">Clasificación</h3>
          <table className="w-full">
            <thead>
              <tr className="text-xs text-slate-500 uppercase tracking-wider">
                <th className="text-left pb-3 w-6">#</th>
                <th className="text-left pb-3">Equipo</th>
                <th className="text-center pb-3">PJ</th>
                <th className="text-center pb-3">DG</th>
                <th className="text-center pb-3">PTS</th>
              </tr>
            </thead>
            <tbody>
              {standings.map(s => (
                <tr key={s.pos} className="border-t border-[#1e3a5f] hover:bg-blue-500/5 transition-colors">
                  <td className="py-3 text-xs font-bold text-slate-400">{s.pos}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <img src={getCrest(s.team)} alt={s.team} className="w-6 h-6 object-contain" />
                      <span className="text-sm font-semibold text-slate-100">{s.team}</span>
                    </div>
                  </td>
                  <td className="py-3 text-center text-sm text-slate-300">{s.pj}</td>
                  <td className="py-3 text-center text-sm text-slate-300">{s.dg}</td>
                  <td className="py-3 text-center text-sm font-black text-slate-100">{s.pts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PRÓXIMOS PARTIDOS */}
        <div className="bg-[#060e1e] border border-[#1e3a5f] rounded-2xl p-6">
          <h3 className="text-base font-bold text-slate-100 mb-4">Próximos partidos</h3>
          <div className="flex flex-col gap-4">
            {upcoming.map(match => (
              <UpcomingCard key={match.id} match={match} />
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

      {/* INFO CARDS */}
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