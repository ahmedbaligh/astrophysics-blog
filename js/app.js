// Global Declrations
const cards = Array.from(document.querySelectorAll('.popular-reads .card'));
const winHeight = window.innerHeight;

// Highlight selected card
cards.forEach(card => {
  card.addEventListener('mouseover', () =>
    card.classList.add('card-highlight')
  );
  card.addEventListener('mouseout', () =>
    card.classList.remove('card-highlight')
  );
});

// Add a go-to-top button
document.addEventListener('DOMContentLoaded', () => {
  const pageFooter = document.querySelector('.page-footer');
  const upButton = document.createElement('button');
  const textHolder = document.createElement('span');
  textHolder.textContent = 'Top';

  // Styling the button
  upButton.style.position = 'fixed';
  upButton.classList.add('btn', 'p-0', 'd-none', 'go-to-top');

  // Adding the go-to-top button to the DOM
  upButton.appendChild(textHolder);
  pageFooter.appendChild(upButton);

  // Going to the top of the page
  upButton.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // Show the go-to-top button only when the user scrolls, then re-hide it
  let hide;
  window.onscroll = () => {
    clearTimeout(hide);
    // Hide the button if it's in the fold of the page
    if (
      document.documentElement.scrollTop > winHeight * 0.3 ||
      document.body.scrollTop > winHeight * 0.3
    )
      upButton.classList.remove('d-none');
    hide = setTimeout(() => upButton.classList.add('d-none'), 1000);
  };
});

// Only show Bootstrap's successfull submission modal, when required form data are present
const contactForm = document.querySelector('form');
const submitButton = contactForm.querySelector('button[type="submit"]');
submitButton.setAttribute('data-toggle', '');
contactForm.onsubmit = e => {
  e.preventDefault();
  submitButton.setAttribute('data-toggle', 'modal');
  submitButton.click();
  submitButton.setAttribute('data-toggle', '');
};
