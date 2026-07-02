import CTA from '@/components/CTA'
import Features from '@/components/Features'
import Footer from '@/components/Footer'
import HeroSection from '@/components/HeroSection'
import HowItWorks from '@/components/HowItWorks'
import Pricing from '@/components/Pricing'
import Testimonials from '@/components/Testimonials'

const Page = () => {
  return (
    <main className='wrapper container' id='main-content'>
      <HeroSection />
      <HowItWorks />
      <Features />
      <Testimonials />
      <Pricing />
      <CTA />
      <Footer />
    </main>
  )
}

export default Page