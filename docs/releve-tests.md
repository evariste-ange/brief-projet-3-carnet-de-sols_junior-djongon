# Relevé des tests

> Écrivez le résultat attendu avant d'essayer. Un écart n'est pas une faute : notez-le, corrigez, refaites le test.

**Calculs à la main** : 

Nombre total d’observations : 10
pH minimum	4,8 - observation S04
pH maximum	7,6 - observation S08
Nombre de sols sableux : 3
Nombre de sols limoneux : 4
Nombre de sols argileux : 3
Points dont le pH est strictement inférieur à 5,5	S01, S04, S06, S09

#Vérification du comptage par texture 

Sableux : S01, S04, S08 = 3 observations
Limoneux : S02, S05, S07, S10 = 4 observations
Argileux : S03, S06, S09 = 3 observations

#Les observations dont le pH est strictement inférieur à 5,5

Observation 1
id : S01
parcelle : sableux
texture : 
pH : 5.2

Observation 4
id : S04
parcelle : sableux
texture :
pH : 4.8

Observation 6
id : S06
parcelle : argileux
texture :
pH : 5.4

Observation 9
id : S09
parcelle : argileux
texture :
pH : 5.1

**Essais dans le menu** : un ajout valide (encore là après redémarrage), chaque règle refusée, une recherche introuvable, chaque tri, la synthèse, un choix inconnu.

| Action | Attendu | Obtenu | Testeur |
| --- | --- | --- | --- |
| ✏️ | | | |
| ✏️ | | | |
| ✏️ | | | |
| ✏️ | | | |
| ✏️ | | | |
| ✏️ | | | |

**Sur un autre poste** (`git clone`, `node app.js`, `npm test`, en suivant le README) : ✏️
