document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Empêche le rechargement de la page lors de la soumission

    // Désactiver le bouton pour éviter plusieurs soumissions
    const submitButton = document.querySelector("button[type='submit']");
    submitButton.disabled = true;

    // Récupérer les valeurs des champs du formulaire
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;

    // Créer l'objet de message à envoyer au serveur
    const formData = {
        name: name,
        email: email,
        subject: subject,
        message: message
    };

    // Envoyer les données du formulaire au serveur local
    fetch("http://localhost:3001/send-message", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())  // On suppose que le serveur renvoie une réponse JSON
    .then(data => {
        if (data.success) {
            // Si le serveur a renvoyé une réponse de succès, afficher un message de confirmation
            const confirmationMessage = document.createElement('div');
            confirmationMessage.innerText = "Votre message a été envoyé avec succès !";
            confirmationMessage.style.backgroundColor = "#4CAF50"; // Vert pour succès
            confirmationMessage.style.color = "white";
            confirmationMessage.style.padding = "10px";
            confirmationMessage.style.textAlign = "center";
            confirmationMessage.style.marginTop = "20px";
            document.body.appendChild(confirmationMessage);

            // Réinitialiser le formulaire
            document.getElementById("contactForm").reset();

            // Après un délai, rediriger vers la page d'accueil
            setTimeout(() => {
                window.location.href = "index.html";
            }, 5000); // Redirige après 3 secondes
        } else {
            // Si le serveur a renvoyé une erreur
            alert("Une erreur est survenue lors de l'envoi du message.");
        }
    })
    .catch(error => {
        console.error("Erreur lors de l'envoi à Slack:", error);
        alert("Une erreur est survenue, veuillez réessayer plus tard.");
    })
    .finally(() => {
        // Réactiver le bouton d'envoi après la requête
        submitButton.disabled = false;
    });
});
