import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const springConfig = { damping: 25, stiffness: 300 };
    const followerX = useSpring(cursorX, { damping: 40, stiffness: 150 });
    const followerY = useSpring(cursorY, { damping: 40, stiffness: 150 });
    const dotX = useSpring(cursorX, springConfig);
    const dotY = useSpring(cursorY, springConfig);
    const isHovering = useRef(false);
    const dotScale = useMotionValue(1);
    const followerScale = useMotionValue(1);

    useEffect(() => {
        const move = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
        };

        const handleOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest("a, button, [role='button'], input, textarea, select")) {
                isHovering.current = true;
                dotScale.set(1.5);
                followerScale.set(1.8);
            }
        };

        const handleOut = () => {
            isHovering.current = false;
            dotScale.set(1);
            followerScale.set(1);
        };

        window.addEventListener("mousemove", move);
        window.addEventListener("mouseover", handleOver);
        window.addEventListener("mouseout", handleOut);
        return () => {
            window.removeEventListener("mousemove", move);
            window.removeEventListener("mouseover", handleOver);
            window.removeEventListener("mouseout", handleOut);
        };
    }, [cursorX, cursorY, dotScale, followerScale]);

    return (
        <>
            {/* Dot */}
            <motion.div
                className="fixed top-0 left-0 w-2 h-2 rounded-full bg-primary pointer-events-none z-[9999] mix-blend-screen"
                style={{
                    x: dotX,
                    y: dotY,
                    translateX: "-50%",
                    translateY: "-50%",
                    scale: dotScale,
                    boxShadow: "0 0 10px hsl(225 73% 57% / 0.8)",
                }}
            />
            {/* Follower */}
            <motion.div
                className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9998]"
                style={{
                    x: followerX,
                    y: followerY,
                    translateX: "-50%",
                    translateY: "-50%",
                    scale: followerScale,
                    border: "1px solid hsl(225 73% 57% / 0.3)",
                    background: "hsl(225 73% 57% / 0.05)",
                    backdropFilter: "blur(2px)",
                }}
            />
        </>
    );
};

export default CustomCursor;
