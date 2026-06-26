
import { Mic, BookOpen, Headphones, Sparkles, ChevronRight, Volume2, Play, Pause, Star, ArrowRight, Check, Menu, X, MessageSquare, Zap, Globe, Lock } from "lucide-react";

export const navItems = [
    { label: "Library", href: "/" },
    { label: "Add New", href: "/books/new" },
    { label: "Pricing", href: "/subscriptions" },
];

export const books = [
    {
        title: "Thinking, Fast and Slow",
        author: "Daniel Kahneman",
        genre: "Psychology",
        cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=120&h=180&fit=crop&auto=format",
        question: "Why do we make irrational decisions?",
    },
    {
        title: "Sapiens",
        author: "Yuval Noah Harari",
        genre: "History",
        cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=120&h=180&fit=crop&auto=format",
        question: "What makes Homo sapiens unique?",
    },
    {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Fiction",
        cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=120&h=180&fit=crop&auto=format",
        question: "What does the green light symbolize?",
    },
    {
        title: "Atomic Habits",
        author: "James Clear",
        genre: "Self-Help",
        cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=120&h=180&fit=crop&auto=format",
        question: "How do I build a habit that sticks?",
    },
];

export const steps = [
    {
        num: "01",
        title: "Upload Your PDF",
        desc: "Simply drag and drop your book or select a PDF from your device. Setup takes just a few seconds. Your book is ready to chat instantly.",
    },
    {
        num: "02",
        title: "AI Understands Your Book",
        desc: "Advanced AI analyzes every page, extracts key insights, and builds a semantic understanding for accurate conversations.",
    },
    {
        num: "03",
        title: "Chat by Voice",
        desc: "Press the microphone and discuss your book naturally. Get explanations, summaries, examples, and answers in real time.",
    },
];

export const features = [
    {
        icon: Mic,
        title: "Natural Voice Dialogue",
        desc: "Speak naturally — no commands or keywords. The AI understands context, follows up, and responds like a thoughtful reader.",
    },
    {
        icon: Zap,
        title: "Instant Understanding",
        desc: "Responses grounded entirely in the book's content. No hallucinations, no guessing — just the text, deeply understood.",
    },
    {
        icon: Globe,
        title: "50+ Languages",
        desc: "Converse in your native language, even with books written in another. Real-time cross-lingual comprehension.",
    },
    {
        icon: MessageSquare,
        title: "Author & Character Modes",
        desc: "Choose to speak with the author's perspective or step into a character's shoes for a fully immersive dialogue.",
    },
    {
        icon: Sparkles,
        title: "Deep Analysis Mode",
        desc: "Ask for themes, motifs, narrative structure, or critical perspectives. Go beyond the surface with academic depth.",
    },
    {
        icon: Lock,
        title: "Private & Secure",
        desc: "Your reading habits and conversations are yours. End-to-end encrypted and never used to train models.",
    },
];