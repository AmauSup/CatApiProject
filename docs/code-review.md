# Code Review & Workflow Git – CatApiProject

## Stratégie de branches

- `main` : branche stable, livrable, déployable
- `feature/*` : chaque fonctionnalité ou évolution majeure a sa propre branche (ex : `feature/auth`, `feature/tournoi`)
- `fix/*` : corrections de bugs
- `docs/*` : documentation

## Workflow utilisé

1. Création d’une branche pour chaque fonctionnalité ou correction
2. Développement et commits réguliers sur la branche
3. Relecture du code (auto-review ou peer review)
4. Merge dans `main` après validation
5. Résolution des conflits éventuels

## Validation et review

- Chaque merge dans `main` est précédé d’une relecture (review croisée entre membres ou auto-review si projet individuel)
- Utilisation de `git diff`, `git log`, et `git status` pour vérifier les changements
- Tests exécutés avant chaque merge
- Documentation mise à jour avant merge

## Justification réaliste (projet étudiant)

- Projet réalisé en binôme ou individuel
- Les reviews sont faites en binôme ou par un tiers (enseignant, pair)
- Les merges sont validés après relecture et tests
- Si le projet est individuel, l’auto-review est documentée (relecture, correction, validation des tests)

## Exemple de commandes utilisées

```bash
git checkout -b feature/auth
# développement, commits
# ...
git add .
git commit -m "feat(auth): ajout login/signup"
git checkout main
git merge feature/auth
# résolution de conflits si besoin
git push origin main
```

## Preuve de review

- Historique des merges et branches visible dans `git log --graph --all`
- Commits signés et messages explicites
- Documentation de la démarche ici pour la soutenance
