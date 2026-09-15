/* ==========================================================================
   LUMPIA SENSORY ASMR AUDIO SYNTHESIZER (WEB AUDIO API)
   Zero external audio files, 100% procedurally generated culinary ASMR
   ========================================================================== */

class LumpiaAudioEngine {
  constructor() {
    this.ctx = null;
    this.isEnabled = true;
    this.sizzleNode = null;
    this.sizzleGain = null;
    this.sizzleFilter = null;
  }

  init() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    this.ctx = new AudioCtx();
  }

  ensureRunning() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleAudio() {
    this.ensureRunning();
    this.isEnabled = !this.isEnabled;
    if (!this.isEnabled && this.sizzleGain) {
      this.sizzleGain.gain.setValueAtTime(0, this.ctx.currentTime);
    }
    return this.isEnabled;
  }

  // 1. Procedural Golden Crunch Bite ASMR
  playCrunchBite() {
    if (!this.isEnabled) return;
    this.ensureRunning();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    // Multi-layered transient for shatter crunch
    for (let i = 0; i < 6; i++) {
      const offset = i * 0.035 + (Math.random() * 0.01);
      const bufferSize = this.ctx.sampleRate * 0.08;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const out = noiseBuffer.getChannelData(0);
      for (let j = 0; j < bufferSize; j++) {
        out[j] = (Math.random() * 2 - 1) * Math.exp(-j / (bufferSize * 0.25));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = noiseBuffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(2500 + Math.random() * 2000, now + offset);
      filter.Q.setValueAtTime(3.0, now + offset);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.5, now + offset);
      gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.07);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(now + offset);
    }
  }

  // 2. Continuous Hot Oil Sizzle
  startOilSizzle() {
    if (!this.isEnabled) return;
    this.ensureRunning();
    if (!this.ctx || this.sizzleNode) return;

    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const out = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      out[i] = Math.random() * 2 - 1;
    }

    this.sizzleNode = this.ctx.createBufferSource();
    this.sizzleNode.buffer = noiseBuffer;
    this.sizzleNode.loop = true;

    this.sizzleFilter = this.ctx.createBiquadFilter();
    this.sizzleFilter.type = 'bandpass';
    this.sizzleFilter.frequency.setValueAtTime(3200, this.ctx.currentTime);
    this.sizzleFilter.Q.setValueAtTime(1.5, this.ctx.currentTime);

    this.sizzleGain = this.ctx.createGain();
    this.sizzleGain.gain.setValueAtTime(0.18, this.ctx.currentTime);

    this.sizzleNode.connect(this.sizzleFilter);
    this.sizzleFilter.connect(this.sizzleGain);
    this.sizzleGain.connect(this.ctx.destination);

    this.sizzleNode.start();
  }

  setSizzleIntensity(valPercent) {
    if (!this.sizzleFilter || !this.ctx) return;
    // Map 0-100 to 1200Hz - 6000Hz
    const freq = 1200 + (valPercent / 100) * 4500;
    this.sizzleFilter.frequency.setTargetAtTime(freq, this.ctx.currentTime, 0.05);
    const gain = 0.08 + (valPercent / 100) * 0.22;
    this.sizzleGain.gain.setTargetAtTime(this.isEnabled ? gain : 0, this.ctx.currentTime, 0.05);
  }

  // 3. Sauce Bubble Pop
  playSauceBubble() {
    if (!this.isEnabled) return;
    this.ensureRunning();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.04);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.055);
  }

  // 4. Register Cash Ding / Add To Cart
  playRegisterDing() {
    if (!this.isEnabled) return;
    this.ensureRunning();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sine';
    osc2.type = 'triangle';
    osc1.frequency.setValueAtTime(1760, now); // A6
    osc2.frequency.setValueAtTime(2637, now); // E7

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.65);
    osc2.stop(now + 0.65);
  }

  // 5. Tactile UI Click
  playClick() {
    if (!this.isEnabled) return;
    this.ensureRunning();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(500, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.02);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.03);
  }
}

window.lumpiaAudio = new LumpiaAudioEngine();
