import { ArrowRight, Mic, Play, Sparkles } from 'lucide-react'
function Waveform({ active }: { active: boolean }) {
    const bars = 28;
    return (
        <div className="flex items-center gap-0.75 h-10">
            {Array.from({ length: bars }).map((_, i) => {
                const baseH = [20, 40, 60, 80, 50, 30, 70, 90, 45, 65, 35, 85, 55, 25, 75, 95, 40, 60, 30, 80, 50, 70, 35, 55, 45, 65, 25, 75][i % 28];
                return (
                    <div
                        key={i}
                        className="rounded-full transition-all"
                        style={{
                            width: "3px",
                            backgroundColor: active ? "#3a6644" : "#d4e2ce",
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
        <span className="absolute inset-0 rounded-full">
            <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping" style={{ animationDuration: "1.8s" }} />
            <span className="absolute inset-2 rounded-full bg-primary/20 animate-ping" style={{ animationDuration: "1.8s", animationDelay: "0.3s" }} />
        </span>
    );
}

const HeroSection = () => {

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 pt-24 pb-16">
            {/* Background orbs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10" style={{ background: "radial-gradient(circle, #3a6644, transparent 70%)", animation: "float 8s ease-in-out infinite" }} />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-8" style={{ background: "radial-gradient(circle, #6b8cba, transparent 70%)", animation: "float 10s ease-in-out infinite", animationDelay: "3s" }} />
                <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#1a1208" strokeWidth="1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </div>

            <div className="relative mb-8 flex items-center gap-2 bg-muted px-4 py-1.5 rounded-full border border-border">
                <Sparkles size={13} className="text-primary" />
                <span className="text-xs text-muted-foreground font-medium tracking-wide uppercase">Now with voice cloning for authors</span>
            </div>

            <h1 className="relative text-center font-bold leading-[1.1] mb-6 max-w-4xl"
                style={{ fontFamily: 'font-serif', fontSize: "clamp(2.8rem, 7vw, 5.5rem)" }}>
                Talk to your books.
                <br />
                <em className="italic" style={{ color: "#3a6644" }}>They answer.</em>
            </h1>

            <p className="relative text-center text-muted-foreground max-w-xl mb-12 leading-relaxed" style={{ fontSize: "1.1rem" }}>
                Book Converse transforms any book into a real-time voice conversation partner — powered by AI that truly understands what you are reading.
            </p>

            <div className="relative flex flex-col items-center gap-6 mb-12">
                <div className="flex items-center gap-6 bg-card border border-border rounded-2xl px-8 py-5 shadow-2xl">
                    <Waveform active={true} />
                    <button

                        className="relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200"
                        style={{ backgroundColor: "#3a6644" }}
                    >
                        <PulseRing />
                        <Mic size={22} className={"text-primary-foreground"} />
                    </button>
                    <Waveform active={true} />
                </div>
                <p className="text-xs text-muted-foreground">
                    {"Listening... ask your book anything"}
                </p>
            </div>

            <div className="relative flex flex-col sm:flex-row items-center gap-4">
                <button className="flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-full font-medium hover:bg-accent transition-colors text-sm">
                    Start for free <ArrowRight size={15} />
                </button>
                <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors px-6 py-3.5">
                    <Play size={14} className="text-primary" /> Watch 90-second demo
                </button>
            </div>
            <p className="relative mt-6 text-xs text-muted-foreground">No credit card required · 1 book free forever</p>
        </section>

    )
}

export default HeroSection

