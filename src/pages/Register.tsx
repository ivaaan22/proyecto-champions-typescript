import { useState } from "react"
import { supabase } from "../supabase"
import type { Page } from "../types"

type RegisterProps = {
  onNavigate: (page: Page) => void
}

export default function Register({ onNavigate }: RegisterProps) {
  const [email, setEmail]         = useState("")
  const [username, setUsername]   = useState("")
  const [password, setPassword]   = useState("")
  const [confirm, setConfirm]     = useState("")
  const [error, setError]         = useState("")
  const [success, setSuccess]     = useState(false)
  const [loading, setLoading]     = useState(false)

  async function handleRegister() {
    setError("")
    if (password !== confirm) {
      setError("Las contraseñas no coinciden")
      return
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres")
      return
    }
    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { username } },
    })
    setLoading(false)
    if (error) {
      setError(error.message)
    } else {
      setSuccess(true)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[#04080f] flex items-center justify-center px-4">
        <div className="bg-[#0a1628] border border-[#1e3a5f] rounded-2xl p-8 w-full max-w-md text-center">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-xl font-black text-white mb-2">¡Cuenta creada!</h2>
          <p className="text-slate-400 text-sm mb-6">
            Revisa tu email para confirmar tu cuenta y luego inicia sesión.
          </p>
          <button
            onClick={() => onNavigate("login")}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm py-2.5 px-6 rounded-lg cursor-pointer border-none transition-colors"
          >
            Ir al login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#04080f] flex items-center justify-center px-4">
      <div className="bg-[#0a1628] border border-[#1e3a5f] rounded-2xl p-8 w-full max-w-md">

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/e/e2/UEFA_Champions_League_logo.png"
            alt="Champions League"
            className="w-14 h-14 object-contain mb-3"
          />
          <h1 className="text-2xl font-black text-white tracking-widest uppercase">Futbol <span className="text-blue-400">360</span></h1>
          <p className="text-slate-400 text-sm mt-1">Crea tu cuenta</p>
        </div>

        {/* Formulario */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Nombre de usuario</label>
            <input
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="Tu nombre"
              className="bg-[#060e1e] border border-[#1e3a5f] rounded-lg px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="bg-[#060e1e] border border-[#1e3a5f] rounded-lg px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="bg-[#060e1e] border border-[#1e3a5f] rounded-lg px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Confirmar contraseña</label>
            <input
              type="password"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              placeholder="••••••••"
              onKeyDown={e => e.key === "Enter" && handleRegister()}
              className="bg-[#060e1e] border border-[#1e3a5f] rounded-lg px-4 py-2.5 text-sm text-slate-100 placeholder-slate-600 outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          {error && (
            <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            onClick={handleRegister}
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white font-semibold text-sm py-2.5 rounded-lg cursor-pointer border-none transition-colors mt-1"
          >
            {loading ? "Creando cuenta..." : "Crear cuenta"}
          </button>
        </div>

        {/* Login */}
        <p className="text-center text-slate-400 text-sm mt-6">
          ¿Ya tienes cuenta?{" "}
          <button
            onClick={() => onNavigate("login")}
            className="text-blue-400 font-semibold bg-transparent border-none cursor-pointer hover:underline"
          >
            Inicia sesión
          </button>
        </p>

      </div>
    </div>
  )
}
