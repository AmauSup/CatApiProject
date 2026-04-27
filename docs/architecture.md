# Architecture technique du projet Cat API

Ce document présente l'architecture technique du projet Cat API.

## Vue d'ensemble

- **Frontend** : React (Vite), SPA, gestion d'état locale, appels API REST
- **Backend** : Node.js, Express, API REST, JWT Auth, PostgreSQL
- **Base de données** : PostgreSQL, tables users, animals, favorites, votes, breed_stats

## Schéma global

```
[ Utilisateur ]
      |
      v
[ Frontend React ] <----> [ Backend Express ] <----> [ PostgreSQL ]
```

## Détails des composants

### Frontend (client/)
- React (Vite)
- Pages : Accueil, Recherche, Favoris, Tournois, Connexion, Inscription
- Authentification JWT (stockage localStorage)
- Appels API via fetch/axios

### Backend (server/)
- Express.js
- Contrôleurs : auth, cat, favorite, vote, animal
- Services : accès DB, appels Cat API, gestion JWT
- Middlewares : auth (JWT)
- Routes REST : /api/cats, /api/auth, /api/favorites, /api/votes

### Base de données
- PostgreSQL
- Tables : users, animals, favorites, votes, breed_stats

## Diagrammes

- [Diagramme Login](diagrams/login.puml)
- [Diagramme Favoris](diagrams/favorites.puml)
- [Diagramme Tournoi](diagrams/tournoi.puml)

## Décisions d'architecture

Voir le dossier [adr/](adr/).
