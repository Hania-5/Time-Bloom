# Time Bloom 🌸

A focus timer app that takes over your screen, tracks your session history,
keeps a small real-time clock in the corner, and lets you jot notes and pick
a theme that fits your mood.

## Features

- ⏱️ Start/pause/reset timer with a full-screen focus view
- 🕐 Small live clock pinned to the corner while you focus
- 📜 History of past sessions (label, duration, date)
- 📝 Freeform notes
- 🎵 Music button (currently deep-links to Spotify; full in-app playback
  control is a planned upgrade — see Roadmap)
- 🎨 Multiple color themes, saved across app restarts

## Getting started

```bash
npm install
npx expo start
```

Then scan the QR code with the **Expo Go** app on your phone (iOS or
Android), or press `i` / `a` in the terminal to open an iOS/Android
simulator.

## Project structure

```
App.js                     Root component, wraps everything in ThemeProvider
src/
  context/ThemeContext.js  Theme state + persistence
  storage/storage.js       AsyncStorage helpers (history, notes, theme)
  navigation/               Bottom tab navigation
  components/               Reusable pieces (Clock, ThemePicker)
  screens/                   Timer, History, Notes, Settings
```

## Roadmap

- [ ] Full Spotify SDK integration for in-app playback control (requires
      an Expo **dev client** build instead of Expo Go, plus a registered
      Spotify Developer app)
- [ ] Session tags / categories
- [ ] Charts on the History screen (time spent per day/week)
- [ ] Custom theme creator (pick your own colors, not just presets)
- [ ] Push notification when a timer finishes

## Deployment

This project uses [EAS Build](https://docs.expo.dev/build/introduction/)
for producing installable iOS/Android builds once you're ready:

```bash
npm install -g eas-cli
eas login
eas build:configure
eas build --platform android   # or ios / all
```
