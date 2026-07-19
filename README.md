# QR Okuyucu

Türkçe arayüzlü Android QR kod okuma uygulaması.

## Özellikler

- Gerçek zamanlı QR kod tarama (CameraX + ML Kit)
- Okunan sonucu panoya kopyalama
- URL ise tarayıcıda açma
- Tekrar tarama desteği
- Koyu tema ve modern arayüz

## Gereksinimler

- Android Studio Hedgehog veya üzeri
- JDK 17
- Android SDK 34

## APK Derleme

```bash
export ANDROID_HOME=$HOME/android-sdk
./gradlew assembleRelease
```

APK dosyası: `app/build/outputs/apk/release/app-release.apk`

## Kurulum

1. APK dosyasını Android cihazınıza aktarın
2. Bilinmeyen kaynaklardan yüklemeye izin verin
3. APK'yı açıp kurun

## Teknolojiler

- Kotlin
- CameraX
- Google ML Kit Barcode Scanning
- Material Design 3

## Lisans

MIT
