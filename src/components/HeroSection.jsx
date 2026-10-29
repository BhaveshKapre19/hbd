import React, { useState } from 'react';
import BirthdayCake3D from './BirthdayCake3D';
import ConfettiBlaster from './ConfettiBlaster';
import { Sparkles, Heart, Crown, Calendar, Star } from 'lucide-react';

export default function HeroSection({ lang, onCandleBlownExtra }) {
  const [candlesBlownCount, setCandlesBlownCount] = useState(0);

  const handleCandlesBlown = () => {
    setCandlesBlownCount((prev) => prev + 1);
    if (onCandleBlownExtra) {
      onCandleBlownExtra();
    }
  };

  return (
    <section className="relative pt-8 pb-14 px-4 sm:px-6 max-w-6xl mx-auto text-center">
      {/* Top Royal Monogram & Tag */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFFDF9] border border-[#D4AF37]/50 shadow-sm mb-6 animate-fadeIn">
        <Crown className="w-4 h-4 text-[#D4AF37]" />
        <span className="text-xs font-semibold uppercase tracking-widest text-[#8C6700]">
          {lang === 'bg' ? 'Специален Ден в България' : 'Special Day in Bulgaria'} • 29 October
        </span>
        <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
      </div>

      {/* Main Luxury Title */}
      <h1 className="font-serif text-3xl sm:text-5xl md:text-7xl font-bold tracking-tight text-[#1E1D24] leading-[1.18] max-w-4xl mx-auto">
        {lang === 'bg' ? (
          <>
            Честит Рожден Ден, <br className="hidden sm:inline" />
            <span className="gold-gradient-text italic font-normal">Пламена!</span>
          </>
        ) : (
          <>
            Happy Birthday, <br className="hidden sm:inline" />
            <span className="gold-gradient-text italic font-normal">Plamena!</span>
          </>
        )}
      </h1>

      {/* Nickname Banner */}
      <div className="mt-3 flex items-center justify-center gap-2">
        <span className="font-handwriting text-2xl sm:text-3xl text-[#C97A7E] font-bold">
          {lang === 'bg' ? 'За най-прекрасната Plam buddy ✨' : 'To the one and only Plam buddy ✨'}
        </span>
      </div>

      {/* Warm Subtitle */}
      <p className="mt-4 text-base sm:text-lg text-[#605B54] max-w-2xl mx-auto font-normal leading-relaxed">
        {lang === 'bg' ? (
          'Изпращам ти най-топлите прегръдки и пожелания чак до България. Нека този ден бъде толкова светъл, блестящ и невероятен, колкото си ти!'
        ) : (
          'Sending the warmest hugs and golden wishes all the way to Bulgaria. May your special day be filled with endless joy, laughter, and every dream you cherish coming true!'
        )}
      </p>

      {/* Confetti Quick Buttons */}
      <div className="mt-4">
        <ConfettiBlaster />
      </div>

      {/* 3D Birthday Cake Stage */}
      <div className="mt-6 relative max-w-3xl mx-auto bg-[#FFFDF9] rounded-2xl sm:rounded-3xl p-3 sm:p-8 gold-foil-border shadow-luxury">
        {/* Corner Flourishes */}
        <div className="absolute top-4 left-4 text-[#D4AF37]/30 text-xs select-none">✦</div>
        <div className="absolute top-4 right-4 text-[#D4AF37]/30 text-xs select-none">✦</div>
        <div className="absolute bottom-4 left-4 text-[#D4AF37]/30 text-xs select-none">✦</div>
        <div className="absolute bottom-4 right-4 text-[#D4AF37]/30 text-xs select-none">✦</div>

        {/* Cake Header Tag */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
          <span className="text-xs uppercase tracking-widest text-[#8C6700] font-semibold">
            {lang === 'bg' ? 'Интерактивна 3D Рожденическа Торта' : 'Interactive 3D Artisanal Cake'}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
        </div>

        {/* 3D Cake Canvas Component */}
        <BirthdayCake3D onCandlesBlown={handleCandlesBlown} />

        {/* Post Blow Banner */}
        {candlesBlownCount > 0 && (
          <div className="mt-4 p-4 rounded-2xl bg-[#FAF0DE] border border-[#DECBAE] text-center animate-fadeIn">
            <p className="font-serif text-lg font-bold text-[#1E1D24] flex items-center justify-center gap-2">
              <Star className="w-5 h-5 text-[#D4A322] fill-[#D4A322]" />
              <span>
                {lang === 'bg'
                  ? 'Честито! Твоето желание пътува към звездите!'
                  : 'Wish Granted! Your dream is on its way to the stars!'}
              </span>
              <Star className="w-5 h-5 text-[#D4A322] fill-[#D4A322]" />
            </p>
            <p className="text-xs text-[#705E3E] mt-1 font-medium">
              {lang === 'bg'
                ? 'Бъди все така лъчезарна, вдъхновяваща и обичана, скъпа Плам!'
                : 'May this new year of your life be blessed with health, unconditional joy, and endless victories!'}
            </p>
          </div>
        )}
      </div>

      {/* Birthday Highlights Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-8">
        <div className="luxury-card rounded-2xl p-4 text-center">
          <span className="text-2xl block mb-1">🇧🇬</span>
          <p className="font-serif text-lg font-bold text-[#1E1D24]">Bulgarian Gem</p>
          <p className="text-xs text-[#7A746B] mt-0.5">Radiance from Bulgaria</p>
        </div>

        <div className="luxury-card rounded-2xl p-4 text-center">
          <span className="text-2xl block mb-1">👑</span>
          <p className="font-serif text-lg font-bold text-[#1E1D24]">Plam Buddy</p>
          <p className="text-xs text-[#7A746B] mt-0.5">Best Friend in the world</p>
        </div>

        <div className="luxury-card rounded-2xl p-4 text-center">
          <span className="text-2xl block mb-1">✨</span>
          <p className="font-serif text-lg font-bold text-[#1E1D24]">100% Sunshine</p>
          <p className="text-xs text-[#7A746B] mt-0.5">Infectious laughter</p>
        </div>

        <div className="luxury-card rounded-2xl p-4 text-center">
          <span className="text-2xl block mb-1">🥂</span>
          <p className="font-serif text-lg font-bold text-[#1E1D24]">New Chapter</p>
          <p className="text-xs text-[#7A746B] mt-0.5">365 Golden Days Ahead</p>
        </div>
      </div>
    </section>
  );
}

