import type { Match } from "../types"

export const matches: Match[] = [
  { id: 1,  date: "14 MAY 2024", phase: "FASE DE GRUPOS", home: "Real Madrid",  away: "Bayern",     homeScore: 2, awayScore: 1, status: "done"     },
  { id: 2,  date: "14 MAY 2024", phase: "FASE DE GRUPOS", home: "Inter",        away: "Arsenal",    homeScore: 1, awayScore: 1, status: "done"     },
  { id: 3,  date: "14 MAY 2024", phase: "FASE DE GRUPOS", home: "PSG",          away: "Dortmund",   homeScore: 3, awayScore: 2, status: "done"     },
  { id: 4,  date: "14 MAY 2024", phase: "FASE DE GRUPOS", home: "Liverpool",    away: "Barcelona",  homeScore: 0, awayScore: 0, status: "done"     },
  { id: 5,  date: "07 ABR 2024", phase: "CUARTOS",        home: "Arsenal",      away: "Bayern",     homeScore: 1, awayScore: 0, status: "done"     },
  { id: 6,  date: "07 ABR 2024", phase: "CUARTOS",        home: "Barcelona",    away: "PSG",        homeScore: 3, awayScore: 1, status: "done"     },
  { id: 7,  date: "07 ABR 2024", phase: "CUARTOS",        home: "Real Madrid",  away: "Man. City",  homeScore: 3, awayScore: 3, status: "done"     },
  { id: 8,  date: "07 ABR 2024", phase: "CUARTOS",        home: "Inter",        away: "Atlético",   homeScore: 2, awayScore: 0, status: "done"     },
  { id: 9,  date: "14 MAY 2024", phase: "SEMIFINAL",      home: "Real Madrid",  away: "Barcelona",        time: "21:00",             status: "upcoming"  },
  { id: 10, date: "22 MAY 2024", phase: "SEMIFINAL",      home: "Bayern",       away: "Inter",            time: "21:00",             status: "upcoming"  },
]
