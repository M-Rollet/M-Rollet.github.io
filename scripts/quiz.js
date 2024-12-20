const slides = document.querySelectorAll('.quiz-container .slide');

let currentSlide = 0;
let score = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${(i - index) * 100}%)`;
  });
}

function startQuiz() {
  currentSlide = 1;
  score = 0;
  showSlide(currentSlide);
}

function answer(value) {
  score += value;
  currentSlide++;
  if (currentSlide < slides.length - 1) {
    showSlide(currentSlide);
  } else {
    showResult();
  }
}

function showResult() {
  const resultText = document.getElementById('result-text');
  const resultTitle = document.getElementById('result-title');
  const resultSlide = document.getElementById('result');

  if (score < 0) {
    resultTitle.textContent = "You seem West-sided";
    resultText.textContent = "Sounds like you're vibing with denim, pop culture, and open highways!";
    resultSlide.classList.add('result-west');
  } else if (score === 0) {
    resultTitle.textContent = "Are you from Switzerland?";
    resultText.textContent = "Neutral as can be! You could blend in anywhere.";
    resultSlide.classList.add('result-neutral');
  } else {
    resultTitle.textContent = "You seem East-sided";
    resultText.textContent = "You give off vibes of tradition, structure, and a hint of mystery!";
    resultSlide.classList.add('result-east');
  }


  showSlide(currentSlide);
}

function restartQuiz() {
  currentSlide = 0;
  score = 0;
  slides.forEach(slide => {
    slide.classList.remove('result-west', 'result-neutral', 'result-east');
  });
  showSlide(currentSlide);
}

// Initialize the first slide
showSlide(currentSlide);
