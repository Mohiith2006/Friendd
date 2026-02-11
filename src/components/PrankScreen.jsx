import React, { useState } from 'react';
import { motion } from 'framer-motion';

const PrankScreen = ({ onSuccess }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [noText, setNoText] = useState("NO 😈");

    // Function to move button to random position
    const moveButton = () => {
        // Larger range for more chaos
        const x = Math.random() * 600 - 300;
        const y = Math.random() * 400 - 200;
        setPosition({ x, y });
    };

    const handleNoClick = () => {
        setNoText("YES ❤️");
        onSuccess();
    };

    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center gap-8 text-center"
        >
            <h1 className="text-3xl font-bold text-red-500 animate-pulse">
                Do you hate me? 🥺💔
            </h1>

            <div className="relative h-64 w-full flex items-center justify-center">
                {/* Yes Button (Fixed) */}
                <button
                    onClick={onSuccess}
                    className="px-10 py-5 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-xl rounded-full font-bold shadow-lg hover:scale-110 hover:shadow-green-300/50 transition-all duration-300 z-10"
                >
                    YES ❤️
                </button>

                {/* No Button (Runaway) */}
                <motion.button
                    initial={{ x: 120, y: 0 }} // Start nicely to the right
                    animate={position.x === 0 && position.y === 0 ? { x: 120, y: 0 } : position}
                    transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 15,
                        mass: 0.5
                    }}
                    onHoverStart={moveButton}
                    onTap={handleNoClick}
                    className="px-10 py-5 bg-gradient-to-r from-red-400 to-rose-500 text-white text-xl rounded-full font-bold shadow-lg cursor-pointer absolute z-20"
                    style={{ top: '50%', left: '50%', marginTop: '-30px', marginLeft: '-50px' }} // Approximate centering adjustment before translate
                    whileHover={{ scale: 0.9, rotate: [0, -10, 10, -10, 0] }}
                >
                    {noText}
                </motion.button>
            </div>
        </motion.div>
    );
};

export default PrankScreen;
