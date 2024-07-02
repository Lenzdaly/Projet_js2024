document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); 

        const formData = new FormData(this);
        const formDataJson = {};

        formData.forEach((value, key) => {
            formDataJson[key] = value;
        });

        
        fetch('/send-email-and-save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formDataJson),
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message); 

            contactForm.reset();
        })
        .catch(error => {
            console.error('Erreur:', error);
            alert('Une erreur est survenue lors de l\'envoi du formulaire.');
        });
    });
});
