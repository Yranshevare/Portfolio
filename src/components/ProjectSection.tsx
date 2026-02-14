import { AnimatePresence, motion, useScroll, useTransform, useMotionValueEvent, useInView } from "framer-motion";
import { useRef, useState } from "react";

import project1Img from "../assets/pro-1.png";
import project2Img from "../assets/pro-2.png";
import project3Img from "../assets/pro-3.png";

interface Project {
    title: string;
    description: string;
    tech: string[];
    image?: any;
    demo?: string;
    github?: string;
}

const projects = [
    {
        title: "Catalogue Website",
        description: "A full-stack e-commerce catalogue platform to showcase factory products. It also allows easy product management.",
        tech: ["Nextjs", "Prisma", "MongoDB"],
        demo: "https://catalogue-website-pink.vercel.app/",
        github: "https://github.com/Yranshevare/Catalogue_website.git",
        image: project1Img,
    },
    {
        title: "V-Room",
        description: "A secure, login-free chat app for private communication. All data is automatically deleted after each session.",
        tech: ["Nextjs", "Redis", "Socket IO", "Express"],
        demo: "https://v-room.vercel.app/",
        github: "https://github.com/Yranshevare/V-Room.git",
        image: project2Img,
    },
    {
        title: " BugToPro AI",
        description: "An AI-powered learning platform for developers. It reviews code and provides intelligent feedback for improvement.",
        tech: ["NextJs", "LangChain", "LangGraph", "mongodb", "supabase", "gemini"],
        // demo: "https://github.com/Yranshevare/BugToPro_AI.git",
        github: "https://github.com/Yranshevare/BugToPro_AI.git",
        image: project3Img,
    },
    // {
    //     title: "Autonomous Agent",
    //     description: "Multi-agent system capable of planning, reasoning, and executing complex tasks autonomously.",
    //     tech: ["LangChain", "Next.js", "Redis", "GPT-4"],
    //     demo: "#",
    //     github: "#",
    //     image: project4Img,
    // },
];

const InfoSlide = ({ project, index, isActive, fromX }: { project: Project; index: number; isActive: boolean; fromX: number }) => (
    <motion.div
        initial={{ opacity: 0, x: fromX }}
        animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: fromX }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="absolute inset-0 flex items-center"
        style={{ pointerEvents: isActive ? "auto" : "none" }}
    >
        <div className="space-y-5">
            <p className="font-mono text-xs tracking-[0.2em] uppercase text-primary">Project {String(index + 1).padStart(2, "0")}</p>
            <h3 className="text-2xl md:text-4xl font-bold">{project.title}</h3>
            <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                    <span key={t} className="px-3 py-1.5 text-xs font-mono rounded-md border border-border bg-secondary/50 text-muted-foreground">
                        {t}
                    </span>
                ))}
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-md">{project.description}</p>
            <div className="flex gap-4 pt-2">
                {project.github && (
                    <a
                        href={project.github}
                        target="blank"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium bg-primary text-primary-foreground box-glow hover:box-glow-hover transition-all duration-300"
                    >
                        View GitHub
                    </a>
                )}
                {project.demo && (
                    <a
                        href={project.demo}
                        target="blank"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium gradient-border text-foreground hover:box-glow transition-all duration-300"
                    >
                        View Project
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
                        </svg>
                    </a>
                )}
            </div>
        </div>
    </motion.div>
);

const ImageSlide = ({ project, isActive, fromX }: { project: Project; isActive: boolean; fromX: number }) => (
    <motion.div
        initial={{ opacity: 0, x: fromX }}
        animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: fromX }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        className="absolute inset-0 flex items-center"
        style={{ pointerEvents: isActive ? "auto" : "none" }}
    >
        <div className="w-full gradient-border rounded-xl overflow-hidden bg-card/60 backdrop-blur-sm group hover:box-glow-hover transition-shadow duration-500">
            <img
                src={project.image}
                alt={project.title}
                className="w-full aspect-video object-cover group-hover:scale-[1.03] transition-transform duration-500"
            />
        </div>
    </motion.div>
);

