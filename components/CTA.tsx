'use client'
import { useClerk, useUser } from '@clerk/nextjs'
import { ArrowRight, Headphones } from 'lucide-react'
import { useRouter } from 'next/navigation'

const CTA = () => {
    const { isSignedIn } = useUser()
    const { openSignUp } = useClerk()
    const router = useRouter()

    const handleAction = () => {
        if (isSignedIn) {
            router.push('/books/new')
        } else {
            openSignUp()
        }
    }

    return (
        <section
            className="py-28 px-6 relative overflow-hidden"
            aria-labelledby="cta-heading"
        >
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <div
                    className="absolute inset-0 opacity-10"
                    style={{ background: "radial-gradient(ellipse at center, #3a6644 0%, transparent 65%)" }}
                />
            </div>

            <div className="relative max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
                <div
                    className="w-16 h-16 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center"
                    aria-hidden="true"
                >
                    <Headphones size={28} className="text-primary" />
                </div>

                <h2
                    id="cta-heading"
                    className="font-bold font-serif text-[clamp(2rem,5vw,3.5rem)]"
                >
                    Your next great book conversation starts now
                </h2>

                <p className="text-muted-foreground max-w-lg leading-relaxed">
                    Join readers who have already discovered what it means to truly understand — and be understood by — a book.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4 mt-2">
                    <button
                        onClick={handleAction}
                        className="flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-full font-medium hover:bg-accent transition-colors text-sm"
                        aria-label={isSignedIn ? 'Add your book' : 'Start for free'}
                    >
                        {isSignedIn ? 'Add your book' : 'Start for free'}
                        <ArrowRight size={15} aria-hidden="true" />
                    </button>

                    <p className="text-xs text-muted-foreground">
                        No credit card · Cancel anytime
                    </p>
                </div>
            </div>
        </section>
    )
}

export default CTA