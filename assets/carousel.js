(function () {
  var root = document.getElementById('carousel');
  if (!root) return;
  var cards = Array.prototype.slice.call(root.querySelectorAll('.card3'));
  var dots = Array.prototype.slice.call(document.querySelectorAll('.dots button'));
  var n = cards.length, cur = 1, timer = null;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function render() {
    cards.forEach(function (el, i) {
      var o = (((i - cur) % n) + n) % n; if (o === 2) o = -1;
      el.style.setProperty('--off', o);
      el.classList.toggle('is-active', o === 0);
      el.setAttribute('aria-hidden', o === 0 ? 'false' : 'true');
    });
    dots.forEach(function (d, i) { d.setAttribute('aria-current', i === cur ? 'true' : 'false'); });
  }
  function go(i) { cur = ((i % n) + n) % n; render(); }
  function next() { go(cur + 1); }
  function prev() { go(cur - 1); }
  function stop() { if (timer) { clearInterval(timer); timer = null; } }
  function start() { if (reduce || timer) return; timer = setInterval(next, 6000); }
  function restart() { stop(); start(); }

  root.querySelector('.next').addEventListener('click', function () { next(); restart(); });
  root.querySelector('.prev').addEventListener('click', function () { prev(); restart(); });
  dots.forEach(function (d, i) { d.addEventListener('click', function () { go(i); restart(); }); });
  cards.forEach(function (el, i) { el.addEventListener('click', function () { if (i !== cur) { go(i); restart(); } }); });

  var x0 = null;
  root.addEventListener('pointerdown', function (e) { x0 = e.clientX; stop(); });
  root.addEventListener('pointerup', function (e) {
    if (x0 !== null) { var dx = e.clientX - x0; if (Math.abs(dx) > 40) { dx < 0 ? next() : prev(); } }
    x0 = null; start();
  });
  root.addEventListener('pointercancel', function () { x0 = null; start(); });
  root.addEventListener('mouseenter', stop); root.addEventListener('mouseleave', start);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') { next(); restart(); } else if (e.key === 'ArrowLeft') { prev(); restart(); }
  });
  document.addEventListener('visibilitychange', function () { document.hidden ? stop() : start(); });
  render(); start();
})();
