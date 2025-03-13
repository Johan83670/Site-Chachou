if (!localStorage.getItem('user_id')) {
    const userId = 'user-' + Math.random().toString(36).substr(2, 9); // Génère un ID unique
    localStorage.setItem('user_id', userId);
}

const userId = localStorage.getItem('user_id');
console.log('User ID:', userId);

// Utilise l'ID pour personnaliser la page, par exemple :
document.body.insertAdjacentHTML('beforeend', `<p>Votre ID utilisateur est : ${userId}</p>`);
