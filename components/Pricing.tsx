import { PricingTable } from '@clerk/nextjs'

const Pricing = () => {
    return (
        <section id="pricing" className="py-24 px-6 bg-muted/20">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-16">
                    <p className="text-xs text-primary uppercase tracking-widest font-medium mb-3">Simple pricing</p>
                    <h2 className="font-bold" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3.2rem)" }}>
                        Start free, go deeper
                    </h2>
                </div>

                <div className="clerk-pricing-container">
                    <PricingTable />
                </div>
            </div>
        </section>
    )
}

export default Pricing