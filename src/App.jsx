import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/Layout';
import Welcome from './components/Welcome';
import MemoryQuiz from './components/MemoryQuiz';
import PrankScreen from './components/PrankScreen';
import Success from './components/Success';

function App() {
  const [step, setStep] = useState('welcome'); // welcome, quiz, prank, success
  const [userData, setUserData] = useState({
    name: '',
    answers: {}
  });

  const handleWelcomeNext = ({ name }) => {
    setUserData(prev => ({ ...prev, name }));
    setStep('quiz');
  };

  const handleQuizNext = (answers) => {
    setUserData(prev => ({ ...prev, answers }));
    setStep('prank');
  };

  const handlePrankSuccess = () => {
    setStep('success');
  };

  const handleRestart = () => {
    setStep('welcome');
    setUserData({ name: '', answers: {} });
  };

  return (
    <Layout>
      <AnimatePresence mode="wait">
        {step === 'welcome' && (
          <Welcome key="welcome" onNext={handleWelcomeNext} />
        )}

        {step === 'quiz' && (
          <MemoryQuiz key="quiz" onNext={handleQuizNext} />
        )}

        {step === 'prank' && (
          <PrankScreen key="prank" onSuccess={handlePrankSuccess} />
        )}

        {step === 'success' && (
          <Success key="success" userData={userData} onRestart={handleRestart} />
        )}
      </AnimatePresence>
    </Layout>
  );
}

export default App;
