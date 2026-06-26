import { BookOpen } from 'lucide-react'

const Footer = () => {
    return (
        <footer className="border-t border-border px-6 py-12">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between gap-10 mb-12">
                    <div className="max-w-xs">
                        <div className="flex items-center gap-2.5 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                                <BookOpen size={16} className="text-primary-foreground" />
                            </div>
                            <span className="font-semibold font-serif">Book Converse</span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Real-time voice conversations with the books you love. Powered by deep AI understanding.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 text-sm">
                        {[
                            { heading: "Product", links: ["Features", "Pricing", "Changelog", "Roadmap"] },
                            { heading: "Company", links: ["About", "Blog", "Careers", "Press"] },
                            { heading: "Legal", links: ["Privacy", "Terms", "Security", "Cookie Policy"] },
                        ].map((col) => (
                            <div key={col.heading}>
                                <p className="font-medium text-foreground mb-4">{col.heading}</p>
                                <ul className="flex flex-col gap-2.5">
                                    {col.links.map((link) => (
                                        <li key={link}>
                                            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">{link}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
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