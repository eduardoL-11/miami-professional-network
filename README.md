# Miami Professional Network — UI Prototype

> A curated professional network connecting verified candidates with approved employers in Miami.

Static HTML/CSS/JS prototype designed from the final backend brief. Includes 35 screens across 4 sections (Public/Auth, Candidate, Employer, Admin) with dark mode and ES/EN bilingual support.

## 🌐 Live Preview

https://luxury-marigold-a6d7e0.netlify.app

## 🚀 Run locally

No build step. Open `index.html` in a browser or serve the folder:

```bash
# Option 1: Python
python3 -m http.server 8765

# Option 2: Node (with serve)
npx serve

# Then visit http://localhost:8765
```

## 📁 Structure

```
.
├── index.html                      # Sitemap (start here)
├── design-system.html              # Tokens, components, icons catalog
├── assets/                         # Logos, images, SVGs
├── css/
│   ├── brand.css                   # Design tokens + components
│   ├── auth.css                    # Auth screens layout
│   └── lang-toggle.css
├── js/
│   ├── icons.js                    # ~70 Lucide-style outline icons
│   ├── i18n.js                     # ES/EN bilingual toggle
│   ├── theme.js                    # Light/dark mode toggle
│   └── shell.js                    # Shared sidebar for app screens
└── screens/
    ├── auth/        # 7 screens   (landing, login, signup, verify, reset)
    ├── candidate/   # 9 screens   (onboarding, profile, jobs, applications)
    ├── employer/    # 10 screens  (dashboard, jobs, applicants, modal)
    └── admin/       # 9 screens   (dashboard, approvals, candidates, hires)
```

## 🎨 Design system

- **Brand**: green `#295E24` + orange `#F36B1B`
- **Type**: Montserrat (Google Fonts)
- **Icons**: outline, monochrome, Lucide-inspired
- **Theme**: auto (follows OS) · persistent in `localStorage`
- **i18n**: ES / EN toggle, persistent in `localStorage`

## 🔀 Post-login routing

After a user signs in, the backend routes them based on role + state:

| Role            | State                    | → Screen                                                                                          |
|---|---|---|
| Candidate       | First time               | `c01-onboarding` → `c02-profile`                                                                  |
| Candidate       | Profile incomplete       | `c02-profile` (with completion banner)                                                            |
| Candidate       | Profile 100%             | `c07-my-applications` (dashboard)                                                                 |
| Employer        | Just registered          | `e01-pending-approval` (blocking screen)                                                          |
| Employer        | Approved                 | `e02-dashboard`                                                                                   |
| Admin           | Returning                | `a01-dashboard`                                                                                   |

## 🔐 Backend (not in this repo)

This is a frontend-only prototype. The brief specifies:

- 3 user types (Candidate / Employer / Admin)
- Manual employer approval flow
- Candidates blocked from applying until profile is 100% complete
- Private files (resume + headshot) served via temporary secure links
- 14-day SLA on `Under Review` status — auto-flagged as overdue
- 1% hiring fee handled manually (no Stripe in Phase 1)

See `UI _ Frontend Design Brief.pdf` (project root, not in repo) for full specs.

## 📦 Tech

- Pure HTML + CSS + JS — no build, no framework, no dependencies
- All assets local (no CDN for images)
- Montserrat loaded from Google Fonts
- Total bundle ≈ 12 MB (mostly the 2 Miami JPGs)

## License

Proprietary — Miami Professional Network, 2026.
