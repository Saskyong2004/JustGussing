let isAnswered = false;
const correctAnswer = 'transparent'; // Transparent sunglass is the correct one

document.querySelectorAll('.choice-btn').forEach(button => {
    button.addEventListener('click', function() {
       // Reset other buttons' images to default scale
       document.querySelectorAll('.choice-btn img').forEach(img => {
        img.style.transform = 'scale(1)'; // Reset scaling
    });
    
    const img = this.querySelector('img');
    img.style.transform = 'scale(1.1)'; // Scale the clicked image 
       
        if (isAnswered) return; // Allow only one choice

        const selectedColor = this.getAttribute('data-color');
        checkAnswer(selectedColor);
    });
});

function checkAnswer(choice) {
    isAnswered = true; // Mark as answered to prevent further clicks

    const resultDiv = document.getElementById('result');
    const celebrationDiv = document.getElementById('celebration');
    const popup = document.getElementById('popup-image');

    // Disable all choice buttons
    document.querySelectorAll('.choice-btn').forEach(button => {
        button.disabled = true;
    });

    if (choice === correctAnswer) {
        resultDiv.textContent = 'Correct!';
        resultDiv.className = 'result correct';
        celebrationDiv.style.display = 'block'; // Show celebration
        launchConfetti(); // Trigger confetti effect
    } else {
        resultDiv.textContent = 'Wrong!';
        resultDiv.className = 'result wrong';
    }

    // Save the user's answer to the database
    saveUserChoice(choice);

     // Show the original sunglass photo after 2 seconds
     setTimeout(() => {
        popup.classList.add('show');
    }, 2000);
}

function saveUserChoice(choice) {
    // Mock AJAX request to save the choice to a database
    fetch('/save-choice', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selectedColor: choice }),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Choice saved:', data);
    })
    .catch(error => {
        console.error('Error saving choice:', error);
    });
}

function launchConfetti() {
    const confettiColors = ['#FFDD40', '#FF40AC', '#40A3FF', '#3FFF5B'];
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        confetti.style.left = `${Math.random() * 100}vw`; // Corrected template literal
        confetti.style.animationDuration = `${Math.random() * 3 + 2}s`; // Corrected template literal
        document.body.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 5000); // Remove confetti after animation
    }
}
