// Carnet d'observation des sols — point d'entrée : le menu.
// À vous d'écrire tout le menu : accueil, chargement des données, menu affiché avant chaque choix,
// actions, sortie et gestion des erreurs. Comportement et textes imposés : fiches/3-ajouter-lister.md.
// Lancer : node app.js
import { demander, fermerSaisie, ouvrirSaisie } from './src/saisie.js'; 
import { chargerJson, enregistrerJson } from './src/stockage.js';
import { HUMIDITES, TEXTURES, ajouterObservation, formaterObservation, listerObservations, trouverParId } from './src/registre.js';
import { filtrerParParcelle, filtrerParTexture, trierParPh } from './src/recherche.js';
import { SEUIL_PH_A_DISCUTER, compterParTexture, phMinMax, pointsADiscuter } from './src/synthese.js';

import {
  modifierObservation,
  supprimerObservation,
  trierParPhDecroissant
} from "./src/bonus.js";

const FICHIER_DONNEES = 'donnees/observations.json';
let observations = []

async function main() {
  ouvrirSaisie();

  try {
    console.log("==================================================");
    console.log("Ferme pédagogique");
    console.log("==================================================");

    try {
      observations = await chargerJson(FICHIER_DONNEES);
      console.log(observations.length, "observations chargées depuis", FICHIER_DONNEES);
    } catch(erreur) {
      console.log("Impossible de lire", FICHIER_DONNEES, erreur.message, "Le carnet démarre vide");
    }

    let continuer = true

    while (continuer) {
      console.log("--------------------- MENU ---------------------");
      console.log("1. Ajouter une observation");
      console.log("2. Lister les observations");
      console.log("3. Rechercher (point, parcelle, texture)");
      console.log("4. Trier par pH");
      console.log("5. Synthèse des observations");
      console.log("6. Supprimer une observation");
      console.log("7. Modifier une observation");
      //console.log("8. Afficher la texture la plus fréquente");
      console.log("0. Quitter");

      const choix = await demander("Votre choix : ");

      if( choix === null ) {
        break;
      }

      try {
        switch (choix) {
          case "1" : await ajouter();
          break;

          case "2" : console.log("--------------------- Liste des observations", (observations.length), "---------------------");
          console.log(listerObservations(observations));
          break;

          case "3" : await rechercher();
          break;

          case "4" : 
          console.log("--------------------- Trier ---------------------");
          console.log("1. Par pH croissant");
          console.log("2. Par pH décroissant");
          const choixTri = await demander("Votre choix : ");
          if (choixTri === null){break}
          if (choixTri === "1") {
            const resultat = trierParPh(observations);
            console.log(listerObservations(resultat));
          } else if ( choixTri === "2") {
            const resultat2 = trierParPhDecroissant(observations);
            console.log(listerObservations(resultat2))
          } else {
          console.log("choix inconnu :  retour au menu.");
          
          }
          break;

          case "5" : afficherSynthese();
          break;

          case "6" : 
          const id = await demander("Identifiant à supprimer : ");
          if (id === null) return;

          const observationSupprimee = supprimerObservation(observations, id);
          if(observationSupprimee === null) {
            console.log("Observation introuvable.");
          } else {
            await enregistrerJson(FICHIER_DONNEES, observations);
            console.log("Observation supprimée avec succès.");
          }
          break;

          case "7" : await modifier()
          break;

          case "0" : 
          console.log("Au revoir !");
          continuer = false;
          break;

          default : 
          console.log("Le choix", choix, "est inconnu.", "Tapez un chiffre du menu.");

        }
      } catch (erreur) {
        if (erreur.message.startsWith("TODO")) {
          console.log("À compléter : ", message.erreur);
        } else {
          console.log("Erreur inattendue : ", erreur.message);
        }
      }
    }

  } finally {
  fermerSaisie();
  }
}

//fonction pour ajouter une observation
async function ajouter() {
  console.log("\n--------------------- Ajouter une observation ---------------------");

  const id = await demander("Point observé (ex. S11) : ");
  if (id === null) return;

  const parcelle = await demander("Parcelle (ex. P1) : ");
  if (parcelle === null) return;

  const texture = await demander("Texture : ", TEXTURES.join(","));
  if (texture === null) return;

  const pH = await demander("pH (nombre de 0 à 14, sans unité, virgule acceptée) : ");
  if (pH === null) return;

  const etatHumidite = await demander("etatHumidite : ", HUMIDITES.join(","));
  if (etatHumidite === null) return;

  const saisie = {
    id : id.toUpperCase(),
    parcelle : parcelle.toUpperCase(),
    texture : texture.toLowerCase(),
    pH : pH,
    etatHumidite : etatHumidite.toLowerCase()
  };

  const erreurs = ajouterObservation(observations, saisie);
  if (erreurs.length > 0) {
    console.log("Observation refusée")

    for (const erreur of erreurs) {
      console.log("-",erreur);
    }
    console.log("Le carnet compte toujours", observations.length, "observations.");
    return;
  }

  await enregistrerJson(FICHIER_DONNEES, observations);
  console.log("Observation", saisie.id, "ajoutée. Le carnet compte", observations.length, "observations");

}

