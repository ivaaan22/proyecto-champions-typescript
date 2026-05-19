export type Page = "home" | "teams" | "matches" | "results" | "standings"

export type MatchStatus = "done" | "upcoming"

export type Phase = "FASE DE GRUPOS" | "CUARTOS" | "SEMIFINAL" | "FINAL"

export type Team = {
  id: number
  name: string
  country: string
  crest: string
}

export type Match = {
  id: number
  date: string
  phase: Phase
  home: string
  away: string
  homeScore?: number
  awayScore?: number
  time?: string
  status: MatchStatus
}