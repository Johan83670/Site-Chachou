document.addEventListener("DOMContentLoaded", () => {
    const navbarLinks = document.querySelectorAll("#navbar ul li a");
    const navbarHeight = document.querySelector("header").offsetHeight;

    window.addEventListener("scroll", () => {
        let currentSection = "";
        document.querySelectorAll("section").forEach((section) => {
            const sectionTop = section.offsetTop - navbarHeight;
            if (window.pageYOffset >= sectionTop - 60) {
                currentSection = section.getAttribute("id");
            }
        });

        navbarLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(currentSection)) {
                link.classList.add("active");
            }
        });

        if (window.innerWidth <= 768) {
            // Sélectionne toutes les images des produits
            const productImages = document.querySelectorAll("#produits .image-container");
    
            // On ajoute un petit délai pour laisser le temps de charger la page
            setTimeout(() => {
                // On ajoute la classe 'visible' à chaque image après un délai pour lancer l'animation
                productImages.forEach((image) => {
                    image.classList.add("visible");
                });
            }, 500); // 500ms après le chargement de la page
        }
    });
});
