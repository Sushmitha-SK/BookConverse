'use client';

import { useEffect, useRef } from 'react';
import { Mic, BookOpen, Bot } from 'lucide-react';
import { Messages } from '@/types';

interface TranscriptProps {
    messages: Messages[];
    currentMessage: string;
    currentUserMessage: string;
}

const Transcript = ({ messages, currentMessage, currentUserMessage }: TranscriptProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: 'smooth',
            });
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, currentMessage, currentUserMessage]);

    const isEmpty = messages.length === 0 && !currentMessage && !currentUserMessage;

    if (isEmpty) {
        return (
            <div className="flex flex-col items-center justify-center h-64 text-center p-6 border-2 border-dashed border-slate-100 rounded-3xl">
                <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mb-4">
                    <Mic className="size-6 text-emerald-600" />
                </div>
                <h3 className="text-slate-900 font-semibold">Ready to read?</h3>
                <p className="text-slate-500 text-sm max-w-50 mt-1">
                    Click the microphone to start your conversation.
                </p>
            </div>
        );
    }

    return (
        <div ref={scrollRef} className="flex flex-col gap-6 w-full max-w-2xl mx-auto py-6 overflow-y-auto max-h-150 scroll-smooth">
            {messages.map((message, index) => (
                <div
                    key={index}
                    className={`flex items-end gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                    {/* Assistant Avatar */}
                    {message.role === 'assistant' && (
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                            <Bot className="size-4 text-primary" />
                        </div>
                    )}

                    <div
                        className={`px-5 py-3.5 rounded-2xl max-w-[85%] text-[15px] leading-relaxed shadow-sm ${message.role === 'user'
                                ? 'bg-primary text-white rounded-br-none'
                                : 'bg-slate-100 text-slate-800 rounded-bl-none'
                            }`}
                    >
                        {message.content}
                    </div>
                </div>
            ))}

            {(currentUserMessage || currentMessage) && (
                <div className={`flex items-end gap-3 ${currentUserMessage ? 'justify-end' : 'justify-start'}`}>
                    {currentMessage && (
                        <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                            <Bot className="size-4 text-emerald-700 animate-pulse" />
                        </div>
                    )}
                    <div className={`px-5 py-3.5 rounded-2xl text-[15px] ${currentUserMessage
                            ? 'bg-primary text-white rounded-br-none'
                            : 'bg-slate-100 text-slate-600 rounded-bl-none'
                        }`}>
                        <span className="flex items-center">
                            {currentUserMessage || currentMessage}
                            <span className="w-1.5 h-4 ml-2 bg-current animate-pulse rounded-full" />
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Transcript;