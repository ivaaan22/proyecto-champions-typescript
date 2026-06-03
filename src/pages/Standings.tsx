import { standings } from "../data/Standings"
import { matches } from "../data/Matches"
import { getCrest } from "../utils/getCrest"
import type { Match, Page } from "../types"

type StandingsProps = {
  onNavigate: (page: Page) => void
}

function getRowStyle(pos: number): string {
  if (pos <= 8)  return "border-l-2 border-l-blue-500"
  if (pos <= 24) return "border-l-2 border-l-amber-400"
  return "border-l-2 border-l-transparent"
}

function getPosColor(pos: number): string {
  if (pos <= 8)  return "text-blue-400"
  if (pos <= 24) return "text-amber-400"
  return "text-slate-500"
}

function UpcomingCard({ match }: { match: Match }) {
  return (
    <div className="bg-[#0a1628] border border-[#1e3a5f] rounded-xl p-4">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

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
                <tr
                  key={s.pos}
                  className={`border-t border-[#1e3a5f] hover:bg-white/5 transition-colors ${getRowStyle(s.pos)}`}
                >
                  <td className={`py-2.5 text-xs font-black pl-2 ${getPosColor(s.pos)}`}>{s.pos}</td>
                  <td className="py-2.5">
                    <div className="flex items-center gap-2">
                      <img src={getCrest(s.team)} alt={s.team} className="w-5 h-5 object-contain" />
                      <span className="text-sm font-semibold text-slate-100">{s.team}</span>
                    </div>
                  </td>
                  <td className="py-2.5 text-center text-sm text-slate-300">{s.pj}</td>
                  <td className="py-2.5 text-center text-sm text-slate-300">{s.dg}</td>
                  <td className="py-2.5 text-center text-sm font-black text-slate-100">{s.pts}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* LEYENDA */}
          <div className="mt-5 pt-4 border-t border-[#1e3a5f] flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-blue-500 shrink-0" />
              <span className="text-xs text-slate-400">Posiciones 1–8: clasificación directa a octavos de final</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-amber-400 shrink-0" />
              <span className="text-xs text-slate-400">Posiciones 9–24: repechaje (playoff eliminatorio)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-sm bg-slate-700 shrink-0" />
              <span className="text-xs text-slate-400">Posiciones 25–32: eliminados de la competición</span>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA sticky */}
        <div className="flex flex-col gap-4 lg:sticky lg:top-20">

          <div className="bg-[#060e1e] border border-[#1e3a5f] rounded-2xl p-6">
            <h3 className="text-base font-bold text-slate-100 mb-4">Próximos partidos</h3>
            <div className="flex flex-col gap-3">
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

    </div>
  )
}
