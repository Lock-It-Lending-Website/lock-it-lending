# Lockit Lending Website (React + TypeScript + Tailwind)

Welcome to the Lockit Lending website repo! This is a modern rebuild of the original WordPress site, using React, TypeScript, and Tailwind CSS.

This guide is written to help anyone — even without coding experience — get started, run, and update the project step-by-step.

---

## What This Project Does

This website is a replica (and soon improvement!) of [https://lockitlending.com](https://lockitlending.com). It includes:

- A beautiful homepage with sections (Hero, Purchase, Refinance, etc.)
- A sticky header with navigation
- A responsive layout that works on mobile and desktop
- Footer with links and contact info

---

## Tools & Technologies

- **React**: For building the user interface
- **TypeScript**: Safer JavaScript with types
- **Tailwind CSS**: For styling (utility-first)
- **Create React App**: How the project was originally bootstrapped
- **GitHub Pages**: For live deployment

---

## Folder Structure

```
lockit-lending/
├── public/               # Static files
│   ├── logo.png          # Logo used in header
│   ├── favicon.ico       # Browser tab icon
│   └── ...
├── src/                  # All website source code
│   ├── components/       # Reusable UI pieces
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── Layout.tsx
│   ├── pages/            # Pages on the website (mapped by routes)
│   │   ├── Home.tsx
│   │   ├── Purchase.tsx
│   │   └── Contact.tsx
│   ├── styles/           # Global CSS
│   │   └── global.css
│   ├── App.tsx           # Main app component
│   ├── main.tsx          # Entry point
│   └── index.tsx         # Root rendering
├── tailwind.config.js    # Tailwind setup
├── package.json          # Project settings & dependencies
└── README.md             # This file!
```

> 💡 When adding a **new page**, always place the file inside the `src/pages/` folder, and then link to it via the router in `App.tsx`.

---

## How To Run This Locally

### Step 1: Install the tools

1. Install [Node.js (LTS)](https://nodejs.org/en)
2. (Optional) Install [VS Code](https://code.visualstudio.com/)

### Step 2: Open the project

1. Clone or download the repo
2. Open the folder in VS Code (or any editor)

### Step 3: Install the dependencies

In the terminal:

```bash
npm install
```

This will install everything the website needs (React, Tailwind, etc.)

### Step 4: Start the development server

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser — you should see the site!

---

## How To Update Content

### Change images:

Put your new images in the `public/` folder, then reference them like:

```tsx
<img src="/new-image.png" alt="something" />
```

### Change text:

Go into the file inside `src/pages/` or `src/components/` and change the text like editing a document.

### Add new sections:

Add a new `<section>` in `Home.tsx` or other page and style it with Tailwind.

---

## Known Issues / TODOs

- ✅ Tailwind is working now
- ✅ Routes go to the correct pages
- ⚠️ Footer needs better styling to match the official site
- ⚠️ Form logic is not yet implemented (e.g. rates submission)
- ⚠️ Scroll animations / scrollspy not fully added
- ⚠️ Image optimization (some logos weren’t loading)

---

## Features Still To Add

Here’s what we still want to build:

- [ ] Responsive mobile nav menu (hamburger style)
- [ ] Better footer layout w/ categories (Products, Contact, Legal, etc.)
- [ ] Modular section components (Review.tsx, Refinement.tsx, etc.)
- [ ] ScrollSpy to highlight nav as you scroll
- [ ] Load reviews dynamically

---

## Contribution Guide

- Use `src/pages/` for pages
- Use `src/components/` for UI building blocks
- No need to learn React in depth — just copy/paste and edit text/images to help

---

## Code Quality Setup

We use **ESLint (Flat Config)** + **Prettier** to maintain clean, consistent code across the project, along with type checking and tests to prevent bugs.

---

### Scripts Overview

| Command                | Description                               |
| ---------------------- | ----------------------------------------- |
| `npm run lint`         | Lints the code for style & best practices |
| `npm run type-check`   | Runs TypeScript type checks               |
| `npm test`             | Runs all unit tests                       |
| `npm run format`       | Formats the code using Prettier           |
| `npm run format:check` | Checks if formatting is correct           |

---

### Lint the Code

```bash
npm run lint
```

Checks for:

- Code style (spacing, quotes, semicolons, trailing spaces, etc.)
- React/JSX errors
- TypeScript ESLint rules
- Console logs and debuggers

---

### Type-Check the Code

```bash
npm run type-check
```

Uses TypeScript to catch type-related bugs without compiling the code.

---

### Run Tests

```bash
npm test
```

Executes all unit tests with `react-scripts test`.

---

### Format Your Code with Prettier

```bash
npm run format
```

Auto-formats all project files based on our Prettier rules.

To check if files are already formatted (without modifying them):

```bash
npm run format:check
```

---

## Before You Push Code

Always run:

```bash
npm run lint && npm run type-check && npm run format
```

To auto-fix most style issues:

```bash
npx eslint 'src/**/*.{js,ts,tsx}' --fix
npm run format
```
