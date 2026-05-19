import { teams } from "../data/Teams"

export function getCrest(teamName: string): string {
  const team = teams.find(t => t.name === teamName)
  return team ? team.crest : ""
}