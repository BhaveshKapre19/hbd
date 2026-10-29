import React from 'react';
import { celebrationAudio } from '../utils/audio';
import { Sparkles, Heart, BellRing, GlassWater } from 'lucide-react';

export default function BulgarianGreetings({ lang }) {
  const greetings = [
    {
      bg: "Честит Рожден Ден, скъпа Пламена!",
      en: "Happy Birthday, dear Plamena!",
      sub: "The classic heartfelt Bulgarian celebration blessing.",
      icon: "🎂"
    },
    {
      bg: "Да си жива, здрава, щастлива и все така лъчезарна!",
      en: "May you be healthy, vibrant, endlessly happy, and radiant!",
      sub: "Traditional Bulgarian wish for vitality and lifelong joy.",
      icon: "🌟"
    },
    {
      bg: "Нека всяка твоя мечта намери своя път към теб!",
      en: "May every one of your dreams find its path to you!",
      sub: "A wish for luck, success, and unstoppable achievements.",
      icon: "✨"
    },
    {
      bg: "Наздраве за Plam buddy и за най-хубавата година напред!",
      en: "Cheers to Plam buddy and the greatest year ahead!",
      sub: "A toast to cherished friendship across the miles.",
      icon: "🥂"
    }
  ];

  const handleCardClick = () => {
    celebrationAudio.playSparkleChime();
  };

  return (
    <section className="py-12 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF0DE] text-[#8C6700] text-xs font-semibold uppercase tracking-wider mb-2">
          <span>🇧🇬</span>
          <span>{lang === 'bg' ? 'Български Традиции' : 'Bulgarian Blessings'}</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E1D24]">
          {lang === 'bg' ? 'Благопожелания за Рожден Ден' : 'Traditional Bulgarian Birthday Wishes'}
        </h2>

        <p className="mt-2 text-sm sm:text-base text-[#6E685F]">
          {lang === 'bg'
            ? 'Натисни върху всяко пожелание, за да чуеш празничния камбанен звън!'
            : 'Tap any blessing card below to play a celebratory chime for Plam!'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {greetings.map((g, idx) => (
          <div
            key={idx}
            onClick={handleCardClick}
            className="luxury-card luxury-card-hover rounded-2xl p-6 cursor-pointer border border-[#DECBAE] relative group select-none"
          >
            <div className="flex items-start gap-4">
              <span className="text-3xl p-2.5 rounded-xl bg-[#FAF6EE] border border-[#ECE0CF] group-hover:scale-110 transition-transform">
                {g.icon}
              </span>
              <div className="flex-1">
                <p className="font-serif text-lg sm:text-xl font-bold text-[#1E1D24] group-hover:text-[#A17415] transition-colors">
                  {g.bg}
                </p>
                <p className="text-sm font-medium text-[#7A5A12] mt-1 italic">
                  "{g.en}"
                </p>
                <p className="text-xs text-[#8C8275] mt-2">
                  {g.sub}
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#ECE0CF]/60 flex items-center justify-between text-[11px] text-[#A17415] font-semibold">
              <span className="flex items-center gap-1">
                <BellRing className="w-3 h-3" />
                Tap to ring chime
              </span>
              <span className="text-[#8C8275]">Bulgaria 🇧🇬</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

