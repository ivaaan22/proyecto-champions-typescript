import type { Page, Team } from "../types"
import { teams } from "../data/Teams"

type FeaturedTeamsProps = {
  onNavigate: (page: Page) => void
}

function TeamCard({ team }: { team: Team }) {
  return (
    <div className="bg-[#111827] border border-[#1e293b] rounded-xl p-4 text-center cursor-pointer hover:border-blue-500 hover:bg-[#1a2333] transition-all duration-200 hover:-translate-y-1 flex flex-col items-center gap-2">
      <img
        src={team.crest}
        alt={team.name}
        className="w-12 h-12 object-contain"
      />
      <span className="text-sm font-bold text-slate-100">{team.name}</span>
      <span className="text-xs text-slate-400">{team.country}</span>
    </div>
  )
}

export default function FeaturedTeams({ onNavigate }: FeaturedTeamsProps) {
  return (
    <section className="max-w-6xl mx-auto px-8 py-10">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-lg font-bold text-slate-100">Equipos destacados</h2>
        <button
          onClick={() => onNavigate("teams")}
          className="text-sm text-blue-500 font-medium bg-transparent border-none cursor-pointer hover:underline"
        >
          Ver todos los equipos →
        </button>
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
        {teams.slice(0, 8).map(team => (
          <TeamCard key={team.id} team={team} />
        ))}
      </div>
    </section>
  )
}