import { getCrest } from "../utils/getCrest"
import type { Match } from "../types"

export default function MatchCard({ match }: { match: Match }) {
  return (
    <div className="bg-[#0a1628] border border-[#1e3a5f] rounded-xl p-5 cursor-pointer hover:border-blue-400 transition-all duration-200">
      <div className="flex items-center gap-2 mb-5">
        <span className="text-xs text-slate-400">📅 {match.date}</span>
        <span className="text-slate-600">•</span>
        <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">{match.phase}</span>
      </div>
      <div className="grid grid-cols-3 items-center gap-2">
        <div className="flex flex-col items-center gap-2">
          <img src={getCrest(match.home)} alt={match.home} className="w-14 h-14 object-contain" />
          <span className="text-sm font-bold text-slate-100 text-center">{match.home}</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <span className="text-4xl font-black text-white tracking-widest">
            {match.status === "done" ? `${match.homeScore} - ${match.awayScore}` : "VS"}
          </span>
          <span className={`text-xs font-bold ${match.status === "done" ? "text-blue-400" : "text-amber-400"}`}>
            {match.status === "done" ? "Finalizado" : match.time}
          </span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <img src={getCrest(match.away)} alt={match.away} className="w-14 h-14 object-contain" />
          <span className="text-sm font-bold text-slate-100 text-center">{match.away}</span>
        </div>
      </div>
    </div>
  )
}
