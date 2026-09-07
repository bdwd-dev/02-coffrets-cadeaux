# Coffrets Cadeaux BZ

E-commerce cadeaux premium

## Structure

```
02-coffrets-cadeaux/
├── backend/          # Express.js API (Port 3002)
│   ├── server.js
│   ├── package.json
│   └── db.json
├── web/              # React frontend (HTML + Babel standalone)
│   └── index.html
└── mobile/           # Flutter app
    └── lib/main.dart
```

## Démarrage

```bash
# Backend
cd 02-coffrets-cadeaux/backend
npm install
npm start

# Web — Ouvrir 02-coffrets-cadeaux/web/index.html dans un navigateur
# ou servir avec: npx serve 02-coffrets-cadeaux/web

# Mobile
cd 02-coffrets-cadeaux/mobile
flutter pub get
flutter run
```

## API

| Endpoint | Description |
|----------|-------------|
| GET /api/health | Health check |
| GET /api/stats | Statistiques |
