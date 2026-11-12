(function () {
  var scene = document.getElementById('scene');
  if (!scene) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  scene.classList.add('animated');
  var clamp = function (v) { return Math.min(1, Math.max(0, v)); };
  var seg = function (p, a, b) { return clamp((p - a) / (b - a)); };
  var ease = function (t) { return t * t * (3 - 2 * t); };
  var ticking = false;
  function update() {
    ticking = false;
    var total = scene.offsetHeight - window.innerHeight;
    var p = total > 0 ? clamp(-scene.getBoundingClientRect().top / total) : 1;
    var s = scene.style;
    s.setProperty('--a-o', (1 - ease(seg(p, 0.30, 0.50))).toFixed(4));
    s.setProperty('--b-o', ease(seg(p, 0.45, 0.65)).toFixed(4));
    s.setProperty('--hint-o', (1 - seg(p, 0, 0.08)).toFixed(4));
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  update();
})();
