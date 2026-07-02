'use client';

import { useEffect, useRef } from 'react';
import { Mic, Bot } from 'lucide-react';
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
            <div
                className="flex flex-col items-center justify-center h-64 text-center p-6 border-2 border-dashed border-border rounded-3xl bg-card/50 mx-4"
                aria-label="No messages yet"
            >
                <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mb-4">
                    <Mic className="size-6 text-primary" aria-hidden="true" />
                </div>
                <h3 className="text-foreground/80 font-semibold">Ready to read?</h3>
                <p className="text-foreground/50 text-sm max-w-50 mt-1">
                    Click the microphone to start your conversation.
                </p>
            </div>
        );
    }

    const MessageBubble = ({ content, role, isStreaming }: { content: string, role: 'user' | 'assistant', isStreaming?: boolean }) => (
        <div className={`flex items-end gap-3 px-4 ${role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0" aria-hidden="true">
                    <Bot className="size-4 text-primary" />
                </div>
            )}
            <div
                className={`px-5 py-3.5 rounded-2xl max-w-[85%] text-[15px] leading-relaxed shadow-sm ${role === 'user'
                    ? 'bg-primary text-primary-foreground rounded-br-none'
                    : 'bg-card text-foreground rounded-bl-none border border-border'
                    } ${isStreaming ? 'animate-pulse' : ''}`}
            >
                {content}
                {isStreaming && <span className="inline-block w-1.5 h-4 ml-1 bg-primary align-middle animate-blink" aria-label="typing" />}
            </div>
        </div>
    );

    return (
        <div
            ref={scrollRef}
            role="log"
            aria-live="polite"
            className="flex flex-col gap-6 w-full max-w-2xl mx-auto py-6 overflow-y-auto max-h-150 scroll-smooth"
        >
            {messages.map((message, index) => (
                <MessageBubble key={index} content={message.content} role={message.role as 'user' | 'assistant'} />
            ))}

            {currentUserMessage && (
                <MessageBubble content={currentUserMessage} role="user" isStreaming />
            )}

            {currentMessage && (
                <MessageBubble content={currentMessage} role="assistant" isStreaming />
            )}
        </div>
    );
};

export default Transcript;