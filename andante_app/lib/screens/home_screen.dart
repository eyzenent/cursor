import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:andante/theme/app_theme.dart';
import 'package:andante/widgets/glass_card.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: [
        ListView(
          padding: const EdgeInsets.fromLTRB(16, 16, 16, 120),
          children: [
            _Composer(),
            const SizedBox(height: 24),
            _PostCard(
              author: 'Elena Voss',
              handle: '@voss_studio · 2h',
              content:
                  'Captured this moment of pure architectural symmetry today. There\'s something so calming about the way light interacts with brutalist structures. Minimalist, cold, yet somehow full of life.',
              image: 'assets/images/grid3.jpg',
              likes: '248',
              comments: '42',
              shares: '18',
            ),
            const SizedBox(height: 24),
            _QuotePost(
              author: 'Design Daily',
              handle: '@design_daily · 5h',
              quote: '"The detail is not the detail. It is the design."',
              attribution: '— Charles Eames',
              likes: '1.2k',
              comments: '89',
            ),
            const SizedBox(height: 24),
            _OverlayPost(),
          ],
        ),
        Positioned(
          right: 24,
          bottom: 88,
          child: FloatingActionButton(
            onPressed: () {},
            backgroundColor: AppColors.accent,
            foregroundColor: AppColors.background,
            child: const Icon(Icons.add),
          ),
        ),
      ],
    );
  }
}

class _Composer extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return GlassCard(
      padding: const EdgeInsets.all(24),
      child: Row(
        children: [
          ClipRRect(
            borderRadius: BorderRadius.circular(20),
            child: Image.asset('assets/images/profile.jpg', width: 40, height: 40, fit: BoxFit.cover),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Text(
              "What's on your mind?",
              style: GoogleFonts.inter(fontSize: 16, color: AppColors.textHint),
            ),
          ),
          const Icon(Icons.image_outlined, color: AppColors.textMuted, size: 20),
          const SizedBox(width: 12),
          const Icon(Icons.poll_outlined, color: AppColors.textMuted, size: 20),
        ],
      ),
    );
  }
}

class _PostCard extends StatelessWidget {
  const _PostCard({
    required this.author,
    required this.handle,
    required this.content,
    required this.image,
    required this.likes,
    required this.comments,
    required this.shares,
  });

  final String author;
  final String handle;
  final String content;
  final String image;
  final String likes;
  final String comments;
  final String shares;

  @override
  Widget build(BuildContext context) {
    return GlassCard(
      padding: EdgeInsets.zero,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Padding(
            padding: const EdgeInsets.all(24),
            child: Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                ClipRRect(
                  borderRadius: BorderRadius.circular(20),
                  child: Image.asset('assets/images/creator1.jpg', width: 40, height: 40, fit: BoxFit.cover),
                ),
                const SizedBox(width: 16),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(author, style: Theme.of(context).textTheme.titleMedium),
                      Text(handle, style: Theme.of(context).textTheme.bodyMedium),
                      const SizedBox(height: 12),
                      Text(content, style: Theme.of(context).textTheme.bodyLarge),
                    ],
                  ),
                ),
                const Icon(Icons.more_horiz, color: AppColors.textMuted),
              ],
            ),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 24),
            child: ClipRRect(
              borderRadius: BorderRadius.circular(12),
              child: Image.asset(image, width: double.infinity, height: 280, fit: BoxFit.cover),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(24),
            child: _ActionRow(likes: likes, comments: comments, shares: shares),
          ),
        ],
      ),
    );
  }
}

class _QuotePost extends StatelessWidget {
  const _QuotePost({
    required this.author,
    required this.handle,
    required this.quote,
    required this.attribution,
    required this.likes,
    required this.comments,
  });

  final String author;
  final String handle;
  final String quote;
  final String attribution;
  final String likes;
  final String comments;

  @override
  Widget build(BuildContext context) {
    return GlassCard(
      padding: const EdgeInsets.all(24),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            width: 40,
            height: 40,
            decoration: BoxDecoration(
              color: AppColors.accentSoft,
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: AppColors.accentBorder),
            ),
            child: const Icon(Icons.format_quote, color: AppColors.accent, size: 20),
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(author, style: Theme.of(context).textTheme.titleMedium),
                Text(handle, style: Theme.of(context).textTheme.bodyMedium),
                const SizedBox(height: 16),
                Container(
                  width: double.infinity,
                  padding: const EdgeInsets.all(24),
                  decoration: BoxDecoration(
                    color: AppColors.accentSoft,
                    borderRadius: BorderRadius.circular(12),
                    border: const Border(left: BorderSide(color: AppColors.accent, width: 3)),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        quote,
                        style: GoogleFonts.plusJakartaSans(
                          fontSize: 20,
                          fontWeight: FontWeight.w600,
                          color: AppColors.textPrimary,
                          height: 1.5,
                        ),
                      ),
                      const SizedBox(height: 12),
                      Text(attribution, style: Theme.of(context).textTheme.bodyMedium),
                    ],
                  ),
                ),
                const SizedBox(height: 16),
                _ActionRow(likes: likes, comments: comments, shares: '12'),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _OverlayPost extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ClipRRect(
      borderRadius: BorderRadius.circular(16),
      child: SizedBox(
        height: 400,
        child: Stack(
          fit: StackFit.expand,
          children: [
            Image.asset('assets/images/grid5.jpg', fit: BoxFit.cover),
            Container(
              decoration: const BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                  colors: [Colors.transparent, Color(0xE60B1326)],
                ),
              ),
            ),
            Positioned(
              left: 24,
              right: 24,
              bottom: 24,
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      ClipRRect(
                        borderRadius: BorderRadius.circular(16),
                        child: Image.asset('assets/images/creator3.jpg', width: 32, height: 32, fit: BoxFit.cover),
                      ),
                      const SizedBox(width: 12),
                      Text('Kira L.', style: Theme.of(context).textTheme.titleMedium),
                    ],
                  ),
                  const SizedBox(height: 12),
                  Text(
                    'Finding the rhythm in chaos.',
                    style: GoogleFonts.plusJakartaSans(
                      fontSize: 24,
                      fontWeight: FontWeight.w600,
                      color: Colors.white,
                    ),
                  ),
                  const SizedBox(height: 12),
                  const _ActionRow(likes: '892', comments: '56', shares: '24', light: true),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _ActionRow extends StatelessWidget {
  const _ActionRow({
    required this.likes,
    required this.comments,
    required this.shares,
    this.light = false,
  });

  final String likes;
  final String comments;
  final String shares;
  final bool light;

  @override
  Widget build(BuildContext context) {
    final color = light ? Colors.white70 : AppColors.textMuted;
    return Row(
      children: [
        _ActionItem(icon: Icons.favorite_border, label: likes, color: color),
        const SizedBox(width: 24),
        _ActionItem(icon: Icons.chat_bubble_outline, label: comments, color: color),
        const SizedBox(width: 24),
        _ActionItem(icon: Icons.repeat, label: shares, color: color),
        const Spacer(),
        Icon(Icons.bookmark_border, color: color, size: 20),
      ],
    );
  }
}

class _ActionItem extends StatelessWidget {
  const _ActionItem({required this.icon, required this.label, required this.color});

  final IconData icon;
  final String label;
  final Color color;

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Icon(icon, size: 18, color: color),
        const SizedBox(width: 6),
        Text(label, style: GoogleFonts.inter(fontSize: 14, color: color)),
      ],
    );
  }
}
