// import { motion } from "framer-motion";
import profilePhoto from "../assets/profile-photo.png.png";
import { motion, easeOut } from "framer-motion";

const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};

const fadeUp = {
    hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
    show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: easeOut } },
};

const HeroSection = () => {
    return (
        <section className="relative min-h-screen   flex items-center overflow-hidden">
            {/* Ambient glow effects */}
            <div
                className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-[120px] pointer-events-none"
                style={{ background: "hsl(225 73% 57%)" }}
            />
            <div
                className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15 blur-[100px] pointer-events-none"
                style={{ background: "hsl(250 60% 55%)" }}
            />

            <div className="w-full md:mt-0 mt-20 px-6 2xl:px-40 sm:px-15  relative z-10">
                <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-16">
                    {/* Left: Text */}
                    <motion.div variants={container} initial="hidden" animate="show" className="max-w-2xl flex-1">
                        <motion.p variants={fadeUp} className="font-mono text-sm tracking-[0.2em] uppercase text-primary mb-4">
                            Full Stack Developer · AI Explorer
                        </motion.p>

                        <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight mb-6">
                            Hi, I'm{" "}
                            <span className="text-glow bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                                Yadnesh Ranshevare
                            </span>
                        </motion.h1>

                        <motion.p variants={fadeUp} className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-10 max-w-lg">
                            I craft intelligent systems at the intersection of AI and elegant software engineering. Turning complex problems into
                            seamless digital experiences.
                        </motion.p>

                        <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
                            <a
                                href="#projects"
                                className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm
                           bg-primary text-primary-foreground box-glow
                           hover:box-glow-hover transition-all duration-300"
                            >
                                View Projects
                                <svg
                                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </a>
                            <a
                                href="#contact"
                                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm
                           gradient-border text-foreground
                           hover:box-glow transition-all duration-300"
                            >
                                Contact Me
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* Right: Profile Photo with backlighting rings */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, filter: "blur(12px)" }}
                        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                        transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
                        className="relative flex-shrink-0 flex items-center justify-center"
                    >
                        {/* Outermost ring with orbiting dots */}
                        <motion.div
                            className="absolute w-[360px] h-[360px] lg:w-[420px] lg:h-[420px] rounded-full border-2 border-primary/30"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                            style={{
                                boxShadow: "0 0 30px hsl(225 73% 57% / 0.2), inset 0 0 30px hsl(225 73% 57% / 0.1)",
                            }}
                        >
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary/60 blur-[2px]" />
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent/50 blur-[2px]" />
                        </motion.div>

                        {/* Middle ring with orbiting dot */}
                        <motion.div
                            className="absolute w-[280px] h-[280px] lg:w-[330px] lg:h-[330px] rounded-full border-2 border-accent/40"
                            animate={{ rotate: -360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            style={{
                                boxShadow: "0 0 40px hsl(250 60% 55% / 0.25), inset 0 0 40px hsl(250 60% 55% / 0.1)",
                            }}
                        >
                            <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary/40 blur-[2px]" />
                        </motion.div>

                        {/* Inner ring with orbiting dot */}
                        <motion.div
                            className="absolute w-[200px] h-[200px] lg:w-[240px] lg:h-[240px] rounded-full border border-primary/20"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            style={{
                                boxShadow: "0 0 25px hsl(225 73% 57% / 0.15)",
                            }}
                        >
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-accent/60 blur-[2px]" />
                        </motion.div>

                        {/* Ambient glow behind photo */}
                        <motion.div
                            className="absolute w-[300px] h-[300px] lg:w-[360px] lg:h-[360px] rounded-full"
                            style={{
                                background: "radial-gradient(circle, hsl(225 73% 57% / 0.35) 0%, hsl(250 60% 55% / 0.15) 50%, transparent 70%)",
                            }}
                            animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        />

                        {/* Photo — no circular crop, natural shape with bottom fade */}
                        <div className="relative z-10 w-[320px] lg:w-[380px]">
                            <img
                                src={"/profile-photo.png"}
                                alt="Profile"
                                className="w-full h-auto object-cover relative z-10"
                                style={{
                                    maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
                                    WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent 100%)",
                                }}
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
