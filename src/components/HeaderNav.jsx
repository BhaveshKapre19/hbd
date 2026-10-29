import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause, MapPin, Sparkles } from 'lucide-react';

export default function HeaderNav({ 
  lang, 
  setLang, 
  isPlaying, 
  onTogglePlay, 
  isMuted, 
  onToggleMute 
}) {
  const [currentTime, setCurrentTime] = useState('');

  // Time in Bulgaria (EET / EEST)
  useEffect(() => {
    const updateTime = () => {
      try {
        const timeStr = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Europe/Sofia',
          hour: '2-digit',
          minute: '2-digit',
        }).format(new Date());
        setCurrentTime(timeStr);
      } catch (e) {
        setCurrentTime('12:00');
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF6EE] border-b border-[#ECE0CF] shadow-sm">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4">
        
        {/* Left: Bulgaria Friendship Badge (No specific city) */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#FFFDF9] border border-[#DECBAE] flex items-center justify-center text-base sm:text-lg shadow-sm">
            🇧🇬
          </div>
          <div>
            <div className="flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs font-semibold text-[#8C6700] uppercase tracking-wider">
              <MapPin className="w-3 h-3 text-[#A17415] shrink-0" />
              <span>Bulgaria {currentTime ? `• ${currentTime}` : ''}</span>
            </div>
            <p className="text-xs sm:text-sm font-serif font-bold text-[#1E1D24] hidden sm:block">
              Plamena's Birthday Celebration
            </p>
          </div>
        </div>

        {/* Center: OG Harry Potter Theme Background Music Controller */}
        <div className="flex items-center gap-2 sm:gap-3 bg-[#FFFDF9] border border-[#DECBAE] px-3 sm:px-4 py-1.5 rounded-full shadow-sm hover:border-[#D4AF37] transition-all">
          <button
            onClick={onTogglePlay}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 active:scale-95 ${
              isPlaying
                ? 'bg-[#1E1D24] text-[#E5B83B] shadow-gold-glow'
                : 'bg-[#FAF6EE] text-[#1E1D24] hover:bg-[#F3EAD7]'
            }`}
            title={isPlaying ? "Pause Harry Potter Theme" : "Play OG Harry Potter Theme"}
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5" />
            ) : (
              <Play className="w-3.5 h-3.5 ml-0.5 text-[#A17415]" />
            )}
          </button>

          <div 
            onClick={onTogglePlay} 
            className="flex flex-col text-left cursor-pointer select-none"
          >
            <div className="flex items-center gap-1.5">
              <span className="text-xs">⚡</span>
              <span className="text-[11px] sm:text-xs font-bold text-[#1E1D24] truncate max-w-[110px] xs:max-w-[140px] sm:max-w-[210px]">
                Harry Potter (Hedwig's Theme)
              </span>
            </div>

            {isPlaying ? (
              <span className="text-[10px] text-[#A17415] font-semibold flex items-center gap-1 leading-none mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] animate-ping" />
                <span className="truncate max-w-[100px] sm:max-w-[190px]">Playing OG Music 🎶</span>
              </span>
            ) : (
              <span className="text-[10px] text-[#8C8275] hidden sm:inline leading-none mt-0.5">
                Tap to Play Original Music ✨
              </span>
            )}
          </div>

          <button
            onClick={onToggleMute}
            className="text-[#8C8275] hover:text-[#1E1D24] p-1 transition-colors"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-[#C92A42]" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Right: Language Switcher (EN / BG) */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          <button
            onClick={() => setLang(lang === 'en' ? 'bg' : 'en')}
            className="inline-flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-[#FFFDF9] border border-[#DECBAE] text-[11px] sm:text-xs font-semibold text-[#1E1D24] hover:bg-[#FAF0DE] transition-colors shadow-sm"
          >
            <span className="text-sm">{lang === 'en' ? '🇧🇬' : '🇬🇧'}</span>
            <span className="hidden sm:inline">{lang === 'en' ? 'Български' : 'English'}</span>
            <span className="sm:hidden">{lang === 'en' ? 'BG' : 'EN'}</span>
          </button>
        </div>

      </div>
    </header>
  );
}
