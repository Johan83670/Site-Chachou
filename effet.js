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
    });

    if (window.innerWidth <= 768) {  // Appliquer l'effet uniquement sur mobile
        const productImages = document.querySelectorAll("#produits .image-container");

        window.addEventListener("scroll", () => {
            productImages.forEach((image) => {
                const rect = image.getBoundingClientRect();
                // Si l'image est dans la fenêtre de visualisation, on applique la classe visible
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    image.classList.add("visible");
                } else {
                    image.classList.remove("visible");
                }
            });
        });
    }
});

