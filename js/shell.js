/* Miami Professional Network — Shared app shell (sidebar + topbar)
   Usage in any screen page:
     <div class="app-shell" data-shell="employer" data-active="dashboard"></div>
   Script order: i18n.js → icons.js → shell.js
*/
(function () {

  const EMPLOYER_NAV = [
    { section: 'main', label_es: 'Principal', label_en: 'Main' },
    { key: 'dashboard',  href: 'e02-dashboard.html',        icon: 'layout-grid',  label_es: 'Dashboard',          label_en: 'Dashboard' },
    { key: 'jobs',       href: 'e05-manage-jobs.html',      icon: 'briefcase',    label_es: 'Mis empleos',         label_en: 'My jobs' },
    { key: 'create',     href: 'e03-create-job.html',       icon: 'plus-circle',  label_es: 'Publicar empleo',     label_en: 'Post a job' },
    { key: 'applicants', href: 'e06-applicants.html',       icon: 'users',        label_es: 'Aplicantes',          label_en: 'Applicants' },
    { key: 'messaging',  href: 'e12-messaging.html',        icon: 'message-square', label_es: 'Mensajes',         label_en: 'Messages' },
    { key: 'analytics',  href: 'e11-analytics.html',        icon: 'bar-chart',    label_es: 'Analytics',           label_en: 'Analytics' },
    { section: 'account', label_es: 'Cuenta', label_en: 'Account' },
    { key: 'company',    href: '#',                          icon: 'building',     label_es: 'Perfil de empresa',   label_en: 'Company profile' },
    { key: 'payments',   href: 'e13-payment-methods.html',   icon: 'dollar-sign',  label_es: 'Métodos de pago',     label_en: 'Payment methods' },
    { key: 'settings',   href: '#',                          icon: 'settings',     label_es: 'Configuración',       label_en: 'Settings' },
  ];

  const CANDIDATE_NAV = [
    { section: 'main', label_es: 'Explorar', label_en: 'Explore' },
    { key: 'jobs',         href: 'c04-jobs.html',                  icon: 'search',         label_es: 'Buscar empleos',     label_en: 'Browse jobs' },
    { key: 'saved',        href: 'c06-saved-jobs.html',            icon: 'bookmark',       label_es: 'Empleos guardados',  label_en: 'Saved jobs' },
    { key: 'applications', href: 'c07-my-applications.html',       icon: 'briefcase',      label_es: 'Mis aplicaciones',   label_en: 'My applications' },
    { key: 'messaging',    href: 'c10-messaging.html',             icon: 'message-square', label_es: 'Mensajes',           label_en: 'Messages' },
    { section: 'account', label_es: 'Cuenta', label_en: 'Account' },
    { key: 'profile',      href: 'c02-profile.html',               icon: 'user',           label_es: 'Mi perfil',          label_en: 'My profile' },
    { key: 'settings',     href: 'c09-settings.html',              icon: 'settings',       label_es: 'Configuración',      label_en: 'Settings' },
  ];

  const ADMIN_NAV = [
    { section: 'main', label_es: 'Principal', label_en: 'Main' },
    { key: 'dashboard',  href: 'a01-dashboard.html',           icon: 'layout-grid',   label_es: 'Dashboard',           label_en: 'Dashboard' },
    { key: 'approvals',  href: 'a02-pending-approvals.html',   icon: 'user-check',    label_es: 'Aprobaciones',        label_en: 'Approvals' },
    { section: 'manage', label_es: 'Gestión', label_en: 'Manage' },
    { key: 'employers',  href: 'a03-employer-detail.html',     icon: 'building',      label_es: 'Empleadores',         label_en: 'Employers' },
    { key: 'candidates', href: 'a04-candidate-management.html',icon: 'users',         label_es: 'Candidatos',          label_en: 'Candidates' },
    { key: 'jobs',       href: 'a05-job-management.html',      icon: 'briefcase',     label_es: 'Empleos',             label_en: 'Jobs' },
    { key: 'applications', href: 'a06-all-applications.html',  icon: 'file-text',     label_es: 'Aplicaciones',        label_en: 'Applications' },
    { section: 'monitor', label_es: 'Seguimiento', label_en: 'Monitor' },
    { key: 'overdue',    href: 'a07-overdue.html',             icon: 'alert-triangle',label_es: 'Vencidas',            label_en: 'Overdue' },
    { key: 'hires',      href: 'a08-hires.html',               icon: 'dollar-sign',   label_es: 'Hires & Fee 1%',      label_en: 'Hires & 1% Fee' },
    { key: 'log',        href: 'a09-action-log.html',          icon: 'file-text',     label_es: 'Log de acciones',     label_en: 'Action log' },
  ];

  const CANDIDATE_USER = {
    initials: 'MG',
    name: 'María González',
    email: 'm.gonzalez@gmail.com',
    avatarBg: 'var(--brand-green)',
  };

  const EMPLOYER_USER = {
    initials: 'SH',
    name: 'Sunset Hotels Group',
    email: 'carlos@sunset.com',
    avatarBg: 'var(--brand-orange)',
  };

  const ADMIN_USER = {
    initials: 'EL',
    name: 'Eduardo López',
    email: 'admin@miamipn.com',
    avatarBg: 'var(--ink-700)',
  };

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }

  function renderSidebar(role, activeKey) {
    const nav  = role === 'candidate' ? CANDIDATE_NAV  : role === 'admin' ? ADMIN_NAV  : EMPLOYER_NAV;
    const user = role === 'candidate' ? CANDIDATE_USER : role === 'admin' ? ADMIN_USER : EMPLOYER_USER;

    const items = nav.map((n) => {
      if (n.section) {
        return `<div class="section" data-i18n-es="${escapeHtml(n.label_es)}" data-i18n-en="${escapeHtml(n.label_en)}">${escapeHtml(n.label_es)}</div>`;
      }
      const active = n.key === activeKey ? 'active' : '';
      return `<a href="${n.href}" class="${active}">
        <i class="i" data-icon="${n.icon}"></i>
        <span data-i18n-es="${escapeHtml(n.label_es)}" data-i18n-en="${escapeHtml(n.label_en)}">${escapeHtml(n.label_es)}</span>
      </a>`;
    }).join('');

    return `
      <aside class="sidebar">
        <a href="../../index.html" class="logo" style="display:flex; align-items:center; gap:10px; text-decoration:none;">
          <img src="../../assets/logo-white.png" alt="" style="height:30px;" />
          <span style="color: var(--white); font-weight:700; font-size:13px; line-height:1.15; letter-spacing:-0.005em;">Miami<br/>Professional</span>
        </a>
        <nav class="nav">${items}</nav>
        <div style="margin-top:auto; padding: 14px 10px; border-top: 1px solid rgba(255,255,255,0.08);">
          <div style="display:flex; align-items:center; gap:10px;">
            <div class="avatar" style="background: ${user.avatarBg}; color: white; width: 32px; height: 32px; font-size: 12px;">${escapeHtml(user.initials)}</div>
            <div style="flex:1; min-width:0;">
              <div style="color: white; font-size:12px; font-weight:600; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; letter-spacing:-0.005em;">${escapeHtml(user.name)}</div>
              <div style="color: rgba(255,255,255,0.5); font-size:11px;">${escapeHtml(user.email)}</div>
            </div>
            <a href="#" style="color: rgba(255,255,255,0.55); display:inline-flex;" title="Log out"><i class="i" data-icon="log-out" style="font-size: 15px;"></i></a>
          </div>
        </div>
      </aside>
    `;
  }

  function init() {
    document.querySelectorAll('.app-shell[data-shell]').forEach((shell) => {
      const role = shell.getAttribute('data-shell');
      const active = shell.getAttribute('data-active');
      shell.insertAdjacentHTML('afterbegin', renderSidebar(role, active));
    });

    if (window.MPNIcons) window.MPNIcons.render();
    if (window.MPNi18n) window.MPNi18n.setLang(window.MPNi18n.getLang());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
