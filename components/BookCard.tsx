import { BookCardProps } from '@/types'
import { Mic } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const BookCard = ({ title, author, coverURL, slug }: BookCardProps) => {
    return (
        <article className="group flex flex-col gap-4">
            <Link
                href={`/books/${slug}`}
                className="relative block rounded-lg overflow-hidden bg-muted aspect-2/3 shadow-sm group-hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                aria-label={`View details for ${title} by ${author}`}
            >
                <Image
                    src={coverURL}
                    alt={`Cover art for ${title}`}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 200px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-2">
                    <span className="flex items-center gap-1.5 bg-primary text-primary-foreground text-xs font-medium px-3 py-1.5 rounded-full">
                        <Mic size={11} aria-hidden="true" /> Converse
                    </span>
                </div>
            </Link>

            <div className="flex flex-col gap-0.5 px-0.5">
                <Link href={`/books/${slug}`} className="focus-visible:outline-none focus-visible:text-primary">
                    <h3 className="text-md font-semibold text-foreground leading-snug line-clamp-1 group-hover:text-primary transition-colors">
                        {title}
                    </h3>
                </Link>
                <p className="text-sm text-muted-foreground tracking-wider">
                    {author}
                </p>
            </div>
        </article>
    )
}

export default BookCard