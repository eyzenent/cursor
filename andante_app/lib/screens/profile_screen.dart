import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:andante/theme/app_theme.dart';
import 'package:andante/widgets/glass_card.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.fromLTRB(16, 24, 16, 120),
      children: [
        Column(
          children: [
            ClipRRect(
              borderRadius: BorderRadius.circular(48),
              child: Image.asset(
                'assets/images/profile.jpg',
                width: 96,
                height: 96,
                fit: BoxFit.cover,
              ),
            ),
            const SizedBox(height: 16),
            Text(
              'Rahim Rahimli',
              style: GoogleFonts.plusJakartaSans(
                fontSize: 24,
                fontWeight: FontWeight.w600,
                color: AppColors.textPrimary,
              ),
            ),
            const SizedBox(height: 4),
            Text(
              '@rahim_curates',
              style: GoogleFonts.inter(fontSize: 16, color: AppColors.textMuted),
            ),
            const SizedBox(height: 8),
            Text(
              'Curating visual stories at the intersection of art and technology.',
              textAlign: TextAlign.center,
              style: Theme.of(context).textTheme.bodyLarge,
            ),
            const SizedBox(height: 24),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: const [
                _StatItem(count: '1.2k', label: 'Following'),
                SizedBox(width: 32),
                _StatItem(count: '8.4k', label: 'Followers'),
                SizedBox(width: 32),
                _StatItem(count: '142', label: 'Curations'),
              ],
            ),
            const SizedBox(height: 24),
            Row(
              children: [
                Expanded(
                  child: FilledButton(
                    onPressed: () {},
                    style: FilledButton.styleFrom(
                      backgroundColor: AppColors.accent,
                      foregroundColor: AppColors.background,
                    ),
                    child: const Text('Edit Profile'),
                  ),
                ),
                const SizedBox(width: 12),
                OutlinedButton(
                  onPressed: () {},
                  style: OutlinedButton.styleFrom(
                    foregroundColor: AppColors.accent,
                    side: const BorderSide(color: AppColors.accentBorder),
                  ),
                  child: const Icon(Icons.share_outlined),
                ),
              ],
            ),
          ],
        ),
        const SizedBox(height: 32),
        Text('Recent Curations', style: Theme.of(context).textTheme.headlineLarge),
        const SizedBox(height: 16),
        GridView.count(
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          crossAxisCount: 3,
          mainAxisSpacing: 8,
          crossAxisSpacing: 8,
          children: [
            for (final image in ['grid1.jpg', 'grid2.jpg', 'grid4.jpg', 'grid5.jpg', 'grid6.jpg', 'grid7.jpg'])
              ClipRRect(
                borderRadius: BorderRadius.circular(8),
                child: Image.asset('assets/images/$image', fit: BoxFit.cover),
              ),
          ],
        ),
        const SizedBox(height: 24),
        GlassCard(
          padding: const EdgeInsets.all(21),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('About', style: Theme.of(context).textTheme.titleMedium),
              const SizedBox(height: 8),
              Text(
                'Member of the andante collective since 2024. Passionate about generative art, brutalist architecture, and thoughtful curation.',
                style: Theme.of(context).textTheme.bodyLarge,
              ),
            ],
          ),
        ),
      ],
    );
  }
}

class _StatItem extends StatelessWidget {
  const _StatItem({required this.count, required this.label});

  final String count;
  final String label;

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Text(
          count,
          style: GoogleFonts.plusJakartaSans(
            fontSize: 20,
            fontWeight: FontWeight.w600,
            color: AppColors.textPrimary,
          ),
        ),
        Text(label, style: Theme.of(context).textTheme.labelSmall),
      ],
    );
  }
}
