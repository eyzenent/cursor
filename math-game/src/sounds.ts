type SoundType = "tap" | "correct" | "wrong" | "tick" | "levelUp" | "gameOver";

class SoundManager {
  private ctx: AudioContext | null = null;
  private enabled = true;

  private getContext(): AudioContext {
    if (!this.ctx) {
      this.ctx = new AudioContext();
    }
    return this.ctx;
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }

  isEnabled() {
    return this.enabled;
  }

  async resume() {
    const ctx = this.getContext();
    if (ctx.state === "suspended") {
      await ctx.resume();
    }
  }

  play(type: SoundType) {
    if (!this.enabled) return;
    const ctx = this.getContext();

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    switch (type) {
      case "tap":
        osc.type = "sine";
        osc.frequency.setValueAtTime(520, now);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
        break;
      case "correct":
        osc.type = "triangle";
        osc.frequency.setValueAtTime(523, now);
        osc.frequency.setValueAtTime(659, now + 0.08);
        osc.frequency.setValueAtTime(784, now + 0.16);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
        break;
      case "wrong":
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(110, now + 0.25);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
        break;
      case "tick":
        osc.type = "square";
        osc.frequency.setValueAtTime(880, now);
        gain.gain.setValueAtTime(0.03, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.start(now);
        osc.stop(now + 0.04);
        break;
      case "levelUp":
        [523, 659, 784, 1047].forEach((freq, i) => {
          const o = ctx.createOscillator();
          const g = ctx.createGain();
          o.connect(g);
          g.connect(ctx.destination);
          o.type = "sine";
          const t = now + i * 0.1;
          o.frequency.setValueAtTime(freq, t);
          g.gain.setValueAtTime(0.1, t);
          g.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
          o.start(t);
          o.stop(t + 0.2);
        });
        return;
      case "gameOver":
        osc.type = "sine";
        osc.frequency.setValueAtTime(392, now);
        osc.frequency.exponentialRampToValueAtTime(196, now + 0.6);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
        osc.start(now);
        osc.stop(now + 0.7);
        break;
    }
  }
}

export const soundManager = new SoundManager();
