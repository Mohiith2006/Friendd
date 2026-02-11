import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import FloatingHearts from './FloatingHearts';
import CursorTrail from './CursorTrail';

const Layout = ({ children }) => {
    const ref = useRef(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

    const handleMouseMove = (e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (rect) {
            const width = rect.width;
            const height = rect.height;
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            const xPct = mouseX / width - 0.5;
            const yPct = mouseY / height - 0.5;
            x.set(xPct);
            y.set(yPct);
        }
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden p-4 perspective-1000">
            {/* Background Elements */}
            <FloatingHearts />
            <CursorTrail />

            {/* 3D Tilt Container */}
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-lg relative z-20"
            >
                <div className="glass-card p-8 flex flex-col items-center min-h-[400px] justify-center text-center transform translate-z-10 shadow-2xl">
                    {children}
                </div>
            </motion.div>

            <style>{`
        .perspective-1000 {
            perspective: 1000px;
        }
      `}</style>
        </div>
    );
};

export default Layout;
