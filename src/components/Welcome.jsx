import React, { useState } from 'react';
import { motion } from 'framer-motion';
import WavyText from './WavyText';

const Welcome = ({ onNext }) => {
    const [name, setName] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim()) {
            setError(true);
            return;
        }
        onNext({ name });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8, type: "spring" }}
            className="w-full flex flex-col items-center gap-8"
        >
            <motion.div
                className="text-7xl drop-shadow-lg cursor-pointer"
                animate={{
                    rotate: [0, 10, -10, 10, 0],
                    scale: [1, 1.1, 1]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                }}
            >
                💌
            </motion.div>

            <div className="text-center space-y-2">
                <WavyText
                    text="Oyeeeee..."
                    className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 drop-shadow-sm justify-center"
                />
                <motion.p
                    className="text-3xl text-gray-700 font-bold opacity-90"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    Ni peru entiiiii??
                </motion.p>
            </div>

            <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-6 mt-4">
                <div className="relative w-full max-w-xs">
                    <input
                        type="text"
                        placeholder="Type your name..."
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            setError(false);
                        }}
                        className={`w-full px-6 py-4 rounded-full bg-white/60 border-2 focus:outline-none focus:ring-4 focus:ring-pink-200 transition-all text-center text-xl font-semibold placeholder-gray-400 shadow-inner
                ${error ? 'border-red-400 animate-shake bg-red-50' : 'border-white/50 focus:border-pink-400'}`}
                    />
                    {error && (
                        <motion.span
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute -bottom-6 left-0 right-0 text-red-500 text-sm font-bold"
                        >
                            Please tell me! 🥺
                        </motion.span>
                    )}
                </div>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    disabled={!name.trim()}
                    className="btn-primary w-full max-w-xs disabled:opacity-50 disabled:cursor-not-allowed group text-lg"
                >
                    Next <span className="inline-block group-hover:translate-x-1 transition-transform">➜</span>
                </motion.button>
            </form>
        </motion.div>
    );
};

export default Welcome;
