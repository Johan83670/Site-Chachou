// Importation des modules nécessaires
import express from "express";
import fetch from "node-fetch"; // Utilisation de l'import pour node-fetch
import bodyParser from "body-parser";
import cors from "cors";

const app = express();
const port = 3001;

app.use(cors());  // Utiliser CORS pour autoriser les requêtes depuis d'autres domaines
app.use(bodyParser.json()); // Middleware pour parser le JSON envoyé par le client

// Route pour traiter la requête de contact
app.post("/send-message", (req, res) => {
    const { name, email, subject, message } = req.body;

    // Vérifier que tous les champs sont remplis
    if (!name || !email || !subject || !message) {
        return res.status(400).json({ success: false, message: "Tous les champs doivent être remplis." });
    }

    // Créer le message à envoyer à Slack
    const slackMessage = {
        text: `Nouveau message de contact:\nNom: ${name}\nEmail: ${email}\nSujet: ${subject}\nMessage: ${message}`
    };

    const webhookUrl = "https://hooks.slack.com/services/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"; // Ton Webhook Slack

    // Envoyer le message à Slack
    fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(slackMessage)
    })
    .then(response => response.text())  // Récupérer la réponse de Slack en texte
    .then(data => {
        console.log("Réponse de Slack:", data);
        res.json({ success: true, message: "Message envoyé avec succès à Slack" }); // Répondre au client avec succès
    })
    .catch(error => {
        console.error("Erreur lors de l'envoi à Slack:", error);
        res.status(500).json({ success: false, message: "Erreur lors de l'envoi à Slack" }); // Répondre avec une erreur
    });
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
