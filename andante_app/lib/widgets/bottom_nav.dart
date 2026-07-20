import 'package:flutter/material.dart';
import 'package:andante/theme/app_theme.dart';

class BottomNav extends StatelessWidget {
  const BottomNav({
    super.key,
    required this.currentIndex,
    required this.onTap,
  });

  final int currentIndex;
  final ValueChanged<int> onTap;

  static const _icons = [
    Icons.home_outlined,
    Icons.explore_outlined,
    Icons.notifications_none_outlined,
    Icons.person_outline,
  ];

  static const _activeIcons = [
    Icons.home_rounded,
    Icons.explore_rounded,
    Icons.notifications_rounded,
    Icons.person_rounded,
  ];

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 64,
      decoration: BoxDecoration(
        color: AppColors.surface.withValues(alpha: 0.85),
        border: const Border(top: BorderSide(color: AppColors.border)),
      ),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceAround,
        children: List.generate(_icons.length, (index) {
          final selected = index == currentIndex;
          return IconButton(
            onPressed: () => onTap(index),
            icon: Icon(
              selected ? _activeIcons[index] : _icons[index],
              color: selected ? AppColors.accent : AppColors.textMuted,
              size: 24,
            ),
          );
        }),
      ),
    );
  }
}
