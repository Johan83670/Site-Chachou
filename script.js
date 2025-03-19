document.addEventListener("DOMContentLoaded", () => {
    // Gestion de l'ID utilisateur
    function getUserId() {
        if (!localStorage.getItem('user_id')) {
            const userId = 'user-' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('user_id', userId);
        }
        return localStorage.getItem('user_id');
    }

    const userId = getUserId();

    // Affichage de l'ID utilisateur dans le footer
    function afficherUserId() {
        const footer = document.querySelector("footer");
        if (footer) {
            const userIdElement = document.createElement("div");
            userIdElement.textContent = `User ID: ${userId}`;
            userIdElement.style.fontSize = "10px";
            userIdElement.style.position = "absolute";
            userIdElement.style.bottom = "5px";
            userIdElement.style.left = "5px";
            footer.appendChild(userIdElement);
        }
    }

    afficherUserId();
});
