import Features from '@/components/Features'
import HeroSection from '@/components/HeroSection'
import HowItWorks from '@/components/HowItWorks'

const Page = () => {
  return (
    <main className='wrapper container'>
      <HeroSection />
      <HowItWorks />
      <Features />
    </main>
  )
}

export default Page