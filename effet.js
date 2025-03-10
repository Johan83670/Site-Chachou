document.addEventListener("DOMContentLoaded", () => {
    const navbarLinks = document.querySelectorAll("#navbar ul li a");
    const navbarHeight = document.querySelector("header").offsetHeight;

    // Fonction de gestion du scroll
    window.addEventListener("scroll", () => {
        let currentSection = "";

        // Parcours toutes les sections pour identifier celle en cours
        document.querySelectorAll("section").forEach((section) => {
            const sectionTop = section.offsetTop - navbarHeight;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (window.pageYOffset >= sectionTop - 60 && window.pageYOffset < sectionBottom - 60) {
                currentSection = section.getAttribute("id");
            }
        });

        // Mise à jour des liens de la navbar
        navbarLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(currentSection)) {
                link.classList.add("active");
            }
        });

        // Si la largeur de l'écran est inférieure à 768px, animation des images des produits
        if (window.innerWidth <= 768) {
            const productImages = document.querySelectorAll("#produits .image-container");

            // Détection du scroll pour ajouter la classe 'visible' lorsque l'image entre dans le viewport
            productImages.forEach((image) => {
                const imageTop = image.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;

                // Ajouter la classe visible si l'image est dans le viewport
                if (imageTop <= windowHeight * 0.8 && image.classList.contains("visible") === false) { 
                    image.classList.add("visible");
                }
            });
        }
    });
});