const ProjectsSection = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const headerRef = useRef(null);
    const headerInView = useInView(headerRef, { once: true, margin: "-100px" });

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Evenly divide scroll into segments per project
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const total = projects.length;
        // Clamp to [0, 0.999] to avoid overflow, then map evenly
        const clamped = Math.min(latest, 0.999);
        const idx = Math.floor(clamped * total);
        setActiveIndex(idx);
    });

    // Vertical progress fill (desktop)
    const lineFill = useTransform(scrollYProgress, (v) => {
        const total = projects.length;
        const clamped = Math.min(v, 0.999);
        const idx = Math.floor(clamped * total);
        const segmentProgress = clamped * total - idx;
        const dotStart = idx / (total - 1);
        const dotEnd = Math.min((idx + 1) / (total - 1), 1);
        const fill = dotStart + segmentProgress * (dotEnd - dotStart);
        return `${fill * 100}%`;
    });

    // Horizontal progress fill (mobile) — same logic but as width
    const horizontalFill = useTransform(scrollYProgress, (v) => {
        const total = projects.length;
        const clamped = Math.min(v, 0.999);
        const idx = Math.floor(clamped * total);
        const segmentProgress = clamped * total - idx;
        const dotStart = idx / (total - 1);
        const dotEnd = Math.min((idx + 1) / (total - 1), 1);
        const fill = dotStart + segmentProgress * (dotEnd - dotStart);
        return `${fill * 100}%`;
    });

    return (
        <section id="projects" ref={containerRef} style={{ height: `${projects.length * 60}vh` }} className="relative">
            <div className="sticky md:-top-10 -top-15 md:h-screen flex items-center overflow-hidden">
                <div className="w-full  px-6 2xl:px-40 sm:px-15 mx-auto ">
                    <motion.div
                        ref={headerRef}
                        initial={{ opacity: 0, y: 20 }}
                        animate={headerInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.6 }}
                        className="mb-16"
                    >
                        <h2 className="text-3xl mt-20  md:text-5xl font-bold leading-[1.1] tracking-tight mb-6">
                            Featured{" "}
                            <span className="text-glow bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                                Projects
                            </span>
                        </h2>
                        <p className="text-lg  text-muted-foreground leading-relaxed mb-10 max-w-lg">
                            A selection of things I've built — from AI experiments to production systems.
                        </p>
                    </motion.div>

                    {/* ===== MOBILE LAYOUT ===== */}
                    <div className="md:hidden flex flex-col h-[80vh] md:pt-20 pb-8">
                        {/* Horizontal progress bar */}
                        <div className="relative mb-10 ">
                            <div className="relative w-full h-[2px] rounded-full bg-border/40 overflow-hidden">
                                <motion.div
                                    className="absolute top-0 left-0 h-full rounded-full"
                                    style={{
                                        width: horizontalFill,
                                        background: "linear-gradient(to right, hsl(var(--primary)), hsl(var(--accent)))",
                                        boxShadow: "0 0 12px hsl(var(--primary) / 0.5)",
                                    }}
                                />
                            </div>
                            {/* Checkpoint dots */}
                            <div className="absolute inset-0 flex justify-between items-center" style={{ top: "0px" }}>
                                {projects.map((_, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{
                                            scale: activeIndex === i ? 1.2 : 1,
                                            borderColor: activeIndex >= i ? "hsl(var(--primary))" : "hsl(var(--border))",
                                            boxShadow: activeIndex === i ? "0 0 16px hsl(var(--primary) / 0.5)" : "none",
                                            background: activeIndex === i ? "hsl(var(--primary))" : "hsl(var(--background))",
                                        }}
                                        transition={{ duration: 0.3, ease: "easeOut" }}
                                        className="w-6 h-6 rounded-full border-2 bg-background flex items-center justify-center z-10"
                                    >
                                        <motion.span
                                            animate={{ color: activeIndex >= i ? "white" : "hsl(var(--muted-foreground))" }}
                                            className="font-mono text-[8px] font-bold"
                                        >
                                            {String(i + 1).padStart(2, "0")}
                                        </motion.span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Mobile project content — stacked: image slides from right, info from left */}
                        <div className="flex-1 relative overflow-hidden">
                            {projects.map((project, i) => (
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={project.title}
                                        initial={{ opacity: 0 }}
                                        animate={activeIndex === i ? { opacity: 1 } : { opacity: 0 }}
                                        transition={{ duration: 0.4, ease: "easeOut" }}
                                        className="absolute inset-0 flex flex-col gap-5"
                                        style={{ pointerEvents: activeIndex === i ? "auto" : "none" }}
                                    >
                                        {/* Image — slides from right */}
                                        <motion.div
                                            initial={{ opacity: 0, x: 60 }}
                                            animate={activeIndex === i ? { opacity: 1, x: 0 } : { opacity: 0, x: 60 }}
                                            exit={{ opacity: 0, scale: 0 }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <div className="gradient-border rounded-xl overflow-hidden bg-card/60 backdrop-blur-sm">
                                                <img src={project.image} alt={project.title} className="w-full aspect-video object-cover" />
                                            </div>
                                        </motion.div>

                                        {/* Info — slides from left */}
                                        <motion.div
                                            initial={{ opacity: 0, x: -60 }}
                                            animate={activeIndex === i ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
                                            exit={{ opacity: 0, scale: 0 }}
                                            transition={{ duration: 0.5, delay: 0.1 }}
                                            className="space-y-3"
                                        >
                                            <p className="font-mono text-xs tracking-[0.2em] uppercase text-primary">
                                                Project {String(i + 1).padStart(2, "0")}
                                            </p>
                                            <h3 className="text-xl font-bold">{project.title}</h3>
                                            <div className="flex flex-wrap gap-1.5">
                                                {project.tech.map((t) => (
                                                    <span
                                                        key={t}
                                                        className="px-2 py-1 text-[10px] font-mono rounded-md border border-border bg-secondary/50 text-muted-foreground"
                                                    >
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                            <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
                                            <div className="flex gap-3 pt-1">
                                                {project.github && (
                                                    <a
                                                        href={project.github}
                                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium bg-primary text-primary-foreground"
                                                    >
                                                        GitHub
                                                    </a>
                                                )}
                                                {project.demo && (
                                                    <a
                                                        href={project.demo}
                                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium gradient-border text-foreground"
                                                    >
                                                        View Project
                                                    </a>
                                                )}
                                            </div>
                                        </motion.div>
                                    </motion.div>
                                </AnimatePresence>
                            ))}
                        </div>
                    </div>

                    {/* ===== DESKTOP LAYOUT ===== */}
                    <div className="hidden md:flex items-center gap-10 h-[70vh] pb-10">
                        {/* Left column */}
                        <div className="flex-1 relative h-full flex items-center">
                            {projects.map((project, i) => {
                                const isEven = i % 2 === 0;
                                return isEven ? (
                                    <InfoSlide key={project.title + "-info"} project={project} index={i} isActive={activeIndex === i} fromX={-40} />
                                ) : (
                                    <ImageSlide key={project.title + "-img"} project={project} isActive={activeIndex === i} fromX={-40} />
                                );
                            })}
                        </div>

                        {/* Center: Progress Bar */}
                        <div className="flex flex-col items-center shrink-0 h-full py-8 relative">
                            <div className="relative flex-1 w-[2px] rounded-full bg-border/40 overflow-hidden">
                                <motion.div
                                    className="absolute top-0 left-0 w-full rounded-full"
                                    style={{
                                        height: lineFill,
                                        background: "linear-gradient(to bottom, hsl(var(--primary)), hsl(var(--accent)))",
                                        boxShadow: "0 0 12px hsl(var(--primary) / 0.5)",
                                    }}
                                />
                            </div>
                            <div className="absolute inset-0 flex flex-col justify-between py-8">
                                {projects.map((_, i) => (
                                    <div key={i} className="relative flex items-center justify-center">
                                        <motion.div
                                            animate={{
                                                scale: activeIndex === i ? 1.2 : 1,
                                                borderColor: activeIndex >= i ? "hsl(var(--primary))" : "hsl(var(--border))",
                                                boxShadow: activeIndex === i ? "0 0 20px hsl(var(--primary) / 0.5)" : "none",
                                                background: activeIndex === i ? "hsl(var(--primary))" : "hsl(var(--background))",
                                            }}
                                            transition={{ duration: 0.3, ease: "easeOut" }}
                                            className="w-7 h-7 aspect-square rounded-full border-2 bg-background flex items-center justify-center z-10"
                                        >
                                            <motion.span
                                                animate={{
                                                    color: activeIndex >= i ? "white" : "hsl(var(--muted-foreground))",
                                                }}
                                                className="font-mono text-[10px] font-bold"
                                            >
                                                {String(i + 1).padStart(2, "0")}
                                            </motion.span>
                                        </motion.div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right column */}
                        <div className="flex-1 relative h-full flex items-center">
                            {projects.map((project, i) => {
                                const isEven = i % 2 === 0;
                                return isEven ? (
                                    <ImageSlide key={project.title + "-img"} project={project} isActive={activeIndex === i} fromX={40} />
                                ) : (
                                    <InfoSlide key={project.title + "-info"} project={project} index={i} isActive={activeIndex === i} fromX={40} />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProjectsSection;
