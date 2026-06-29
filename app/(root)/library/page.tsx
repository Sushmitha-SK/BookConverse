import BookCard from "@/components/BookCard"
import Search from "@/components/Search"
import { getAllBooks } from "@/lib/actions/book.actions";

const Library = async ({ searchParams }: { searchParams: Promise<{ query?: string }> }) => {
    const { query } = await searchParams;
    const bookResults = await getAllBooks(query)
    const books = bookResults.success ? bookResults.data ?? [] : []
    return (
        <main className="wrapper container min-h-screen py-10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-border/50 pb-8">
                    <div>
                        <p className="text-primary uppercase tracking-[0.25em] text-xs font-semibold mb-3">
                            Your collection
                        </p>
                        <h1 className="font-serif text-5xl font-bold tracking-tight">
                            Library
                        </h1>
                        <p className="text-muted-foreground mt-4 text-lg">
                            {books.length} {books.length === 1 ? 'book' : 'books'} in your collection
                        </p>
                    </div>

                    <div className="w-full md:w-auto">
                        <Search />
                    </div>
                </div>

                {books.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8">
                        {books.map((book) => (
                            <BookCard key={book._id} {...book} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 text-muted-foreground italic">
                        No books found.
                    </div>
                )}
            </div>
        </main>
    )
}

export default Library