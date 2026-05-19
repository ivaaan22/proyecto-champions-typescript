import { useState } from "react"
import type { Page } from "./types"
import Header from "./components/Header"
import Hero from "./pages/Hero"
import FeaturedTeams from "./components/FeaturedTeams"
import HomeResults from "./components/HomeResults"
import Teams from "./pages/Teams"
import Results from "./pages/Results"
import Matches from "./pages/Matches"
import Standings from "./pages/Standings"
import Footer from "./components/Footer"
import "./App.css"

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home")

  return (
    <div className="bg-[#04080f] min-h-screen flex flex-col">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />

      <main className="flex-1">
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