
import { Mic, Sparkles, MessageSquare, Zap, Globe, Lock, Volume2 } from "lucide-react";

export const navItems = [
    { label: "Home", href: "/" },
    { label: "Library", href: "/library" },
    { label: "Add New", href: "/books/new" },
    { label: "Pricing", href: "#pricing" },
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
        desc: "Speak naturally—no commands required. The AI understands context and responds like a thoughtful partner, as seen in your live conversation dashboard.",
    },
    {
        icon: Zap,
        title: "Instant Synthesis",
        desc: "Transform any PDF into a conversational experience in seconds by simply uploading your file and initiating the synthesis process.",
    },
    {
        icon: Volume2,
        title: "Curated Voice Personalization",
        desc: "Select from a diverse range of AI narrators, from calm and clear to authoritative and warm, to perfectly match your reading mood.",
    },
    {
        icon: MessageSquare,
        title: "Author & Character Modes",
        desc: "Choose to engage with the author's unique perspective or step into a character's shoes for a fully immersive dialogue.",
    },
    {
        icon: Sparkles,
        title: "Deep Analysis Mode",
        desc: "Go beyond the surface. Ask for themes, narrative structures, or critical perspectives to gain deeper insights into your book.",
    },
    {
        icon: Lock,
        title: "Private & Secure",
        desc: "Your reading habits and conversations are yours alone—fully encrypted and never used to train models.",
    },
];


export const testimonials = [
    {
        name: "Priya Menon",
        role: "PhD Candidate, Literature",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=60&h=60&fit=crop&auto=format",
        quote: "I struggled for weeks with complex literary theory. Being able to choose an authoritative narrator and dive into 'Deep Analysis Mode' finally gave me the clarity I needed to master the material.",
        stars: 5,
    },
    {
        name: "Marcus Webb",
        role: "Serial Founder",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&auto=format",
        quote: "The ability to synthesize a technical PDF into a live, spoken conversation in seconds is a game changer. It's like having a dedicated subject-matter expert on call for every book I read.",
        stars: 5,
    },
    {
        name: "Lena Fischer",
        role: "High School Teacher",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&h=60&fit=crop&auto=format",
        quote: "I let my students pick their favorite AI voice to discuss classic novels, and the engagement was instant. The barrier between them and the text completely disappeared.",
        stars: 5,
    },
];