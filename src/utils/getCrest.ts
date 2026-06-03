import { teams } from "../data/Teams"

const FALLBACK_CREST = "https://crests.football-data.org/CL.png"

export function getCrest(teamName: string): string {
  const team = teams.find(t => t.name === teamName)
  return team ? team.crest : FALLBACK_CREST
}
