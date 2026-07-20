import 'package:flutter_test/flutter_test.dart';
import 'package:andante/main.dart';

void main() {
  testWidgets('App loads discover screen', (WidgetTester tester) async {
    await tester.pumpWidget(const AndanteApp());
    await tester.pumpAndSettle();

    expect(find.text('Trending Now'), findsOneWidget);
    expect(find.text('andante'), findsOneWidget);
  });
}
