# Console Cat - AI Developer Guide

This document provides context for AI assistants and developers working on the Console Cat Chrome Extension. It outlines the project's specialized workflows, automation scripts, and publishing pipeline.

## 🚀 Quick Start for AI Assistants

When tasked with updates or maintenance:
1.  **Build & Zip**: Use `npm run zip`. This handles icon resizing, production bundling, and packaging.
2.  **Asset Generation**: Use `scripts/generate-assets-free.js` to create new branding via Pollinations.ai (no API key needed).
3.  **Publishing**: Releases are automated via GitHub Actions when a `v*` tag is pushed.

---

## 🏗️ Project Architecture

Console Cat is a Vite-based Chrome DevTools extension built with React and TypeScript.

-   **`src/devtools/`**: The main UI that appears as a "Console Cat" tab in Chrome DevTools.
-   **`src/manifest.ts`**: The source of truth for the extension manifest (CRXJS).
-   **`scripts/`**: Contains automation for the entire lifecycle.
    -   `process-icons.js`: Uses `sharp` to generate 16, 32, 48, and 128px icons from a 1024px source.
    -   `generate-assets-free.js`: Generates promotional tiles and icons using open-source LLMs.
    -   `upload.js`: Handles the Chrome Web Store API interaction.

---

## 🎨 Branding & Assets Workflow

The branding pipeline is designed to be "AI-First." 

### 1. Generating Source Assets
If the branding needs a refresh, run:
```bash
node scripts/generate-assets-free.js
```
This saves a 1024x1024 master icon to `public/icons/generated/main-icon.png` and promotional tiles to `public/promos/`.

### 2. Processing Icons
The extension manifest expects specific sizes in `public/img/`. These are automatically generated during the build:
```bash
npm run process-icons
```

---

## 📦 CI/CD & Publishing Pipeline

We use a fully automated "Tag-to-Publish" workflow.

### Local Configuration (`.env`)
The project requires a `.env` file (ignored by git) with the following keys:
-   `EXTENSION_ID`: The 32-character ID from the Chrome Web Store URL.
-   `CLIENT_ID` / `CLIENT_SECRET`: OAuth credentials from Google Cloud Console.
-   `REFRESH_TOKEN`: Generated via Google OAuth Playground.

### Automated Release Process
To release a new version:
1.  Bump version in `package.json`.
2.  Commit changes.
3.  Create and push a tag:
    ```bash
    git tag v1.x.x
    git push origin v1.x.x
    ```

### GitHub Actions (`.github/workflows/publish.yml`)
The workflow automatically:
1.  Installs dependencies (`npm ci`).
2.  Runs `npm run zip` (Builds + Resizes Icons + Zips).
3.  Runs `npm run upload` using GitHub Secrets.

---

## 📄 Privacy Policy
The official privacy policy is hosted as a standalone page on the developer's personal site:
`https://jonathansirrine.com/console-cat-privacy`

Any changes to the extension's data usage (currently zero data collection) **must** be reflected in the website's `app/routes/console-cat-privacy.tsx` file first.

---

## 🛠️ Maintenance Notes
-   **Dependencies**: Uses `sharp` for image processing. Ensure the environment supports C++ binaries (standard on GitHub Actions/Ubuntu).
-   **Secret Protection**: Never commit `client_secret_*.json` or `.env` files. These are explicitly ignored in `.gitignore`.
