document.addEventListener("DOMContentLoaded", () => {
    const navbarLinks = document.querySelectorAll("#navbar ul li a");
    const navbarHeight = document.querySelector("header").offsetHeight;
    const productImages = document.querySelectorAll("#produits .image-container"); // Sélectionner toutes les images des produits

    // Fonction pour vérifier si l'on est sur un appareil mobile
    function isMobile() {
        return window.innerWidth < 768; // Si la largeur de l'écran est inférieure à 768px, c'est un mobile
    }

    window.addEventListener("scroll", () => {
        let currentSection = "";
        document.querySelectorAll("section").forEach((section) => {
            const sectionTop = section.offsetTop - navbarHeight;
            if (pageYOffset >= sectionTop - 60) {
                currentSection = section.getAttribute("id");
            }
        });

        navbarLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(currentSection)) {
                link.classList.add("active");
            }
        });

        // Effet de scroll pour les images des produits (seulement sur mobile)
        if (isMobile()) {  // Si c'est un téléphone
            productImages.forEach((image) => {
                const rect = image.getBoundingClientRect(); // Position de l'image du produit
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    image.classList.add("visible"); // Ajouter la classe pour rendre l'image visible
                } else {
                    image.classList.remove("visible"); // Enlever la classe si l'image n'est pas visible
                }
            });
        }
    });

    // Vérifier la visibilité des produits dès que la page est chargée
    if (isMobile()) {
        productImages.forEach((image) => {
            const rect = image.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                image.classList.add("visible");
            }
        });
    }
});
