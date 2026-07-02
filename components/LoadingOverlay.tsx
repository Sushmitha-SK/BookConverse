'use client';

import { Loader2, BookOpen } from 'lucide-react';

const LoadingOverlay = () => {
    return (
        <div
            className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
            role="status"
            aria-live="polite"
            aria-label="Loading"
        >
            <div className="w-full max-w-md rounded-3xl border border-border bg-card p-6 md:p-8 shadow-2xl">
                <div className="flex flex-col items-center text-center">

                    <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                        <BookOpen className="h-8 w-8 text-primary" aria-hidden="true" />
                    </div>

                    <Loader2 className="h-10 w-10 animate-spin text-primary mb-5" aria-hidden="true" />

                    <h2 className="text-xl md:text-2xl font-semibold">
                        Synthesizing Your Book
                    </h2>

                    <p className="mt-3 text-sm text-muted-foreground max-w-sm">
                        Parsing PDF, extracting chapters, generating cover assets,
                        and preparing your interactive literary experience.
                    </p>

                    <div className="mt-6 w-full" aria-label="Loading progress">
                        <div className="h-2 overflow-hidden rounded-full bg-muted">
                            <div className="h-full w-1/2 animate-pulse rounded-full bg-primary" />
                        </div>
                    </div>

                    <p className="mt-4 text-xs text-muted-foreground">
                        This may take a few moments for larger books.
                    </p>

                </div>
            </div>
        </div>
    );
};

export default LoadingOverlay;