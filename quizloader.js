document.addEventListener('DOMContentLoaded', function() {
    fetch('questions.json') // Charger le fichier JSON
    .then(response => response.json())
    .then(data => {
        const quizContainer = document.getElementById('quiz-container');
        const questions = data.questions;

        // Afficher chaque question
        questions.forEach((question, index) => {
            let questionHTML = `
                <div class="question">
                    <p>${index + 1}. ${question.question}</p>
            `;

            // Gérer différents types de questions
            if (question.type === 'choix_multiple') {
                question.options.forEach(option => {
                    questionHTML += `
                        <input type="radio" name="question${index}" value="${option}" required>
                        <label>${option}</label><br>
                    `;
                });
            } else if (question.type === 'vrai_faux') {
                questionHTML += `
                    <input type="radio" name="question${index}" value="true">
                    <label>Vrai</label>
                    <input type="radio" name="question${index}" value="false">
                    <label>Faux</label><br>
                `;
            } else if (question.type === 'reponse_courte') {
                questionHTML += `
                    <input type="text" name="question${index}" required>
                `;
            }

            questionHTML += `</div>`;
            quizContainer.innerHTML += questionHTML;
        });
    });

});
