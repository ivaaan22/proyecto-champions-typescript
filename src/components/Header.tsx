import { useState, useEffect, useRef } from "react"
import { supabase } from "../supabase"
import type { Page, AuthUser } from "../types"

type HeaderProps = {
  currentPage: Page
  onNavigate: (page: Page) => void
  user: AuthUser | null
  onLogout: () => void
  onAvatarChange: (url: string) => void
}

export default function Header({ currentPage, onNavigate, user, onLogout, onAvatarChange }: HeaderProps) {
  const [menuOpen, setMenuOpen]         = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [uploading, setUploading]       = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const navLinks: { label: string; page: Page }[] = [
    { label: "Inicio",        page: "home"      },
    { label: "Equipos",       page: "teams"     },
    { label: "Partidos",      page: "matches"   },
    { label: "Resultados",    page: "results"   },
    { label: "Clasificación", page: "standings" },
  ]

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement
      if (!target.closest("#user-menu")) setUserMenuOpen(false)
    }
    document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [])

  async function handleAvatarUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file || !user) return
    setUploading(true)

    // Usamos siempre el mismo nombre para que el upsert funcione bien
    const path = `${user.id}/avatar`

    // Borramos primero por si existe (ignora error si no existe)
    await supabase.storage.from("avatars").remove([path])

    // Subimos el nuevo archivo
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(path, file, {
        contentType: file.type,
        cacheControl: "0",
        upsert: true,
      })

    if (uploadError) {
      console.error("Error subiendo imagen:", uploadError.message)
      setUploading(false)
      return
    }

    const { data } = supabase.storage.from("avatars").getPublicUrl(path)
    const publicUrl = `${data.publicUrl}?t=${Date.now()}`

    await supabase.auth.updateUser({ data: { avatar_url: publicUrl } })
    onAvatarChange(publicUrl)
    setUserMenuOpen(false)
    setUploading(false)
  }

  return (
    <header className="bg-[#1a3a5c] border-b border-[#2a5080] sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-8 h-16 flex items-center gap-8">

        {/* Logo */}
        <div className="flex items-center gap-2 mr-4 cursor-pointer" onClick={() => onNavigate("home")}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/e/e2/UEFA_Champions_League_logo.png"
            alt="Champions League"
            className="w-8 h-8 object-contain"
          />
          <span className="text-xl font-bold text-white tracking-wide">
            FUTBOL <span className="text-blue-300">360</span>
          </span>
        </div>

        {/* Nav */}
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

        {/* Derecha */}
        <div className="hidden md:flex items-center gap-2">
          {user ? (
            <div id="user-menu" className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 bg-transparent border-none cursor-pointer"
              >
                {user.avatar_url ? (
                  <img
                    src={user.avatar_url}
                    alt="avatar"
                    className="w-8 h-8 rounded-full object-cover border-2 border-blue-300"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm font-bold border-2 border-blue-300">
                    {(user.username ?? user.email)[0].toUpperCase()}
                  </div>
                )}
                <span className="text-blue-100 text-sm font-medium">
                  {user.username ?? user.email.split("@")[0]}
                </span>
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 top-12 bg-[#0a1628] border border-[#1e3a5f] rounded-xl shadow-xl w-48 py-2 z-50">
                  <div className="px-4 py-2 border-b border-[#1e3a5f] mb-1">
                    <p className="text-xs text-slate-400">Conectado como</p>
                    <p className="text-sm font-semibold text-slate-100 truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 bg-transparent border-none cursor-pointer transition-colors"
                  >
                    {uploading ? "⏳ Subiendo..." : "📷 Cambiar foto"}
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarUpload}
                  />
                  <button
                    onClick={onLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-white/5 bg-transparent border-none cursor-pointer transition-colors"
                  >
                    🚪 Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate("login")}
                className="text-blue-100 hover:text-white text-sm font-medium bg-transparent border-none cursor-pointer transition-colors"
              >
                Iniciar sesión
              </button>
              <button
                onClick={() => onNavigate("register")}
                className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-4 py-1.5 rounded-lg border-none cursor-pointer transition-colors"
              >
                Registrarse
              </button>
            </div>
          )}
        </div>

        {/* Hamburguesa móvil */}
        <button
          className="md:hidden ml-auto bg-transparent border-none text-white text-xl cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Menú móvil */}
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
          {user ? (
            <button
              onClick={onLogout}
              className="bg-transparent border-none text-left px-8 py-3 text-sm font-medium cursor-pointer text-red-400"
            >
              🚪 Cerrar sesión
            </button>
          ) : (
            <button
              onClick={() => { onNavigate("login"); setMenuOpen(false) }}
              className="bg-transparent border-none text-left px-8 py-3 text-sm font-medium cursor-pointer text-blue-300"
            >
              Iniciar sesión
            </button>
          )}
        </div>
      )}
    </header>
  )
}
