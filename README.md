# Portfolio Maker

A command-line tool that asks you a few questions, collects your assets and fonts, builds a portfolio site from a template, and deploys it to Vercel.

---

## Install

```bash
cd portfolio-maker
npm install
npm run build        # compiles TypeScript to dist/
npm link             # makes "portfolio-maker" available globally
```

Or run without installing globally:

```bash
npx tsx src/cli/index.ts <command>
```

---

## Commands

### `portfolio-maker init`

Runs the interactive prompt wizard. Collects:

- Identity: name, headline, role, tagline, about paragraphs, domain
- Theme: accent color, background, ink (all hex)
- Fonts: choose from preset Google Fonts list, or bring your own `.woff2` files
- Assets: paths to logo, hero image, OG image, project thumbnails, writing card images
- Socials, contact entries, projects (with body paragraphs), writing entries

Validates all input, copies assets into an `assets/` staging directory, and writes `site.config.json`.

```bash
portfolio-maker init
portfolio-maker init --out ./my-portfolio
```

Options:

| Flag | Default | Description |
|------|---------|-------------|
| `-o, --out <dir>` | cwd | Where to write `site.config.json` and staged assets |

---

### `portfolio-maker build`

Copies the template app into a build workdir, injects your `site.config.json` and assets, runs `npm install` + `npm run build` inside the workdir, and reports the `dist/` path.

```bash
portfolio-maker build
portfolio-maker build --config ./my-portfolio/site.config.json \
                      --assets ./my-portfolio/assets \
                      --workdir ./my-portfolio/.build
```

Options:

| Flag | Default | Description |
|------|---------|-------------|
| `-c, --config <path>` | `site.config.json` | Path to your config file |
| `-a, --assets <dir>` | `assets` | Staged assets directory |
| `-w, --workdir <dir>` | `.build` | Scratch directory for the template build |

---

### `portfolio-maker deploy`

Deploys the built `dist/` to Vercel using `vercel --prod --yes`.

By default, **demo mode is on** and the command prints a realistic dry-run instead of calling Vercel. Set `PM_DEMO_MODE=false` in your `.env` (or environment) to deploy for real.

```bash
portfolio-maker deploy
portfolio-maker deploy --dist ./my-portfolio/.build/dist
```

Options:

| Flag | Default | Description |
|------|---------|-------------|
| `-d, --dist <path>` | `.build/dist` | Path to the built dist directory |

Prerequisites for a real deploy: `vercel` CLI must be installed and authenticated (`vercel login`).

---

### `portfolio-maker create`

Convenience command. Runs `init`, then `build`, then `deploy` in sequence. All output lands under `--out`.

```bash
portfolio-maker create
portfolio-maker create --out ./my-portfolio
```

---

## Demo mode

`PM_DEMO_MODE=true` (the default) lets you run all four commands without real assets on disk or a Vercel account:

- `init`: asset validation is path-based; skip any asset prompts by leaving them blank
- `build`: requires the template app to be present but does not need Vercel
- `deploy`: prints a simulated Vercel output and exits cleanly

To disable demo mode:

```bash
# .env
PM_DEMO_MODE=false
```

---

## Config schema

`site.config.json` is the contract between the CLI and the template. See `src/shared/config.schema.ts` for the full TypeScript definition. Required fields:

| Field | Type | Notes |
|-------|------|-------|
| `name` | `string` | Your name or handle |
| `role` | `string` | e.g. "Builder / Engineer" |
| `tagline` | `string` | One or two lines for the hero |
| `about` | `string[]` | One entry per paragraph |
| `theme.accent` | `string` | Hex color, e.g. `#e8531f` |
| `fonts.source` | `"google"` or `"byo"` | Font loading strategy |
| `fonts.heading` | `string` | Font family name |
| `fonts.body` | `string` | Font family name |
| `socials` | `SocialLink[]` | Can be empty |
| `contact` | `ContactEntry[]` | Can be empty |
| `projects` | `ProjectEntry[]` | Can be empty |
| `writing` | `WritingEntry[]` | Can be empty |

See `site.config.example.json` for a complete example.

---

## Asset requirements

| Asset | Field | Allowed formats |
|-------|-------|-----------------|
| Logo / wordmark | `assets.logo` | svg, png, jpg, jpeg, webp |
| Hero image | `assets.hero` | svg, png, jpg, jpeg, webp |
| OG / social share | `assets.og` | svg, png, jpg, jpeg, webp |
| Project thumbnails | `projects[n].img` | svg, png, jpg, jpeg, webp |
| Writing card images | `writing[n].img` | svg, png, jpg, jpeg, webp |
| BYO fonts | `fonts.files[n].file` | woff2 only |

Files larger than 2 MB trigger a warning. All assets are copied into the staging directory and referenced by filename only in the config. Paths starting with `~/` are expanded to your home directory.

---

## Font options

Google Fonts presets available in the wizard:

- Fraunces
- Inter
- Space Grotesk
- DM Sans
- Playfair Display
- Syne
- Cabinet Grotesk
- Manrope

To use your own fonts: choose "Bring your own .woff2 files" in the wizard and provide the file path, family name, and optional weight for each file.

---

## Development

```bash
npm run dev -- init        # run via tsx (no compile step)
npm run build              # compile to dist/
```

Environment variables: copy `.env.example` to `.env` and adjust.
