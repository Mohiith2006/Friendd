import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CursorTrail = () => {
    const [trails, setTrails] = useState([]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            const newTrail = {
                id: Date.now(),
                x: e.clientX,
                y: e.clientY,
            };
            setTrails((prev) => [...prev.slice(-15), newTrail]);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
            <AnimatePresence>
                {trails.map((trail) => (
                    <motion.div
                        key={trail.id}
                        initial={{ scale: 1, opacity: 1 }}
                        animate={{ scale: 0, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }}
                        className="absolute text-xl pointer-events-none select-none"
                        style={{
                            left: trail.x,
                            top: trail.y,
                        }}
                    >
                        💖
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default CursorTrail;
