# Dictionnaire des données

> Un champ par ligne, d'après `SUJET.md` et le fichier de `donnees/`. La première ligne sert de modèle.

| Champ | Signification | Type | Règle de validation | Unité | Exemple |
| --- | --- | --- | --- | --- | --- |
| `id` | Identifiant unique | texte | non vide, absent des données | — | S01 |
| `parcelle`| Nom ou référence de la parcelle observée | Chaîne de caractères (string) | Ne doit pas être vide | - | P1 |
| `texture` | Texture du sol observée | Chaîne de caractères (string) | Valeur autorisée : sableux, limoneux ou argileux | - | sableux |
| `pH` | Valeur du potentiel hydrogène mesurée dans le sol | Nombre (number) | Doit être un nombre compris entre 0 et 14 | - | 7 |
| `etatHumidite` | État d’humidité observé du sol | Chaîne de caractères (string) | Valeur autorisée : sec, intermédiaire ou humide | - | sec |

**Listes de valeurs autorisées** : 

#TEXTURE DU SOL

sableux
limoneux
argileux

#ETAT HUMIDITE

sec
intermédiaire
humide

#ID

Concaténation de caratère et d'entier formant une chaine de caractère, sous le format 'S01'

#PARCELLE

Concaténation de caratère et d'entier formant une chaine de caractère, sous le format 'P1'

#PH

Le pH est une valeur numérique comprise entre 0 et 14.

L’application permet également d’identifier les observations dont le pH est strictement inférieur à 5,5, conformément au seuil défini dans le projet.

**Sources** : 

Dossier : donnees
fichier : observation.json 

SUJET.md 
