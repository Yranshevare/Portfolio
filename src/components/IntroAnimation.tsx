import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const codeLines = [
    "const developer = new Engineer();",
    "developer.init({ mode: 'creative' });",
    "await developer.loadPortfolio();",
    "// Ready to build something amazing",
];

// Syntax highlighting component
const SyntaxHighlight = ({ code }: { code: string }) => {
    const keywords = ["const", "new", "await", "return", "function", "if", "else"];
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;

    const regex = /\b(const|new|await|return|function|if|else)\b|(['"].*?['"])|(\{|\}|\(|\))|(\w+(?=\())|(\w+)/g;

    let match;
    while ((match = regex.exec(code)) !== null) {
        if (match.index > lastIndex) {
            parts.push(
                <span key={`text-${lastIndex}`} className="text-foreground/70">
                    {code.substring(lastIndex, match.index)}
                </span>
            );
        }

        if (keywords.includes(match[1])) {
            // Keywords
            parts.push(
                <span key={`keyword-${match.index}`} className="text-accent">
                    {match[1]}
                </span>
            );
        } else if (match[2]) {
            // Strings
            parts.push(
                <span key={`string-${match.index}`} className="text-green-400/80">
                    {match[2]}
                </span>
            );
        } else if (match[3]) {
            // Brackets/parens
            parts.push(
                <span key={`bracket-${match.index}`} className="text-foreground/60">
                    {match[3]}
                </span>
            );
        } else if (match[4]) {
            // Function names
            parts.push(
                <span key={`function-${match.index}`} className="text-primary">
                    {match[4]}
                </span>
            );
        } else if (match[5]) {
            // Variables
            parts.push(
                <span key={`var-${match.index}`} className="text-foreground/80">
                    {match[5]}
                </span>
            );
        }

        lastIndex = regex.lastIndex;
    }

    if (lastIndex < code.length) {
        parts.push(
            <span key={`text-end`} className="text-foreground/70">
                {code.substring(lastIndex)}
            </span>
        );
    }

    return <>{parts}</>;
};

const IntroAnimation = ({ onComplete }: { onComplete: () => void }) => {
    const [progress, setProgress] = useState(0);
    const [phase, setPhase] = useState<"loading" | "reveal">("loading");
    const [typedLines, setTypedLines] = useState<string[]>([]);
    const [currentLine, setCurrentLine] = useState("");
    const lineIndex = useRef(0);
    const charIndex = useRef(0);

    // Typing effect
    useEffect(() => {
        const typeSpeed = 35;
        const lineDelay = 300;

        const typeChar = () => {
            if (lineIndex.current >= codeLines.length) return;

            const line = codeLines[lineIndex.current];
            if (charIndex.current <= line.length) {
                setCurrentLine(line.slice(0, charIndex.current));
                charIndex.current++;
                setTimeout(typeChar, typeSpeed);
            } else {
                setTypedLines((prev) => [...prev, line]);
                setCurrentLine("");
                lineIndex.current++;
                charIndex.current = 0;
                if (lineIndex.current < codeLines.length) {
                    setTimeout(typeChar, lineDelay);
                }
            }
        };

        setTimeout(typeChar, 600);
    }, []);

    // Progress bar
    useEffect(() => {
        const duration = 2800;
        const start = Date.now();
        const tick = () => {
            const elapsed = Date.now() - start;
            const p = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - p, 4);
            setProgress(eased * 100);
            if (p < 1) {
                requestAnimationFrame(tick);
            } else {
                setPhase("reveal");
                setTimeout(onComplete, 900);
            }
        };
        requestAnimationFrame(tick);
    }, [onComplete]);

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-background overflow-hidden"
                initial={{ opacity: 1 }}
                animate={phase === "reveal" ? { opacity: 0, scale: 1.1, filter: "blur(30px)" } : { opacity: 1 }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
            >
                {/* Animated grid background */}
                <div className="absolute inset-0 opacity-[0.04]">
                    <div
                        className="w-full h-full"
                        style={{
                            backgroundImage: `
                linear-gradient(hsl(var(--primary) / 0.3) 1px, transparent 1px),
                linear-gradient(90deg, hsl(var(--primary) / 0.3) 1px, transparent 1px)
              `,
                            backgroundSize: "60px 60px",
                        }}
                    />
                </div>

                {/* Orbiting ring */}
                <motion.div
                    className="absolute w-[300px] h-[300px] md:w-[400px] md:h-[400px] rounded-full"
                    style={{
                        border: "1px solid hsl(var(--primary) / 0.15)",
                    }}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                    <motion.div
                        className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
                        style={{
                            background: "hsl(var(--primary))",
                            boxShadow: "0 0 20px hsl(var(--primary) / 0.8), 0 0 40px hsl(var(--primary) / 0.4)",
                        }}
                    />
                </motion.div>

                {/* Second orbiting ring */}
                <motion.div
                    className="absolute w-[220px] h-[220px] md:w-[300px] md:h-[300px] rounded-full"
                    style={{
                        border: "1px solid hsl(var(--accent) / 0.1)",
                    }}
                    animate={{ rotate: -360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                >
                    <motion.div
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
                        style={{
                            background: "hsl(var(--accent))",
                            boxShadow: "0 0 15px hsl(var(--accent) / 0.8)",
                        }}
                    />
                </motion.div>

                {/* Floating particles */}
                <div className="absolute inset-0 overflow-hidden">
                    {Array.from({ length: 25 }).map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-[2px] h-[2px] rounded-full"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                background: i % 2 === 0 ? "hsl(var(--primary) / 0.6)" : "hsl(var(--accent) / 0.6)",
                            }}
                            animate={{
                                y: [0, -30, 0],
                                opacity: [0, 0.8, 0],
                                scale: [0.5, 1.5, 0.5],
                            }}
                            transition={{
                                duration: 3 + Math.random() * 3,
                                repeat: Infinity,
                                delay: Math.random() * 3,
                                ease: "easeInOut",
                            }}
                        />
                    ))}
                </div>

                {/* Center content */}
                <div className="relative z-10 flex flex-col items-center gap-8">
                    {/* Monogram */}
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                        className="relative"
                    >
                        <motion.div
                            className="w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center"
                            style={{
                                background: "linear-gradient(135deg, hsl(var(--primary) / 0.15), hsl(var(--accent) / 0.15))",
                                border: "1px solid hsl(var(--primary) / 0.3)",
                                backdropFilter: "blur(10px)",
                            }}
                            animate={{
                                boxShadow: [
                                    "0 0 30px hsl(var(--primary) / 0.1)",
                                    "0 0 60px hsl(var(--primary) / 0.25)",
                                    "0 0 30px hsl(var(--primary) / 0.1)",
                                ],
                            }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <span className="text-3xl md:text-4xl font-bold tracking-tight text-glow">YR</span>
                        </motion.div>
                    </motion.div>

                    {/* Code terminal */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.6 }}
                        className="w-72 md:w-96 rounded-xl overflow-hidden"
                        style={{
                            background: "hsl(var(--card) / 0.8)",
                            border: "1px solid hsl(var(--border) / 0.5)",
                            backdropFilter: "blur(10px)",
                        }}
                    >
                        {/* Terminal header */}
                        <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-border/30">
                            <div className="w-2.5 h-2.5 rounded-full bg-destructive/60" />
                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                            <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                            <span className="ml-2 text-[10px] font-mono text-muted-foreground">init.ts</span>
                        </div>
                        {/* Terminal body */}
                        <div className="px-4 py-3 space-y-1 min-h-[100px] md:min-h-[120px]">
                            {typedLines.map((line, i) => (
                                <motion.p key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-mono text-[11px] md:text-xs">
                                    <span className="text-primary/60 mr-2">{i + 1}</span>
                                    {line.startsWith("//") ? (
                                        <span className="text-muted-foreground/50 italic">{line}</span>
                                    ) : (
                                        <SyntaxHighlight code={line} />
                                    )}
                                </motion.p>
                            ))}
                            {currentLine && (
                                <p className="font-mono text-[11px] md:text-xs">
                                    <span className="text-primary/60 mr-2">{typedLines.length + 1}</span>
                                    <SyntaxHighlight code={currentLine} />
                                    <motion.span
                                        animate={{ opacity: [1, 0] }}
                                        transition={{ duration: 0.5, repeat: Infinity }}
                                        className="inline-block w-[6px] h-[14px] bg-primary ml-[1px] align-middle"
                                    />
                                </p>
                            )}
                        </div>
                    </motion.div>

                    {/* Progress bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.5 }}
                        className="w-56 md:w-72"
                    >
                        <div className="h-[3px] w-full rounded-full overflow-hidden" style={{ background: "hsl(var(--border) / 0.4)" }}>
                            <motion.div
                                className="h-full rounded-full"
                                style={{
                                    width: `${progress}%`,
                                    background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--glow-cyan)))",
                                    boxShadow: "0 0 15px hsl(var(--primary) / 0.6)",
                                }}
                            />
                        </div>
                        <div className="flex justify-between mt-2">
                            <p className="text-[10px] font-mono text-muted-foreground">Loading portfolio</p>
                            <p className="text-[10px] font-mono text-primary">{Math.round(progress)}%</p>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default IntroAnimation;
