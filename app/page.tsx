import Features from '@/components/Features'
import HeroSection from '@/components/HeroSection'
import HowItWorks from '@/components/HowItWorks'
import Testimonials from '@/components/Testimonials'

const Page = () => {
  return (
    <main className='wrapper container'>
      <HeroSection />
      <HowItWorks />
      <Features />
      <Testimonials />
    </main>
  )
}

export default Page