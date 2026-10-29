// Magical Celesta & Orchestral Audio Engine
// Harry Potter - Hedwig's Theme by John Williams (Acoustic Celesta Synthesizer)

class CelebrationAudioManager {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.currentTrackId = 'harryPotter'; // Default: Harry Potter Hedwig's Theme
    this.currentStep = 0;
    this.loopTimer = null;
    this.volume = 0.7;
    this.isMuted = false;
    this.customAudio = null;
    this.onProgressCallback = null;

    // Hedwig's Theme (Harry Potter) accurately transcribed for Celesta
    // Standard key: E minor
    // B4=493.88, D#5=622.25, E5=659.25, F5=698.46, F#5=739.99, G5=783.99, G#5=830.61, A5=880.00, A#5=932.33, B5=987.77, C6=1046.50, C#6=1108.73, D6=1174.66
    this.tracks = {
      harryPotter: {
        title: "⚡ Harry Potter - Hedwig's Theme",
        tempo: 120, // 3/8 feel
        steps: [
          // Mystery drone start & Pickup
          { drone: 82.41, lead: 493.88, dur: 1.0, tag: "⚡ Hedwig's Theme" }, // B4

          // Phrase 1: E -> G -> F# -> E -> B -> A -> F#
          { drone: 82.41, lead: 659.25, dur: 1.5, tag: "✨ Welcome to Hogwarts" }, // E5
          { drone: 82.41, lead: 783.99, dur: 0.75 }, // G5
          { drone: 82.41, lead: 739.99, dur: 0.75 }, // F#5
          { drone: 82.41, lead: 659.25, dur: 1.5, tag: "🏰 The Great Hall" }, // E5
          { drone: 82.41, lead: 987.77, dur: 1.0 }, // B5
          { drone: 110.00, lead: 880.00, dur: 2.25, tag: "🪄 Lumos Maxima" }, // A5 (A minor pad)
          { drone: 92.50, lead: 739.99, dur: 2.5, tag: "🦉 Owl Post for Plam" }, // F#5

          // Phrase 2: E -> G -> F# -> D# -> F -> B
          { drone: 82.41, lead: 659.25, dur: 1.5, tag: "✨ Pure Magic" }, // E5
          { drone: 82.41, lead: 783.99, dur: 0.75 }, // G5
          { drone: 82.41, lead: 739.99, dur: 0.75 }, // F#5
          { drone: 77.78, lead: 622.25, dur: 1.5, tag: "🔮 Secret Spells" }, // D#5
          { drone: 77.78, lead: 698.46, dur: 0.8 }, // F5
          { drone: 123.47, lead: 493.88, dur: 2.5, tag: "⭐ Hogwarts Express" }, // B4 (B drone)
          { drone: 123.47, lead: 0, dur: 0.6 }, // breath pause

          // Phrase 3: B -> E -> G -> F# -> E -> B -> D6 -> C#6 -> C6 -> G#5
          { drone: 82.41, lead: 493.88, dur: 1.0, tag: "⚡ For Plam Buddy" }, // B4
          { drone: 82.41, lead: 659.25, dur: 1.5, tag: "🎉 Gryffindor Celebration" }, // E5
          { drone: 82.41, lead: 783.99, dur: 0.75 }, // G5
          { drone: 82.41, lead: 739.99, dur: 0.75 }, // F#5
          { drone: 82.41, lead: 659.25, dur: 1.5, tag: "💖 Golden Snitch" }, // E5
          { drone: 82.41, lead: 987.77, dur: 1.0 }, // B5
          { drone: 146.83, lead: 1174.66, dur: 1.5, tag: "🌟 Flying on Broomsticks" }, // D6
          { drone: 138.59, lead: 1108.73, dur: 0.75 }, // C#6
          { drone: 130.81, lead: 1046.50, dur: 2.2, tag: "👑 Queen Plamena" }, // C6
          { drone: 103.83, lead: 830.61, dur: 1.6, tag: "✨ Enchanted Candles" }, // G#5

          // Phrase 4: C6 -> B5 -> A#5 -> D#5 -> G5 -> E5
          { drone: 130.81, lead: 1046.50, dur: 0.8, tag: "🪄 Magic Birthday!" }, // C6
          { drone: 123.47, lead: 987.77, dur: 0.8 }, // B5
          { drone: 116.54, lead: 932.33, dur: 0.8 }, // A#5
          { drone: 77.78, lead: 622.25, dur: 1.5, tag: "🥂 Toast to Plam!" }, // D#5
          { drone: 82.41, lead: 783.99, dur: 0.8 }, // G5
          { drone: 82.41, lead: 659.25, dur: 3.2, tag: "⚡ Честит Рожден Ден, Плам!" }, // E5

          // Interlude / Waltz Theme (The magical sweeping celesta waltz!)
          { drone: 98.00, lead: 783.99, dur: 1.2, tag: "✨ The Grand Waltz" }, // G5
          { drone: 98.00, lead: 987.77, dur: 1.2 }, // B5
          { drone: 98.00, lead: 783.99, dur: 1.2 }, // G5
          { drone: 98.00, lead: 987.77, dur: 1.2 }, // B5
          { drone: 130.81, lead: 1046.50, dur: 1.4, tag: "🏰 Hogwarts Castle" }, // C6
          { drone: 123.47, lead: 987.77, dur: 0.8 }, // B5
          { drone: 116.54, lead: 932.33, dur: 1.6, tag: "🦉 Flying into the Night" }, // A#5
          { drone: 92.50, lead: 739.99, dur: 1.4 }, // F#5
          { drone: 98.00, lead: 783.99, dur: 0.8 }, // G5
          { drone: 123.47, lead: 987.77, dur: 1.4 }, // B5
          { drone: 116.54, lead: 932.33, dur: 0.8 }, // A#5
          { drone: 58.27, lead: 466.16, dur: 1.5, tag: "✨ A Year of Wonder" }, // A#4
          { drone: 123.47, lead: 493.88, dur: 1.5 }, // B4
          { drone: 123.47, lead: 987.77, dur: 2.8, tag: "⚡ Mischief Managed!" }, // B5
          { drone: 82.41, lead: 0, dur: 1.2 }, // breathing space before repeat
        ]
      },

      // Backup track: "Serenade for Plam"
      serenade: {
        title: "🎵 Serenade for Plam",
        tempo: 96,
        steps: [
          { drone: 146.83, lead: 587.33, dur: 1.0, tag: "For Plam ✨" },
          { drone: 146.83, lead: 554.37, dur: 1.0 },
          { drone: 146.83, lead: 493.88, dur: 1.0 },
          { drone: 146.83, lead: 440.00, dur: 1.0 },
          { drone: 110.00, lead: 493.88, dur: 1.0, tag: "Bulgarian Sunshine ☀️" },
          { drone: 110.00, lead: 440.00, dur: 1.0 },
          { drone: 110.00, lead: 392.00, dur: 1.0 },
          { drone: 110.00, lead: 440.00, dur: 1.0 },
          { drone: 123.47, lead: 493.88, dur: 1.0, tag: "Best Friend Ever 💖" },
          { drone: 123.47, lead: 587.33, dur: 1.0 },
          { drone: 123.47, lead: 659.25, dur: 1.0 },
          { drone: 123.47, lead: 587.33, dur: 1.0 },
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

  // Synthesize authentic magical Celesta chime with Great Hall reverb delay
  playCelestaNote(freq, duration = 2.0) {
    if (!this.ctx || this.isMuted || freq <= 0) return;

    const now = this.ctx.currentTime;

    // Master Gain
    const masterGain = this.ctx.createGain();
    masterGain.gain.setValueAtTime(this.volume * 0.42, now);

    // Subtle Echo / Reverb delay for Hogwarts Great Hall acoustic atmosphere
    const delay = this.ctx.createDelay();
    delay.delayTime.setValueAtTime(0.28, now);
    const feedback = this.ctx.createGain();
    feedback.gain.setValueAtTime(0.25, now);
    delay.connect(feedback);
    feedback.connect(delay);
    delay.connect(this.ctx.destination);
    masterGain.connect(delay);
    masterGain.connect(this.ctx.destination);

    // 1. Fundamental Pure Sine (Clear crystal bell)
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    gain1.gain.setValueAtTime(0.001, now);
    gain1.gain.linearRampToValueAtTime(0.85, now + 0.008); // sharp bell strike
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc1.connect(gain1);
    gain1.connect(masterGain);
    osc1.start(now);
    osc1.stop(now + duration);

    // 2. Inharmonic Metal Plate Strike (Celesta characteristic: 2.76x frequency)
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2.756, now);

    gain2.gain.setValueAtTime(0.001, now);
    gain2.gain.linearRampToValueAtTime(0.35, now + 0.005);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.45); // short metallic ping

    osc2.connect(gain2);
    gain2.connect(masterGain);
    osc2.start(now);
    osc2.stop(now + 0.45);

    // 3. Shimmer Harmonic (High bell sparkle 4.0x)
    const osc3 = this.ctx.createOscillator();
    const gain3 = this.ctx.createGain();
    osc3.type = 'triangle';
    osc3.frequency.setValueAtTime(freq * 4.0, now);

    gain3.gain.setValueAtTime(0.001, now);
    gain3.gain.linearRampToValueAtTime(0.18, now + 0.006);
    gain3.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);

    osc3.connect(gain3);
    gain3.connect(masterGain);
    osc3.start(now);
    osc3.stop(now + 0.35);
  }

