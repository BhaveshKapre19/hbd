import React from 'react';
import confetti from 'canvas-confetti';
import { celebrationAudio } from '../utils/audio';
import { Sparkles, Heart, Gift, PartyPopper } from 'lucide-react';

export default function ConfettiBlaster() {
  const triggerGoldShower = () => {
    celebrationAudio.playCheerFanfare();
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.65 },
        colors: ['#D4AF37', '#E5B83B', '#FFF9EE', '#F2D5D6'],
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.65 },
        colors: ['#D4AF37', '#E5B83B', '#FFF9EE', '#C57B7D'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();
  };

  const triggerHeartRain = () => {
    celebrationAudio.playSparkleChime();
    confetti({
      particleCount: 60,
      spread: 100,
      origin: { y: 0.4 },
      shapes: ['star', 'circle'],
      colors: ['#DF9C9D', '#C92A42', '#FFD1DC', '#D4AF37', '#FFFFFF'],
      scalar: 1.2,
    });
  };

  const triggerGrandCelebration = () => {
    celebrationAudio.playPopSound();
    confetti({
      particleCount: 160,
      spread: 140,
      origin: { y: 0.5 },
      colors: ['#D4AF37', '#ECC448', '#8E283B', '#FFFFFF', '#6B1D2F'],
    });
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-2.5 my-3">
      <button
        onClick={triggerGrandCelebration}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FFFDF9] hover:bg-[#F7EFE1] text-[#1E1D24] text-xs font-semibold border border-[#DECBAE] shadow-sm transition-all duration-200 active:scale-95"
      >
        <PartyPopper className="w-3.5 h-3.5 text-[#D4A322]" />
        <span>Celebration Cannon</span>
      </button>

      <button
        onClick={triggerGoldShower}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FFFDF9] hover:bg-[#F7EFE1] text-[#1E1D24] text-xs font-semibold border border-[#DECBAE] shadow-sm transition-all duration-200 active:scale-95"
      >
        <Sparkles className="w-3.5 h-3.5 text-[#A17415]" />
        <span>Gold Foil Shower</span>
      </button>

      <button
        onClick={triggerHeartRain}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FFFDF9] hover:bg-[#F7EFE1] text-[#1E1D24] text-xs font-semibold border border-[#DECBAE] shadow-sm transition-all duration-200 active:scale-95"
      >
        <Heart className="w-3.5 h-3.5 text-[#C97A7E]" />
        <span>Love & Hugs Rain</span>
      </button>
    </div>
  );
}

