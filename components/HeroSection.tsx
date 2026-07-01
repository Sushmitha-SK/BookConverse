'use client'
import { useClerk, useUser } from '@clerk/nextjs';
import { ArrowRight, Mic, Play, Sparkles, X } from 'lucide-react'
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

// Added aria-hidden to decorative animation elements
function Waveform({ active, className }: { active: boolean; className?: string }) {
    const bars = 28;
    return (
        <div className={`flex items-center gap-0.75 h-10 ${className}`} aria-hidden="true">
            {Array.from({ length: bars }).map((_, i) => {
                const baseH = [20, 40, 60, 80, 50, 30, 70, 90, 45, 65, 35, 85, 55, 25, 75, 95, 40, 60, 30, 80, 50, 70, 35, 55, 45, 65, 25, 75][i % 28];
                return (
                    <div
                        key={i}
                        className={`rounded-full transition-all ${active ? "bg-primary" : "bg-secondary"}`}
                        style={{
                            width: "3px",
                            height: active ? `${baseH}%` : "15%",
                            animation: active ? `waveBar ${0.6 + (i % 5) * 0.15}s ease-in-out infinite alternate` : "none",
                            animationDelay: `${(i * 0.04) % 0.6}s`,
                        }}
                    />
                );
            })}
        </div>
    );
}

function PulseRing() {
    return (
        <span className="absolute inset-0 rounded-full" aria-hidden="true">
            <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping" style={{ animationDuration: "1.8s" }} />
            <span className="absolute inset-2 rounded-full bg-primary/20 animate-ping" style={{ animationDuration: "1.8s", animationDelay: "0.3s" }} />
        </span>
    );
}

const HeroSection = () => {
    const { isSignedIn } = useUser();
    const { openSignUp } = useClerk();
    const router = useRouter();
    const [showVideo, setShowVideo] = useState(false);

    // Close modal on Escape key for WCAG compliance
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') setShowVideo(false); };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleAction = () => {
        if (isSignedIn) {
            router.push('/books/new');
        } else {
            openSignUp();
        }
    };

    return (
        <section id="hero" className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-16 text-center">
            {/* Background elements are purely decorative */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 bg-[radial-gradient(circle,var(--color-primary),transparent_70%)] animate-[float_8s_ease-in-out_infinite]" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-8 bg-[radial-gradient(circle,#6b8cba,transparent_70%)] animate-[float_10s_ease-in-out_infinite_3s]" />
            </div>

            <div className="relative mb-8 flex items-center gap-2 bg-secondary px-4 py-1.5 rounded-full border border-border">
                <Sparkles size={13} className="text-primary" />
                <span className="text-xs text-muted-foreground font-medium tracking-wide uppercase">Books that talk back</span>
            </div>

            <h1 className="relative text-center font-bold leading-[1.1] mb-6 max-w-4xl font-serif text-[clamp(2.5rem,8vw,5rem)]">
                Talk to your books.
                <br />
                <span className="italic text-primary">They answer.</span>
            </h1>

            <p className="relative text-muted-foreground max-w-xl mb-12 leading-relaxed px-4 text-lg">
                Book Converse transforms any book into a real-time voice conversation partner — powered by AI that truly understands what you are reading.
            </p>

            <div className="relative flex flex-col items-center gap-6 mb-12 w-full">
                <div className="flex items-center gap-6 bg-card border border-border rounded-2xl px-6 py-4 shadow-2xl">
                    <Waveform active={true} className="hidden sm:flex" />
                    <button
                        aria-label="Start voice conversation"
                        className="relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 bg-primary hover:scale-105 active:scale-95"
                    >
                        <PulseRing />
                        <Mic size={22} className="text-primary-foreground" />
                    </button>
                    <Waveform active={true} className="hidden sm:flex" />
                </div>
                <p className="text-sm text-muted-foreground font-medium">Start talking. Your book already knows the answer.</p>
            </div>

            <div className="relative flex flex-wrap justify-center items-center gap-4">
                <button
                    onClick={handleAction}
                    className="flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-full font-medium hover:opacity-90 transition-opacity text-sm shadow-lg"
                >
                    {isSignedIn ? "Add your book" : "Start for free"} <ArrowRight size={15} />
                </button>
                <button
                    onClick={() => setShowVideo(true)}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors px-6 py-3.5"
                    aria-label="Watch demo video"
                >
                    <Play size={14} className="text-primary" /> Watch 18-second demo
                </button>
            </div>

            <p className="relative mt-6 text-xs text-muted-foreground px-4">No credit card required · 1 book free forever</p>

            {showVideo && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" role="dialog" aria-modal="true">
                    <div className="relative w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl">
                        <button
                            onClick={() => setShowVideo(false)}
                            className="absolute top-4 right-4 z-10 text-white bg-black/50 p-2 rounded-full hover:bg-black/70 focus:ring-2 focus:ring-white outline-none"
                            aria-label="Close demo video"
                        >
                            <X size={20} />
                        </button>
                        <div className="aspect-video">
                            <video className="w-full h-full" controls autoPlay playsInline>
                                <source src="/assets/Book-Converse-Demo.mp4" type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                </div>
            )}
        </section >
    )
}

export default HeroSection