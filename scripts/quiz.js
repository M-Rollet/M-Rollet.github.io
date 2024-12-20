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
    resultText.textContent = "Bla bla bla...";
    resultSlide.classList.add('result-west');
  } else if (score === 0) {
    resultTitle.textContent = "You seem neutral";
    resultText.textContent = "Bla bla bla...";
    resultSlide.classList.add('result-neutral');
  } else {
    resultTitle.textContent = "You seem East-sided";
    resultText.textContent = "Bla bla bla...";
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
