'use client';

import { BookOpen, Mic, MicOff, Loader2 } from "lucide-react";
import { IBook } from "@/types";
import Image from "next/image";
import Transcript from "./Transcript";

const VapiControls = ({ book }: { book: IBook }) => {
    const isActive = true;
    const status = 'idle'; 
    const isConnecting = status === 'idle';

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-start gap-6">
                <div className="relative shrink-0">
                    <Image
                        src={book.coverURL || "/images/book-placeholder.png"}
                        alt={book.title}
                        width={120}
                        height={180}
                        className="rounded-lg shadow-md object-cover transition-transform hover:scale-105"
                    />
                </div>

                <div className="flex-1 flex flex-col gap-4">
                    <div>
                        <span className="text-[10px] font-bold text-primary uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded-full">
                            Fiction
                        </span>
                        <h1 className="text-2xl font-serif font-bold text-slate-900 mt-1">{book.title}</h1>
                        <p className="text-slate-500 font-medium">{book.author}</p>
                    </div>

                    <div className="flex items-center gap-6 text-sm text-slate-500">
                        <div className="flex items-center gap-1.5">
                            <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
                            {isActive ? "Live" : "Ready"}
                        </div>
                        <span className="flex items-center gap-1.5">🎧 {book.persona || "Rachel"}</span>
                        <span>0:00 / 60:00</span>
                    </div>
                </div>

                {/* Control Button */}
                <div className="relative group">
                    {isActive && (
                        <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />
                    )}
                    <button
                        disabled={isConnecting}
                        className={`relative size-16 flex items-center justify-center rounded-full shadow-lg transition-all duration-300 ${isActive
                            ? 'bg-primary/50 hover:bg-primary text-white'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                            } disabled:opacity-50`}
                    >
                        {isConnecting ? (
                            <Loader2 className="size-7 animate-spin" />
                        ) : isActive ? (
                            <Mic className="size-7" />
                        ) : (
                            <MicOff className="size-7" />
                        )}
                    </button>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-2">
                    <BookOpen className="size-4 text-slate-400" />
                    <span className="text-xs font-semibold text-slate-500 uppercase">Live Transcript</span>
                </div>
                <div className="p-6">
                    <Transcript
                        messages={[
                            { role: "assistant", content: "Hello! I'm Daniel, your reading companion." },
                            { role: "user", content: "Can you summarize the first chapter?" },
                            { role: "assistant", content: "Certainly! The first chapter introduces the main themes." },
                        ]}
                        currentMessage="The story begins with an unexpected encounter..."
                        currentUserMessage="What happens next?"
                    />
                </div>
            </div>
        </div>
    );
};

export default VapiControls;