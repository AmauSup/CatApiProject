# Architecture détaillée Cat API Project

Ce document détaille l'architecture technique et logicielle du projet Cat API.

## Vue d'ensemble

- **Frontend** : React (Vite), SPA, gestion d'état locale, appels API REST
- **Backend** : Node.js, Express, API REST, JWT Auth, PostgreSQL
- **Base de données** : PostgreSQL, tables users, animals, favorites, breed_stats

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

### Base de données (Neon)
- **users** :
      - id (serial, PK)
      - username (varchar(50), unique, not null)
      - email (varchar(100), unique, not null)
      - password_hash (text)
      - created_at (timestamp, default now)
- **animals** :
      - id (serial, PK)
      - api_id (varchar(100), not null)
      - animal_type (varchar(10), not null)
      - breed_id (varchar(100))
      - breed_name (varchar(100))
      - image_url (text, not null)
      - weight_metric (varchar(50))
      - life_span (varchar(50))
      - temperament (text)
      - created_at (timestamp, default now)
      - unique (api_id, animal_type)
- **favorites** :
      - id (serial, PK)
      - user_id (int, FK users.id, not null)
      - animal_id (int, FK animals.id, not null)
      - created_at (timestamp, default now)
      - unique (user_id, animal_id)
- **breed_stats** :
      - id (serial, PK)
      - breed_id (varchar(100), not null)
      - breed_name (varchar(100), not null)
      - animal_type (varchar(10), not null)
      - total_votes (int, default 0)
      - upvotes (int, default 0)
      - downvotes (int, default 0)
      - top1_count (int, default 0)
      - updated_at (timestamp, default now)
      - unique (breed_id, animal_type)

## Diagrammes

- [Diagramme Login](docs/diagrams/login.puml)
- [Diagramme Favoris](docs/diagrams/favorites.puml)
- [Diagramme Tournoi](docs/diagrams/tournoi.puml)

## Décisions d'architecture

Voir le dossier [docs/adr/](docs/adr/).