//fonction modifier une observation
async function modifier() {
  console.log("\n--------------------- Ajouter une observation ---------------------");
  const saisie = await demander("Point à modifier : ");
  if(saisie === null) return;

  const id = saisie.toUpperCase();
  const observation =trouverParId(observations, id);

  if(observation === undefined) {
    console.log("L'observation", id, "est introuvable");
    return;
  }

  console.log(formaterObservation(observation, id));
  console.log("champ à modifier : ");
  console.log("1. parcelle");
  console.log("2. texture");
  console.log("3. pH");
  console.log("4. Etat d'humidité");

  const choixChamp = await demander("Votre choix : ");
  if(choixChamp === null) return;

  let champ;
  let invite;
  switch(choixChamp) {
    case "1" : {
      champ = "parcelle";
      invite = "Nouvelle parcelle";
    }
    break;

    case "2" : {
      champ = "texture";
      invite = "Nouvelle texture : ( ", TEXTURES.join(","), ")";
    }
    break;

    case "3" : {
      champ = "pH";
      invite = "Nouveau pH : ";
    }
    break;

    case "4" : {
      champ = "etatHumidite";
      invite = "Nouvelle humidité : ( ", HUMIDITES.join(","), ")";
    }
    break;

    default : {
      console.log("choix inconnu : retour au menu");
    }
    return;
  }

  const saisieValeur = await demander(invite);
  if (saisieValeur === null) {
  return;
  }
  let valeur = saisieValeur;
  if (champ === "parcelle") {
    valeur = saisieValeur.toUpperCase();
  }
  
  if (champ === "texture" || champ === "etatHumidite") {
      valeur = saisieValeur.toUpperCase();
  }

  const erreurs = modifierObservation(observations, id, champ, valeur);
  if (erreurs.length > 0) {
    console.log("Modification refusée")

    for (const erreur of erreurs) {
      console.log(erreur);
    }
  return;
  }

  await enregistrerJson(FICHIER_DONNEES, observations);
  console.log("observation", id, "à été modifiée");
}

//fonction pour rechercher une observation
async function rechercher() {
  console.log("\n--------------------- Rechercher ---------------------");
  console.log("1. Par point (identifiant)");
  console.log("2. Par parcelle");
  console.log("3. Les observations d'une texture");

  const choix = await demander("Votre choix : ");

  if (choix === null) return;
    
  if (choix === "1") {
    const id = await demander("Point : ");
    if (id === null) return;

    const observation = trouverParId(observations, id.toUpperCase());

    if (observation)  {
      console.log(formaterObservation(observation));
    } else {
      console.log("observation", id.toUpperCase(), "introuvable.");
    }
  } else if (choix === "2") {
    const parcelle = await demander("Parcelle : ");
    if (parcelle === null) return;

    const resultat = filtrerParParcelle(observations, parcelle.toUpperCase());

    console.log(resultat.length, "observations sur la parcelle", parcelle.toUpperCase(), ":");
    if (resultat.length > 0) {
      console.log(listerObservations(resultat));
    }
  } else if (choix === "3") {
    const texture = await demander("Texture : ");
    if (texture === null) return;

    const resultat = filtrerParTexture(observations, texture.toLowerCase());

    console.log(resultat.length, "observations de texture", texture.toLowerCase(), ":");
    if (resultat.length > 0) {
      console.log(listerObservations(resultat));
    }
  }else {
    console.log("choix inconnu : retour au menu.");
  }
}

//fonction pour afficher la synthese
async function afficherSynthese() {
  console.log("\n--------------------- Synthèse des opérations ---------------------");

  console.log("Nombre d'observations : ", observations.length)

  const resultat = phMinMax(observations)

  if (resultat === null) {
    console.log("pH minimum et maximum : aucune idée");
  } else {
    console.log("pH minimum : ", resultat.min, "pH maximum : ", resultat.max);
  }

  console.log("Observation par texture : ")

  const comptage = compterParTexture(observations);
  for (const texture in comptage) {
    console.log(texture, comptage[texture]);
  }

  const points = pointsADiscuter(observations, SEUIL_PH_A_DISCUTER);

  console.log("Point à discuter avec le coach ( pH < ",SEUIL_PH_A_DISCUTER," ) :", points.length);

  if (points.length > 0) {
    console.log(listerObservations(points));
  }

  console.log("Rappels : le pH est sans unité. Aucune moyenne de pH n'est calculée (échelle logarithmique).");
  console.log("Ces points ne sont pas un diagnostic de fertilisation : ils servent à préparer l'échange avec le coach.")
}

main();
