# Post-mortem du projet Cat API


## Objectifs initiaux
- Créer une application fullstack autour de The Cat API
- Découvrir React, Node.js, Express, PostgreSQL, JWT
- Mettre en place une authentification, des favoris, un tournoi de votes

## Structure réelle de la base de données (Neon)
- users : id, username, email, password_hash, created_at
- animals : id, api_id, animal_type, breed_id, breed_name, image_url, weight_metric, life_span, temperament, created_at
- favorites : id, user_id, animal_id, created_at
- breed_stats : id, breed_id, breed_name, animal_type, total_votes, upvotes, downvotes, top1_count, updated_at

## Réalisations
- Frontend React fonctionnel (accueil, recherche, favoris, tournoi, auth)
- Backend Express avec API REST sécurisée (JWT)
- Base PostgreSQL opérationnelle (schéma Neon conforme à la documentation)
- Documentation complète (OpenAPI, DBML, PlantUML, ADR)

## Points positifs
- Bonne séparation frontend/backend
- Authentification JWT robuste
- Utilisation de services et middlewares pour la clarté
- Documentation professionnelle générée

## Difficultés rencontrées
- Gestion CORS entre client et serveur
- Synchronisation des favoris/votes entre frontend et backend
- Prise en main de la DB PostgreSQL (requêtes, schéma)
- Gestion des erreurs API et UX

## Améliorations possibles
- Ajouter des tests automatisés (backend et frontend)
- CI/CD (lint, build, test, déploiement)
- Gestion des rôles utilisateurs (admin, user)
- Optimisation des requêtes SQL
- UI/UX plus avancée (animations, feedbacks)

## Enseignements
- Importance de la documentation et de la structuration du code
- Valeur des schémas (DB, API, diagrammes) pour la compréhension
- Nécessité de tests et d'automatisation pour la qualité
