import { features } from '@/app/data/data'

const Features = () => {
    return (
        <section id="features" className="py-24 px-6 bg-muted/20">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <p className="text-xs text-primary uppercase tracking-widest font-medium mb-3">Built for depth</p>
                    <h2 className="font-bold font-serif text-[clamp(2rem,5vw,3.2rem)]">
                        Everything a reader needs
                    </h2>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {features.map((f, i) => (
                        <div
                            key={i}
                            className="group bg-white border border-border rounded-2xl p-6 hover:border-primary/30 transition-all duration-300 hover:bg-card/80"
                        >
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                                <f.icon size={18} className="text-primary" />
                            </div>
                            <h3 className="font-semibold text-foreground mb-2 font-serif text-xl">{f.title}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Features