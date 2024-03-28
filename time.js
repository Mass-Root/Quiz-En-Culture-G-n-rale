document.addEventListener('DOMContentLoaded', function() {
    // Définir le temps initial (10 minutes en secondes)
    let timeLeft = 600;

    // Cibler l'élément pour afficher le compte à rebours
    const countdownTimer = document.getElementById('countdown-timer');

    // Mettre à jour la minuterie chaque seconde
    const timerInterval = setInterval(() => {
        // Convertir le temps restant en minutes et secondes
        const minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;

        // Ajouter un zéro devant les secondes si elles sont inférieures à 10
        if (seconds < 10) {
            seconds = `0${seconds}`;
        }

        // Mettre à jour le contenu de l'élément de la minuterie
        countdownTimer.textContent = `Temps restant : ${minutes}:${seconds}`;

        // Modifier la couleur de la minuterie lorsque le temps restant est inférieur à 5 minutes
        if (timeLeft <= 300) { // 300 secondes = 5 minutes
            countdownTimer.classList.add('red');
        } else {
            countdownTimer.classList.remove('red');
        }

        // Vérifier si le temps est écoulé ou si le bouton de soumission a été cliqué
        if (timeLeft === 0 || submissionTriggered) {
            // Arrêter le compte à rebours
            clearInterval(timerInterval);
            
            // Vérifier si le temps est écoulé ou si le bouton de soumission a été cliqué
            if (timeLeft === 0) {
                // Afficher une alerte pour indiquer que le temps est écoulé et que la soumission a été effectuée automatiquement
                alert("Le temps est écoulé. La soumission a été effectuée automatiquement.");
            } else {
                // Afficher une alerte pour indiquer que l'utilisateur a soumis manuellement le quiz à temps
                alert("Vous avez soumis le quiz à temps !");
            }

            // Cliquer automatiquement sur le bouton "Soumettre"
            const submitBtn = document.getElementById('submit-btn');
            submitBtn.click(); // Simuler un clic sur le bouton "Soumettre"
        } else {
            // Décrémenter le temps restant
            timeLeft--;
        }
    }, 1000); // Répéter toutes les secondes

    // Définir une variable pour vérifier si la soumission a été déclenchée
    let submissionTriggered = false;

    // Écouter l'événement de clic sur le bouton de soumission
    const submitBtn = document.getElementById('submit-btn');
    submitBtn.addEventListener('click', () => {
        submissionTriggered = true; // Mettre la variable à true lorsque le bouton de soumission est cliqué
    });
});
