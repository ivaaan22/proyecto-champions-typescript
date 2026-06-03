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
    <header className="bg-[#1a3a5c] border-b border-[#2a5080] sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-8 h-16 flex items-center gap-8">

        <div className="flex items-center gap-2 mr-4">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/e/e2/UEFA_Champions_League_logo.png"
            alt="Champions League"
            className="w-8 h-8 object-contain"
          />
          <span className="text-xl font-bold text-white tracking-wide">
            FUTBOL <span className="text-blue-300">360</span>
          </span>
        </div>

        <nav className="hidden md:flex items-center flex-1">
          {navLinks.map(link => (
            <button
              key={link.page}
              onClick={() => onNavigate(link.page)}
              className={`relative h-16 px-4 text-sm font-medium transition-colors cursor-pointer border-none bg-transparent
                ${currentPage === link.page ? "text-white" : "text-blue-100 hover:text-white"}`}
            >
              {link.label}
              {currentPage === link.page && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-300" />
              )}
            </button>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-1">
          <button className="bg-transparent border-none cursor-pointer text-lg p-1.5 rounded-md text-blue-100 hover:text-white transition-colors">🔍</button>
          <button className="bg-transparent border-none cursor-pointer text-lg p-1.5 rounded-md text-blue-100 hover:text-white transition-colors">🔔</button>
          <button className="bg-transparent border-none cursor-pointer text-lg p-1.5 rounded-md text-blue-100 hover:text-white transition-colors">👤</button>
        </div>

        <button
          className="md:hidden ml-auto bg-transparent border-none text-white text-xl cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

      </div>

      {menuOpen && (
        <div className="md:hidden flex flex-col bg-[#1a3a5c] border-t border-[#2a5080]">
          {navLinks.map(link => (
            <button
              key={link.page}
              onClick={() => { onNavigate(link.page); setMenuOpen(false) }}
              className={`bg-transparent border-none text-left px-8 py-3 text-sm font-medium cursor-pointer transition-colors
                ${currentPage === link.page ? "text-white bg-[#24507a]" : "text-blue-100 hover:text-white"}`}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  )
}
