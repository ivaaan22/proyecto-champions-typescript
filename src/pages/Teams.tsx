import type { Team } from "../types"
import { teams } from "../data/Teams"

function TeamCard({ team }: { team: Team }) {
  return (
    <div className="bg-[#111827] border border-[#1e293b] rounded-xl p-4 text-center cursor-pointer hover:border-blue-500 hover:bg-[#1a2333] transition-all duration-200 hover:-translate-y-1 flex flex-col items-center gap-2">
      <img
        src={team.crest}
        alt={team.name}
        className="w-16 h-16 object-contain"
      />
      <span className="text-sm font-bold text-slate-100">{team.name}</span>
      <span className="text-xs text-slate-400">{team.country}</span>
    </div>
  )
}

export default function Teams() {
  return (
    <div className="max-w-6xl mx-auto px-8 py-10">
      <h2 className="text-2xl font-black text-slate-100 uppercase tracking-widest mb-8">
        Todos los equipos
      </h2>
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-4">
        {teams.map(team => (
          <TeamCard key={team.id} team={team} />
        ))}
      </div>
    </div>
  )
}