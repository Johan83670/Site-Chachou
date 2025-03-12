// Sélectionne les éléments
const boutonsAjout = document.querySelectorAll(".ajouter-panier");
const listePanier = document.getElementById("panier-liste");
const totalElement = document.getElementById("total");
const boutonVider = document.getElementById("vider-panier");
const nombreArticles = document.getElementById("nmb-article"); // ID à mettre à jour sur toutes les pages

// Panier stocké en localStorage
let panier = JSON.parse(localStorage.getItem("panier")) || [];

// Fonction pour mettre à jour l'affichage du panier
function afficherPanier() {
    listePanier.innerHTML = "";  // Réinitialiser l'affichage du panier
    let total = 0;

    if (panier.length === 0) {
        listePanier.textContent = "Votre panier est vide."; // Afficher un message si le panier est vide
    }

    panier.forEach((produit, index) => {
        let li = document.createElement("li");
        li.textContent = `${produit.nom} - ${produit.prix}€ x ${produit.quantite}`;

        // Bouton pour supprimer un article
        let boutonSupprimer = document.createElement("button");
        boutonSupprimer.textContent = "X";
        boutonSupprimer.addEventListener("click", () => {
            panier.splice(index, 1);  // Retirer l'article du panier
            mettreAJourPanier();  // Mettre à jour l'affichage du panier
            location.reload();
        });

        li.appendChild(boutonSupprimer);
        listePanier.appendChild(li);

        total += (produit.prix * produit.quantite);  // Calcul du total avec des nombres valides
    });

    totalElement.textContent = `Total: ${total}€`;  // Afficher le total
    localStorage.setItem("panier", JSON.stringify(panier));  // Sauvegarder le panier mis à jour dans le localStorage

    mettreAJourNombreArticles();  // Mettre à jour le nombre d'articles
}

// Fonction pour mettre à jour le nombre d'articles dans le panier
function mettreAJourNombreArticles() {
    let totalArticles = panier.reduce((acc, produit) => acc + produit.quantite, 0);
    const nombreArticles = document.getElementById("nmb-article");
    if (nombreArticles) {
        nombreArticles.textContent = totalArticles; // Mettre à jour le compteur d'articles
    }
}

// Fonction pour ajouter un produit au panier
boutonsAjout.forEach(bouton => {
    bouton.addEventListener("click", (e) => {
        let produitElement = e.target.parentElement;
        let id = produitElement.getAttribute("data-id");
        let nom = produitElement.getAttribute("data-nom");
        let prix = parseInt(produitElement.getAttribute("data-prix"));  // S'assurer que le prix est un entier

        let produitExistant = panier.find(p => p.id === id);

        if (produitExistant) {
            produitExistant.quantite++;  // Si le produit existe, augmenter la quantité
        } else {
            panier.push({ id, nom, prix, quantite: 1 });  // Ajouter le produit avec une quantité de 1
        }

        mettreAJourPanier();  // Mettre à jour l'affichage du panier
        mettreAJourNombreArticles();  // Mettre à jour le nombre d'articles dès que la page est chargée

    });
});

// Fonction pour vider le panier
if (boutonVider) {
    boutonVider.addEventListener("click", () => {
        panier = [];  // Réinitialiser le panier
        mettreAJourPanier();  // Mettre à jour l'affichage du panier
    });
}

// Fonction pour mettre à jour le panier (mise à jour du nombre d'articles dans le panier)
function mettreAJourPanier() {
    localStorage.setItem('panier', JSON.stringify(panier));  // Sauvegarder le panier dans localStorage
    afficherPanier();  // Mettre à jour l'affichage du panier
}

// Appeler la fonction à chaque fois que la page est chargée
document.addEventListener("DOMContentLoaded", () => {
    afficherPanier();     // Afficher le panier (si nécessaire sur certaines pages)
    mettreAJourNombreArticles();  // Mettre à jour le nombre d'articles dès que la page est chargée
});
