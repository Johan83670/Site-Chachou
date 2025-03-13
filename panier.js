document.addEventListener("DOMContentLoaded", () => {
    const boutonsAjout = document.querySelectorAll(".ajouter-panier");
    const listePanier = document.getElementById("panier-liste");
    const totalElement = document.getElementById("total");
    const boutonVider = document.getElementById("vider-panier");
    const nombreArticles = document.getElementById("nmb-article");

    function getUserId() {
        if (!localStorage.getItem('user_id')) {
            const userId = 'user-' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('user_id', userId);
        }
        return localStorage.getItem('user_id');
    }

    const userId = getUserId();
    let panier = JSON.parse(localStorage.getItem('panier-' + userId)) || [];

    function afficherPanier() {
        listePanier.innerHTML = "";
        let total = 0;

        if (panier.length === 0) {
            listePanier.textContent = "Votre panier est vide.";
        } else {
            panier.forEach((produit, index) => {
                let li = document.createElement("li");
                li.textContent = `${produit.nom} - ${produit.prix}€ x ${produit.quantite}`;

                let boutonSupprimer = document.createElement("button");
                boutonSupprimer.textContent = "X";
                boutonSupprimer.addEventListener("click", () => {
                    panier = panier.filter(p => p.id !== produit.id);
                    afficherPanier();  
                });

                li.appendChild(boutonSupprimer);
                listePanier.appendChild(li);

                total += (produit.prix * produit.quantite);
            });
        }

        totalElement.textContent = `Total: ${total}€`;
        localStorage.setItem('panier-' + userId, JSON.stringify(panier));

        mettreAJourNombreArticles();
    }

    function mettreAJourNombreArticles() {
        let totalArticles = panier.reduce((acc, produit) => acc + produit.quantite, 0);
        if (nombreArticles) {
            nombreArticles.textContent = totalArticles;
        }
    }

    boutonsAjout.forEach(bouton => {
        bouton.addEventListener("click", (e) => {
            let produitElement = e.target.closest(".produit"); // Vérifie si l'élément parent est trouvé
            if (!produitElement) {
                console.error("Erreur : élément produit non trouvé !");
                return;
            }

            let id = produitElement.getAttribute("data-id");
            let nom = produitElement.getAttribute("data-nom");
            let prix = parseInt(produitElement.getAttribute("data-prix"));

            if (!id || !nom || isNaN(prix)) {
                console.error("Erreur : données produit incorrectes !");
                return;
            }

            let produitExistant = panier.find(p => p.id === id);

            if (produitExistant) {
                produitExistant.quantite++;
            } else {
                panier.push({ id, nom, prix, quantite: 1 });
            }

            localStorage.setItem('panier-' + userId, JSON.stringify(panier));
            afficherPanier();
        });
    });

    if (boutonVider) {
        boutonVider.addEventListener("click", () => {
            panier = [];
            localStorage.setItem('panier-' + userId, JSON.stringify(panier));
            afficherPanier();
        });
    }

    afficherPanier();
});
