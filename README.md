# KS Cheat Sheets Website

A static website that displays markdown content from the [ai-helpers/ks-cheat-sheets](https://github.com/ai-helpers/ks-cheat-sheets) repository.

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Overview](#overview)
- [Features](#features)
- [Quick Start](#quick-start)
  - [Local Development URLs](#local-development-urls)
- [Building the Artifact](#building-the-artifact)
  - [Prerequisites](#prerequisites)
  - [Build Steps](#build-steps)
  - [Build Output](#build-output)
- [Versioning and GitHub](#versioning-and-github)
  - [Creating a Release](#creating-a-release)
  - [Version Naming Convention](#version-naming-convention)
- [Installing a Specific Version](#installing-a-specific-version)
  - [Option 1: Install from GitHub Release](#option-1-install-from-github-release)
  - [Option 2: Install from npm (if published)](#option-2-install-from-npm-if-published)
  - [Option 3: Using Docker (recommended for production)](#option-3-using-docker-recommended-for-production)
- [Configuration](#configuration)
  - [Environment Variables](#environment-variables)
  - [Setting the Repository Path](#setting-the-repository-path)
  - [Using a Different Content Repository](#using-a-different-content-repository)
- [Development](#development)
- [Architecture](#architecture)
- [File Structure](#file-structure)
- [How It Works](#how-it-works)
- [Commands](#commands)
- [Deployment](#deployment)
- [Troubleshooting](#troubleshooting)
  - [Build fails with "ENOENT: no such file or directory"](#build-fails-with-enoent-no-such-file-or-directory)
  - [Search not working](#search-not-working)
  - [Markdown not rendering correctly](#markdown-not-rendering-correctly)
- [Contributing](#contributing)
- [License](#license)

## Overview

This project provides a clean, navigable interface for browsing AI and development cheat sheets, including topics like:

- API (FastAPI, Ray)
- Cloud Services (AWS, GCP, OVH, Scaleway)
- Generative AI (Agents, RAG, LLM, Evaluations)
- MLOps (ZenML)
- Predictive AI (scikit-learn, skrub)
- Python Tools (uv)
- Trustworthy AI
- And more...

## Features

- Fixed sidebar navigation with hierarchical folder structure
- Search functionality for quick documentation lookup
- Clean markdown rendering with syntax highlighting
- Responsive design
- Static site generation for fast performance
- Configurable repository path

## Quick Start

1. Install dependencies:
```bash
npm install
```

1. Clone the cheat sheets repository:
```bash
git clone https://github.com/ai-helpers/ks-cheat-sheets.git ks-cheat-sheets
```

1. Start development server with local repository:
```bash
npm run dev:local
```

1. Or preview the built site:
```bash
npm run preview
```

### Local Development URLs

- **Development server**: `http://localhost:4321/`
- **Preview server**: `http://localhost:4321/`

Note: The local development now uses base path `/` instead of `/kscs-website` to avoid routing issues.

## Building the Artifact

The build process creates a static site in the `dist/` directory that can be deployed to any static hosting service.

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Git

### Build Steps

1. **Clone this repository:**

```bash
git clone https://github.com/ai-helpers/kscs-website.git
cd kscs-website
```

1. **Install dependencies:**

```bash
npm install
```

1. **Clone the content repository:**

```bash
git clone https://github.com/ai-helpers/ks-cheat-sheets.git /path/to/ks-cheat-sheets
```

1. **Configure the repository path:**

```bash
export KS_CHEAT_SHEETS_PATH=/path/to/ks-cheat-sheets
```

1. **Build the static site:**

```bash
npm run build
```

The build artifact will be in the `dist/` directory and can be deployed to:

- GitHub Pages
- Any static hosting service

### Build Output

The `dist/` directory contains:

- Static HTML files for each documentation page
- CSS and JavaScript assets
- Client-side search functionality
- All rendered markdown content

## Versioning and GitHub

### Creating a Release

1. **Update the version in package.json:**

```bash
npm version patch  # for bug fixes (1.0.0 -> 1.0.1)
npm version minor  # for new features (1.0.0 -> 1.1.0)
npm version major  # for breaking changes (1.0.0 -> 2.0.0)
```

1. **Commit and tag the version:**

```bash
git add package.json
git commit -m "Release version X.Y.Z"
git tag -a vX.Y.Z -m "Version X.Y.Z"
```

1. **Push to GitHub:**

```bash
git push origin main
git push origin vX.Y.Z
```

1. **Create a GitHub Release:**
   - Go to your repository on GitHub
   - Click "Releases" → "Create a new release"
   - Select the tag you just created (vX.Y.Z)
   - Add release notes describing changes
   - Optionally attach the `dist/` directory as a build artifact

### Version Naming Convention

This project follows [Semantic Versioning](https://semver.org/):

- **MAJOR** version (X.0.0): Incompatible API changes
- **MINOR** version (0.X.0): New features, backward compatible
- **PATCH** version (0.0.X): Bug fixes, backward compatible

## Installing a Specific Version

### Option 1: Install from GitHub Release

```bash
# Clone a specific version
git clone --branch v1.0.0 https://github.com/YOUR_USERNAME/kscs-website.git
cd kscs-website

# Install dependencies
npm install

# Clone the content repository to a custom path
git clone https://github.com/ai-helpers/ks-cheat-sheets.git /custom/path/to/ks-cheat-sheets

# Set the repository path
export KS_CHEAT_SHEETS_PATH=/custom/path/to/ks-cheat-sheets

# Build the site
npm run build

# Launch the preview server
npm run preview
```

### Option 2: Install from npm (if published)

```bash
# Install a specific version globally or locally
npm install kscs-website@1.0.0

# Or clone and checkout a specific version
git clone https://github.com/YOUR_USERNAME/kscs-website.git
cd kscs-website
git checkout v1.0.0
npm install
```

### Option 3: Using Docker (recommended for production)

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Clone the website at a specific version
RUN apk add --no-cache git
RUN git clone --branch v1.0.0 https://github.com/YOUR_USERNAME/kscs-website.git .

# Install dependencies
RUN npm install

# Clone the content repository
RUN git clone https://github.com/ai-helpers/ks-cheat-sheets.git /ks-cheat-sheets

# Set environment variable
ENV KS_CHEAT_SHEETS_PATH=/ks-cheat-sheets

# Build the site
RUN npm run build

# Serve the static site
RUN npm install -g serve
CMD ["serve", "-s", "dist", "-l", "3000"]
```

Build and run:

```bash
docker build -t kscs-website:1.0.0 .
docker run -p 3000:3000 kscs-website:1.0.0
```

## Configuration

### Environment Variables

- **KS_CHEAT_SHEETS_PATH**: Path to the cloned ks-cheat-sheets repository
  - Default: `/tmp/cc-agent/59674227/ks-cheat-sheets`
  - Example: `/home/user/repos/ks-cheat-sheets`

### Setting the Repository Path

**Linux/macOS:**

```bash
export KS_CHEAT_SHEETS_PATH=/custom/path/to/ks-cheat-sheets
```

**Windows (PowerShell):**

```powershell
$env:KS_CHEAT_SHEETS_PATH="C:\path\to\ks-cheat-sheets"
```

**Windows (Command Prompt):**

```cmd
set KS_CHEAT_SHEETS_PATH=C:\path\to\ks-cheat-sheets
```

### Using a Different Content Repository

You can point to any local git repository containing markdown files:

```bash
# Clone your own fork or content repository
git clone https://github.com/YOUR_USERNAME/your-cheat-sheets.git /path/to/your-repo

# Set the path
export KS_CHEAT_SHEETS_PATH=/path/to/your-repo

# Build the site
npm run build
```

## Development

The dev server runs automatically. The site will be available at the configured port.

## Architecture

- **Astro**: Static site generator
- **marked**: Markdown parser
- **Local repository**: Reads from cloned Git repository at build time

## File Structure

- `src/lib/repository.ts` - Functions to scan and read local markdown files
- `src/components/Navigation.astro` - Sidebar navigation component
- `src/pages/index.astro` - Homepage
- `src/pages/doc/[...path].astro` - Dynamic route for all documentation pages
- `src/layouts/Layout.astro` - Base HTML layout

## How It Works

At build time, the site:

1. Scans the local repository for all markdown files
2. Builds a hierarchical tree structure
3. Generates static HTML pages for each markdown file
4. Creates navigation based on the folder structure

## Commands

| Command | Action |
| :--- | :--- |
| `npm install` | Installs dependencies |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview build locally |
| `npm run astro ...` | Run CLI commands like `astro add`, `astro check` |
| `npm version <patch\|minor\|major>` | Bump version number |

## Deployment

The built site in `dist/` can be deployed to any static hosting:

**GitHub Pages:**

```bash
# Install gh-pages
npm install -g gh-pages

# Deploy
gh-pages -d dist
```

## Troubleshooting

### Build fails with "ENOENT: no such file or directory"

Make sure the ks-cheat-sheets repository is cloned and the path is correctly set:

```bash
ls $KS_CHEAT_SHEETS_PATH  # Should show the repository contents
```

### Search not working

The search functionality requires JavaScript to be enabled in the browser. Make sure the built site is being served correctly.

### Markdown not rendering correctly

Verify that your markdown files are valid and follow standard markdown syntax.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.
