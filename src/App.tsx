import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import IntroAnimation from "./components/IntroAnimation";
import CustomCursor from "./components/CustomCursor";
import Hero3DScene from "./components/Hero3DScene";
import HeroSection from "./components/HeroSection";
import ProjectsSection from "./components/ProjectSection";
import SkillsSection from "./components/SkillsSection";
import ContactSection from "./components/ContactSection";

const App = () => {
    const [introComplete, setIntroComplete] = useState(false);

    const handleIntroComplete = useCallback(() => {
        setIntroComplete(true);
    }, []);

    return (
        <>
            <CustomCursor />
            {!introComplete && <IntroAnimation onComplete={handleIntroComplete} />}

            <motion.div
                initial={{ opacity: 0, filter: "blur(20px)" }}
                animate={introComplete ? { opacity: 1, filter: "blur(0px)" } : {}}
                transition={{ duration: 1, ease: "easeOut" }}
                className="bg-grain min-h-screen"
            >
                {/* Nav */}
                <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/60 border-b border-border/30">
                    <div className="container mx-auto px-6 md:px-12 flex items-center justify-between h-16">
                        <a href="#" className="font-bold text-lg tracking-tight text-glow">
                            YR
                        </a>
                        <div className="hidden md:flex items-center gap-8">
                            {["Projects", "Skills", "Contact"].map((item) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    {item}
                                </a>
                            ))}
                        </div>
                    </div>
                </nav>

                {/* Hero with 3D */}
                <div className="relative">
                    <Hero3DScene />
                    <HeroSection />
                </div>

                <ProjectsSection />
                <SkillsSection />
                <ContactSection />
            </motion.div>
        </>
    );
};

export default App;
