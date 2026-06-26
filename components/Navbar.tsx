"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import { navItems } from "@/app/data/data";


export function Navbar() {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [scrolled, setScrolled] = useState(false);

    const pathname = usePathname();
    const { user, isLoaded, isSignedIn } = useUser();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <nav className={`fixed z-50 flex items-center justify-between left-1/2 -translate-x-1/2 transition-all duration-500 p-4 ${scrolled ? "md:w-5xl w-[calc(100vw-14px)] bg-white/60 backdrop-blur-2xl rounded-full mt-4 pl-6 shadow" : "md:px-16 lg:px-24 xl:px-32 w-full"}`}>
                <Link href="/" className="flex gap-2 items-center group">
                    <Image src="/assets/logo.png" alt="Book Converse" width={100} height={100} className={`object-contain transition-all duration-500 h-9 w-auto`} />
                    <span className="logo-text font-bold tracking-tight">Book Converse</span>
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


                            <Link
                                href="/sign-up"
                                className={cn(
                                    "relative overflow-hidden group px-6 py-2.5 text-sm font-medium transition-all duration-300 rounded-full",
                                    "bg-zinc-900 text-white hover:bg-zinc-800 shadow-md hover:shadow-lg",
                                    "active:scale-95 transform transition-transform",
                                    "before:absolute before:inset-0 before:bg-white/20 before:-translate-x-full hover:before:animate-[shimmer_1.5s_infinite]"
                                )}
                            >
                                <span className="relative z-10">Get Started</span>
                            </Link>
                        </>
                    )}

                    {isLoaded && isSignedIn && (
                        <div className="flex items-center gap-3 bg-white/50 border border-black/5 rounded-full px-2 py-1 pr-4 shadow-sm">
                            <UserButton />
                            <span className="text-sm font-medium text-gray-700">
                                {user?.firstName}
                            </span>
                        </div>
                    )}
                </div>
                <button
                    onClick={() => setMobileOpen(true)}
                    className={`md:hidden p-2 rounded-md aspect-square font-medium transition cursor-pointer ${scrolled ? "text-primary" : "text-foreground"
                        }`}
                >
                    <Menu size={24} strokeWidth={2} />
                </button>
            </nav>

            <div className={`${mobileOpen ? 'max-md:w-full' : 'max-md:w-0'} md:hidden max-md:fixed max-md:top-0 max-md:z-50 max-md:left-0 
            max-md:transition-all max-md:duration-300 max-md:overflow-hidden max-md:h-full max-md:bg-white/70 max-md:backdrop-blur max-md:flex-col max-md:justify-center flex items-center gap-6 md:gap-10 text-sm`}>
                <button
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
                                onClick={() => setMobileOpen(false)}
                                className="text-lg text-foreground font-medium"
                            >
                                Sign In
                            </button>
                        </SignInButton>

                        <Link
                            href="/sign-up"
                            onClick={() => setMobileOpen(false)}
                            className={cn(
                                "relative overflow-hidden group px-6 py-2.5 text-sm font-medium transition-all duration-300 rounded-full",
                                "bg-zinc-900 text-white hover:bg-zinc-800 shadow-md",
                                "active:scale-95 transform transition-transform",
                                "before:absolute before:inset-0 before:bg-white/20 before:-translate-x-full hover:before:animate-[shimmer_1.5s_infinite]"
                            )}
                        >
                            <span className="relative z-10">Get Started</span>
                        </Link>
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
