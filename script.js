// Theme toggle with preference persistence
(function () {
  const root = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  const storageKey = 'theme';
  const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');

  if (!toggle) return;

  const savePreference = mode => {
    try {
      localStorage.setItem(storageKey, mode);
    } catch {
      /* localStorage may be unavailable */
    }
  };

  const readPreference = () => {
    try {
      return localStorage.getItem(storageKey);
    } catch {
      return null;
    }
  };

  const applyMode = mode => {
    const resolved = mode === 'light' ? 'light' : 'dark';
    root.classList.toggle('light', resolved === 'light');
    toggle.dataset.mode = resolved;
    toggle.setAttribute('aria-pressed', resolved === 'light' ? 'true' : 'false');
    toggle.setAttribute(
      'aria-label',
      resolved === 'light' ? 'Switch to dark theme' : 'Switch to light theme'
    );
    savePreference(resolved);
  };

  applyMode(readPreference() || (mediaQuery.matches ? 'light' : 'dark'));

  toggle.addEventListener('click', () => {
    const nextMode = root.classList.contains('light') ? 'dark' : 'light';
    applyMode(nextMode);
  });

  if (typeof mediaQuery.addEventListener === 'function') {
    mediaQuery.addEventListener('change', event => {
      if (readPreference()) return;
      applyMode(event.matches ? 'light' : 'dark');
    });
  }
})();

// Auto year update
const year = document.getElementById('year');
if (year) {
  year.textContent = new Date().getFullYear();
}
