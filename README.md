
# Cat API Project

Application fullstack étudiante pour explorer, rechercher et voter pour des chats via The Cat API.

---

## Présentation
Cat API Project est une application web permettant de :
- Rechercher et afficher des chats (par race, catégorie)
- S’inscrire, se connecter (authentification JWT)
- Ajouter des chats en favoris
- Organiser des tournois de votes entre chats
- Visualiser des statistiques de votes par race

## Fonctionnalités principales
- Authentification sécurisée (JWT)
- Recherche multi-critères (race, catégorie)
- Gestion des favoris (ajout/suppression)
- Tournoi de votes (duels, classement)
- Statistiques agrégées par race
- UI réactive (React, Vite)


## Stack technique
- **Frontend** : React, Vite, React Router, Axios
- **Backend** : Node.js, Express, JWT, PostgreSQL (hébergé Neon)
- **API externe** : The Cat API

## Sécurité JWT

- L’authentification utilise des tokens JWT signés avec le secret `JWT_SECRET` (défini dans `.env`).
- Les tokens expirent après 7 jours (`expiresIn: '7d'`).
- Si le token est expiré, l’API retourne `401 Token expiré`. Si le token est invalide ou absent, l’API retourne `401 Token invalide` ou `401 Non authentifié`.
- **Ne jamais exposer le secret JWT** (voir `.env.example`).

Voir aussi l’ADR [004-choix-jwt](docs/adr/004-choix-jwt.md).

## Architecture globale

```
Utilisateur
	|
	v
[Frontend React] <-> [API Node.js/Express] <-> [PostgreSQL Neon]
											|
											v
								  [TheCatAPI]
```

Voir le diagramme PlantUML : docs/diagrams/architecture.puml

## Installation locale

### Prérequis
- Node.js >= 18
- npm >= 9
- Accès à une base PostgreSQL (Neon conseillé)

### 1. Cloner le projet
```bash
git clone <repo-url>
cd CatApiProject
```

### 2. Backend
```bash
cd server
npm install
cp .env.example .env # puis compléter les variables
npm run dev
```

### 3. Frontend
```bash
cd ../client
npm install
cp .env.example .env # puis compléter si besoin
npm run dev
```

## Variables d’environnement nécessaires

Voir `.env.example` à la racine et dans `server/` et `client/`.

Exemple pour le backend :
```
PORT=5050
CLIENT_ORIGIN=http://localhost:5173
CAT_API_KEY=your_cat_api_key_here
DATABASE_URL=postgresql://user:password@host:port/dbname?sslmode=require
JWT_SECRET=your_jwt_secret_here
```
Exemple pour le frontend :
```
VITE_API_BASE_URL=http://localhost:5050/api/cats
```

## Commandes utiles

### Backend
- `npm run dev` : Lancer le serveur en mode dev
- `npm run lint` : Linter le code (ESLint)
- `npm run format` : Formatter le code (Prettier)
- `npm test` : Lancer les tests (Jest/Supertest)

### Frontend
- `npm run dev` : Lancer le serveur Vite
- `npm run lint` : Linter le code (ESLint)
- `npm run format` : Formatter le code (Prettier)

## Structure du projet

- `client/` : Frontend React (src/, assets/, components/, pages/)
- `server/` : Backend Express (controllers/, routes/, services/, middlewares/)
- `docs/` : Documentation technique (OpenAPI, DBML, PlantUML, ADR)


## Documentation technique

- **Swagger/OpenAPI** : [docs/api/openapi.yaml](docs/api/openapi.yaml)
- **Schéma DB (DBML)** : [docs/database/dbdiagram.dbml](docs/database/dbdiagram.dbml)
- **Diagrammes PlantUML** : [docs/diagrams/](docs/diagrams/)
- **ADR (décisions archi)** : [docs/adr/](docs/adr/)
- **Seed DB** : [docs/database/seed.md](docs/database/seed.md)

**Note sur la route `/votes`** :
Il n’existe pas de table `votes` dans la base. La route `/votes` met à jour les compteurs de la table `breed_stats` (votes par race), mais ne stocke pas chaque vote individuellement.
Voir le code dans `server/services/voteService.js`.

## Captures d’écran

Si des captures sont disponibles, placez-les dans `client/src/assets/` et ajoutez-les ici :
![Accueil](client/src/assets/accueil.png)
![Recherche](client/src/assets/recherche.png)

## Auteurs / équipe

- Amaury (étudiant)
- Projet réalisé dans le cadre de SDV_B3

---

*Pour toute question, voir la documentation dans le dossier `docs/` ou contacter l’auteur.*
