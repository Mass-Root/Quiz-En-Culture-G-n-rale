document.addEventListener('DOMContentLoaded', function() {
    const submitBtn = document.getElementById('submit-btn');
    const quizForm = document.querySelector('main form');

    fetch('questions.json')
        .then(response => response.json())
        .then(data => {
            const questions = data.questions;

            submitBtn.addEventListener('click', function(event) {
                event.preventDefault();

                let score = 0;

                quizForm.querySelectorAll('.question').forEach((question, index) => {
                    const selectedOption = question.querySelector('input:checked');

                    if (selectedOption) {
                        const userAnswer = selectedOption.value;

                        if (userAnswer === questions[index].answer.toString()) {
                            score++;
                            question.classList.add('correct');
                        } else {
                            question.classList.add('incorrect');
                        }
                    } else {
                        const shortAnswerInput = question.querySelector('input[type="text"]');

                        if (shortAnswerInput) {
                            const shortAnswer = shortAnswerInput.value;

                            if (shortAnswer.trim().toLowerCase() === questions[index].answer.toString().trim().toLowerCase()) {
                                score++;
                                question.classList.add('correct');
                            } else {
                                question.classList.add('incorrect');
                            }
                        } else {
                            const trueFalseOptions = question.querySelectorAll('input[type="radio"]');
                            const userAnswer = Array.from(trueFalseOptions).find(option => option.checked);

                            if (userAnswer && userAnswer.value === questions[index].answer.toString()) {
                                score++;
                                question.classList.add('correct');
                            } else {
                                question.classList.add('incorrect');
                            }
                        }
                    }
                });

                // Afficher le score
                document.getElementById('score-message').innerText = `Votre score est : ${score}/${questions.length}`;

            });
        })
        .catch(error => console.error('Erreur lors du chargement du fichier JSON :', error));
});
