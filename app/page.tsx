import Features from '@/components/Features'
import HeroSection from '@/components/HeroSection'
import HowItWorks from '@/components/HowItWorks'
import Pricing from '@/components/Pricing'
import Testimonials from '@/components/Testimonials'

const Page = () => {
  return (
    <main className='wrapper container'>
      <HeroSection />
      <HowItWorks />
      <Features />
      <Testimonials />
      <Pricing />
    </main>
  )
}

export default Page