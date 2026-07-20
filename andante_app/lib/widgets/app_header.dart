import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:andante/theme/app_theme.dart';

class AppHeader extends StatelessWidget {
  const AppHeader({
    super.key,
    this.showBack = false,
    this.onBack,
  });

  final bool showBack;
  final VoidCallback? onBack;

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 64,
      padding: const EdgeInsets.symmetric(horizontal: 16),
      decoration: const BoxDecoration(
        color: AppColors.background,
        border: Border(bottom: BorderSide(color: AppColors.border)),
      ),
      child: Row(
        children: [
          if (showBack)
            IconButton(
              onPressed: onBack ?? () => Navigator.of(context).maybePop(),
              icon: const Icon(Icons.arrow_back_ios_new, size: 18),
              color: AppColors.textPrimary,
            ),
          ClipRRect(
            borderRadius: BorderRadius.circular(16),
            child: Image.asset(
              'assets/images/profile.jpg',
              width: 32,
              height: 32,
              fit: BoxFit.cover,
            ),
          ),
          const SizedBox(width: 12),
          Text(
            'andante',
            style: GoogleFonts.plusJakartaSans(
              fontSize: 20,
              fontWeight: FontWeight.w600,
              color: AppColors.textPrimary,
            ),
          ),
          const Spacer(),
          IconButton(
            onPressed: () {},
            icon: const Icon(Icons.notifications_none_rounded),
            color: AppColors.textPrimary,
          ),
        ],
      ),
    );
  }
}
