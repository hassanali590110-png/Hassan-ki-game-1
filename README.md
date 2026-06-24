Gallery project — quick tasks

Optimize images (creates `webp/` and `thumbs/`):

1. Install Node (if not installed): https://nodejs.org/
2. From project root run:

```bash
npm install
npm run optimize
```

This produces `webp/<folder>/` and `thumbs/<folder>/` with WebP images and small thumbnails.

Serve locally (for PWA/service worker testing):

```bash
# Python
python -m http.server 8000
# or Node
npx http-server -c-1 -p 8000
```

Push to GitHub (after installing Git):

```bash
git init
git add .
git commit -m "Add gallery site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

After pushing, enable GitHub Pages in repository Settings → Pages and select branch `main` → root `/`.
