## Code Quality Setup

We use **ESLint (Flat Config)** + **Prettier** to maintain clean, consistent code across the project, along with type checking and tests to prevent bugs.

---

### Scripts Overview

| Command                | Description                                 |
|------------------------|---------------------------------------------|
| `npm run lint`         | Lints the code for style & best practices   |
| `npm run type-check`   | Runs TypeScript type checks                 |
| `npm test`             | Runs all unit tests                         |
| `npm run format`       | Formats the code using Prettier             |
| `npm run format:check` | Checks if formatting is correct             |

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
npm run lint && npm run type-check && npm test
```

To auto-fix most style issues:

```bash
npx eslint 'src/**/*.{js,ts,tsx}' --fix
npm run format
```