// Rechercher et trier les observations.
// Fiche : fiches/4-rechercher-trier.md · Vérifier : npm run test:recherche

// Renvoie un NOUVEAU tableau avec les observations de cette parcelle (éventuellement vide).
export function filtrerParParcelle(observations, parcelle) {
  const observationParcelle = observations.filter(observation => observation.parcelle === parcelle)
  return observationParcelle
}

// Renvoie un NOUVEAU tableau avec les observations de cette texture (éventuellement vide).
export function filtrerParTexture(observations, texture) {
  const observationTexture = observations.filter(observation => observation.texture === texture)
  return observationTexture
}

// Renvoie une COPIE triée par pH croissant, avec un comparateur numérique.
// Le tableau reçu ne doit pas changer d'ordre. Deux observations de même pH gardent leur ordre d'origine.
export function trierParPh(observations) {
  return observations.toSorted((a, b) => a.pH - b.pH)
}

export function trierParPhDecroissant(observations) {
  return observations.toSorted((a, b) => b.pH - a.pH)
}
