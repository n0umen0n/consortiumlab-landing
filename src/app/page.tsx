import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import TwoSidedIntro from '@/components/TwoSidedIntro'
import Solution from '@/components/Solution'
import HowItWorks from '@/components/HowItWorks'
import ProtocolStack from '@/components/ProtocolStack'
import Team from '@/components/Team'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="relative overflow-x-clip">
      <Navbar />
      <Hero />
      <TwoSidedIntro />
      <Solution />
      <HowItWorks />
      <ProtocolStack />
      <Team />
      <Footer />
    </main>
  )
}
