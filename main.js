document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observer for Fade-in animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-in').forEach(elem => {
    observer.observe(elem);
  });

  // Countdown Logic (Target: May 5, 2026)
  const countdownElement = document.getElementById('countdown-days');
  if (countdownElement) {
    const targetDate = new Date('2026-05-05T00:00:00+09:00').getTime();
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance > 0) {
      const days = Math.ceil(distance / (1000 * 60 * 60 * 24));
      countdownElement.innerHTML = `${days}<span>日</span>`;
    } else {
      countdownElement.innerHTML = `本日<span>泳いでいます</span>`;
    }
  }
});
