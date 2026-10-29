import React from 'react';
import { celebrationAudio } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, GlassWater, PartyPopper } from 'lucide-react';

export default function CelebrationFooter({ lang }) {
  const handleFinalToast = () => {
    celebrationAudio.playCheerFanfare();
    confetti({
      particleCount: 140,
      spread: 120,
      origin: { y: 0.8 },
      colors: ['#D4AF37', '#E5B83B', '#DF9C9D', '#F4ECE0', '#FFFFFF', '#6B1D2F'],
    });
  };

  return (
    <footer className="mt-20 border-t border-[#ECE0CF] bg-[#FAF3E8] py-14 px-4 sm:px-6 text-center relative overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Monogram Seal */}
        <div className="w-16 h-16 mx-auto rounded-full bg-[#FFFDF9] border border-[#DECBAE] shadow-sm flex items-center justify-center mb-6">
          <span className="font-serif text-2xl font-bold text-[#A17415]">
            P
          </span>
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#1E1D24]">
          {lang === 'bg'
            ? 'Наздраве за Plam Buddy!'
            : 'A Royal Toast to Plam Buddy!'}
        </h3>

        <p className="mt-2 text-sm sm:text-base text-[#6E685F] max-w-lg mx-auto">
          {lang === 'bg'
            ? 'Нека днешният рожден ден бъде само началото на най-щастливата, успешна и незабравима година в живота ти.'
            : 'May this birthday be the spark for your most radiant, victorious, and magnificent chapter yet.'}
        </p>

        {/* Final Interactive Toast Button */}
        <div className="mt-6">
          <button
            onClick={handleFinalToast}
            className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#1E1D24] text-[#FFFDF9] font-semibold text-sm hover:bg-[#322E3B] transition-all duration-200 active:scale-95 shadow-luxury border border-[#D4AF37]/50 group"
          >
            <PartyPopper className="w-4 h-4 text-[#E5B83B] group-hover:rotate-12 transition-transform" />
            <span>Raise a Toast & Pop Confetti! 🥂</span>
            <Sparkles className="w-4 h-4 text-[#E5B83B]" />
          </button>
        </div>

        {/* Closing Note */}
        <div className="mt-12 pt-6 border-t border-[#DECBAE]/50 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8C8275] gap-2">
          <p>
            Dedicated to Plamena ("Plam") • Celebrating from afar with immense love 💖
          </p>
          <p className="flex items-center gap-1 font-medium text-[#7A5A12]">
            <span>Bulgaria</span>
            <span>🇧🇬</span>
            <span>• 29 October</span>
          </p>
        </div>

      </div>
    </footer>
  );
}

