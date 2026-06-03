import { matches } from "../data/Matches"
import MatchCard from "../components/MatchCard"

export default function Results() {
  const done = matches.filter(m => m.status === "done")
  const upcoming = matches.filter(m => m.status === "upcoming")

  return (
    <div className="max-w-6xl mx-auto px-8 py-10">

      <h2 className="text-2xl font-black text-slate-100 uppercase tracking-widest mb-8">
        Resultados
      </h2>

      <div className="mb-10">
        <h3 className="text-base font-bold text-slate-300 mb-4">Últimos resultados</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {done.map(match => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      </div>

      {upcoming.length > 0 && (
        <div>
          <h3 className="text-base font-bold text-slate-300 mb-4">Próximos partidos</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {upcoming.map(match => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        </div>
      )}

    </div>
  )
}
