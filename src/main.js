const menu = document.querySelector('.menu');
const nav = document.querySelector('nav');

menu.addEventListener('click', () => {
  menu.classList.toggle('open');
  nav.classList.toggle('open');
});

nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menu.classList.remove('open');
  nav.classList.remove('open');
}));

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) {
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  }
}), { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

document.querySelectorAll('details').forEach(detail => detail.addEventListener('toggle', () => {
  if (detail.open) {
    document.querySelectorAll('details').forEach(other => {
      if (other !== detail) other.removeAttribute('open');
    });
  }
}));

document.querySelector('.form').addEventListener('submit', event => {
  event.preventDefault();

  const form = event.currentTarget;
  const data = new FormData(form);
  const message = [
    'Здравствуйте! Хочу получить юридическую консультацию.',
    '',
    `Имя: ${data.get('name').trim()}`,
    `Телефон: ${data.get('phone').trim()}`,
    `Описание ситуации: ${data.get('message').trim()}`,
  ].join('\n');

  window.open(
    `https://wa.me/77012244850?text=${encodeURIComponent(message)}`,
    '_blank',
    'noopener,noreferrer',
  );

  const button = form.querySelector('button');
  button.innerHTML = 'WhatsApp открыт <span>✓</span>';
  button.classList.add('sent');
});

window.addEventListener('scroll', () => {
  document.querySelector('.header').classList.toggle('scrolled', scrollY > 40);
}, { passive: true });
