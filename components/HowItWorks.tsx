import { steps } from '@/app/data/data'

const HowItWorks = () => {
    return (
        <section id="how-it-works" className="py-24 px-6" aria-labelledby="how-it-works-heading">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-16">
                    <p className="text-xs text-primary uppercase tracking-widest font-medium mb-3">Simple by design</p>
                    <h2 id="how-it-works-heading" className="font-bold font-serif text-[clamp(2rem,5vw,3.2rem)] leading-tight">
                        Three steps to your first conversation
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-12 md:gap-8 justify-items-center">
                    {steps.map((step, i) => (
                        <article key={i} className="flex flex-col items-center md:items-start text-center md:text-left">
                            <span
                                className="font-mono text-5xl font-semibold text-[#E8A43840]"
                                aria-hidden="true"
                            >
                                {step.num}
                            </span>
                            <h3 className="text-xl font-semibold font-serif my-3">
                                <span className="sr-only">Step {step.num}:</span> {step.title}
                            </h3>
                            <p className="text-foreground/90 text-base leading-relaxed max-w-70">
                                {step.desc}
                            </p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default HowItWorks