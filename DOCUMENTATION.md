# Documentation technique Cat API Project

Ce document centralise la documentation technique du projet.

## Sommaire
- [Architecture](docs/architecture.md)
- [API (OpenAPI)](docs/api/openapi.yaml)
- [Base de données (DBML)](docs/database/dbdiagram.dbml)
- [Diagrammes PlantUML](docs/diagrams/)
- [ADR – Décisions d'architecture](docs/adr/)
- [Post-mortem](docs/post-mortem.md)
- [Soutenance](docs/soutenance.md)


## Description rapide

- **Frontend** : React (Vite), SPA, gestion d'état locale, appels API REST
- **Backend** : Node.js, Express, API REST, JWT Auth, PostgreSQL
- **Base de données** : PostgreSQL, tables users, animals, favorites, breed_stats

### Structure de la base de données (Neon)

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

## Navigation

- [README du projet](README.md)
- [Documentation technique](DOCUMENTATION.md)
- [Architecture détaillée](ARCHITECTURE.md)
- [Post-mortem](POST_MORTEM.md)

## Voir aussi

- [docs/README.md](docs/README.md) : Index de la documentation
- [docs/architecture.md](docs/architecture.md) : Architecture technique
- [docs/api/openapi.yaml](docs/api/openapi.yaml) : Spécification OpenAPI
- [docs/database/dbdiagram.dbml](docs/database/dbdiagram.dbml) : Schéma DB
- [docs/diagrams/](docs/diagrams/) : Diagrammes PlantUML
- [docs/adr/](docs/adr/) : ADR
- [docs/post-mortem.md](docs/post-mortem.md) : Post-mortem
- [docs/soutenance.md](docs/soutenance.md) : Soutenance
