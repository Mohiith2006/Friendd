import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const FloatingHearts = () => {
    const [hearts, setHearts] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            setHearts((prev) => {
                const newHeart = {
                    id: Date.now(),
                    left: Math.random() * 100, // Random percentage
                    scale: Math.random() * 0.8 + 0.5, // Random scale 0.5 - 1.3
                    duration: Math.random() * 10 + 5, // Faster duration 5 - 15s
                };

                // Cleanup old hearts or limit to 50
                const cleanup = prev.filter((h) => Date.now() - h.id < 15000).slice(-50);
                return [...cleanup, newHeart];
            });
        }, 200); // Much faster generation

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {hearts.map((heart) => (
                <motion.div
                    key={heart.id}
                    className="absolute text-pink-300/40 text-4xl"
                    initial={{ y: "110vh", opacity: 0 }}
                    animate={{ y: "-10vh", opacity: [0, 0.8, 0] }}
                    transition={{ duration: heart.duration, ease: "linear" }}
                    style={{ left: `${heart.left}%`, fontSize: `${heart.scale}rem` }}
                >
                    ❤️
                </motion.div>
            ))}
        </div>
    );
};

export default FloatingHearts;
