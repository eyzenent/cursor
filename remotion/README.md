# Remotion — Vox-Style ETF Explainer

Instagram Reels (9:16) için Vox tarzı ETF açıklama videosu.

## Composition

- **id:** `ETFExplainer`
- **1080×1920 · 30fps · 50sn (1500 frame)**
- Sert kesimler, kinetik tipografi, spring pop-in, progress bar

## Çalıştır

```bash
cd remotion
npm install
npm run dev      # Studio
npm run render   # out/etf-reels.mp4
```

## Yapı

```
src/
  ETFExplainer.tsx
  theme.ts              # SCENE_DURATIONS + renkler
  components/           # KineticText, StatCounter, IconPop, ProgressBar, HighlightBox
  scenes/               # Hook, Definition, Compare, Advantages, Risk, CTA
```

## Müzik

`public/vox-underscore.mp3` — Kevin MacLeod *Inspired* (CC BY).
