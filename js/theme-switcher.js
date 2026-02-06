document.addEventListener('DOMContentLoaded', function () {
  var darkThemes = [
    { id: 'midnight',  color: '#3B82F6', label: 'Midnight' },
    { id: 'charcoal',  color: '#A78BFA', label: 'Charcoal' },
    { id: 'ocean',     color: '#06B6D4', label: 'Ocean' },
    { id: 'forest',    color: '#22C55E', label: 'Forest' },
    { id: 'ember',     color: '#F59E0B', label: 'Ember' },
    { id: 'rose',      color: '#F43F5E', label: 'Rose' },
    { id: 'slate',     color: '#94A3B8', label: 'Slate' },
    { id: 'electric',  color: '#818CF8', label: 'Electric' }
  ];

  var lightThemes = [
    { id: 'clean',  color: '#2563EB', label: 'Clean' },
    { id: 'sand',   color: '#D97706', label: 'Sand' },
    { id: 'frost',  color: '#0D9488', label: 'Frost' },
    { id: 'pearl',  color: '#7C3AED', label: 'Pearl' }
  ];

  var lightIds = lightThemes.map(function (t) { return t.id; });
  var switcher = document.createElement('div');
  switcher.className = 'theme-switcher';

  var label = document.createElement('span');
  label.textContent = 'Theme';
  switcher.appendChild(label);

  var saved = localStorage.getItem('plugio-theme') || 'midnight';
  document.documentElement.setAttribute('data-theme', saved);

  // swap logo based on theme brightness
  function updateLogo(themeId) {
    var logo = document.querySelector('.header-dark .logo img');
    if (!logo) return;
    if (lightIds.indexOf(themeId) !== -1) {
      logo.setAttribute('src', '/img/plugio-logo.svg');
    } else {
      logo.setAttribute('src', '/img/plugio-logo-white.svg');
    }
  }

  function setTheme(themeId, dot) {
    document.documentElement.setAttribute('data-theme', themeId);
    localStorage.setItem('plugio-theme', themeId);
    updateLogo(themeId);
    switcher.querySelectorAll('.theme-dot').forEach(function (d) {
      d.classList.remove('active');
    });
    dot.classList.add('active');
  }

  function createDot(t, isLight) {
    var dot = document.createElement('button');
    dot.className = 'theme-dot' + (isLight ? ' light-dot' : '') + (t.id === saved ? ' active' : '');
    if (isLight) {
      dot.style.background = '#F0F0F0';
      dot.style.boxShadow = 'inset 0 0 0 8px ' + t.color;
    } else {
      dot.style.background = t.color;
    }
    dot.setAttribute('data-theme-id', t.id);
    dot.setAttribute('data-label', t.label);
    dot.setAttribute('aria-label', 'Switch to ' + t.label + ' theme');
    dot.addEventListener('click', function () { setTheme(t.id, dot); });
    return dot;
  }

  darkThemes.forEach(function (t) {
    switcher.appendChild(createDot(t, false));
  });

  var divider = document.createElement('div');
  divider.className = 'theme-divider';
  switcher.appendChild(divider);

  lightThemes.forEach(function (t) {
    switcher.appendChild(createDot(t, true));
  });

  document.body.appendChild(switcher);
  updateLogo(saved);
});
