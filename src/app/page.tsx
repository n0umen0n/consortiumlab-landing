import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import TwoSidedMarket from '@/components/TwoSidedMarket'
import WhyConsortium from '@/components/WhyConsortium'
import Team from '@/components/Team'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <TwoSidedMarket />
      <WhyConsortium />
      <Team />
      <Footer />
    </main>
  )
}
