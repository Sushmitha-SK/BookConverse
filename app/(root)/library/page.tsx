

const Library = () => {
    return (
        <main className="wrapper container">
            <div className="min-h-screen  py-16">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="mb-12">
                        <p className="text-primary uppercase tracking-[0.25em] text-xs font-semibold">
                            Your collection
                        </p>

                        <h1
                            className="font-serif font-bold mt-2"
                            style={{
                                fontSize: "clamp(2rem,4vw,3rem)"
                            }}
                        >
                            Library
                        </h1>

                        <p className="text-muted-foreground mt-3 max-w-lg">
                            15 books · 15 shown
                        </p>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Library