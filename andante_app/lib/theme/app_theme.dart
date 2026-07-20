import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

class AppColors {
  static const background = Color(0xFF0B1326);
  static const surface = Color(0xFF171F33);
  static const card = Color(0x662D3449);
  static const cardSolid = Color(0xFF2D3449);
  static const border = Color(0x0DFFFFFF);
  static const accentBorder = Color(0x33C3C0FF);
  static const accent = Color(0xFFC3C0FF);
  static const accentSoft = Color(0x1AC3C0FF);
  static const textPrimary = Color(0xFFDAE2FD);
  static const textSecondary = Color(0xFFC7C4D8);
  static const textMuted = Color(0x99C7C4D8);
  static const textHint = Color(0x66C7C4D8);
}

class AppTheme {
  static ThemeData dark() {
    final base = ThemeData(
      brightness: Brightness.dark,
      scaffoldBackgroundColor: AppColors.background,
      colorScheme: const ColorScheme.dark(
        surface: AppColors.background,
        primary: AppColors.accent,
        secondary: AppColors.textPrimary,
      ),
    );

    return base.copyWith(
      textTheme: TextTheme(
        headlineLarge: GoogleFonts.plusJakartaSans(
          fontSize: 24,
          fontWeight: FontWeight.w600,
          color: AppColors.textPrimary,
          height: 1.33,
        ),
        headlineMedium: GoogleFonts.plusJakartaSans(
          fontSize: 20,
          fontWeight: FontWeight.w600,
          color: AppColors.textPrimary,
          height: 1.4,
        ),
        titleMedium: GoogleFonts.plusJakartaSans(
          fontSize: 16,
          fontWeight: FontWeight.w600,
          color: AppColors.textPrimary,
        ),
        bodyLarge: GoogleFonts.inter(
          fontSize: 16,
          fontWeight: FontWeight.w400,
          color: AppColors.textSecondary,
          height: 1.5,
        ),
        bodyMedium: GoogleFonts.inter(
          fontSize: 14,
          fontWeight: FontWeight.w400,
          color: AppColors.textSecondary,
          height: 1.43,
        ),
        labelSmall: GoogleFonts.inter(
          fontSize: 12,
          fontWeight: FontWeight.w600,
          color: AppColors.textMuted,
          letterSpacing: 0.96,
        ),
      ),
    );
  }
}
