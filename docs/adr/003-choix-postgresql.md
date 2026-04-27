# 003 – Choix PostgreSQL

## Contexte
Le projet nécessite une base de données relationnelle robuste, open source, avec de bonnes performances et des fonctionnalités avancées (index, contraintes, transactions).

## Décision
Utiliser PostgreSQL comme SGBD principal pour stocker les utilisateurs, animaux, favoris, statistiques de votes.

## Conséquences
- Intégrité des données assurée
- Support des index, contraintes, transactions
- Facilité d’hébergement sur Neon

## Alternatives considérées
- MySQL
- SQLite
