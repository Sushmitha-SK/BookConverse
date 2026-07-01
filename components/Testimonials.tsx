import { testimonials } from '@/app/data/data'
import { Star } from 'lucide-react'
import Image from 'next/image'

const Testimonials = () => {
    return (
        <section
            className="py-24 px-6"
            aria-labelledby="testimonials-heading"
        >
            <div className="max-w-6xl mx-auto">
                <header className="text-center mb-16">
                    <p className="text-xs text-primary uppercase tracking-widest font-medium mb-3">
                        Reader stories
                    </p>
                    <h2
                        id="testimonials-heading"
                        className="font-bold font-serif text-[clamp(2rem,5vw,3.2rem)]"
                    >
                        What they said after their first conversation
                    </h2>
                </header>

                <ul className="grid md:grid-cols-3 gap-6">
                    {testimonials.map((t, i) => (
                        <li
                            key={i}
                            className="bg-card border border-border rounded-2xl p-6 flex flex-col gap-5 list-none"
                        >
                            <div
                                className="flex gap-0.5"
                                aria-label={`Rated ${t.stars} out of 5 stars`}
                            >
                                {Array.from({ length: t.stars }).map((_, s) => (
                                    <Star
                                        key={s}
                                        size={14}
                                        fill="#3a6644"
                                        className="text-primary"
                                        aria-hidden="true"
                                    />
                                ))}
                            </div>

                            <blockquote className="text-sm text-foreground leading-relaxed flex-1 italic font-serif">
                                &ldquo;{t.quote}&rdquo;
                            </blockquote>

                            <footer className="flex items-center gap-3 pt-2 border-t border-border">
                                <Image
                                    src={t.avatar}
                                    alt={t.name}
                                    width={40}
                                    height={40}
                                    className="rounded-full object-cover bg-secondary"
                                />
                                <div>
                                    <p className="text-sm font-medium text-foreground">{t.name}</p>
                                    <p className="text-xs text-muted-foreground">{t.role}</p>
                                </div>
                            </footer>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}

export default Testimonials