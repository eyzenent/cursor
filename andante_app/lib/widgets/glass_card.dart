import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:andante/theme/app_theme.dart';

class GlassCard extends StatelessWidget {
  const GlassCard({
    super.key,
    required this.child,
    this.padding,
    this.borderRadius = 16,
    this.borderColor = AppColors.border,
    this.backgroundColor = AppColors.card,
    this.onTap,
  });

  final Widget child;
  final EdgeInsetsGeometry? padding;
  final double borderRadius;
  final Color borderColor;
  final Color backgroundColor;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    final card = ClipRRect(
      borderRadius: BorderRadius.circular(borderRadius),
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: 6, sigmaY: 6),
        child: Container(
          padding: padding,
          decoration: BoxDecoration(
            color: backgroundColor,
            borderRadius: BorderRadius.circular(borderRadius),
            border: Border.all(color: borderColor),
          ),
          child: child,
        ),
      ),
    );

    if (onTap == null) return card;

    return GestureDetector(onTap: onTap, child: card);
  }
}
