import React, { useState, useEffect, useRef } from 'react';
import { celebrationAudio } from '../utils/audio';
import { Volume2, VolumeX, Music, Play, Pause, MapPin, ChevronDown, Upload, Disc } from 'lucide-react';

export default function HeaderNav({ lang, setLang }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTag, setCurrentTag] = useState('');
  const [selectedTrack, setSelectedTrack] = useState('harryPotter');
  const [currentTime, setCurrentTime] = useState('');
  const [showTrackMenu, setShowTrackMenu] = useState(false);
  const [customAudioName, setCustomAudioName] = useState('');
  const fileInputRef = useRef(null);
  const audioElemRef = useRef(null);

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

  const handleToggleMusic = () => {
    if (audioElemRef.current && customAudioName) {
      if (isPlaying) {
        audioElemRef.current.pause();
        setIsPlaying(false);
      } else {
        celebrationAudio.stopMusic();
        audioElemRef.current.play();
        setIsPlaying(true);
      }
      return;
    }

    const playing = celebrationAudio.toggleMusic(selectedTrack, (tag) => {
      setCurrentTag(tag);
    });
    setIsPlaying(playing);
    if (!playing) {
      setCurrentTag('');
    }
  };

  const handleSelectTrack = (trackId) => {
    setSelectedTrack(trackId);
    setShowTrackMenu(false);
    if (audioElemRef.current) {
      audioElemRef.current.pause();
      setCustomAudioName('');
    }
    celebrationAudio.changeTrack(trackId, (tag) => {
      setCurrentTag(tag);
    });
    if (!isPlaying) {
      celebrationAudio.startMusic(trackId, (tag) => {
        setCurrentTag(tag);
      });
      setIsPlaying(true);
    }
  };

  const handleCustomAudioUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    celebrationAudio.stopMusic();
    const url = URL.createObjectURL(file);
    if (audioElemRef.current) {
      audioElemRef.current.src = url;
      audioElemRef.current.play();
      setCustomAudioName(file.name.replace(/\.[^/.]+$/, ""));
      setIsPlaying(true);
      setShowTrackMenu(false);
    }
  };

  const handleToggleMute = () => {
    const muted = celebrationAudio.toggleMute();
    setIsMuted(muted);
    if (audioElemRef.current) {
      audioElemRef.current.muted = muted;
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF6EE] border-b border-[#ECE0CF] shadow-sm">
      <audio
        ref={audioElemRef}
        onEnded={() => setIsPlaying(false)}
        className="hidden"
      />
      <input
        type="file"
        ref={fileInputRef}
        accept="audio/*"
        onChange={handleCustomAudioUpload}
        className="hidden"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-3">
        
        {/* Left: Bulgaria Friendship Badge (NO specific city, just Bulgaria) */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-full bg-[#FFFDF9] border border-[#DECBAE] flex items-center justify-center text-lg shadow-sm">
            🇧🇬
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#8C6700] uppercase tracking-wider">
              <MapPin className="w-3 h-3 text-[#A17415]" />
              <span>Bulgaria {currentTime ? `• ${currentTime}` : ''}</span>
            </div>
            <p className="text-sm font-serif font-bold text-[#1E1D24] hidden sm:block">
              Plamena's Birthday Celebration
            </p>
          </div>
        </div>

        {/* Center / Music Player Control with Song Switcher */}
        <div className="relative">
          <div className="flex items-center gap-2 sm:gap-3 bg-[#FFFDF9] border border-[#DECBAE] px-3 sm:px-4 py-1.5 rounded-full shadow-sm">
            <button
              onClick={handleToggleMusic}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                isPlaying
                  ? 'bg-[#1E1D24] text-[#E5B83B]'
                  : 'bg-[#FAF6EE] text-[#1E1D24] hover:bg-[#F3EAD7]'
              }`}
              title={isPlaying ? "Pause Celebration Song" : "Play Celebration Song"}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
            </button>

            <button
              onClick={() => setShowTrackMenu(!showTrackMenu)}
              className="flex flex-col text-left hover:opacity-80 transition-opacity"
            >
              <div className="flex items-center gap-1">
                <Music className="w-3 h-3 text-[#A17415] shrink-0" />
                <span className="text-[11px] sm:text-xs font-semibold text-[#1E1D24] truncate max-w-[80px] xs:max-w-[120px] sm:max-w-[170px]">
                  {customAudioName || celebrationAudio.getCurrentTrackTitle()}
                </span>
                <ChevronDown className="w-3 h-3 text-[#8C8275] shrink-0" />
              </div>

              {currentTag ? (
                <span className="text-[11px] font-handwriting text-[#A17415] font-bold animate-pulse leading-none truncate max-w-[150px]">
                  {currentTag}
                </span>
              ) : (
                <span className="text-[10px] text-[#8C8275] hidden sm:inline leading-none">
                  {isPlaying ? "Playing for Plam..." : "Change Song / Tap to Play"}
                </span>
              )}
            </button>

            <button
              onClick={handleToggleMute}
              className="text-[#8C8275] hover:text-[#1E1D24] p-1 transition-colors"
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Song Selection Dropdown */}
          {showTrackMenu && (
            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-64 bg-[#FFFDF9] border border-[#DECBAE] rounded-2xl shadow-luxury p-2 z-50 animate-fadeIn">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#8C6700] px-3 py-1">
                Choose Celebration Song
              </p>

              <button
                onClick={() => handleSelectTrack('harryPotter')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition-colors ${
                  selectedTrack === 'harryPotter' && !customAudioName
                    ? 'bg-[#FAF0DE] text-[#8C6700] font-bold'
                    : 'text-[#1E1D24] hover:bg-[#FAF6EE]'
                }`}
              >
                <span className="flex items-center gap-2">
                  <span className="text-sm">⚡</span>
                  <span>Harry Potter (Hedwig's Theme)</span>
                </span>
                <span className="text-[10px] text-[#A17415] font-semibold">Magical</span>
              </button>

              <button
                onClick={() => handleSelectTrack('serenade')}
                className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition-colors ${
                  selectedTrack === 'serenade' && !customAudioName
                    ? 'bg-[#FAF0DE] text-[#8C6700] font-bold'
                    : 'text-[#1E1D24] hover:bg-[#FAF6EE]'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Disc className="w-3.5 h-3.5 text-[#D4A322]" />
                  <span>Serenade for Plam</span>
                </span>
                <span className="text-[10px] text-[#8C8275]">Acoustic</span>
              </button>

              <div className="border-t border-[#ECE0CF] my-1" />

              <button
                onClick={() => fileInputRef.current?.click()}
                className="w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-[#1E1D24] hover:bg-[#FAF6EE] flex items-center gap-2 transition-colors"
              >
                <Upload className="w-3.5 h-3.5 text-[#A17415]" />
                <span>Upload Custom MP3 / Song</span>
              </button>
            </div>
          )}
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
