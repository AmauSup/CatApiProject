# Documentation du projet Cat API

Ce dossier contient toute la documentation technique, produit, organisationnelle et architecturale du projet Cat API.


## Structure du dossier `docs/`

- `README.md` : Présentation et index de la documentation
- `architecture.md` : Vue d'ensemble de l'architecture technique
- `api/openapi.yaml` : Spécification OpenAPI (Swagger) de l'API backend
- `database/dbdiagram.dbml` : Schéma de la base de données (DBML)
- `diagrams/` : Diagrammes PlantUML (login, favoris, tournoi)
- `adr/` : Architecture Decision Records (choix techniques)
- `post-mortem.md` : Analyse post-mortem du projet
- `soutenance.md` : Support de soutenance/projet

### Structure de la base de données (Neon)

- **users** : id, username, email, password_hash, created_at
- **animals** : id, api_id, animal_type, breed_id, breed_name, image_url, weight_metric, life_span, temperament, created_at
- **favorites** : id, user_id, animal_id, created_at
- **breed_stats** : id, breed_id, breed_name, animal_type, total_votes, upvotes, downvotes, top1_count, updated_at

## Navigation rapide

- [Architecture](architecture.md)
- [API (OpenAPI)](api/openapi.yaml)
- [Base de données](database/dbdiagram.dbml)
- [Diagrammes](diagrams/)
- [ADR](adr/)
- [Post-mortem](post-mortem.md)
- [Soutenance](soutenance.md)
