# 004 – Choix JWT

## Contexte
Le projet nécessite une authentification stateless, adaptée à une SPA, permettant de sécuriser les routes API et de stocker le token côté client.

## Décision
Utiliser JWT pour l’authentification et l’autorisation des utilisateurs.

## Conséquences
- Auth stateless (pas de session serveur)
- Facilité d’intégration avec React
- Sécurité dépendante de la gestion du secret

## Alternatives considérées
- Sessions serveur (cookie)
- OAuth2
