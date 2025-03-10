document.addEventListener("DOMContentLoaded", () => {
    const navbarLinks = document.querySelectorAll("#navbar ul li a");
    const navbarHeight = document.querySelector("header").offsetHeight;

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
    });

    // 💡 Ajout de l'effet de scroll sur les produits SEULEMENT sur mobile
    if (window.innerWidth < 768) {
        const products = document.querySelectorAll(".image-container");

        function checkVisibility() {
            products.forEach((product) => {
                const rect = product.getBoundingClientRect();
                if (rect.top < window.innerHeight - 100 && rect.bottom > 0) {
                    product.classList.add("visible");
                }
            });
        }

        // On écoute l'événement de scroll uniquement sur mobile
        window.addEventListener("scroll", checkVisibility);
        checkVisibility(); // Vérifie au chargement de la page
    }
});

