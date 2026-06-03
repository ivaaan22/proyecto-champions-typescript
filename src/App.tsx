import { useState, useEffect } from "react"
import type { Page, AuthUser } from "./types"
import { supabase } from "./supabase"
import Header from "./components/Header"
import Hero from "./pages/Hero"
import FeaturedTeams from "./components/FeaturedTeams"
import HomeResults from "./components/HomeResults"
import Teams from "./pages/Teams"
import Results from "./pages/Results"
import Matches from "./pages/Matches"
import Standings from "./pages/Standings"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Footer from "./components/Footer"
import "./App.css"

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home")
  const [user, setUser] = useState<AuthUser | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email ?? "",
          username: session.user.user_metadata?.username,
          avatar_url: session.user.user_metadata?.avatar_url,
        })
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email ?? "",
          username: session.user.user_metadata?.username,
          avatar_url: session.user.user_metadata?.avatar_url,
        })
      } else {
        setUser(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  async function handleLogout() {
    await supabase.auth.signOut()
    setUser(null)
    setCurrentPage("home")
  }

  function handleAvatarChange(url: string) {
    setUser(prev => prev ? { ...prev, avatar_url: url } : null)
  }

  return (
    <div className="bg-[#04080f] min-h-screen flex flex-col">
      <Header
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        user={user}
        onLogout={handleLogout}
        onAvatarChange={handleAvatarChange}
      />

      <main className="flex-1">
        {currentPage === "login"    && <Login onNavigate={setCurrentPage} />}
        {currentPage === "register" && <Register onNavigate={setCurrentPage} />}

        {currentPage === "home" && (
          <>
            <Hero onNavigate={setCurrentPage} />
            <FeaturedTeams onNavigate={setCurrentPage} />
            <HomeResults onNavigate={setCurrentPage} />
          </>
        )}
        {currentPage === "teams"     && <Teams />}
        {currentPage === "results"   && <Results />}
        {currentPage === "matches"   && <Matches />}
        {currentPage === "standings" && <Standings onNavigate={setCurrentPage} />}
      </main>

      <Footer />
    </div>
  )
}

export default App
