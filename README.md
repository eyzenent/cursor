# Matematik Ustası 🧮

Mobil matematik oyunu — animasyonlu arayüz, ses efektleri ve Android APK.

## APK İndir

[📥 Matematik Ustası APK İndir](https://github.com/eyzenent/cursor/releases/download/v1.0.0-math-game/MatematikUstasi.apk)

## Özellikler

- 3 zorluk seviyesi (Kolay, Orta, Zor)
- Toplama, çıkarma, çarpma, bölme
- Puan, seri ve seviye sistemi
- Zamanlayıcı ve can sistemi
- Ses efektleri ve titreşim
- Framer Motion animasyonları

## Geliştirme

```bash
cd math-game
npm install
npm run dev
```

## APK Derleme

```bash
cd math-game
npm run build
npx cap sync android
cd android && ./gradlew assembleDebug
```

APK çıktısı: `math-game/android/app/build/outputs/apk/debug/app-debug.apk`
