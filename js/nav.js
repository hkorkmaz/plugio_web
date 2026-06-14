// Shared mobile nav toggle (hamburger)
(function () {
  var header = document.querySelector('.header-dark');
  var burger = document.querySelector('.nav-burger');
  if (!header || !burger) return;
  function close() {
    header.classList.remove('nav-open');
    burger.setAttribute('aria-expanded', 'false');
  }
  burger.addEventListener('click', function () {
    var open = header.classList.toggle('nav-open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  document.querySelectorAll('.main-nav a').forEach(function (a) {
    a.addEventListener('click', close);
  });
})();
