document.querySelector('.menu-toggle').addEventListener('click', function (e) {
    e.stopPropagation();  // Empêche la propagation pour ne pas fermer le menu immédiatement
    const menu = document.getElementById('menu');
    menu.classList.toggle('active');  // Toggle de la classe active pour afficher/masquer le menu
});

// Lorsque vous cliquez sur un lien du menu, le menu reste ouvert
document.querySelectorAll('#menu a').forEach(function(link) {
    link.addEventListener('click', function(e) {
        e.stopPropagation();  // Empêche la propagation pour ne pas fermer le menu
        const menu = document.getElementById('menu');
        menu.classList.remove('active');  // Ferme le menu après avoir cliqué sur un lien
    });
});

// Lorsque vous cliquez n'importe où en dehors du menu, il se ferme
document.addEventListener('click', function (e) {
    const menu = document.getElementById('menu');
    const menuToggle = document.querySelector('.menu-toggle');

    if (!menu.contains(e.target) && !menuToggle.contains(e.target)) {
        menu.classList.remove('active');  // Ferme le menu si on clique en dehors
    }
});