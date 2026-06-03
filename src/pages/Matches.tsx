import { useState } from "react"
import { matches } from "../data/Matches"
import MatchCard from "../components/MatchCard"
import type { Phase } from "../types"

const phases: { label: string; value: Phase | "TODOS" }[] = [
  { label: "Todos",          value: "TODOS"          },
  { label: "Fase de grupos", value: "FASE DE GRUPOS" },
  { label: "Cuartos",        value: "CUARTOS"        },
  { label: "Semifinal",      value: "SEMIFINAL"      },
  { label: "Final",          value: "FINAL"          },
]

export default function Matches() {
  const [activePhase, setActivePhase] = useState<Phase | "TODOS">("TODOS")

  const filtered = activePhase === "TODOS"
    ? matches
    : matches.filter(m => m.phase === activePhase)

  return (
    <div className="max-w-6xl mx-auto px-8 py-10 flex flex-col gap-6">

      <h2 className="text-2xl font-black text-slate-100 uppercase tracking-widest">
        Partidos
      </h2>

      {/* FILTROS */}
      <div className="flex gap-2 flex-wrap">
        {phases.map(p => (
          <button
            key={p.value}
            onClick={() => setActivePhase(p.value)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold border cursor-pointer transition-all duration-200
              ${activePhase === p.value
                ? "bg-blue-500 border-blue-500 text-white"
                : "bg-transparent border-[#1e3a5f] text-slate-400 hover:border-blue-400 hover:text-slate-100"}`}
          >
            {p.label}
          </button>
        ))}
      </div>

      {/* PARTIDOS */}
      <div className="bg-[#060e1e] border border-[#1e3a5f] rounded-2xl p-6">
        {filtered.length === 0 ? (
          <p className="text-slate-400 text-sm text-center py-8">No hay partidos en esta fase.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map(match => (
              <MatchCard key={match.id} match={match} />
            ))}
          </div>
        )}
      </div>

    </div>
  )
}
