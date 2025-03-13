// Charger Stripe avec la clé publique
const stripe = Stripe("TA_CLE_PUBLIQUE_STRIPE");

document.addEventListener("DOMContentLoaded", () => {
    const button = document.querySelector("#payer"); // Bouton de paiement

    button.addEventListener("click", async () => {
        const response = await fetch("/create-checkout-session", { method: "POST" });
        const session = await response.json();

        // Redirection vers la page de paiement Stripe
        stripe.redirectToCheckout({ sessionId: session.id });
    });
});
