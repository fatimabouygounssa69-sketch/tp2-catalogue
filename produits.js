const produits = [
  { id: 1, nom: 'Clavier', categorie: 'Accessoires', prix: 120, stock: 5 },
  { id: 2, nom: 'Souris', categorie: 'Accessoires', prix: 80, stock: 8 },
  { id: 3, nom: 'Écran', categorie: 'Informatique', prix: 900, stock: 0 },
  { id: 4, nom: 'Casque', categorie: 'Accessoires', prix: 240, stock: 3 }
];

// Défi : vérifie que prix et stock sont des nombres finis et non négatifs
function estValide(p) {
  return Number.isFinite(p.prix) && p.prix >= 0 &&
         Number.isFinite(p.stock) && p.stock >= 0;
}

function produitsDisponibles(liste) {
  return liste.filter((p) => estValide(p) && p.stock > 0);
}

function valeurStock(liste) {
  return liste.reduce((total, p) => total + p.prix * p.stock, 0);
}

function moinsCher(liste) {
  if (liste.length === 0) return null;
  return liste.reduce((min, p) => (p.prix < min.prix ? p : min));
}

function resume(liste) {
  return liste.map((p) => `${p.nom} - ${p.prix} MAD - ${p.stock} unités`);
}

function analyser(titre, liste) {
  console.log(`--- ${titre} ---`);

  const dispo = produitsDisponibles(liste);
  console.log('Disponibles :', dispo.length);
  console.log('Valeur du stock :', valeurStock(liste), 'MAD');
  const min = moinsCher(dispo);
  if (min === null) {
    console.log('Aucun produit disponible');
  } else {
    const { nom, prix } = min; // déstructuration
    console.log(`Moins cher : ${nom} (${prix} MAD)`);
  }
}

// 1. Affichage du catalogue
produits.forEach((p) => console.log(`${p.nom} : ${p.prix} MAD`));

// 5. Résumé
resume(produits).forEach((ligne) => console.log(ligne));

// 2, 3, 4 : résultats de référence
analyser('Catalogue complet', produits);

// Cas de test imposés (copies, sans modifier les objets de départ)
console.log(produitsDisponibles(produits).some((p) => p.nom === 'Écran')); // false
analyser('Tous les stocks à zéro', produits.map((p) => ({ ...p, stock: 0 })));
analyser('Catalogue vide', []);
console.log(produits.every(estValide)); // true