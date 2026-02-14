import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skillCategories = [
    {
        title: "Languages",
        skills: ["TypeScript", "Python", "JavaScript"],
    },
    {
        title: "Frontend",
        skills: ["React", "Next.js", "HTML", "CSS", "Tailwind"],
    },
    {
        title: "Backend",
        skills: ["Node.js", "Express.js", "Flask", "prisma", "MongoDB"],
    },
    {
        title: "Tools",
        skills: ["Supabase", "Redis", "Git & Github", "vercel", "render", "Cloudinary"],
    },
    {
        title: "AI / ML",
        skills: ["LangChain", "LangGraph", "MCP SDK", "Numpy", "Pandas", "Scikit Learn"],
    },
    {
        title: "Domain",
        skills: ["Machine Learning", "AI Applications developer", "System Design", "Full Stack Development"],
    },
];

const SkillTag = ({ skill, delay }: { skill: string; delay: number }) => (
    <motion.span
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay, ease: "easeOut" }}
        whileHover={{ scale: 1.08 }}
        className="px-4 py-2 text-sm font-medium rounded-lg bg-secondary/60 text-foreground
               border border-border/50 hover:border-primary/50 hover:box-glow
               transition-all duration-300 cursor-default"
    >
        {skill}
    </motion.span>
);

const SkillsSection = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="skills" className="md:py-32 relative" ref={ref}>
            <div className="w-full  px-6 2xl:px-40 sm:px-15  mx-auto ">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <p className="font-mono text-sm tracking-[0.2em] uppercase text-primary mb-3">Expertise</p>
                    <h2 className="text-3xl md:text-5xl font-bold">
                        Skills &{" "}
                        <span className="text-glow bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                            Technologies
                        </span>
                    </h2>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-10">
                    {skillCategories.map((cat, ci) => (
                        <motion.div
                            key={cat.title}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: ci * 0.15 }}
                        >
                            <h3 className="text-lg font-semibold mb-5 text-muted-foreground">{cat.title}</h3>
                            <div className="flex flex-wrap gap-2.5">
                                {cat.skills.map((skill, si) => (
                                    <SkillTag key={skill} skill={skill} delay={ci * 0.15 + si * 0.05} />
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SkillsSection;
