import BookCard from "@/components/BookCard"
import Search from "@/components/Search"
import { getAllBooks } from "@/lib/actions/book.actions";
import { BookOpenText, Plus } from "lucide-react";
import Link from "next/link";
import { SignInButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

const Library = async ({ searchParams }: { searchParams: Promise<{ query?: string }> }) => {
    const { userId } = await auth();
    const { query } = await searchParams;
    const bookResults = await getAllBooks(query)
    const books = bookResults.success ? bookResults.data ?? [] : []

    if (!userId) {
        return (
            <main className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
                <div className="mb-8 p-4 bg-primary/5 rounded-full">
                    <BookOpenText className="h-10 w-10 text-primary" strokeWidth={1.5} />
                </div>

                <div className="max-w-md space-y-4">
                    <h1 className="text-4xl font-serif font-bold tracking-tight">
                        Your personal library
                    </h1>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        Sign in to access your saved books, and continue your reading journey.
                    </p>
                </div>

                <div className="mt-10">
                    <SignInButton mode="modal">
                        <button className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-semibold shadow-sm hover:shadow-md transition-all">
                            Sign In to Library
                        </button>
                    </SignInButton>
                </div>
            </main>
        );
    }

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

                    <div className="flex flex-col items-center justify-center py-20 text-center animate-in fade-in duration-500">
                        <div className="space-y-4 mb-8">
                            <h3 className="text-xl font-semibold text-foreground">No books in your collection</h3>
                            <p className="text-muted-foreground italic max-w-sm">
                                It looks like your library is empty. Start your journey by adding your first book.
                            </p>
                        </div>

                        <Link
                            href="/books/new"
                            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-primary-foreground font-semibold shadow-lg
                             hover:shadow-xl transition-all duration-200">
                            <Plus className="size-5" />
                            <span>Add New Book</span>
                        </Link>
                    </div>

                )}
            </div>


        </main>
    )
}

export default Library