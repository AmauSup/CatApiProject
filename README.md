# Cat API Project (Full Stack)

Projet étudiant simple en **React + Node.js + Express** autour de **The Cat API**.

## Structure

- `client/` : frontend React (Vite)
- `server/` : backend Express

## Installation

### 1) Backend

```bash
cd server
npm install
```

Créer un fichier `server/.env` à partir de `.env.example` avec :

- `PORT`
- `CLIENT_ORIGIN`
- `CAT_API_KEY`

Lancer le backend :

```bash
npm run dev
```

### 2) Frontend

```bash
cd client
npm install
```

Créer un fichier `client/.env` avec :

```env
VITE_API_BASE_URL=http://localhost:5050/api/cats
```

Lancer le frontend :

```bash
npm run dev
```

## Routes backend

- `GET /api/cats/random?limit=8`
- `GET /api/cats/search?breedId=beng&categoryId=5&limit=10`
- `GET /api/cats/breeds`
- `GET /api/cats/categories`

## Fonctionnalités incluses

- Page d'accueil avec images aléatoires
- Bouton recharger
- Page de recherche (race, catégorie, limite)
- États `chargement`, `erreur`, `aucun résultat`
