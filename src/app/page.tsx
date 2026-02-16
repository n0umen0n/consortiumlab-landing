import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import LaunchCTA from '@/components/LaunchCTA'
import WhyConsortium from '@/components/WhyConsortium'
import Team from '@/components/Team'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <LaunchCTA />
      <WhyConsortium />
      <Team />
      <Footer />
    </main>
  )
}
