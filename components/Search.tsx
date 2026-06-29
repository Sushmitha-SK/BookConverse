'use client';

import React, { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Search as SearchIcon, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Search = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const [query, setQuery] = useState(searchParams.get('query') || '');

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            const params = new URLSearchParams(window.location.search);

            if (query) {
                params.set('query', query);
            } else {
                params.delete('query');
            }

            router.push(`${pathname}?${params.toString()}`, { scroll: false });
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [query, pathname, router]);

    const handleClear = () => {
        setQuery('');
    };

    return (
        <div className="relative group w-full md:w-80">
            <SearchIcon
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors"
            />

            <Input
                type="text"
                placeholder="Search books..."
                className="w-full h-12 bg-secondary/50 border-border rounded-2xl pl-12 pr-12 text-base focus:bg-background focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            {query && (
                <button
                    onClick={handleClear}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Clear search"
                >
                    <X size={18} />
                </button>
            )}
        </div>
    );
};

export default Search;