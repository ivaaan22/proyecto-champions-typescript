export type Page = "home" | "teams" | "matches" | "results" | "standings" | "login" | "register"

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

export type Standing = {
  pos: number
  team: string
  pj: number
  dg: string
  pts: number
}

export type AuthUser = {
  id: string
  email: string
  avatar_url?: string
  username?: string
}
