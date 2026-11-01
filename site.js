(function () {
  var el = document.querySelector('[data-type]');
  if (!el) return;
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) return;
  var text = el.textContent;
  el.textContent = '';
  var spans = [];
  for (var i = 0; i < text.length; i++) {
    var s = document.createElement('span');
    s.className = 'tc';
    s.textContent = text[i] === ' ' ? '\u00a0' : text[i];
    el.appendChild(s);
    spans.push(s);
  }
  var caret = document.createElement('span');
  caret.className = 'caret';
  el.appendChild(caret);
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (!en.isIntersecting) return;
      io.disconnect();
      spans.forEach(function (s, i) {
        setTimeout(function () { s.classList.add('on'); }, 300 + i * 75);
      });
    });
  }, { threshold: 0.6 });
  io.observe(el);
})();
(function () {
  function openFromHash() {
    var id = decodeURIComponent(location.hash.slice(1));
    if (!id) return;
    var el = document.getElementById(id);
    if (el && el.tagName === 'DETAILS') { el.open = true; el.scrollIntoView(); }
  }
  window.addEventListener('hashchange', openFromHash);
  openFromHash();
})();
