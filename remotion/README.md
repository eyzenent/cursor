# Remotion (ASAD)

React ile programatik video üretimi. Remotion Studio + agent skill'leri bu klasörde bağlı.

## Kurulum

```bash
cd remotion
npm install
```

## Studio (önizleme)

```bash
npm run dev
```

Composition: **EtfReels** — Instagram Reels (1080×1920), 60 sn, Vox-tarzı ETF anlatımı.

## Video render

```bash
npm run render
# → out/etf-reels.mp4
```

## Agent skills

Remotion agent skill'leri `.agents/skills/` altında kurulu:

- `remotion-best-practices`
- `remotion-create` / `remotion-markup` / `remotion-render`
- `remotion-captions` / `remotion-saas` / `remotion-interactivity`
- `remotion-docs` / `remotion-upgrade` / `mediabunny`

Güncellemek için:

```bash
npx skills add remotion-dev/skills -y
```

## Docs

- https://www.remotion.dev/docs
- https://www.remotion.dev/docs/ai/skills
