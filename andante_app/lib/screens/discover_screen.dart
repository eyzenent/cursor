import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:andante/theme/app_theme.dart';
import 'package:andante/widgets/glass_card.dart';

class DiscoverScreen extends StatelessWidget {
  const DiscoverScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.fromLTRB(16, 24, 16, 120),
      children: [
        _SearchBar(),
        const SizedBox(height: 40),
        Text('Trending Now', style: Theme.of(context).textTheme.headlineLarge),
        const SizedBox(height: 24),
        _TrendingBento(),
        const SizedBox(height: 40),
        _SectionHeader(title: 'Suggested Creators', action: 'See all'),
        const SizedBox(height: 24),
        const _CreatorsRow(),
        const SizedBox(height: 40),
        Text(
          'Explore the Collective',
          style: Theme.of(context).textTheme.headlineLarge,
        ),
        const SizedBox(height: 24),
        const _ExploreGrid(),
      ],
    );
  }
}

class _SearchBar extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return GlassCard(
      borderRadius: 12,
      backgroundColor: AppColors.surface,
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 18),
      child: Row(
        children: [
          const Icon(Icons.search, color: AppColors.textHint, size: 18),
          const SizedBox(width: 12),
          Text(
            'Discover curation...',
            style: GoogleFonts.inter(
              fontSize: 16,
              color: AppColors.textHint,
            ),
          ),
        ],
      ),
    );
  }
}

class _TrendingBento extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        _FeaturedCard(),
        const SizedBox(height: 16),
        Row(
          children: [
            Expanded(child: _TopicCard(
              category: 'Architecture',
              hashtag: '#BrutalistSoftness',
              posts: '12.4k posts',
              borderAccent: const Color(0xFFC3C0FF),
            )),
            const SizedBox(width: 16),
            Expanded(child: _TopicCard(
              category: 'Philosophy',
              hashtag: '#ExistentialJoy',
              posts: '8.1k posts',
              borderAccent: const Color(0xFF7DD3FC),
            )),
          ],
        ),
        const SizedBox(height: 16),
        _CurationLabCard(),
        const SizedBox(height: 16),
        _JoinCard(),
      ],
    );
  }
}

