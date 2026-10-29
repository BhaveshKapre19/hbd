import React from 'react';
import { Sparkles, Sun, Smile, Compass, Trophy } from 'lucide-react';

export default function FriendshipVault({ lang }) {
  const cards = [
    {
      icon: Sun,
      tag: lang === 'bg' ? 'Лъчезарна Душа' : 'Bulgarian Sunshine',
      title: lang === 'bg' ? 'Усмивка, която озарява всичко' : 'A Smile that Brightens the World',
      text: lang === 'bg'
        ? 'От България чак до всяко кътче на света — твоята позитивна енергия, чисто сърце и смях правят всеки разговор незабравим.'
        : 'From Bulgaria across every single mile — your genuine warmth, radiant humor, and positivity turn ordinary days into wonderful memories.',
      accent: '#D4A322',
      bgBadge: '#FAF0DE',
      textColor: '#8C6700',
    },
    {
      icon: Smile,
      tag: lang === 'bg' ? 'Истински Приятел' : 'The Real "Plam Buddy"',
      title: lang === 'bg' ? 'Приятел за милион' : 'One in a Million Friend',
      text: lang === 'bg'
        ? 'Благодарен съм за всяка шега, за всяка подкрепа и за това, че си точно такъв верен и скъп човек.'
        : 'In a busy world, having someone as thoughtful, real, and hilarious as you is a blessing. Grateful for every chat and inside joke!',
      accent: '#C97A7E',
      bgBadge: '#FCECEE',
      textColor: '#9E3F45',
    },
    {
      icon: Trophy,
      tag: lang === 'bg' ? 'Неудържим Устрем' : 'Unstoppable Spirit',
      title: lang === 'bg' ? 'Смелост и постижения' : 'Grace, Ambition & Courage',
      text: lang === 'bg'
        ? 'Възхищавам се на твоята отдаденост, характер и сила. Каквото и да захванеш, го правиш със стил и успех.'
        : 'Whatever goal you pursue, you conquer it with grace and excellence. Watching you succeed is always an inspiration.',
      accent: '#A17415',
      bgBadge: '#FAF0DE',
      textColor: '#8C6700',
    },
    {
      icon: Compass,
      tag: lang === 'bg' ? 'Нова Глава' : 'The Golden Year',
      title: lang === 'bg' ? '365 Дни нови победи' : 'A Toast to Your Best Year Yet',
      text: lang === 'bg'
        ? 'Нека тази година ти донесе вълнуващи пътешествия, сбъднати копнежи, крепко здраве и безброй поводи за наздравици!'
        : 'May this year be overflowing with thrilling adventures, unforgettable celebrations, iron health, and unconditional joy!',
      accent: '#6B1D2F',
      bgBadge: '#F5E8EA',
      textColor: '#6B1D2F',
    },
  ];

  return (
    <section className="py-12 px-4 sm:px-6 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF0DE] text-[#8C6700] text-xs font-semibold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>{lang === 'bg' ? 'Приятелство без граници' : 'Friendship Without Borders'}</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E1D24]">
          {lang === 'bg' ? 'Защо Пламена е толкова специална' : 'Why Plam Buddy is Truly One of a Kind'}
        </h2>

        <p className="mt-2 text-sm sm:text-base text-[#6E685F]">
          {lang === 'bg'
            ? 'Четири от безбройните причини, поради които днес целият свят празнува с теб!'
            : 'Four of countless reasons why today is all about honoring you and your golden spirit!'}
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((c, i) => {
          const Icon = c.icon;
          return (
            <div
              key={i}
              className="luxury-card luxury-card-hover rounded-3xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center border border-[#DECBAE]/50 shadow-sm"
                    style={{ backgroundColor: c.bgBadge }}
                  >
                    <Icon className="w-6 h-6" style={{ color: c.accent }} />
                  </div>
                  <span
                    className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                    style={{ backgroundColor: c.bgBadge, color: c.textColor }}
                  >
                    {c.tag}
                  </span>
                </div>

                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1E1D24] mb-3">
                  {c.title}
                </h3>

                <p className="text-sm sm:text-base text-[#5C574F] leading-relaxed">
                  {c.text}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#ECE0CF] flex items-center justify-between text-xs text-[#8C8275]">
                <span className="font-serif italic font-medium">To Plam with heartfelt admiration</span>
                <span className="text-[#D4AF37]">✦ ✦ ✦</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

