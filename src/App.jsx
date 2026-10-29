import React, { useState, useRef } from 'react';
import StarsBackground3D from './components/StarsBackground3D';
import HeaderNav from './components/HeaderNav';
import HeroSection from './components/HeroSection';
import FloatingBalloons3D from './components/FloatingBalloons3D';
import MakeAWish from './components/MakeAWish';
import FriendshipVault from './components/FriendshipVault';
import PersonalLetter from './components/PersonalLetter';
import BulgarianGreetings from './components/BulgarianGreetings';
import CelebrationFooter from './components/CelebrationFooter';
import YouTubeBackgroundMusic from './components/YouTubeBackgroundMusic';

export default function App() {
  const [lang, setLang] = useState('en'); // 'en' or 'bg'
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const ytPlayerRef = useRef(null);

  const handleTogglePlay = () => {
    const player = ytPlayerRef.current || window.ytMusicPlayer;
    if (player) {
      if (isPlayingMusic) {
        player.pauseVideo?.();
        setIsPlayingMusic(false);
      } else {
        player.playVideo?.();
        setIsPlayingMusic(true);
      }
    }
  };

  const handleToggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  const handleCandleBlown = () => {
    // If music isn't playing yet, auto-start the OG theme on candle blow!
    const player = ytPlayerRef.current || window.ytMusicPlayer;
    if (player && !isPlayingMusic) {
      player.playVideo?.();
      setIsPlayingMusic(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#242220] relative overflow-x-hidden selection:bg-[#E5B83B]/20 selection:text-[#7A5A12]">
      {/* Hidden YouTube Background Audio Player (WUiI5aQcTow) */}
      <YouTubeBackgroundMusic
        isPlaying={isPlayingMusic}
        setIsPlaying={setIsPlayingMusic}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        playerRefOut={ytPlayerRef}
      />

      {/* 3D Celestial Ambient Stars (Background) */}
      <StarsBackground3D />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Top Navigation & OG Harry Potter Music Player */}
        <HeaderNav 
          lang={lang} 
          setLang={setLang}
          isPlaying={isPlayingMusic}
          onTogglePlay={handleTogglePlay}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
        />

        {/* Hero Section with 3D Interactive Birthday Cake */}
        <HeroSection 
          lang={lang} 
          onCandleBlownExtra={handleCandleBlown}
        />

        {/* 3D Floating Metallic Balloons Canopy */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 w-full my-6">
          <FloatingBalloons3D />
        </div>

        {/* Make a Birthday Wish Ritual */}
        <MakeAWish lang={lang} />

        {/* Friendship Vault / Reasons Plam is Amazing */}
        <FriendshipVault lang={lang} />

        {/* Sealed Personal Letter with Gold Wax Seal */}
        <PersonalLetter lang={lang} />

        {/* Bulgarian Birthday Traditions & Chimes */}
        <BulgarianGreetings lang={lang} />

        {/* Grand Toast & Celebration Footer */}
        <CelebrationFooter lang={lang} />
      </div>
    </div>
  );
}
