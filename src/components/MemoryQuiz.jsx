import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const questions = [
    { id: 'firstMeet', label: 'When and where did we first meet? 🗓️', placeholder: 'I remember it was...' },
    { id: 'favMemory', label: 'What is your favorite memory with me? 💭', placeholder: 'That time when we...' },
];

const MemoryQuiz = ({ onNext }) => {
    const [currentQ, setCurrentQ] = useState(0);
    const [answers, setAnswers] = useState({});
    const [currentAnswer, setCurrentAnswer] = useState('');

    const progress = ((currentQ + 1) / questions.length) * 100;

    const handleNext = (e) => {
        e.preventDefault();
        const qKey = questions[currentQ].id;
        const updatedAnswers = { ...answers, [qKey]: currentAnswer };

        setAnswers(updatedAnswers);
        setCurrentAnswer('');

        if (currentQ < questions.length - 1) {
            setCurrentQ(prev => prev + 1);
        } else {
            onNext(updatedAnswers);
        }
    };

    return (
        <div className="w-full flex flex-col gap-6">
            {/* Progress Bar */}
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                <motion.div
                    className="h-full bg-gradient-to-r from-pink-400 to-purple-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.5 }}
                />
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentQ}
                    initial={{ opacity: 0, x: 50, rotate: 2 }}
                    animate={{ opacity: 1, x: 0, rotate: 0 }}
                    exit={{ opacity: 0, x: -50, rotate: -2 }}
                    transition={{ duration: 0.4, type: "spring" }}
                    className="flex flex-col gap-6"
                >
                    <div className="space-y-2">
                        <span className="text-sm font-bold text-pink-500 tracking-wider uppercase">
                            Question {currentQ + 1}/{questions.length}
                        </span>
                        <h2 className="text-2xl font-bold text-gray-800 leading-tight">
                            {questions[currentQ].label}
                        </h2>
                    </div>

                    <div className="relative group">
                        <textarea
                            value={currentAnswer}
                            onChange={(e) => setCurrentAnswer(e.target.value)}
                            placeholder={questions[currentQ].placeholder}
                            className="w-full h-40 p-6 rounded-2xl bg-white/50 border-2 border-white/60 focus:border-purple-300 focus:bg-white/80 focus:ring-4 focus:ring-purple-100 focus:outline-none resize-none transition-all placeholder-gray-400 text-lg shadow-sm group-hover:shadow-md"
                        />
                        <div className="absolute bottom-4 right-4 text-xs text-gray-400 font-medium">
                            {currentAnswer.length} chars
                        </div>
                    </div>

                    <button
                        onClick={handleNext}
                        disabled={!currentAnswer.trim()}
                        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed group text-lg"
                    >
                        {currentQ === questions.length - 1 ? (
                            <>Finish Quiz <span className="inline-block animate-pulse">✨</span></>
                        ) : (
                            <>Next <span className="inline-block group-hover:translate-x-1 transition-transform">➜</span></>
                        )}
                    </button>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default MemoryQuiz;
