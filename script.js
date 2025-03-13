document.addEventListener("DOMContentLoaded", () => {
    function getUserId() {
        if (!localStorage.getItem('user_id')) {
            const userId = 'user-' + Math.random().toString(36).substr(2, 9);
            localStorage.setItem('user_id', userId);
        }
        return localStorage.getItem('user_id');
    }

    const userId = getUserId();

    // Function to display user ID in the footer
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

    // Call the function to display user ID
    afficherUserId();
});
