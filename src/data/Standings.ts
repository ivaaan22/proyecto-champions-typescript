export type Standing = {
  pos: number
  team: string
  pj: number
  dg: string
  pts: number
}

export const standings: Standing[] = [
  { pos: 1, team: "Real Madrid",  pj: 5, dg: "+7", pts: 13 },
  { pos: 2, team: "Bayern",       pj: 5, dg: "+6", pts: 12 },
  { pos: 3, team: "Inter",        pj: 5, dg: "+4", pts: 10 },
  { pos: 4, team: "Barcelona",    pj: 5, dg: "+3", pts: 9  },
  { pos: 5, team: "PSG",          pj: 5, dg: "+2", pts: 8  },
  { pos: 6, team: "Arsenal",      pj: 5, dg: "+1", pts: 8  },
  { pos: 7, team: "Dortmund",     pj: 5, dg: "-1", pts: 6  },
  { pos: 8, team: "Liverpool",    pj: 5, dg: "-2", pts: 5  },
]