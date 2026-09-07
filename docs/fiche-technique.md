# Coffrets Cadeaux BZ — Fiche Technique

## 1. Structure du Projet

```
02-coffrets-cadeaux/
├── backend/              # API de gestion
│   ├── server.js         # Serveur Express.js
│   ├── package.json      # Dépendances
│   └── db.json           # Base de données simulée
├── web/                  # Frontend
│   └── index.html        # Application React (Babel standalone)
├── mobile/               # Application mobile
│   └── lib/main.dart     # App Flutter
└── docs/                 # Documentation
```

## 2. Spécifications Fonctionnelles

### 2.1 Backend — API REST

| Endpoint | Méthode | Description |
|----------|---------|-------------|
| /api/health | GET | Vérification de l'état du service |
| /api/stats | GET | Statistiques (coffrets, commandes, CA) |
| /api/products | GET | Liste des coffrets |
| /api/products/:id | GET | Détail d'un coffret |
| /api/orders | GET | Liste des commandes |
| /api/orders | POST | Création d'une commande |
| /api/orders/:id | GET | Détail d'une commande |
| /api/occasions | GET | Liste des occasions |
| /api/zones | GET | Zones de livraison |

### 2.2 Web — Fonctionnalités

**Catalogue**
- Grille de coffrets avec filtres (occasion, prix, thème)
- Fiches coffrets détaillées (contenu, personnalisation)
- Panier d'achat avec gestion des quantités
- Processus de commande en 2 étapes

**Commande**
- Formulaire de livraison avec choix zone
- Personnalisation (message, emballage)
- Choix du mode de livraison (standard, express)
- Récapitulatif avant validation

**Espace Client**
- Historique des commandes
- Statut des commandes
- Gestion du profil

### 2.3 Mobile — Fonctionnalités

- Navigation bottom bar (Accueil, Catalogue, Panier, Profil)
- Catalogue coffrets avec recherche
- Panier modal
- Checkout formulaire
- Notifications push

## 3. Exigences Non-Fonctionnelles

| Exigence | Spécification |
|----------|---------------|
| Performance | Temps de réponse API < 200ms |
| Disponibilité | 99.5% uptime |
| Sécurité | HTTPS, validation des entrées |
| Compatibilité | iOS 12+, Android 8+, Chrome, Firefox, Safari |
| Accessibilité | WCAG 2.1 AA |

## 4. Données Simulées

### Coffrets (8 produits)
- Coffret Chocolat Premium — 15 000 XAF
- Coffret Bien-être — 25 000 XAF
- Coffret Romantique — 35 000 XAF
- Coffret Naissance — 20 000 XAF
- Coffret Anniversaire — 30 000 XAF
- Coffret Remerciement — 18 000 XAF
- Coffret Luxe — 75 000 XAF
- Coffret Sur Mesure — à partir de 100 000 XAF

### Commandes (simulées)
- 12 commandes avec statuts variés
- CA total : 85 000 XAF
- Panier moyen : 28 333 XAF

## 5. Planning de Développement

| Phase | Durée | Livrables |
|-------|-------|-----------|
| Phase 1 — MVP | 4 semaines | Backend + Web basique |
| Phase 2 — Mobile | 3 semaines | App Flutter |
| Phase 3 — Features | 3 semaines | Personnalisation, fidélité |
| Phase 4 — Lancement | 2 semaines | Tests, déploiement |

## 6. Équipe Nécessaire

| Rôle | Nombre | Responsabilités |
|------|--------|-----------------|
| Chef de projet | 1 | Coordination, planning |
| Développeur Backend | 1 | API, base de données |
| Développeur Frontend | 1 | Web, UI/UX |
| Développeur Mobile | 1 | App Flutter |
| Designer | 1 | Maquettes, identité visuelle |

## 7. Risques et Mitigations

| Risque | Probabilité | Impact | Mitigation |
|--------|-------------|--------|------------|
| Retard livraison | Moyenne | Élevé | Planning tampon, fournisseurs de secours |
| Problèmes paiement | Faible | Élevé | Intégration Mobile Money, support 24/7 |
| Concurrence | Moyenne | Moyen | Différenciation par la qualité et le service |
| Saisonnalité | Élevée | Moyen | Diversification offres, stocks adaptés |

## 8. Budget Détaillé

| Poste | Coût (XAF) | Détail |
|-------|-----------|--------|
| Développement backend | 500 000 | API, base de données |
| Développement web | 400 000 | Frontend React |
| Développement mobile | 400 000 | App Flutter |
| Design | 200 000 | Maquettes, UI/UX |
| Stock initial | 3 000 000 | Coffrets, emballages |
| Marketing | 1 500 000 | Réseaux sociaux, influenceurs |
| Logistique | 500 000 | Livraison, points relais |
| **Total** | **6 500 000** | |

## 9. KPIs de Suivi

| KPI | Objectif | Fréquence |
|-----|----------|-----------|
| Taux de conversion | 4%+ | Hebdomadaire |
| Panier moyen | 35 000 XAF | Hebdomadaire |
| Taux de rétention | 35%+ | Mensuel |
| NPS | 50+ | Mensuel |
| CA mensuel | 3 000 000+ XAF | Mensuel |
