import { useState } from "react"
import type { Page } from "../types"

type HeaderProps = {
  currentPage: Page
  onNavigate: (page: Page) => void
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks: { label: string; page: Page }[] = [
    { label: "Inicio",        page: "home"      },
    { label: "Equipos",       page: "teams"     },
    { label: "Partidos",      page: "matches"   },
    { label: "Resultados",    page: "results"   },
    { label: "Clasificación", page: "standings" },
  ]

  return (
    <header className="bg-[#04080f] border-b border-[#1e293b] sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-8 h-16 flex items-center gap-8">

        <div className="flex items-center gap-2 mr-4">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-base">
            ⚽
          </div>
          <span className="text-xl font-bold text-slate-100 tracking-wide">
            FUTBOL <span className="text-blue-500">360</span>
          </span>
        </div>

        <nav className="hidden md:flex items-center flex-1">
          {navLinks.map(link => (
            <button
              key={link.page}
              onClick={() => onNavigate(link.page)}
              className={`relative h-16 px-4 text-sm font-medium transition-colors cursor-pointer border-none bg-transparent
                ${currentPage === link.page ? "text-slate-100" : "text-slate-400 hover:text-slate-100"}`}
            >
              {link.label}
              {currentPage === link.page && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500" />
              )}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-1">
          <button className="bg-transparent border-none cursor-pointer text-lg p-1.5 rounded-md opacity-70 hover:opacity-100 transition-opacity">🔍</button>
          <button className="bg-transparent border-none cursor-pointer text-lg p-1.5 rounded-md opacity-70 hover:opacity-100 transition-opacity">🔔</button>
          <button className="bg-transparent border-none cursor-pointer text-lg p-1.5 rounded-md opacity-70 hover:opacity-100 transition-opacity">👤</button>
        </div>

        <button
          className="md:hidden ml-auto bg-transparent border-none text-slate-100 text-xl cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

      </div>

      {menuOpen && (
        <div className="md:hidden flex flex-col bg-[#0a1120] border-t border-[#1e293b]">
          {navLinks.map(link => (
            <button
              key={link.page}
              onClick={() => { onNavigate(link.page); setMenuOpen(false) }}
              className={`bg-transparent border-none text-left px-8 py-3 text-sm font-medium cursor-pointer transition-colors
                ${currentPage === link.page ? "text-slate-100 bg-[#111827]" : "text-slate-400 hover:text-slate-100"}`}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  )
}