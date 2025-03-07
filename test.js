const webhookUrl = "https://hooks.slack.com/services/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"; // Ton Webhook URL

// Message que tu souhaites envoyer
const slackMessage = {
    text: "Ceci est un test pour vérifier l'API Slack !"
};

// Envoi du message
fetch(webhookUrl, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(slackMessage)
})
.then(response => response.text()) // Convertir la réponse en text brut
.then(data => {
    console.log("Réponse Slack:", data);  // Affiche la réponse dans la console
})
.catch(error => {
    console.error("Erreur lors de l'envoi à Slack:", error);
});

