// Polyphonic Acoustic Celebration Synthesizer & Audio Engine
// Provides lush, cinematic, heartwarming musical arrangements + custom audio support!

class CelebrationAudioManager {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.currentTrackId = 'serenade'; // 'serenade', 'waltz', 'golden'
    this.currentStep = 0;
    this.loopTimer = null;
    this.volume = 0.65;
    this.isMuted = false;
    this.customAudio = null;
    this.onProgressCallback = null;

    // Track definitions
    this.tracks = {
      // TRACK 1: "Serenade for Plam" - Emotional, heartwarming cinematic melody
      serenade: {
        title: "Serenade for Plam",
        tempo: 96,
        timeSignature: 4,
        steps: [
          // Bar 1: D Major (Warm, inspiring opening)
          { bass: 146.83, chord: [293.66, 369.99, 440.00], lead: 587.33, tag: "For Plam ✨" }, // D3, D4-F#4-A4, D5
          { chord: [369.99, 440.00], lead: 554.37 }, // C#5
          { chord: [293.66, 440.00], lead: 493.88 }, // B4
          { chord: [369.99, 440.00], lead: 440.00 }, // A4

          // Bar 2: A Major (Gentle, radiant)
          { bass: 110.00, chord: [277.18, 329.63, 440.00], lead: 493.88, tag: "Bulgarian Sunshine ☀️" }, // A2, C#4-E4-A4, B4
          { chord: [329.63, 440.00], lead: 440.00 }, // A4
          { chord: [277.18, 440.00], lead: 392.00 }, // G4
          { chord: [329.63, 440.00], lead: 440.00 }, // A4

          // Bar 3: B Minor (Touching, heartfelt depth)
          { bass: 123.47, chord: [293.66, 369.99, 440.00], lead: 493.88, tag: "Best Friend Ever 💖" }, // B2, D4-F#4-A4, B4
          { chord: [369.99, 493.88], lead: 587.33 }, // D5
          { chord: [293.66, 493.88], lead: 659.25 }, // E5
          { chord: [369.99, 493.88], lead: 587.33 }, // D5

          // Bar 4: F# Minor / A Major (Elevating)
          { bass: 92.50, chord: [277.18, 369.99, 440.00], lead: 554.37, tag: "Laughter & Joy 🥂" }, // F#2, C#4-F#4-A4, C#5
          { chord: [369.99, 440.00], lead: 493.88 }, // B4
          { chord: [277.18, 440.00], lead: 440.00 }, // A4
          { chord: [369.99, 440.00], lead: 392.00 }, // G4

          // Bar 5: G Major (Climactic warmth)
          { bass: 98.00, chord: [293.66, 392.00, 493.88], lead: 440.00, tag: "Golden Year Ahead 🌟" }, // G2, D4-G4-B4, A4
          { chord: [392.00, 493.88], lead: 493.88 }, // B4
          { chord: [293.66, 493.88], lead: 587.33 }, // D5
          { chord: [392.00, 493.88], lead: 659.25 }, // E5

          // Bar 6: D Major (Triumphant)
          { bass: 146.83, chord: [293.66, 369.99, 440.00], lead: 739.99, tag: "Happy Birthday! 👑" }, // D3, F#5
          { chord: [369.99, 440.00], lead: 659.25 }, // E5
          { chord: [293.66, 440.00], lead: 587.33 }, // D5
          { chord: [369.99, 440.00], lead: 554.37 }, // C#5

          // Bar 7: G Major to A Major (Resolution build)
          { bass: 98.00, chord: [293.66, 392.00, 493.88], lead: 493.88, tag: "Cheers, Plam Buddy! 🥂" }, // B4
          { chord: [392.00, 493.88], lead: 587.33 }, // D5
          { bass: 110.00, chord: [277.18, 329.63, 440.00], lead: 659.25 }, // E5
          { chord: [329.63, 440.00], lead: 554.37 }, // C#5

          // Bar 8: Final Golden Ring
          { bass: 146.83, chord: [293.66, 369.99, 440.00, 587.33], lead: 587.33, tag: "Celebrate Today! ✨" },
          { chord: [369.99, 440.00], lead: 0 },
          { chord: [293.66, 369.99], lead: 0 },
          { chord: [293.66, 440.00], lead: 0 },
        ]
      },

      // TRACK 2: "Golden Friendship Waltz" - Elegant, Parisian & Balkan-tinged luxury 3/4 waltz
      waltz: {
        title: "Golden Friendship Waltz",
        tempo: 120,
        timeSignature: 3,
        steps: [
          // Measure 1: C Major
          { bass: 130.81, chord: [261.63, 329.63, 392.00], lead: 523.25, tag: "A Toast to You 🥂" },
          { chord: [329.63, 392.00], lead: 0 },
          { chord: [329.63, 392.00], lead: 587.33 },

          // Measure 2: E Minor
          { bass: 164.81, chord: [329.63, 392.00, 493.88], lead: 659.25, tag: "Sparkle & Smile ✨" },
          { chord: [392.00, 493.88], lead: 0 },
          { chord: [392.00, 493.88], lead: 587.33 },

          // Measure 3: F Major
          { bass: 174.61, chord: [261.63, 349.23, 440.00], lead: 523.25, tag: "Cherished Moments 💖" },
          { chord: [349.23, 440.00], lead: 0 },
          { chord: [349.23, 440.00], lead: 493.88 },

          // Measure 4: G Major
          { bass: 196.00, chord: [293.66, 392.00, 493.88], lead: 440.00, tag: "Always By Your Side 🌟" },
          { chord: [392.00, 493.88], lead: 392.00 },
          { chord: [293.66, 493.88], lead: 493.88 },

          // Measure 5: A Minor
          { bass: 110.00, chord: [261.63, 329.63, 440.00], lead: 523.25, tag: "Plam Buddy 👑" },
          { chord: [329.63, 440.00], lead: 587.33 },
          { chord: [329.63, 440.00], lead: 659.25 },

          // Measure 6: D Minor
          { bass: 146.83, chord: [293.66, 349.23, 440.00], lead: 698.46, tag: "Laugh Without Limits 😄" },
          { chord: [349.23, 440.00], lead: 659.25 },
          { chord: [349.23, 440.00], lead: 587.33 },

          // Measure 7: G7
          { bass: 196.00, chord: [293.66, 392.00, 466.16], lead: 523.25, tag: "Make It Magical! 🎉" },
          { chord: [392.00, 466.16], lead: 493.88 },
          { chord: [293.66, 493.88], lead: 440.00 },

          // Measure 8: C Major (Resolve)
          { bass: 130.81, chord: [261.63, 329.63, 392.00, 523.25], lead: 523.25, tag: "Cheers, Plamena! 🥂" },
          { chord: [329.63, 392.00], lead: 0 },
          { chord: [261.63, 392.00], lead: 0 },
        ]
      },

      // TRACK 3: "Bulgarian Rose Celebration" - Upbeat, rhythmic, joyous folk-pop energy
      golden: {
        title: "Bulgarian Rose Celebration",
        tempo: 124,
        timeSignature: 4,
        steps: [
          { bass: 220.00, chord: [329.63, 440.00, 554.37], lead: 659.25, tag: "Честит Рожден Ден! 🌹" },
          { chord: [440.00, 554.37], lead: 739.99 },
          { bass: 220.00, chord: [329.63, 440.00], lead: 659.25 },
          { chord: [440.00, 554.37], lead: 554.37 },

          { bass: 196.00, chord: [293.66, 392.00, 493.88], lead: 587.33, tag: "Здраве и радост! 🌟" },
          { chord: [392.00, 493.88], lead: 659.25 },
          { bass: 196.00, chord: [293.66, 392.00], lead: 587.33 },
          { chord: [392.00, 493.88], lead: 493.88 },

          { bass: 174.61, chord: [261.63, 349.23, 440.00], lead: 523.25, tag: "Празнувай днес! 🎂" },
          { chord: [349.23, 440.00], lead: 587.33 },
          { bass: 174.61, chord: [261.63, 349.23], lead: 523.25 },
          { chord: [349.23, 440.00], lead: 440.00 },

          { bass: 164.81, chord: [329.63, 415.30, 493.88], lead: 493.88, tag: "Наздраве, Плам! 🥂" },
          { chord: [415.30, 493.88], lead: 554.37 },
          { chord: [329.63, 493.88], lead: 659.25 },
          { chord: [415.30, 493.88], lead: 830.61 },
        ]
      }
    };
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playAcousticNote(freq, type = 'lead', duration = 0.8) {
    if (!this.ctx || this.isMuted || freq <= 0) return;

    const now = this.ctx.currentTime;
    const masterGain = this.ctx.createGain();

    const voiceVol = type === 'bass' ? 0.35 : type === 'chord' ? 0.16 : 0.32;
    masterGain.gain.setValueAtTime(this.volume * voiceVol, now);
    masterGain.connect(this.ctx.destination);

    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = type === 'bass' ? 'triangle' : 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    gain1.gain.setValueAtTime(0.01, now);
    gain1.gain.linearRampToValueAtTime(0.9, now + 0.04);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc1.connect(gain1);
    gain1.connect(masterGain);
    osc1.start(now);
    osc1.stop(now + duration);

    if (type !== 'bass') {
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 2, now);

      gain2.gain.setValueAtTime(0.01, now);
      gain2.gain.linearRampToValueAtTime(0.35, now + 0.02);
      gain2.gain.exponentialRampToValueAtTime(0.0001, now + duration * 0.65);

      osc2.connect(gain2);
      gain2.connect(masterGain);
      osc2.start(now);
      osc2.stop(now + duration * 0.65);
    }
  }

  playStep() {
    if (!this.isPlaying) return;

    const track = this.tracks[this.currentTrackId];
    if (!track) return;

    const step = track.steps[this.currentStep];
    const beatDurationMs = (60 / track.tempo) * 1000;

    if (step.bass) {
      this.playAcousticNote(step.bass, 'bass', (beatDurationMs / 1000) * 1.8);
    }

    if (step.chord && Array.isArray(step.chord)) {
      step.chord.forEach((noteFreq, idx) => {
        setTimeout(() => {
          this.playAcousticNote(noteFreq, 'chord', (beatDurationMs / 1000) * 1.4);
        }, idx * 15);
      });
    }

    if (step.lead && step.lead > 0) {
      this.playAcousticNote(step.lead, 'lead', (beatDurationMs / 1000) * 1.6);
    }

    if (this.onProgressCallback && step.tag) {
      this.onProgressCallback(step.tag);
    }

    this.currentStep = (this.currentStep + 1) % track.steps.length;

    this.loopTimer = setTimeout(() => {
      this.playStep();
    }, beatDurationMs);
  }

  startMusic(trackId = null, onProgress = null) {
    this.initContext();
    if (trackId && this.tracks[trackId]) {
      this.currentTrackId = trackId;
    }
    if (onProgress) {
      this.onProgressCallback = onProgress;
    }
    this.isPlaying = true;
    this.currentStep = 0;

    if (this.loopTimer) {
      clearTimeout(this.loopTimer);
    }

    this.playStep();
    return true;
  }

  stopMusic() {
    this.isPlaying = false;
    if (this.loopTimer) {
      clearTimeout(this.loopTimer);
      this.loopTimer = null;
    }
    if (this.customAudio) {
      this.customAudio.pause();
    }
  }

  toggleMusic(trackId = null, onProgress = null) {
    if (this.isPlaying) {
      this.stopMusic();
      return false;
    } else {
      return this.startMusic(trackId, onProgress);
    }
  }

  changeTrack(trackId, onProgress = null) {
    this.currentTrackId = trackId;
    this.currentStep = 0;
    if (onProgress) {
      this.onProgressCallback = onProgress;
    }
    if (this.isPlaying) {
      if (this.loopTimer) clearTimeout(this.loopTimer);
      this.playStep();
    }
  }

  getCurrentTrackTitle() {
    return this.tracks[this.currentTrackId]?.title || "Celebration Serenade";
  }

  playBlowingSound() {
    this.initContext();
    if (!this.ctx || this.isMuted) return;

    const now = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 0.7;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(750, now);
    filter.frequency.exponentialRampToValueAtTime(140, now + 0.7);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(this.volume * 0.7, now + 0.2);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(now);
    noise.stop(now + 0.7);
  }

  playPopSound() {
    this.initContext();
    if (!this.ctx || this.isMuted) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(340, now);
    osc.frequency.exponentialRampToValueAtTime(60, now + 0.12);

    gain.gain.setValueAtTime(this.volume * 0.8, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.12);

    this.playSparkleChime();
  }

  playSparkleChime() {
    this.initContext();
    if (!this.ctx || this.isMuted) return;

    const chords = [1046.50, 1318.51, 1567.98, 2093.00];
    chords.forEach((freq, idx) => {
      setTimeout(() => {
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(this.volume * 0.22, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.45);
      }, idx * 60);
    });
  }

  playCheerFanfare() {
    this.initContext();
    if (!this.ctx || this.isMuted) return;

    const notes = [
      { freq: 523.25, time: 0, dur: 0.2 },
      { freq: 659.25, time: 0.15, dur: 0.2 },
      { freq: 783.99, time: 0.3, dur: 0.3 },
      { freq: 1046.50, time: 0.5, dur: 0.8 },
    ];

    notes.forEach(n => {
      setTimeout(() => {
        this.playAcousticNote(n.freq, 'lead', n.dur * 1.8);
      }, n.time * 1000);
    });
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }
}

export const celebrationAudio = new CelebrationAudioManager();
