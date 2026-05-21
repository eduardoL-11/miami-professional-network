/* Miami Professional Network — Theme system (light / dark)
   - Reads localStorage key 'mpn-theme': 'light' | 'dark' | 'auto'
   - 'auto' (default) follows prefers-color-scheme
   - Toggle elements: <button data-theme-toggle> (cycles light → dark → auto, or simply light ↔ dark)
   - Reflects state on <html data-theme="light|dark"> for CSS
*/
(function () {
  const KEY = 'mpn-theme';

  function systemPref() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function getStored() {
    return localStorage.getItem(KEY) || 'auto';
  }

  function resolve(pref) {
    return pref === 'auto' ? systemPref() : pref;
  }

  function apply(pref) {
    const effective = resolve(pref);
    document.documentElement.setAttribute('data-theme', effective);
    document.documentElement.setAttribute('data-theme-pref', pref);
  }

  function setPref(pref) {
    if (pref === 'auto') localStorage.removeItem(KEY);
    else localStorage.setItem(KEY, pref);
    apply(pref);
  }

  function toggle() {
    // Simple toggle: light ↔ dark (overrides 'auto')
    const current = resolve(getStored());
    setPref(current === 'dark' ? 'light' : 'dark');
  }

  // Initial apply BEFORE first paint (script is in <head>… ideally; if in body, still fine)
  apply(getStored());

  // Hook toggles + listen for system pref change when in auto
  function init() {
    document.querySelectorAll('[data-theme-toggle]').forEach((el) => {
      el.addEventListener('click', toggle);
    });
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (getStored() === 'auto') apply('auto');
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.MPNTheme = { toggle, setPref, getPref: getStored, resolve, apply };
})();
