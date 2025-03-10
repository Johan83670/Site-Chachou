document.addEventListener("DOMContentLoaded", () => {
    const navbarLinks = document.querySelectorAll("#navbar ul li a");
    const navbarHeight = document.querySelector("header").offsetHeight;
    const productImages = document.querySelectorAll("#produits .image-container"); // Sélectionner toutes les images des produits

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

        // Effet de scroll pour les images des produits
        if (window.innerWidth < 768) {  // Si c'est un téléphone
            productImages.forEach((image) => {
                const rect = image.getBoundingClientRect(); // Position de l'image du produit
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    image.classList.add("visible");
                } else {
                    image.classList.remove("visible");
                }
            });
        }
    });
});
