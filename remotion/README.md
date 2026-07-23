# Remotion — Vox-Style ETF Explainer

Instagram Reels (9:16) için Vox tarzı ETF açıklama videosu + Türkçe ElevenLabs konuşmacı.

## Composition

- **id:** `ETFExplainer`
- **1080×1920 · 30fps · ~51sn**
- Sert kesimler, kinetik tipografi, spring pop-in, progress bar
- Sahne bazlı voiceover (`public/voiceover/ETFExplainer/`)

## Çalıştır

```bash
cd remotion
npm install
npm run dev      # Studio
npm run render   # out/etf-reels.mp4
```

## Voiceover üret

```bash
ELEVENLABS_API_KEY=... node scripts/generate-voiceover.mjs
```

Ses sürelerine göre `src/theme.ts` içindeki `SCENE_DURATIONS` güncellenir.

## Müzik

`public/vox-underscore.mp3` — Kevin MacLeod *Inspired* (CC BY), VO altında duck edilir.
