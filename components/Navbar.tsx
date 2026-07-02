"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { ChevronLeft, Menu, X } from "lucide-react";
import { navItems } from "@/app/data/data";
import { images } from "@/public/assets";

export function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const pathname = usePathname();
    const { user, isLoaded, isSignedIn } = useUser();

    const backNavbarPages = [
        "/books/new",
        "/library",
    ];

    const showBackNavbar =
        backNavbarPages.includes(pathname) ||
        pathname.startsWith("/books/");

    const getBackHref = () => {
        if (pathname.startsWith("/books/")) return "/library";
        if (pathname === "/books/new") return "/library";
        return "/";
    };

    const backHref = getBackHref();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);


    if (showBackNavbar) {
        return (
            <header className="sticky top-0 z-50 border-b border-border bg-white/80 backdrop-blur-xl">
                <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                    <div className="flex items-center gap-4">
                        <Link aria-label="Back Navigation"
                            href={backHref}
                            className="flex items-center gap-2 text-sm font-medium text-foreground/70 hover:text-black transition-colors"
                        >
                            <ChevronLeft size={20} />
                            Back
                        </Link>

                        <div className="h-4 w-px bg-border mx-2" />

                        <Link href="/" className="flex gap-2 items-center group">
                            <Image src={images.logo} alt="Book Converse" width={100} height={100} className="object-contain h-9 w-auto" />
                        </Link>
                    </div>
                    <div className="flex items-center">
                        {isLoaded && !isSignedIn && (
                            <SignInButton mode="modal">
                                <button aria-label="Sign in" className="text-sm font-medium hover:text-foreground cursor-pointer">
                                    Sign In
                                </button>
                            </SignInButton>
                        )}

                        {isLoaded && isSignedIn && (
                            <div className="flex items-center gap-3 bg-secondary/50 border border-black/5 rounded-full px-2 py-1 pr-4 shadow-sm">
                                <UserButton />
                                <span className="text-sm font-medium text-foreground/80">
                                    {user?.firstName}
                                </span>
                            </div>
                        )}
                    </div>
                </nav>
            </header>
        );
    }
    return (
        <>
            <header className="z-50">
                <nav aria-label="Primary Navigation" className={`fixed flex items-center justify-between left-1/2 -translate-x-1/2 transition-all duration-500 p-4 ${scrolled ? "md:w-5xl w-[calc(100vw-14px)] bg-white/60 backdrop-blur-2xl rounded-full mt-4 pl-6 shadow" : "md:px-16 lg:px-24 xl:px-32 w-full"}`}>
                    <Link aria-label="Book Converse Home" href="/" className="flex gap-2 items-center group">
                        <Image priority fetchPriority="high" src={images.logo} alt="Book Converse"
                            width={100} height={100} className={`object-contain transition-all duration-500 h-9 w-auto`} />

                    </Link>

                    <div className="hidden md:flex items-center gap-6 md:gap-10 text-sm">
                        {navItems.map(({ label, href }) => {
                            const isActive =
                                pathname === href ||
                                (href !== "/" && pathname.startsWith(href));

                            return (
                                <Link
                                    key={label}
                                    href={href}
                                    className={cn(
                                        "transition-colors duration-500 hover:text-foreground",
                                        isActive
                                            ? "text-foreground font-400"
                                            : "text-primary"
                                    )}
                                >
                                    {label}
                                </Link>
                            );
                        })}
                    </div>
                    <div className="hidden md:flex items-center gap-4">
                        {isLoaded && !isSignedIn && (
                            <>
                                <SignInButton mode="modal">
                                    <button className="text-sm font-medium hover:text-foreground cursor-pointer">
                                        Sign In
                                    </button>
                                </SignInButton>
                                <SignUpButton mode="modal">
                                    <button
                                        className={cn(
                                            "relative overflow-hidden group px-6 py-2.5 text-sm font-medium transition-all duration-300 rounded-full",
                                            "bg-primary text-primary-foreground hover:opacity-90 shadow-md",
                                            "active:scale-95 transform transition-transform",
                                            "before:absolute before:inset-0 before:bg-white/20 before:-translate-x-full hover:before:animate-[shimmer_1.5s_infinite]"
                                        )}
                                    >
                                        <span className="relative z-10">Get Started</span>
                                    </button>
                                </SignUpButton>
                            </>
                        )}

                        {isLoaded && isSignedIn && (
                            <div className="flex items-center gap-3 bg-secondary/50 border border-black/5 rounded-full px-2 py-1 pr-4 shadow-sm">
                                <UserButton />
                                <span className="text-sm font-medium text-foreground/80">
                                    {user?.firstName}
                                </span>
                            </div>
                        )}
                    </div>
                    <button
                        aria-label={mobileOpen ? "Close menu" : "Open menu"}
                        aria-expanded={mobileOpen}
                        aria-controls="mobile-menu"
                        onClick={() => setMobileOpen(true)}
                        className={`md:hidden p-2 rounded-md aspect-square font-medium transition cursor-pointer ${scrolled ? "text-primary" : "text-foreground"
                            }`}
                    >
                        <Menu size={24} strokeWidth={2} />
                    </button>


                </nav>
            </header>

            <div id="mobile-menu" className={`${mobileOpen ? 'max-md:w-full' : 'max-md:w-0'} md:hidden max-md:fixed max-md:top-0 max-md:z-50 max-md:left-0 
            max-md:transition-all max-md:duration-300 max-md:overflow-hidden max-md:h-full max-md:bg-background/70 max-md:backdrop-blur max-md:flex-col max-md:justify-center flex items-center gap-6 md:gap-10 text-sm`}>
                <button
                    aria-label="Close menu"
                    onClick={() => setMobileOpen(false)}
                    className="absolute top-6 right-6 p-2 rounded-md transition-colors text-foreground"
                >
                    <X size={24} strokeWidth={2} />
                </button>

                {navItems.map(({ label, href }) => {
                    const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
                    return (
                        <Link
                            key={label}
                            href={href}
                            onClick={() => setMobileOpen(false)}
                            className={cn(
                                "text-lg transition-colors font-medium",
                                isActive ? "text-primary" : "text-foreground"
                            )}
                        >
                            {label}
                        </Link>
                    );
                })}

                {isLoaded && !isSignedIn && (
                    <div className="flex flex-col items-center gap-6 mt-4">
                        <SignInButton mode="modal">
                            <button
                                aria-label="Sign in"
                                onClick={() => setMobileOpen(false)}
                                className="text-lg text-foreground font-medium"
                            >
                                Sign In
                            </button>
                        </SignInButton>

                        <SignUpButton mode="modal">
                            <button
                                className={cn(
                                    "relative overflow-hidden group px-6 py-2.5 text-sm font-medium transition-all duration-300 rounded-full",
                                    "bg-primary text-primary-foreground hover:opacity-90 shadow-md",
                                    "active:scale-95 transform transition-transform",
                                    "before:absolute before:inset-0 before:bg-white/20 before:-translate-x-full hover:before:animate-[shimmer_1.5s_infinite]"
                                )}
                            >
                                <span className="relative z-10">Get Started</span>
                            </button>
                        </SignUpButton>
                    </div>
                )}

                {isLoaded && isSignedIn && (
                    <div className="flex items-center gap-3 mt-4">
                        <UserButton />
                        <span className="text-lg text-foreground font-medium">
                            {user?.firstName}
                        </span>
                    </div>
                )}
            </div>
        </>
    );
}
