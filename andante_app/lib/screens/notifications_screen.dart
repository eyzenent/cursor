import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:andante/theme/app_theme.dart';
import 'package:andante/widgets/glass_card.dart';

class NotificationsScreen extends StatefulWidget {
  const NotificationsScreen({super.key});

  @override
  State<NotificationsScreen> createState() => _NotificationsScreenState();
}

class _NotificationsScreenState extends State<NotificationsScreen> {
  int _tab = 0;

  @override
  Widget build(BuildContext context) {
    return ListView(
      padding: const EdgeInsets.fromLTRB(16, 24, 16, 120),
      children: [
        Text('Notifications', style: Theme.of(context).textTheme.headlineLarge),
        const SizedBox(height: 16),
        Row(
          children: [
            _TabButton(label: 'All', selected: _tab == 0, onTap: () => setState(() => _tab = 0)),
            const SizedBox(width: 24),
            _TabButton(label: 'Mentions', selected: _tab == 1, onTap: () => setState(() => _tab = 1)),
            const SizedBox(width: 24),
            _TabButton(label: 'Follows', selected: _tab == 2, onTap: () => setState(() => _tab = 2)),
          ],
        ),
        const SizedBox(height: 24),
        _NotificationCard(
          avatar: 'assets/images/user1.jpg',
          icon: Icons.alternate_email,
          iconColor: AppColors.accent,
          title: 'Elena Voss mentioned you in a curation',
          time: '2m ago',
          quote: '"The way you framed the light in this piece is masterful."',
          unread: true,
        ),
        const SizedBox(height: 16),
        _NotificationCard(
          avatar: 'assets/images/user2.jpg',
          icon: Icons.favorite,
          iconColor: const Color(0xFFF472B6),
          title: 'Julian Marks and 12 others liked your post',
          time: '15m ago',
          image: 'assets/images/grid3.jpg',
          unread: true,
        ),
        const SizedBox(height: 16),
        _NotificationCard(
          avatar: 'assets/images/user3.jpg',
          icon: Icons.person_add_alt_1,
          iconColor: const Color(0xFF34D399),
          title: 'Kira L. started following you',
          subtitle: 'Curator · Visual Arts',
          time: '1h ago',
          action: 'Follow back',
        ),
        const SizedBox(height: 16),
        _NotificationCard(
          avatar: null,
          icon: Icons.insights,
          iconColor: AppColors.accent,
          title: 'Weekly Insights',
          time: '3h ago',
          body: 'Your profile reached 1.2k new creators this week! See which posts performed the best.',
        ),
        const SizedBox(height: 16),
        _NotificationCard(
          avatar: 'assets/images/creator4.jpg',
          icon: Icons.repeat,
          iconColor: const Color(0xFF60A5FA),
          title: 'Sasha Grey reposted your curation',
          time: '5h ago',
          quote: '"Must see for anyone interested in procedural textures."',
        ),
        const SizedBox(height: 32),
        Center(
          child: TextButton.icon(
            onPressed: () {},
            icon: const Icon(Icons.expand_more, color: AppColors.textMuted),
            label: Text(
              'Load earlier notifications',
              style: GoogleFonts.inter(color: AppColors.textMuted),
            ),
          ),
        ),
      ],
    );
  }
}

class _TabButton extends StatelessWidget {
  const _TabButton({
    required this.label,
    required this.selected,
    required this.onTap,
  });

  final String label;
  final bool selected;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Column(
        children: [
          Text(
            label,
            style: GoogleFonts.inter(
              fontSize: 16,
              fontWeight: selected ? FontWeight.w600 : FontWeight.w400,
              color: selected ? AppColors.textPrimary : AppColors.textMuted,
            ),
          ),
          const SizedBox(height: 8),
          Container(
            height: 2,
            width: 24,
            color: selected ? AppColors.accent : Colors.transparent,
          ),
        ],
      ),
    );
  }
}

class _NotificationCard extends StatelessWidget {
  const _NotificationCard({
    this.avatar,
    required this.icon,
    required this.iconColor,
    required this.title,
    required this.time,
    this.subtitle,
    this.body,
    this.quote,
    this.image,
    this.action,
    this.unread = false,
  });

  final String? avatar;
  final IconData icon;
  final Color iconColor;
  final String title;
  final String time;
  final String? subtitle;
  final String? body;
  final String? quote;
  final String? image;
  final String? action;
  final bool unread;

  @override
  Widget build(BuildContext context) {
    return GlassCard(
      padding: const EdgeInsets.all(17),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Stack(
            clipBehavior: Clip.none,
            children: [
              if (avatar != null)
                ClipRRect(
                  borderRadius: BorderRadius.circular(24),
                  child: Image.asset(avatar!, width: 48, height: 48, fit: BoxFit.cover),
                )
              else
                Container(
                  width: 48,
                  height: 48,
                  decoration: BoxDecoration(
                    color: AppColors.cardSolid,
                    borderRadius: BorderRadius.circular(24),
                    border: Border.all(color: AppColors.border),
                  ),
                  child: Icon(icon, color: iconColor, size: 20),
                ),
              if (avatar != null)
                Positioned(
                  right: -4,
                  bottom: -4,
                  child: Container(
                    width: 24,
                    height: 24,
                    decoration: BoxDecoration(
                      color: AppColors.surface,
                      shape: BoxShape.circle,
                      border: Border.all(color: AppColors.background, width: 2),
                    ),
                    child: Icon(icon, color: iconColor, size: 12),
                  ),
                ),
            ],
          ),
          const SizedBox(width: 16),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Row(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Expanded(
                      child: Text(
                        title,
                        style: GoogleFonts.inter(
                          fontSize: 16,
                          color: AppColors.textPrimary,
                          height: 1.5,
                        ),
                      ),
                    ),
                    Text(time, style: Theme.of(context).textTheme.labelSmall),
                  ],
                ),
                if (subtitle != null) ...[
                  const SizedBox(height: 4),
                  Text(subtitle!, style: Theme.of(context).textTheme.labelSmall),
                ],
                if (quote != null) ...[
                  const SizedBox(height: 12),
                  Container(
                    padding: const EdgeInsets.only(left: 14),
                    decoration: const BoxDecoration(
                      border: Border(left: BorderSide(color: AppColors.accent, width: 2)),
                    ),
                    child: Text(
                      quote!,
                      style: GoogleFonts.inter(
                        fontSize: 14,
                        color: AppColors.textSecondary,
                        fontStyle: FontStyle.italic,
                      ),
                    ),
                  ),
                ],
                if (body != null) ...[
                  const SizedBox(height: 8),
                  Text(body!, style: Theme.of(context).textTheme.bodyMedium),
                ],
                if (image != null) ...[
                  const SizedBox(height: 12),
                  ClipRRect(
                    borderRadius: BorderRadius.circular(8),
                    child: Image.asset(image!, width: 48, height: 48, fit: BoxFit.cover),
                  ),
                ],
                if (action != null) ...[
                  const SizedBox(height: 12),
                  OutlinedButton(
                    onPressed: () {},
                    style: OutlinedButton.styleFrom(
                      foregroundColor: AppColors.accent,
                      side: const BorderSide(color: AppColors.accentBorder),
                      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 6),
                    ),
                    child: Text(action!),
                  ),
                ],
              ],
            ),
          ),
          if (unread)
            Container(
              width: 6,
              height: 6,
              margin: const EdgeInsets.only(top: 8),
              decoration: const BoxDecoration(
                color: AppColors.accent,
                shape: BoxShape.circle,
              ),
            ),
        ],
      ),
    );
  }
}
