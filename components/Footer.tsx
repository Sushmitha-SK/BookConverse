import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
    return (
        <footer className="border-t border-border px-6 py-12" aria-label="Site footer">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between gap-10 mb-12">
                    <div className="max-w-xs">
                        <div className="flex items-center gap-2.5 mb-4">
                            <Link href="/" className="flex gap-2 items-center group" aria-label="Book Converse Homepage">
                                <Image
                                    src="/assets/bookconverse-logo.png"
                                    alt="Book Converse Logo"
                                    width={100}
                                    height={100}
                                    className="object-contain transition-all duration-500 h-9 w-auto"
                                />
                            </Link>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Real-time voice conversations with the books you love. Powered by deep AI understanding.
                        </p>
                    </div>

                    <nav className="grid grid-cols-2 sm:grid-cols-3 gap-10 text-sm" aria-label="Footer navigation">
                        {[
                            { heading: "Product", links: ["Features", "Pricing", "Changelog", "Roadmap"] },
                            { heading: "Company", links: ["About", "Blog", "Careers", "Press"] },
                            { heading: "Legal", links: ["Privacy", "Terms", "Security", "Cookie Policy"] },
                        ].map((col) => (
                            <div key={col.heading}>
                                <h2 className="font-medium text-foreground mb-4 text-base">{col.heading}</h2>
                                <ul className="flex flex-col gap-2.5">
                                    {col.links.map((link) => (
                                        <li key={link}>
                                            <a
                                                href="#"
                                                className="text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-sm"
                                            >
                                                {link}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </nav>
                </div>

                <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
                    <p>&copy; 2026 Book Converse, Inc. All rights reserved.</p>
                    <p>Made for readers who want more.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer



