import { motion } from "framer-motion";

const links = [
    {
        name: "GitHub",
        href: "https://github.com/Yranshevare",
    },
    {
        name: "LinkedIn",
        href: "https://www.linkedin.com/in/yadnesh-ranshevare",
    },
    {
        name: "Instagram",
        href: "https://www.instagram.com/yadnesh_ranshevare",
    },
];

const ContactSection = () => (
    <section id="contact" className="pt-32 pb-10 relative">
        <div className="container mx-auto px-6 md:px-12 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                <p className="font-mono text-sm tracking-[0.2em] uppercase text-primary mb-3">Get in Touch</p>
                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                    Let's Build{" "}
                    <span className="text-glow bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">Something</span>
                </h2>
                <p className="text-muted-foreground text-lg max-w-md mx-auto mb-10">Have an idea or project in mind? I'd love to hear about it.</p>
                <a
                    href="mailto:yranshevare2005@gmail.com"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-medium
                     bg-primary text-primary-foreground box-glow hover:box-glow-hover
                     transition-all duration-300 text-sm"
                >
                    Say Hello
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </a>
            </motion.div>
        </div>

        {/* Footer */}
        <div className="w-full  px-6 2xl:px-40 sm:px-15 mx-auto  mt-32">
            <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm text-muted-foreground text-center">© 2026 Yadnesh Ranshevare. Crafted with precision.</p>
                <div className="flex gap-6">
                    {/* {["GitHub", "LinkedIn", "Twitter"].map((link) => (
                        <a key={link} href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                            {link}
                        </a>
                    ))} */}
                    {links.map((link) => (
                        <a key={link.name} href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                            {link.name}
                        </a>
                    ))}
                </div>
            </div>
        </div>
    </section>
);

export default ContactSection;
