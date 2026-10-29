import React, { useState } from 'react';
import { celebrationAudio } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Send, Star, Sparkles, CheckCircle2 } from 'lucide-react';

export default function MakeAWish({ lang }) {
  const [wishText, setWishText] = useState('');
  const [wishesList, setWishesList] = useState([
    {
      id: 1,
      text: "Endless laughter, unforgettable trips, great health, and conquering all big dreams! ✈️✨",
      sender: "Best Friend Wish",
      date: "Today"
    }
  ]);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!wishText.trim()) return;

    celebrationAudio.playSparkleChime();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#D4AF37', '#E5B83B', '#DF9C9D', '#FFF9EE'],
      shapes: ['star', 'circle'],
    });

    const newWish = {
      id: Date.now(),
      text: wishText,
      sender: "Plam's Secret Wish",
      date: "Just now"
    };

    setWishesList([newWish, ...wishesList]);
    setWishText('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="py-12 px-4 sm:px-6 max-w-4xl mx-auto">
      <div className="luxury-card rounded-3xl p-6 sm:p-10 border border-[#DECBAE] relative overflow-hidden shadow-luxury">
        {/* Decorative Top Accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#D4AF37] via-[#ECC448] to-[#C97A7E]" />

        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF0DE] text-[#8C6700] text-xs font-semibold uppercase tracking-wider mb-3">
            <Star className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
            <span>{lang === 'bg' ? 'Звезден Ритуал за Пожелания' : 'Star Constellation Wish Ritual'}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E1D24]">
            {lang === 'bg' ? 'Намисли си желание, Пламена!' : 'Make a Birthday Wish, Plam!'}
          </h2>

          <p className="mt-2 text-sm sm:text-base text-[#6E685F] leading-relaxed">
            {lang === 'bg'
              ? 'Напиши своето най-голямо съкровено желание за новата година от живота ти и го изпрати към звездите!'
              : 'Type your secret, biggest dream for this new year of your life and launch it into the night sky!'}
          </p>
        </div>

        {/* Wish Form */}
        <form onSubmit={handleSubmit} className="mt-8 max-w-xl mx-auto">
          <div className="relative">
            <input
              type="text"
              value={wishText}
              onChange={(e) => setWishText(e.target.value)}
              placeholder={lang === 'bg' ? "Напиши своето желание тук..." : "What do you wish for this year, Plam buddy?..."}
              className="w-full px-4 sm:px-5 py-3.5 sm:py-4 pr-24 sm:pr-32 rounded-2xl bg-[#FFFDF9] border border-[#DECBAE] text-[#1E1D24] text-xs sm:text-base placeholder:text-[#A8A196] focus:outline-none focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 transition-all shadow-inner"
            />
            <button
              type="submit"
              disabled={!wishText.trim()}
              className="absolute right-1.5 sm:right-2 top-1.5 sm:top-2 bottom-1.5 sm:bottom-2 px-3 sm:px-5 rounded-xl bg-[#1E1D24] hover:bg-[#2C2935] disabled:opacity-50 text-[#FFFDF9] text-xs sm:text-sm font-semibold inline-flex items-center gap-1.5 transition-all duration-200 active:scale-95"
            >
              <span>{lang === 'bg' ? 'Изпрати' : 'Cast Wish'}</span>
              <Send className="w-3.5 h-3.5 text-[#E5B83B]" />
            </button>
          </div>
        </form>

        {submitted && (
          <div className="mt-4 p-3 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] text-[#166534] text-xs font-semibold flex items-center justify-center gap-2 animate-fadeIn max-w-md mx-auto">
            <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
            <span>
              {lang === 'bg'
                ? 'Желанието е записано в звездната карта! Нека се сбъдне!'
                : 'Wish sealed into the Bulgarian constellation! May it manifest soon!'}
            </span>
          </div>
        )}

        {/* Wishes Stamped List */}
        <div className="mt-8 pt-8 border-t border-[#ECE0CF]">
          <h4 className="text-xs font-bold uppercase tracking-widest text-[#8C6700] mb-4 text-center">
            {lang === 'bg' ? 'Записани Желания & Благословии' : 'Vault of Birthday Dreams & Wishes'}
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {wishesList.map((w) => (
              <div 
                key={w.id} 
                className="bg-[#FAF6EE] border border-[#DECBAE]/80 rounded-2xl p-4 shadow-sm relative group hover:border-[#D4AF37] transition-colors"
              >
                <div className="flex items-center justify-between text-xs text-[#8C8275] mb-1.5">
                  <span className="font-semibold text-[#A17415] flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    {w.sender}
                  </span>
                  <span>{w.date}</span>
                </div>
                <p className="text-sm font-medium text-[#1E1D24] italic">
                  "{w.text}"
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

