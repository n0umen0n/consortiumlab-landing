import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import TwoSidedIntro from '@/components/TwoSidedIntro'
import OpenClawSwarm from '@/components/OpenClawSwarm'
import Solution from '@/components/Solution'
import HowItWorks from '@/components/HowItWorks'
import Team from '@/components/Team'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="relative overflow-x-clip">
      <Navbar />
      <Hero />
      <TwoSidedIntro />
      <OpenClawSwarm />
      <Solution />
      <HowItWorks />
      <Team />
      <Footer />
    </main>
  )
}
