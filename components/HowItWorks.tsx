import { steps } from '@/app/data/data'

const HowItWorks = () => {
    return (
        <section id="how-it-works" className="py-24 px-6">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-16">
                    <p className="text-xs text-primary uppercase tracking-widest font-medium mb-3">Simple by design</p>
                    <h2 className="font-bold font-serif text-[clamp(2rem,5vw,3.2rem)]">
                        Three steps to your first conversation
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((step, i) => (
                        <div key={i} className="relative">
                            {i < steps.length - 1 && (
                                <div className="hidden md:block absolute top-8 left-full w-full h-px"
                                    style={{ background: "linear-gradient(to right, rgba(232,164,56,0.4), transparent)" }} />
                            )}
                            <div className="flex flex-col gap-4">
                                <span className="font-mono text-4xl font-bold" style={{ color: "rgba(232,164,56,0.25)" }}>{step.num}</span>
                                <h3 className="text-xl font-semibold font-serif" >{step.title}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default HowItWorks