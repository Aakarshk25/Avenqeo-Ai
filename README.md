# AVENQEO AI homepage rebuild

This is a homepage replacement for the existing React + Vite project. It follows pages 1–7 of `Avenqeo_AI_Website_Screen_Mockup.pdf` and keeps the existing React/Vite setup.

## Files to replace

Copy these files into the matching locations in your existing project:

- `src/App.jsx`
- `src/components/Layout.jsx`
- `src/pages/Home.jsx`
- `src/index.css`
- `index.html`

Keep your existing `src/main.jsx` and `package.json`. `main.jsx` already imports `App.jsx` and `index.css` and wraps the app in `BrowserRouter`; the new homepage does not need extra dependencies.

## Run

```bash
npm install
npm run dev
```

Check the production build with:

```bash
npm run build
```

## Before publishing

1. Replace the consultation link in `src/components/Layout.jsx` with your real business email or booking URL. The current `mailto:` link is intentionally a placeholder because no contact address was supplied.
2. Add individual agent detail pages in a later phase. The six `Explore role` links are currently visual placeholders and are not presented as working routes.
3. Add only integrations that are implemented and tested, as the mockup itself specifies.
