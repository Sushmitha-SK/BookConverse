import { images } from '@/public/assets';
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-border px-6 py-12" aria-label="Site footer">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div>
                        <Link href="/" className="flex items-center gap-2 mb-2" aria-label="Book Converse Homepage">
                            <Image
                                src={images.logo}
                                alt="Book Converse Logo"
                                width={200}
                                height={200}
                                className="object-contain h-8 w-auto"
                            />
                        </Link>
                    </div>

                    <nav aria-label="Footer navigation">
                        <ul className="flex gap-8 text-sm">
                            <li><Link href="/" className="text-muted-foreground hover:text-foreground">Home</Link></li>
                            <li><Link href="/library" className="text-muted-foreground hover:text-foreground">Library</Link></li>
                            <li><Link href="/books/new" className="text-muted-foreground hover:text-foreground">Add New</Link></li>
                            <li><Link href="/pricing" className="text-muted-foreground hover:text-foreground">Pricing</Link></li>
                        </ul>
                    </nav>
                    <div className="text-xs text-muted-foreground">
                        <p>&copy; {currentYear} Book Converse. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer


