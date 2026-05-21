/* Miami Professional Network — bilingual toggle (ES/EN)
   Usage:
     <span data-i18n="hello">Hola</span>
     <span data-i18n-en="Hello" data-i18n-es="Hola"></span>
   The current language is stored in localStorage under 'mpn-lang'.
*/
(function () {
  const STORAGE_KEY = 'mpn-lang';
  const DEFAULT_LANG = 'es';

  function getLang() {
    return localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG;
  }

  function setLang(lang) {
    localStorage.setItem(STORAGE_KEY, lang);
    applyLang(lang);
    document.documentElement.lang = lang;
    updateToggle(lang);
  }

  function applyLang(lang) {
    document.querySelectorAll('[data-i18n-en], [data-i18n-es]').forEach((el) => {
      const val = el.getAttribute('data-i18n-' + lang);
      if (val != null) {
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          if (el.hasAttribute('placeholder')) el.setAttribute('placeholder', val);
          else el.value = val;
        } else {
          el.innerHTML = val;
        }
      }
    });
    // Re-render any inline icons that might have been inside translated strings
    if (window.MPNIcons) window.MPNIcons.render();
  }

  function updateToggle(lang) {
    document.querySelectorAll('.lang-toggle [data-lang]').forEach((btn) => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
    });
  }

  function initToggle() {
    document.querySelectorAll('.lang-toggle [data-lang]').forEach((btn) => {
      btn.addEventListener('click', () => setLang(btn.getAttribute('data-lang')));
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const lang = getLang();
    applyLang(lang);
    document.documentElement.lang = lang;
    initToggle();
    updateToggle(lang);
  });

  window.MPNi18n = { getLang, setLang };
})();
