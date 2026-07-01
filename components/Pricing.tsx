import { PricingTable } from '@clerk/nextjs'

const Pricing = () => {
    return (
        <section
            id="pricing"
            className="py-24 px-6 bg-muted/20"
            aria-labelledby="pricing-heading"
        >
            <div className="max-w-5xl mx-auto">
                <header className="text-center mb-16">
                    <p className="text-xs text-primary uppercase tracking-widest font-medium mb-3">
                        Simple pricing
                    </p>
                    <h2
                        id="pricing-heading"
                        className="font-bold"
                        style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3.2rem)" }}
                    >
                        Start free, go deeper
                    </h2>
                </header>

                <div className="clerk-pricing-container" aria-label="Pricing plans table">
                    <PricingTable />
                </div>
            </div>
        </section>
    )
}

export default Pricing