'use client';

import { BookOpen, Clock3, Headphones, Loader2, Mic, MicOff } from "lucide-react";
import { IBook } from "@/types";
import Image from "next/image";
import Transcript from "./Transcript";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";
import useVapi from "@/hooks/useVapi";

const VapiControls = ({ book }: { book: IBook }) => {
    const { status, isActive, messages, currentMessage, currentUserMessage, duration, start, stop, clearError, limitError, isBillingError, maxDurationSeconds } = useVapi(book)

    const router = useRouter();

    useEffect(() => {
        console.log('test limit error',JSON.stringify(limitError))
        if (limitError) {
            toast.error(limitError);
            if (isBillingError) {
                router.push("/subscriptions");
            } else {
                router.push("/");
            }
            clearError();
        }
    }, [isBillingError, limitError, router, clearError]);

    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const getStatusDisplay = () => {
        switch (status) {
            case 'connecting': return { label: 'Connecting...', color: 'vapi-status-dot-connecting' };
            case 'starting': return { label: 'Starting...', color: 'vapi-status-dot-starting' };
            case 'listening': return { label: 'Listening', color: 'vapi-status-dot-listening' };
            case 'thinking': return { label: 'Thinking...', color: 'vapi-status-dot-thinking' };
            case 'speaking': return { label: 'Speaking', color: 'vapi-status-dot-speaking' };
            default: return { label: 'Ready', color: 'vapi-status-dot-ready' };
        }
    };

    const statusDisplay = getStatusDisplay();

    return (
        <section className="w-full max-w-4xl mx-auto p-2 sm:p-4 md:p-8 space-y-6" aria-labelledby="vapi-title">
            <h2 id="vapi-title" className="sr-only">Voice Conversation Controls for {book.title}</h2>

            <article className="bg-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl shadow-black/5 border border-border flex flex-col sm:flex-row items-center gap-6">
                <div className="relative shrink-0 shadow-md rounded-xl overflow-hidden">
                    <Image
                        src={book.coverURL || "/images/book-placeholder.png"}
                        alt={`Cover art for ${book.title}`}
                        width={100}
                        height={150}
                        className="rounded-lg shadow-md object-cover sm:w-30 sm:h-45"
                        priority
                    />
                </div>

                <div className="flex-1 w-full flex flex-col items-center sm:items-start text-center sm:text-left gap-4">
                    <header>
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-foreground font-serif line-clamp-2">{book.title}</h1>
                        <p className="text-sm sm:text-base text-muted-foreground mt-1 font-medium italic"></p>
                    </header>

                    <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-4 text-xs sm:text-sm" aria-live="polite">

                        <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                            <span className={`size-2 rounded-full ${isActive ? 'bg-emerald-500 animate-pulse' : 'bg-muted-foreground'}`} aria-hidden="true" />

                            <span className="font-normal text-foreground/80">{statusDisplay.label}</span>
                        </div>
                        <div className="flex items-center gap-2 text-foreground/80 px-2 rounded-full bg-slate-50 capitalize">
                            <Headphones className="size-4" aria-hidden="true" /> {book.persona || "Rachel"}
                        </div>
                        <div className="flex items-center gap-2 text-foreground/80 px-2 bg-slate-50 py-1.5 rounded-full border border-slate-100">
                            <Clock3 className="size-4" aria-hidden="true" />
                            <span className="font-mono font-medium text-foreground/80">
                                {formatDuration(duration)} / {formatDuration(maxDurationSeconds)}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="relative group shrink-0">
                    {isActive && (status === 'speaking' || status === 'thinking') && (
                        <div className="absolute inset-0 rounded-full bg-rose-500 animate-ping opacity-20" aria-hidden="true" />

                    )}

                    <button
                        onClick={isActive ? stop : start}
                        disabled={status === 'connecting'}
                        aria-label={isActive ? "Stop conversation" : "Start conversation"}
                        className={`group relative size-14 sm:size-16 flex items-center justify-center rounded-full transition-all duration-300 shadow-sm ${isActive
                            ? 'bg-rose-500 hover:bg-rose-6000 text-primary-foreground'
                            : 'bg-primary hover:bg-primary/90 text-primary-foreground'
                            }`}

                    >
                        {status === 'connecting' ? (
                            <Loader2 className="size-6 sm:size-7 text-white animate-spin" aria-hidden="true" />
                        ) : (
                            isActive ? <Mic className="size-6 sm:size-7 text-white" aria-hidden="true" /> : <MicOff className="size-6 sm:size-7 text-white" aria-hidden="true" />
                        )}
                    </button>
                </div>
            </article>

            <section className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                <header className="px-4 sm:px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <BookOpen className="size-4 text-slate-400" aria-hidden="true" />
                        <h3 className="text-[10px] sm:text-xs font-bold tracking-wider text-slate-400 uppercase">Live Conversation</h3>
                    </div>
                </header>

                <div className="p-4 sm:p-6 bg-slate-50/50">
                    <Transcript
                        messages={messages}
                        currentMessage={currentMessage}
                        currentUserMessage={currentUserMessage}
                    />
                </div>
            </section>
        </section>
    );
};

export default VapiControls;