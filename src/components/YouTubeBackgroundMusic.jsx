import React, { useEffect, useRef, useState } from 'react';

// Hidden Background YouTube Music Player for the OG Harry Potter Soundtrack
// Video ID: WUiI5aQcTow ("Hedwig's Theme" by John Williams)

export default function YouTubeBackgroundMusic({ 
  isPlaying, 
  setIsPlaying, 
  isMuted, 
  setIsMuted,
  playerRefOut 
}) {
  const playerRef = useRef(null);
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  useEffect(() => {
    // 1. Load the YouTube IFrame Player API script if not already loaded
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    // 2. Initialize YouTube Player
    const initPlayer = () => {
      if (!window.YT || !window.YT.Player) return;

      playerRef.current = new window.YT.Player('yt-hidden-music-frame', {
        height: '1',
        width: '1',
        videoId: 'WUiI5aQcTow', // OG Harry Potter Theme
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          enablejsapi: 1,
          fs: 0,
          iv_load_policy: 3,
          loop: 1,
          playlist: 'WUiI5aQcTow', // Loop requirement for YouTube
          modestbranding: 1,
          rel: 0,
          playsinline: 1,
        },
        events: {
          onReady: (event) => {
            setIsPlayerReady(true);
            if (playerRefOut) {
              playerRefOut.current = event.target;
            }
            // Expose globally so buttons anywhere can start it
            window.ytMusicPlayer = event.target;
          },
          onStateChange: (event) => {
            // YT.PlayerState: 1 = PLAYING, 2 = PAUSED, 0 = ENDED
            if (event.data === 1) {
              setIsPlaying(true);
            } else if (event.data === 2) {
              setIsPlaying(false);
            } else if (event.data === 0) {
              // Re-loop
              event.target.playVideo();
            }
          },
          onError: (err) => {
            console.warn("YouTube player notice:", err);
          }
        },
      });
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = () => {
        initPlayer();
      };
    }

    return () => {
      if (playerRef.current && playerRef.current.destroy) {
        try {
          playerRef.current.destroy();
        } catch (e) {
          // ignore
        }
      }
    };
  }, []);

  // Sync mute state
  useEffect(() => {
    if (playerRef.current && isPlayerReady) {
      if (isMuted) {
        playerRef.current.mute?.();
      } else {
        playerRef.current.unMute?.();
      }
    }
  }, [isMuted, isPlayerReady]);

  return (
    <div 
      className="fixed -top-[9999px] -left-[9999px] w-1 h-1 pointer-events-none opacity-0 overflow-hidden" 
      aria-hidden="true"
    >
      <div id="yt-hidden-music-frame" />
    </div>
  );
}

