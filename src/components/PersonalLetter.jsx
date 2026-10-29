import React, { useState } from 'react';
import { celebrationAudio } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Mail, Edit3, Check, Heart, Sparkles } from 'lucide-react';

export default function PersonalLetter({ lang }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [customLetter, setCustomLetter] = useState(
    `Dear Plam buddy,\n\nHappy Birthday! Today belongs completely to you. Even though distance separates us and you are all the way in Bulgaria, having a friend like you makes the world feel small, warm, and full of light.\n\nThank you for always being the most authentic, funny, and supportive person. You have this rare spark that lifts everyone around you. Watching your journey, your humor, and your kindness is a reminder of how lucky I am to call you my friend.\n\nOn this birthday, I wish you endless happiness, sparkling adventures, iron health, and the courage to chase down every dream you've ever held in your heart.\n\nEat lots of cake, laugh until your stomach hurts, and celebrate like the queen you are!\n\nAlways cheering for you,\nYour Buddy 🥂✨`
  );

  const handleOpenEnvelope = () => {
    celebrationAudio.playSparkleChime();
    setIsOpen(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#D4AF37', '#DF9C9D', '#F4ECE0'],
    });
  };

  return (
    <section className="py-12 px-4 sm:px-6 max-w-4xl mx-auto">
      <div className="text-center max-w-xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF0DE] text-[#8C6700] text-xs font-semibold uppercase tracking-wider mb-2">
          <Mail className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>{lang === 'bg' ? 'Специално Писмо' : 'Personal Stationery'}</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#1E1D24]">
          {lang === 'bg' ? 'Отвори своето писмо, Плам!' : 'A Sealed Letter for Plam Buddy'}
        </h2>

        <p className="mt-2 text-sm text-[#6E685F]">
          {lang === 'bg'
            ? 'Лично послание, запечатано с восъчен печат, специално за твоя рожден ден.'
            : 'Click the wax seal below to break the seal and unfold your birthday letter.'}
        </p>
      </div>

      {!isOpen ? (
        /* Envelope with Wax Seal */
        <div
          onClick={handleOpenEnvelope}
          className="cursor-pointer max-w-lg mx-auto bg-[#F7EFE4] hover:bg-[#F2E7D8] border-2 border-[#D4AF37]/50 rounded-2xl p-6 sm:p-14 text-center shadow-luxury transition-all duration-300 hover:scale-[1.02] relative group"
        >
          {/* Subtle Envelope Flap Line */}
          <div className="absolute top-0 left-0 right-0 h-1/2 border-b border-[#D4AF37]/30 pointer-events-none" />

          {/* Golden Wax Seal */}
          <div className="relative z-10 w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-[#AA7B12] via-[#D4A322] to-[#81590A] flex items-center justify-center shadow-lg border-2 border-[#FEF9E7]/80 group-hover:scale-110 transition-transform duration-300">
            <span className="font-serif text-3xl font-black text-[#FFFDF9] tracking-wider drop-shadow">
              P
            </span>
          </div>

          <div className="mt-6 relative z-10">
            <p className="font-serif text-xl font-bold text-[#1E1D24]">
              For Plamena (Plam Buddy)
            </p>
            <p className="text-xs uppercase tracking-widest text-[#8C6700] font-semibold mt-1 flex items-center justify-center gap-1.5">
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
              <span>Tap the Wax Seal to Open</span>
              <Sparkles className="w-3 h-3 text-[#D4AF37]" />
            </p>
          </div>
        </div>
      ) : (
        /* Unfolded Letter on Luxury Linen Parchment */
        <div className="luxury-card rounded-3xl p-6 sm:p-12 border-2 border-[#DECBAE] shadow-luxury relative animate-fadeIn">
          {/* Top Stamp & Date */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#ECE0CF] pb-4 mb-6 gap-2">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-[#FAF0DE] border border-[#DECBAE] flex items-center justify-center text-sm font-serif font-bold text-[#8C6700]">
                P
              </span>
              <div>
                <p className="font-serif text-base font-bold text-[#1E1D24]">
                  To: Plamena ("Plam buddy")
                </p>
                <p className="text-xs text-[#8C8275]">Bulgaria • 29 October</p>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(!isEditing)}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#8C6700] hover:text-[#1E1D24] px-3 py-1.5 rounded-lg bg-[#FAF6EE] border border-[#DECBAE] transition-colors self-start sm:self-auto"
            >
              {isEditing ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#16A34A]" />
                  <span>Done Editing</span>
                </>
              ) : (
                <>
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Personalize Letter</span>
                </>
              )}
            </button>
          </div>

          {/* Letter Body */}
          {isEditing ? (
            <textarea
              value={customLetter}
              onChange={(e) => setCustomLetter(e.target.value)}
              rows={12}
              className="w-full p-4 rounded-xl bg-[#FFFDF9] border border-[#D4AF37] text-[#1E1D24] font-sans text-sm sm:text-base leading-relaxed focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/30"
            />
          ) : (
            <div className="font-sans text-base sm:text-lg text-[#33302B] leading-relaxed whitespace-pre-line tracking-normal">
              {customLetter}
            </div>
          )}

          {/* Letter Footer Signature */}
          <div className="mt-8 pt-6 border-t border-[#ECE0CF] flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-[#8C8275]">
              <Heart className="w-4 h-4 text-[#C97A7E] fill-current" />
              <span>Stamped with warm friendship & joy</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-xs text-[#8C8275] hover:text-[#1E1D24] underline"
            >
              Fold Letter
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

