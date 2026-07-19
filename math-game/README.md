# Matematik Ustası 🧮

Mobil matematik oyunu — animasyonlu arayüz, ses efektleri ve titreşim desteği.

## Özellikler

- 3 zorluk seviyesi (Kolay, Orta, Zor)
- Toplama, çıkarma, çarpma ve bölme işlemleri
- Puan, seri ve seviye sistemi
- Zamanlayıcı ve can sistemi
- Web Audio API ile ses efektleri
- Framer Motion animasyonları
- Capacitor ile Android APK desteği

## Geliştirme

```bash
cd math-game
npm install
npm run dev
```

## APK Derleme

```bash
npm run build
npx cap add android
npx cap sync android
cd android && ./gradlew assembleDebug
```

APK: `android/app/build/outputs/apk/debug/app-debug.apk`