class _FeaturedCard extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return ClipRRect(
      borderRadius: BorderRadius.circular(16),
      child: SizedBox(
        height: 358,
        child: Stack(
          fit: StackFit.expand,
          children: [
            Image.asset('assets/images/featured.jpg', fit: BoxFit.cover),
            Container(
              decoration: const BoxDecoration(
                gradient: LinearGradient(
                  begin: Alignment.topCenter,
                  end: Alignment.bottomCenter,
                  colors: [
                    Color(0x330B1326),
                    Color(0xCC0B1326),
                  ],
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
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                    decoration: BoxDecoration(
                      color: AppColors.accentSoft,
                      borderRadius: BorderRadius.circular(4),
                    ),
                    child: Text(
                      'FEATURED',
                      style: GoogleFonts.inter(
                        fontSize: 12,
                        fontWeight: FontWeight.w600,
                        color: AppColors.accent,
                        letterSpacing: 1.2,
                      ),
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    '#GenerativeArtistry',
                    style: GoogleFonts.plusJakartaSans(
                      fontSize: 20,
                      fontWeight: FontWeight.w600,
                      color: Colors.white,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Text(
                    'Exploring the boundary between human intent and algorithmic chaos in modern design.',
                    style: GoogleFonts.inter(
                      fontSize: 16,
                      color: AppColors.textSecondary,
                      height: 1.5,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _TopicCard extends StatelessWidget {
  const _TopicCard({
    required this.category,
    required this.hashtag,
    required this.posts,
    required this.borderAccent,
  });

  final String category;
  final String hashtag;
  final String posts;
  final Color borderAccent;

  @override
  Widget build(BuildContext context) {
    return GlassCard(
      padding: const EdgeInsets.all(21),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            category,
            style: GoogleFonts.inter(
              fontSize: 14,
              color: AppColors.textSecondary,
              letterSpacing: 0.7,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            hashtag,
            style: GoogleFonts.plusJakartaSans(
              fontSize: 20,
              fontWeight: FontWeight.w600,
              color: AppColors.textPrimary,
            ),
          ),
          const SizedBox(height: 16),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(posts, style: Theme.of(context).textTheme.labelSmall),
              const Icon(Icons.trending_up, color: AppColors.accent, size: 16),
            ],
          ),
        ],
      ),
    );
  }
}

class _CurationLabCard extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return GlassCard(
      padding: const EdgeInsets.all(21),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            children: [
              Container(
                width: 40,
                height: 40,
                decoration: BoxDecoration(
                  color: AppColors.accentSoft,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: const Icon(Icons.science_outlined, color: AppColors.accent, size: 20),
              ),
              const SizedBox(width: 12),
              Text(
                'Curation Lab',
                style: GoogleFonts.plusJakartaSans(
                  fontSize: 20,
                  fontWeight: FontWeight.w600,
                  color: AppColors.textPrimary,
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          Text(
            'Deep dive into the neurobiology of visual appeal and creative flow.',
            style: Theme.of(context).textTheme.bodyLarge,
          ),
          const SizedBox(height: 16),
          SizedBox(
            height: 28,
            child: Stack(
              children: [
                Positioned(left: 0, child: _Avatar('assets/images/user1.jpg')),
                Positioned(left: 20, child: _Avatar('assets/images/user2.jpg')),
                Positioned(left: 40, child: _Avatar('assets/images/user3.jpg')),
                Positioned(
                  left: 60,
                  child: Container(
                    width: 28,
                    height: 28,
                    alignment: Alignment.center,
                    decoration: BoxDecoration(
                      color: AppColors.cardSolid,
                      shape: BoxShape.circle,
                      border: Border.all(color: AppColors.background, width: 2),
                    ),
                    child: Text(
                      '+14',
                      style: GoogleFonts.inter(
                        fontSize: 10,
                        fontWeight: FontWeight.w700,
                        color: AppColors.textPrimary,
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}

class _Avatar extends StatelessWidget {
  const _Avatar(this.asset);

  final String asset;

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        shape: BoxShape.circle,
        border: Border.all(color: AppColors.background, width: 2),
      ),
      child: ClipOval(
        child: Image.asset(asset, width: 28, height: 28, fit: BoxFit.cover),
      ),
    );
  }
}

class _JoinCard extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return GlassCard(
      backgroundColor: AppColors.accentSoft,
      borderColor: AppColors.accentBorder,
      padding: const EdgeInsets.all(21),
      child: Column(
        children: [
          Text(
            'Join the Conversation',
            style: GoogleFonts.plusJakartaSans(
              fontSize: 20,
              fontWeight: FontWeight.w600,
              color: AppColors.accent,
            ),
          ),
          const SizedBox(height: 8),
          Text(
            'Share your unique perspective with 2.4M curators.',
            textAlign: TextAlign.center,
            style: GoogleFonts.inter(fontSize: 16, color: AppColors.textSecondary),
          ),
          const SizedBox(height: 16),
          FilledButton(
            onPressed: () {},
            style: FilledButton.styleFrom(
              backgroundColor: AppColors.accent,
              foregroundColor: AppColors.background,
              padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 8),
              shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(999)),
            ),
            child: const Text('Start Curating'),
          ),
        ],
      ),
    );
  }
}

class _SectionHeader extends StatelessWidget {
  const _SectionHeader({required this.title, required this.action});

  final String title;
  final String action;

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.spaceBetween,
      children: [
        Text(title, style: Theme.of(context).textTheme.headlineLarge),
        TextButton(
          onPressed: () {},
          child: Text(
            action,
            style: GoogleFonts.inter(
              fontSize: 16,
              color: AppColors.accent,
            ),
          ),
        ),
      ],
    );
  }
}

class _CreatorsRow extends StatelessWidget {
  const _CreatorsRow();

  static const _creators = [
    ('Elena Voss', '@voss_studio', 'creator1.jpg'),
    ('Julian Marks', '@j.marks.visuals', 'creator2.jpg'),
    ('Kira L.', '@kira_curates', 'creator3.jpg'),
    ('Sasha Grey', '@grey_matters', 'creator4.jpg'),
    ('Marcus Wu', '@wu_visual', 'creator5.jpg'),
  ];

  @override
  Widget build(BuildContext context) {
    return SizedBox(
      height: 282,
      child: ListView.separated(
        scrollDirection: Axis.horizontal,
        itemCount: _creators.length,
        separatorBuilder: (_, __) => const SizedBox(width: 24),
        itemBuilder: (context, index) {
          final (name, handle, image) = _creators[index];
          return SizedBox(
            width: 176,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                ClipRRect(
                  borderRadius: BorderRadius.circular(16),
                  child: Stack(
                    children: [
                      Image.asset(
                        'assets/images/$image',
                        width: 176,
                        height: 220,
                        fit: BoxFit.cover,
                      ),
                      Positioned(
                        right: 12,
                        bottom: 12,
                        child: CircleAvatar(
                          radius: 16,
                          backgroundColor: AppColors.accent,
                          child: const Icon(Icons.add, size: 16, color: AppColors.background),
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 8),
                Text(
                  name,
                  style: GoogleFonts.plusJakartaSans(
                    fontSize: 18,
                    fontWeight: FontWeight.w600,
                    color: AppColors.textPrimary,
                  ),
                ),
                Text(
                  handle,
                  style: GoogleFonts.inter(fontSize: 14, color: AppColors.textMuted),
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}

class _ExploreGrid extends StatelessWidget {
  const _ExploreGrid();

  static const _images = [
  'grid1.jpg', 'grid2.jpg', 'grid3.jpg', 'grid4.jpg',
  'grid5.jpg', 'grid6.jpg', 'grid7.jpg',
  ];

  @override
  Widget build(BuildContext context) {
    return GridView.builder(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        mainAxisSpacing: 12,
        crossAxisSpacing: 12,
        childAspectRatio: 1,
      ),
      itemCount: _images.length,
      itemBuilder: (context, index) {
        return ClipRRect(
          borderRadius: BorderRadius.circular(16),
          child: Image.asset(
            'assets/images/${_images[index]}',
            fit: BoxFit.cover,
          ),
        );
      },
    );
  }
}
