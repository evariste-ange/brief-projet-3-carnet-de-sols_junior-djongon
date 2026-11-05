# Carnet d'observation des sols

> Projet individuel du SAS DFS, brief 3 (sujet : [SUJET.md](SUJET.md)). 

## Contexte

Le carnet d'observation des sols est un outil destiné aux agents agricoles et techniciens de terrain qui réalisent des prélèvements d'informations sur des parcelles cultivées afin de constituer un relevé organisé. l'utilisateur saisit l'identifiant de l'observation, la parcelle concernée, la texture du sol, son pH et son état d'humidité. Le programme enregistre ces informations dans un fichier JSON afin de les conserver entre plusieurs utilisations.Il peut donc les manipuler selon le besoin.Il ne diagnostic pas et ne recommande pas de traitement.


## Prérequis et lancement

- Node.js 20 ou plus récent, Git ; aucune bibliothèque à installer.

```bash
git clone https://github.com/VOTRE-COMPTE/brief-3-carnet-sols.git
cd brief-3-carnet-sols
node app.js
npm test
```

Sous PowerShell, si `npm` est bloqué : `npm.cmd test`.

## Fonctionnalités

- [x] Données lues et enregistrées dans `donnees/observations.json`
- [x] Ajouter une observation, saisies invalides refusées sans arrêter le programme
- [x] Lister les observations, message si le carnet est vide
- [x] Rechercher par point ou par parcelle ; filtrer par texture
- [x] Trier par pH
- [x] Synthèse : pH minimum et maximum, nombre par texture, points à discuter (pH < 5,5)
- [x] Bonus : supprimer et modifier une observation (choix 6 et 7)
- [x] Bonus : tri par pH décroissant, texture la plus fréquente

## Données

.\donnees\observations.json
Nombre total d’observations : 10
Les champs : id, parcelle, texture, pH, etatHumidite
Le pH : compris entre 0 et 14 (inclus)

NB : les valeurs utilisées sont fictives.

## Limites

1. le carnet fonctionne uniquement en ligne de commande
2. le carnet ne permet pas de joindre des photos aux observations
3. le carnet ne permet pas d'exporter les observations pour des analyses 

## Documents

[Dictionnaire des données](docs/dictionnaire-donnees.md) · [Tâches](docs/taches.md) · [Relevé des tests](docs/releve-tests.md) · [Journal de recherche](docs/journal-recherche.md) · [Fiche agronomique](docs/fiche-agronomique.md) · [Fiche individuelle](docs/fiche-individuelle.md)

## Auteur

Junior DJONGON, https://github.com/evariste-ange 

Aide : 
KAMAGATE ABDALA / débogage de l'app 
KONE FATOUMATA ( classe A ) / aide pour intégré la fonctionnalité modifierObservation à l'app
