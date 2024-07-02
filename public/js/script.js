document.addEventListener('DOMContentLoaded', () => {
    const envoyerBtn = document.getElementById('envoyerBtn');

    envoyerBtn.addEventListener('click', () => {
        const nomUtilisateur = document.getElementById('nomUtilisateur').value.trim(); // Récupérer le nom de l'utilisateur et enlever les espaces en début et fin
        const commentaire = document.getElementById('commentaire').value.trim(); // Récupérer le commentaire et enlever les espaces en début et fin

        if (!nomUtilisateur || !commentaire) { // Vérifier si les champs sont vides
            alert('Veuillez saisir votre nom et votre commentaire.');
            return;
        }

        fetch('/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nom: nomUtilisateur, commentaire: commentaire })
        })
        .then(response => response.text())
        .then(data => {
            alert(data); // Afficher un message de confirmation
            document.getElementById('nomUtilisateur').value = ''; // Réinitialiser le champ du nom
            document.getElementById('commentaire').value = ''; // Réinitialiser le champ du commentaire
            chargerCommentaires(); // Recharger les commentaires après ajout
        })
        .catch(error => {
            console.error('Erreur lors de l\'enregistrement du commentaire:', error);
        });
    });

    chargerCommentaires(); // Appeler la fonction pour charger les commentaires au chargement de la page
});

function chargerCommentaires() {
    fetch('/comments') // Effectuer une requête GET pour récupérer les commentaires
    .then(response => response.json()) // Convertir la réponse en JSON
    .then(data => {
        const commentairesDiv = document.getElementById('commentaires'); // Sélectionner la div où afficher les commentaires
        commentairesDiv.innerHTML = ''; // Vider le contenu actuel pour éviter les duplications

        data.forEach((commentaireObj, index) => { // Pour chaque commentaire reçu
            const divCommentaire = document.createElement('div'); // Créer un élément div pour le commentaire
            divCommentaire.classList.add('commentaire'); // Ajouter la classe 'commentaire'

            const contenuCommentaire = document.createElement('div'); // Créer un élément div pour le contenu du commentaire
            contenuCommentaire.classList.add('contenu-commentaire'); // Ajouter la classe 'contenu-commentaire'
            contenuCommentaire.textContent = commentaireObj.commentaire; // Définir le texte du contenu du commentaire

            divCommentaire.appendChild(contenuCommentaire); // Ajouter le contenu du commentaire au commentaire

            const divUtilisateur = document.createElement('div'); // Créer un élément div pour l'utilisateur
            divUtilisateur.classList.add('utilisateur'); // Ajouter la classe 'utilisateur'

            const profileImage = document.createElement('img'); // Créer un élément img pour l'image de profil
            profileImage.src = '/images/Manuella.jpg'; // Définir l'URL de l'image de profil (remplacer par le chemin correct)
            profileImage.alt = 'Photo de profil'; // Définir l'attribut alt pour l'accessibilité
            profileImage.classList.add('profile-image'); // Ajouter la classe 'profile-image' pour le style
            divUtilisateur.appendChild(profileImage); // Ajouter l'image de profil à l'élément utilisateur

            const spanNomUtilisateur = document.createElement('span'); // Créer un élément span pour le nom de l'utilisateur
            spanNomUtilisateur.textContent = ` ${commentaireObj.nom} `; // Définir le texte du span avec le nom de l'utilisateur
            divUtilisateur.appendChild(spanNomUtilisateur); // Ajouter le span au div utilisateur

            // Ajouter le divUtilisateur à gauche ou à droite en fonction de la parité de l'index
            if (index % 2 === 0) {
                divCommentaire.appendChild(divUtilisateur); // Ajouter à gauche
            } else {
                divCommentaire.insertBefore(divUtilisateur, contenuCommentaire); // Ajouter à droite avant le contenu du commentaire
            }

            commentairesDiv.appendChild(divCommentaire); // Ajouter le commentaire complet à la div des commentaires
        });
    })
    .catch(error => {
        console.error('Erreur lors du chargement des commentaires:', error); // Afficher une erreur si le chargement des commentaires échoue
    });
}
