import { useState } from 'react'
import { useReveal } from './hooks/useReveal'
import CursorFollower from './components/CursorFollower'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Features from './components/Features'
import DemoSection from './components/DemoSection'
import Waitlist from './components/Waitlist'
import UGC from './components/UGC'
import RulesModal from './components/RulesModal'
import Footer from './components/Footer'

export default function App() {
  useReveal()
  const [rulesOpen, setRulesOpen] = useState(false)
  return (
    <div className="relative grain">
      <CursorFollower />
      <Nav />
      <main>
        <Hero />
        <Features />
        <DemoSection />
        <Waitlist />
        <UGC onOpenRules={() => setRulesOpen(true)} />
      </main>
      <Footer />
      <RulesModal open={rulesOpen} onClose={() => setRulesOpen(false)} />
    </div>
  )
}
