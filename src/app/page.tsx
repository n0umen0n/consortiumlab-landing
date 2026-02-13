import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Problem from '@/components/Problem'
import Solution from '@/components/Solution'
import Vision from '@/components/Vision'
import Founder from '@/components/Founder'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Problem />
      <Solution />
      <Vision />
      <Founder />
      <Footer />
    </main>
  )
}