  // Mysterious orchestral string drone underneath
  playOrchestralDrone(freq, duration = 2.0) {
    if (!this.ctx || this.isMuted || !freq || freq <= 0) return;

    const now = this.ctx.currentTime;
    const droneGain = this.ctx.createGain();
    droneGain.gain.setValueAtTime(this.volume * 0.18, now);
    droneGain.connect(this.ctx.destination);

    // Warm bowed string cello/bass tone (triangle with soft lowpass)
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, now);

    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.5, now + 0.25);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration * 1.1);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(droneGain);

    osc.start(now);
    osc.stop(now + duration * 1.1);
  }

  // Play step in loop
  playStep() {
    if (!this.isPlaying) return;

    const track = this.tracks[this.currentTrackId];
    if (!track) return;

    const step = track.steps[this.currentStep];
    const beatMs = (60 / track.tempo) * 1000;
    const stepDurationMs = (step.dur || 1.0) * beatMs;

    // 1. Play Celesta Lead
    if (step.lead && step.lead > 0) {
      this.playCelestaNote(step.lead, Math.max(1.8, (stepDurationMs / 1000) * 1.6));
    }

    // 2. Play Mysterious Orchestral Drone
    if (step.drone && step.drone > 0) {
      this.playOrchestralDrone(step.drone, (stepDurationMs / 1000) * 1.2);
    }

    // 3. Update lyric/moment tag
    if (this.onProgressCallback && step.tag) {
      this.onProgressCallback(step.tag);
    }

    // Advance step
    this.currentStep = (this.currentStep + 1) % track.steps.length;

    this.loopTimer = setTimeout(() => {
      this.playStep();
    }, stepDurationMs);
  }

  startMusic(trackId = null, onProgress = null) {
    this.initContext();
    if (trackId && this.tracks[trackId]) {
      this.currentTrackId = trackId;
    } else {
      this.currentTrackId = 'harryPotter';
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
      return this.startMusic(trackId || 'harryPotter', onProgress);
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
    return this.tracks[this.currentTrackId]?.title || "⚡ Harry Potter - Hedwig's Theme";
  }

  // Interactive Sound Effects
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

    // Magical celebratory fanfare
    const notes = [
      { freq: 493.88, time: 0, dur: 0.2 },    // B4
      { freq: 659.25, time: 0.18, dur: 0.2 }, // E5
      { freq: 783.99, time: 0.35, dur: 0.25 },// G5
      { freq: 987.77, time: 0.55, dur: 0.8 }, // B5
    ];

    notes.forEach(n => {
      setTimeout(() => {
        this.playCelestaNote(n.freq, n.dur * 2.2);
      }, n.time * 1000);
    });
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }
}

export const celebrationAudio = new CelebrationAudioManager();
