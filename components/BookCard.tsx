import { BookCardProps } from '@/types'
import { Mic } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const BookCard = ({ title, author, coverURL, slug }: BookCardProps) => {
    return (
        <Link href={`/books/${slug}`}>

            <div className="group flex flex-col gap-4">
                <div className="relative rounded-lg overflow-hidden bg-muted aspect-2/3 shadow-sm group-hover:shadow-md">
                    <Image
                        src={coverURL}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-2">
                        <button className="flex items-center gap-1.5 bg-primary text-primary-foreground text-xs font-medium px-3 py-1.5 rounded-full cursor-pointer">
                            <Mic size={11} /> Converse
                        </button>
                    </div>
                </div>
                <div className="flex flex-col gap-0.5 px-0.5">
                    <p className="text-md font-semibold text-primary leading-snug line-clamp-1 group-hover:text-primary transition-colors">
                        {title}
                    </p>
                    <p className="text-sm  text-muted-foreground  tracking-wider">
                        {author}
                    </p>
                </div>
            </div>

        </Link>
    )
}

export default BookCard