# e-Balami Website

Official web project for e-Balami, built with SvelteKit.  
This repository includes the website frontend, static assets, Firebase functions, and Sanity studio configuration used by the project.

## Repository Information

- GitHub repository: [timocadan/e-Balami-Website](https://github.com/timocadan/e-Balami-Website)
- Default branch: `main`
- Remote URL: `https://github.com/timocadan/e-Balami-Website.git`

## Tech Stack

- SvelteKit
- Vite
- Firebase Functions (`functions/`)
- Sanity Studio (`studio/`)
- Static assets served from `static/`

## Project Structure

- `src/` - main website source code
- `static/` - public static files (images, PDFs, APK, HTML pages)
- `functions/` - Firebase Cloud Functions
- `studio/` - Sanity Studio configuration and schemas
- `docs/` - technical/project documentation

## Local Development

### Prerequisites

- Node.js (LTS recommended)
- npm

### Install

```sh
npm install
```

### Run Development Server

```sh
npm run dev
```

### Build for Production

```sh
npm run build
```

### Preview Build

```sh
npm run preview
```

## Environment Setup

- Copy and configure environment variables in `.env`
- Do not commit secrets
- `.env` is already ignored by git via `.gitignore`

For full setup steps, see:
- `SETUP_GUIDE.md`
- `QUICK_START.md`

## Asset and Large File Policy

This repo contains a large Android file: `static/ebalami.apk`.

To avoid large binary impact in normal Git history, Git LFS is enabled for APK files:

- Tracked pattern: `*.apk`
- LFS config file: `.gitattributes`

If you add or update APK files in the future:

```sh
git lfs install
git lfs track "*.apk"
git add .gitattributes static/your-file.apk
git commit -m "Track APK update with Git LFS"
git push
```

## Deployment Notes

- Vercel config is in `vercel.json`
- Firebase config is in `firebase.json`
- Functions deployment docs are in `functions/DEPLOYMENT.md` and `functions/DEPLOYMENT_STEPS.md`

## Technical Documentation for Future Work

Use this README as the first entry point, and keep it updated whenever architecture, tooling, or workflows change.

For smooth future handover and continuation:

1. Update this README when adding new services, folders, or deployment steps.
2. Add deep technical details to `docs/` and link them here.
3. Keep setup and onboarding instructions synchronized across:
   - `README.md`
   - `SETUP_GUIDE.md`
   - `QUICK_START.md`
4. Document breaking changes and migration steps in the same PR that introduces them.

This approach makes the repository usable as a living technical documentation base for current and future contributors.
