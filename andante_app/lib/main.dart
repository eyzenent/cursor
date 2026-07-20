import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:andante/screens/discover_screen.dart';
import 'package:andante/screens/home_screen.dart';
import 'package:andante/screens/notifications_screen.dart';
import 'package:andante/screens/profile_screen.dart';
import 'package:andante/theme/app_theme.dart';
import 'package:andante/widgets/app_header.dart';
import 'package:andante/widgets/bottom_nav.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  SystemChrome.setSystemUIOverlayStyle(
    const SystemUiOverlayStyle(
      statusBarColor: Colors.transparent,
      statusBarIconBrightness: Brightness.light,
      systemNavigationBarColor: AppColors.background,
      systemNavigationBarIconBrightness: Brightness.light,
    ),
  );
  runApp(const AndanteApp());
}

class AndanteApp extends StatelessWidget {
  const AndanteApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'andante',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.dark(),
      home: const MainShell(),
    );
  }
}

class MainShell extends StatefulWidget {
  const MainShell({super.key});

  @override
  State<MainShell> createState() => _MainShellState();
}

class _MainShellState extends State<MainShell> {
  int _index = 1;

  static const _screens = [
    HomeScreen(),
    DiscoverScreen(),
    NotificationsScreen(),
    ProfileScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        bottom: false,
        child: Column(
          children: [
            const AppHeader(),
            Expanded(child: _screens[_index]),
          ],
        ),
      ),
      bottomNavigationBar: BottomNav(
        currentIndex: _index,
        onTap: (value) => setState(() => _index = value),
      ),
    );
  }
}
