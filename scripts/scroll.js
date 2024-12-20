const progress = document.querySelector('.scroll-progress');
const scrollbar = document.querySelector('.custom-scrollbar');
const sectionLabels = document.querySelectorAll('.section-label');
const titles = document.querySelectorAll('h1[id]');

function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const firstTitleTop = titles[0].offsetTop;
  const totalHeight = document.body.scrollHeight - window.innerHeight;
  const maxScroll = totalHeight - firstTitleTop;
  const effectiveScrollTop = Math.max(0, scrollTop - firstTitleTop);

  // Show scrollbar with fade effect after first title is reached
  if (scrollTop >= firstTitleTop) {
    scrollbar.classList.add('visible');
  } else {
    scrollbar.classList.remove('visible');
  }

  // Calculate gradient height relative to the scroll after first title
  const scrollPercentage = (effectiveScrollTop / maxScroll) * 100;
  progress.style.height = '100%';
  progress.style.clipPath = `inset(0 0 ${100 - scrollPercentage}% 0)`;

  // Update active section label
  titles.forEach((title, index) => {
    if (scrollTop >= title.offsetTop - window.innerHeight / 2) {
      sectionLabels.forEach(label => label.classList.remove('active'));
      sectionLabels[index].classList.add('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const scrollBar = document.querySelector('.custom-scrollbar');
  const sectionLabels = document.querySelector('.section-labels');

  // Toggle visibility on scroll bar click
  scrollBar.addEventListener('click', (event) => {
    if (window.innerWidth <= 992) {
      sectionLabels.classList.toggle('visible');
      event.stopPropagation(); // Prevent immediate hiding
    }
  });

  // Hide the links when clicking anywhere on the document
  document.addEventListener('click', () => {
    if (window.innerWidth <= 992) {
      sectionLabels.classList.remove('visible');
    }
  });
});



window.addEventListener('scroll', updateScrollProgress);
window.addEventListener('load', updateScrollProgress);
