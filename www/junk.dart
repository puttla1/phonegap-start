import 'dart:async';
import 'dart:html';
import 'package:web_ui/web_ui.dart';

Element card;

void flip() {
  card.classes.toggle('flip');
}

/**
 * Learn about the Web UI package by visiting
 * http://www.dartlang.org/articles/dart-web-components/.
 */
void main() {
  // Enable this to use Shadow DOM in the browser.
  //useShadowDom = true;
  card = query('#card1');
  new Timer(new Duration(milliseconds:5000), flip);
  new Timer(new Duration(milliseconds:5500), flip);
}
