import React, { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [stage, setStage] = useState<'drawing' | 'scaling' | 'text' | 'exit' | 'done'>('drawing');

  useEffect(() => {
    // Stage 1: Line draw (0ms - 600ms)
    const t1 = setTimeout(() => {
      setStage('scaling');
    }, 600);

    // Stage 2: Text reveal (600ms - 1300ms)
    const t2 = setTimeout(() => {
      setStage('text');
    }, 1300);

    // Stage 3: Smooth exit (1300ms - 2000ms)
    const t3 = setTimeout(() => {
      setStage('exit');
    }, 2000);

    // Complete (2400ms)
    const t4 = setTimeout(() => {
      setStage('done');
      if (onComplete) onComplete();
    }, 2400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onComplete]);

  if (stage === 'done') return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#36050B] transition-opacity duration-700 ease-in-out ${
        stage === 'exit' ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Radial Glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-radial from-[#D4AF37]/15 via-[#580B14]/30 to-transparent blur-3xl animate-pulse-glow" />

      <div className="relative flex flex-col items-center justify-center p-8 text-center z-10">
        {/* Animated SVG Emblem */}
        <div className="relative w-36 h-36 md:w-44 md:h-44 flex items-center justify-center mb-6">
          {/* Animated Gold Ring border */}
          <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="url(#goldLoaderGrad)"
              strokeWidth="2.5"
              strokeDasharray="283"
              strokeDashoffset={stage === 'drawing' ? '283' : '0'}
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="goldLoaderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#E4BF52" />
                <stop offset="50%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#9E771B" />
              </linearGradient>
            </defs>
          </svg>

          {/* Logo Mark Image */}
          <img
            src="/images/logo-icon.svg"
            alt="Vitta Vidhi Advisors Logo Symbol"
            className={`w-24 h-24 md:w-28 md:h-28 transition-all duration-700 transform ${
              stage === 'drawing'
                ? 'opacity-0 scale-75 blur-sm'
                : 'opacity-100 scale-100 blur-0 drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]'
            }`}
          />
        </div>

        {/* Brand Name Text Animation */}
        <div className="overflow-hidden">
          <h1
            className={`text-2xl md:text-4xl font-serif-luxury font-bold tracking-[0.2em] text-white transition-all duration-700 transform ${
              stage === 'text' || stage === 'exit'
                ? 'translate-y-0 opacity-100'
                : 'translate-y-6 opacity-0'
            }`}
          >
            VITTA VIDHI <span className="text-[#D4AF37]">ADVISORS</span>
          </h1>
        </div>

        {/* Tagline */}
        <div className="overflow-hidden mt-2">
          <p
            className={`text-xs md:text-sm font-medium tracking-[0.3em] uppercase text-[#E4BF52]/90 transition-all duration-700 delay-150 transform ${
              stage === 'text' || stage === 'exit'
                ? 'translate-y-0 opacity-100'
                : 'translate-y-4 opacity-0'
            }`}
          >
            Tax | Compliance | Business Advisory
          </p>
        </div>

        {/* Gold Loader Bar */}
        <div className="w-48 h-0.5 bg-[#580B14] rounded-full mt-6 overflow-hidden relative">
          <div
            className={`h-full bg-gold-gradient transition-all duration-1000 ease-out ${
              stage === 'drawing' ? 'w-0' : stage === 'scaling' ? 'w-1/2' : 'w-full'
            }`}
          />
        </div>
      </div>
    </div>
  );
};
