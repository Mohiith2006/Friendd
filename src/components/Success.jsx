import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';
import { db } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';
import WavyText from './WavyText';

const Success = ({ userData, onRestart }) => {
    const [showText, setShowText] = useState(false);

    useEffect(() => {
        // 1. Trigger Confetti
        const duration = 3000;
        const end = Date.now() + duration;

        const frame = () => {
            confetti({
                particleCount: 5,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#ffc0cb', '#800080', '#ffd700']
            });
            confetti({
                particleCount: 5,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#ffc0cb', '#800080', '#ffd700']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };
        frame();

        // 2. Save Data to Firebase
        const saveData = async () => {
            try {
                if (!userData.name) return; // heavy guard
                if (!db) {
                    console.warn("Firebase DB not initialized. Skipping save.");
                    return;
                }
                await addDoc(collection(db, "responses"), {
                    ...userData,
                    timestamp: new Date()
                });
                console.log("Response saved!");
            } catch (e) {
                console.error("Error saving document: ", e);
            }
        };
        saveData();

        // 3. Show Text Delay
        setTimeout(() => setShowText(true), 500);

    }, [userData]);

    return (
        <div className="flex flex-col items-center gap-6 text-center w-full">
            {/* Heart Rain Effect (CSS based) */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                {Array.from({ length: 20 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute text-2xl animate-fall"
                        style={{
                            left: `${Math.random() * 100}%`,
                            animationDuration: `${Math.random() * 2 + 2}s`,
                            animationDelay: `${Math.random() * 2}s`
                        }}
                    >
                        ❤️
                    </div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="z-10 bg-white/40 p-6 rounded-3xl backdrop-blur-sm border border-white/60 shadow-xl"
            >
                <WavyText
                    text="YAYYY! 🎉"
                    className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-600 mb-4 justify-center"
                />

                {showText && (
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-lg font-medium text-gray-700 leading-relaxed"
                    >
                        I knew you can’t hate me 😂 <br />
                        Because you stayed, supported me, laughed with me, and tolerated my nonsense. <br />
                        Even if you try… you’re stuck with me forever 😌 <br />
                        <span className="font-bold text-pink-500">Thanks for being my favorite human ❤️</span>
                    </motion.p>
                )}
            </motion.div>

            <div className="w-full bg-white/30 p-4 rounded-xl text-left text-sm z-10">
                <h3 className="font-bold text-purple-700 mb-2 border-b border-purple-200 pb-1">Our Memory Lane:</h3>
                <p><strong>Name:</strong> {userData.name}</p>
                <p><strong>First Met:</strong> {userData.answers?.firstMeet || '...'}</p>
                <p><strong>Fav Memory:</strong> {userData.answers?.favMemory || '...'}</p>
            </div>

            <button
                onClick={onRestart}
                className="btn-primary mt-4 z-10"
            >
                Restart 🔄
            </button>

            <style>{`
        @keyframes fall {
          0% { transform: translateY(-10vh); opacity: 1; }
          100% { transform: translateY(110vh); opacity: 0; }
        }
        .animate-fall {
          animation-name: fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
        </div>
    );
};

export default Success;
