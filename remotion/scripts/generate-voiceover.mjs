/**
 * Generate per-scene Turkish voiceover with ElevenLabs.
 * Usage: ELEVENLABS_API_KEY=... node scripts/generate-voiceover.mjs
 */
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outDir = join(root, "public", "voiceover", "ETFExplainer");

const API_KEY = process.env.ELEVENLABS_API_KEY;
if (!API_KEY) {
  console.error("Missing ELEVENLABS_API_KEY");
  process.exit(1);
}

// Ayça D. — Türkçe anlatıcı / eğitim
const VOICE_ID = process.env.ELEVENLABS_VOICE_ID || "5RqXmIU9ikjifeWoXHMG";

const scenes = [
  {
    id: "hook",
    text: "ETF nedir, neden herkes bahsediyor? Küresel ETF varlıkları on üç trilyon doları aştı.",
  },
  {
    id: "definition",
    text: "ETF, yani Exchange Traded Fund. Borsada işlem gören bir yatırım sepeti. Bir hisse alırsınız, içeride yüzlerce varlık gelir.",
  },
  {
    id: "compare",
    text: "Hisse senedi tek şirket demektir. ETF ise hazır çeşitlilik. Hisse gibi alınır, fon gibi çeşitlenir.",
  },
  {
    id: "advantages",
    text: "Üç neden: Çeşitlendirme. Tek işlemle onlarca varlık. Düşük maliyet. Ortalama gider oranı yüzde sıfır nokta on altı. Ve likidite. Borsa saatleri içinde alıp satabilirsiniz.",
  },
  {
    id: "risk",
    text: "Ama ETF sihir değil. Piyasa düşerse ETF de düşebilir. Bu içerik yatırım tavsiyesi değildir.",
  },
  {
    id: "cta",
    text: "Öğren. Karşılaştır. Sonra karar ver. Takip et, kaydet.",
  },
];

mkdirSync(outDir, { recursive: true });

async function synthesize(scene) {
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "xi-api-key": API_KEY,
      "Content-Type": "application/json",
      Accept: "audio/mpeg",
    },
    body: JSON.stringify({
      text: scene.text,
      model_id: "eleven_multilingual_v2",
      voice_settings: {
        stability: 0.45,
        similarity_boost: 0.8,
        style: 0.35,
        use_speaker_boost: true,
      },
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`${scene.id}: ${res.status} ${err}`);
  }

  const buf = Buffer.from(await res.arrayBuffer());
  const file = join(outDir, `${scene.id}.mp3`);
  writeFileSync(file, buf);
  const duration = Number(
    execSync(
      `ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "${file}"`,
    )
      .toString()
      .trim(),
  );
  console.log(`✓ ${scene.id}.mp3  ${duration.toFixed(2)}s  (${buf.length} bytes)`);
  return { id: scene.id, file: `voiceover/ETFExplainer/${scene.id}.mp3`, duration };
}

const results = [];
for (const scene of scenes) {
  results.push(await synthesize(scene));
}

const manifest = {
  voiceId: VOICE_ID,
  model: "eleven_multilingual_v2",
  generatedAt: new Date().toISOString(),
  scenes: results,
};

writeFileSync(join(outDir, "manifest.json"), JSON.stringify(manifest, null, 2));
console.log("\nWrote manifest.json");
console.log(JSON.stringify(manifest, null, 2));
