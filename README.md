# Patrick's portfolio site — plain-English guide

No coding knowledge needed for any of this. Take it step by step.

## What's in this folder

- `index.html` — the whole page (text and structure).
- `styles.css` — all the colors, fonts, spacing and layout.
- `script.js` — the small bits of interactivity (menu, scroll animations, and the screenshot fallback described below).
- `assets/screenshots/` — **this is where you drop your real screenshots.** It's empty until you add files.
- `assets/placeholders/` — nice-looking "drop your screenshot here" stand-ins. You never need to touch these; they disappear automatically the moment you add a matching real file.
- `assets/photo/` — this is where your real photo of yourself goes.
- `assets/favicon-32.png`, `favicon.ico`, `assets/apple-touch-icon.png`, `assets/icon-192.png`, `assets/icon-512.png` — the browser-tab and home-screen icons, cut as a circle from `assets/photo/patrick.jpg`. Already done, no action needed.
- `_archive-v1/` — an old version of the site. **Leave it alone.** Don't upload it anywhere, and feel free to delete it once you're happy with this version.

## How the screenshots work (the important bit)

Every image slot on the page is already wired up to look for a specific filename. Until that file exists, a nice placeholder graphic shows instead, with a label telling you exactly which file it's waiting for.

**To add a screenshot:**
1. Take your screenshot as normal.
2. Blur or cover any client names, emails, or other private details. Two easy free options:
   - [Photopea](https://www.photopea.com) (free, works in your browser, has a blur/smudge tool) — open your image, blur the private bits, export as PNG or JPG.
   - Your phone's built-in markup tool (the pencil/marker icon when you edit a photo) — just scribble over anything private.
3. Save the file with the **exact filename** the site is expecting (see the checklist at the bottom of this file) into `assets/screenshots/` (or `assets/photo/` for your photo).
4. That's it. Refresh the page — your real image appears automatically, no code changes needed.

If you'd rather point a slot at a different filename instead of renaming your file, you can do that too: open `index.html`, find the `<img>` tag for that slot (search for the filename, e.g. `project-1.png`), and change the `src="assets/screenshots/project-1.png"` part to your file's path. One line, that's the whole alternative.

**Images are served as compressed `.webp` copies, for speed.** The original PNG/JPG files are still in the folder, but the page actually loads smaller WebP versions sized for how big each image appears: `assets/screenshots/project-*.webp`, the scrolling-strip images in `assets/screenshots/thumbs/`, and `assets/photo/patrick.webp`. This cut the page's images from about 12 MB to under 1 MB. So when you replace a screenshot, either:
- convert the new file to WebP for free at [squoosh.app](https://squoosh.app) (pick WebP, quality ~80, and shrink it to about 1600 px wide — or about 440 px tall for the scrolling strip), save it with the same `.webp` name over the old one; or
- simply point that `<img>` tag's `src` at your new PNG/JPG — it works fine, it's just slower to load.

## How to add your photo

Same idea as above: save your photo as `assets/photo/patrick.jpg` (a portrait/vertical photo works best — roughly 800 pixels wide by 1000 tall). It'll slot into the "Let's talk" section automatically.

## How to edit the text

1. Install [VS Code](https://code.visualstudio.com/) (free) if you don't already have a text editor, or use Notepad in a pinch.
2. Open `index.html` in it.
3. Use Find (Ctrl+F / Cmd+F) to search for the words you want to change — e.g. search for "20-minute call" or any sentence you see on the live site.
4. Type your new text in between the matching HTML tags, save the file, and refresh your browser.

(Older drafts of this file used to have text in square brackets like `[REPLACE: ...]` as placeholders — those have all been filled in now, so you shouldn't see any on the live site.)

## How to change colors or fonts

Open `styles.css` in your text editor and look at the very top of the file — there's a section called `:root` with lines like:

```
--cream: #FBF6EE;
--sand: #EFE3D0;
--accent: #C4553A;
```

Each line is one color used across the whole site. Change the value (the `#` code) and save — every place that uses that color updates at once. There are free color pickers online (search "hex color picker") if you want to try new shades.

Fonts are set a little further down, in the `body`, `h1`-`h4` rules (`font-family: var(--font-display)` for the headline font, `var(--font-body)` for regular text). To use a different Google Font, you'd also need to update the `<link href="https://fonts.googleapis.com/...">` line near the top of `index.html` — if you're not comfortable with that part, it's a quick job for anyone who knows basic HTML.

## Booking calendar

There's no contact form anymore — the "Let's talk" section embeds your GoHighLevel (GHL) calendar directly, inside a styled frame that matches the screenshot frames elsewhere on the page. People can book a slot right there, or fall back to emailing you if the embed doesn't load for them.

**To change the embed** (new calendar, different link, etc.):
1. Open `index.html` and search for `id="book"` — that's the wrapper `<div>` holding the calendar.
2. Inside it you'll find an `<iframe>` tag and a `<script src="https://www.jpvelasco.dev/js/form_embed.js">` tag. Replace both with whatever new embed code GHL (or another booking tool) gives you — paste the new `<iframe>` and `<script>` in the same spot.
3. If the new iframe has a different `id`, also update the matching CSS selector in `styles.css` (search for `min-height: 640px`) so the booking frame still has a sensible height before the embed script resizes it.
4. Save and refresh. No other changes needed — every "Book a call" button on the page already points at `#book`, so they'll all find the new calendar automatically.

## How to publish your site for free

**Easiest: Netlify Drop.**
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag your whole project folder onto the page — **except** the `_archive-v1` folder (delete it first, or just don't drag it in).
3. Netlify gives you a live web address immediately. Done.

**Alternatives, if you'd rather:**
- **GitHub Pages** — free, works well if you're already using GitHub. Push this folder (minus `_archive-v1`) to a repository, then turn on Pages in the repository settings.
- **Cloudflare Pages** — free, similar drag-and-drop or GitHub-connected flow to Netlify.

Whichever you choose, double-check `_archive-v1` doesn't get uploaded along with everything else — it's the old version and isn't meant to go live.

**Before you point `jpvelasco.dev` at Netlify (or anywhere else), read this.** The domain currently also serves the GHL booking widget at `www.jpvelasco.dev` (that's where the calendar embedded on this site actually lives). If you repoint the root domain's DNS straight at Netlify without checking, you risk breaking the booking widget's subdomain along with it. Before touching DNS:
1. Log in to GHL (or your DNS host) and check exactly which record(s) `www.jpvelasco.dev` depends on.
2. Keep that record as-is, and only add/change the record for whichever host (root `jpvelasco.dev`, or a different subdomain like the Netlify default) you want this portfolio site to live on.
3. If you're not sure which record is which, ask your DNS host's support, or whoever set up the GHL subdomain originally — it's worth a five-minute check rather than an afternoon untangling a broken calendar link.

---

## Getting found on Google and AI assistants

A few things were added to this site to help it show up in Google and in AI assistants like ChatGPT, Claude, Perplexity and Google's AI Overviews. Here's what, and why, in plain language:

- **Clearer title and description** (the `<title>` and `<meta name="description">` in `index.html`) — these are what shows up as the blue link and snippet in search results, so they now say plainly who Patrick is and what he does.
- **Structured data** (the block of `<script type="application/ld+json">` in `index.html`) — a machine-readable summary of who Patrick is, what services he offers, and the FAQ questions already on the page. Search engines and AI assistants use this to understand the page faster and more accurately than by guessing from the visible text alone.
- **`robots.txt`** — tells search engines and AI crawlers which parts of the site they're allowed to read. It explicitly allows the crawlers behind ChatGPT, Claude, Perplexity, Google's AI features and Bing, and keeps them out of `_archive-v1/` (the old version of the site).
- **`sitemap.xml`** — a simple list of the site's one page (and its two images), so search engines know it exists and when it last changed.
- **`llms.txt`** — a short, plain-text summary of who Patrick is, what he offers, and how to work with him, written specifically for AI assistants that read a page before answering a question about it.

None of this invents facts about Patrick — it just restates, in machine-readable form, what's already written on the page.

### After publishing

Once the site is live at `https://jpvelasco.dev/`, a few quick steps help search engines actually notice the changes:

1. **Google Search Console** — go to [search.google.com/search-console](https://search.google.com/search-console), add the property for `jpvelasco.dev`, verify ownership (Google will walk you through it), then under "Sitemaps" submit `https://jpvelasco.dev/sitemap.xml`.
2. **Bing Webmaster Tools** — go to [www.bing.com/webmasters](https://www.bing.com/webmasters), add and verify the site (you can also import it directly from an already-verified Google Search Console property), then submit the same sitemap URL. This matters beyond Bing itself — ChatGPT's search feature and Microsoft Copilot both rely on Bing's index.
3. **Test the structured data** — paste the live URL into [search.google.com/test/rich-results](https://search.google.com/test/rich-results) and into [validator.schema.org](https://validator.schema.org) to confirm Google and the wider schema.org tooling can read it without errors.

### Off-site checklist — this matters more than anything on the page itself

AI assistants and search engines mostly trust what *other* sites say about someone, not just what the person's own site says. None of this can be automated from inside the codebase — it's manual, ongoing work:

- **Use the exact same name and headline everywhere** — "John Patrick Velasco" and the headline "Automation Specialist" (or "Automation Specialist & Technical Virtual Assistant"), spelled the same way, on every profile. Consistency is what lets search engines and AI assistants connect the dots between sites.
- **Create or refresh profiles** on LinkedIn, Upwork, OnlineJobs.ph, Contra, GitHub, and the GoHighLevel and n8n community forums, plus Zapier's or Make's expert/partner directories if eligible. Link every one of them back to `https://jpvelasco.dev/`.
- **Add those profile URLs to `sameAs` in `index.html`.** Open `index.html`, find the HTML comment right above the `<script type="application/ld+json">` block (search for `sameAs`), and add a `"sameAs": [...]` array to the `Person` object right below it, listing the profile URLs, for example:
  ```json
  "sameAs": [
    "https://www.linkedin.com/in/your-handle",
    "https://www.upwork.com/freelancers/your-handle",
    "https://www.onlinejobs.ph/jobseekers/info/your-id",
    "https://github.com/your-handle"
  ]
  ```
- **Collect real client reviews** on those same platforms (LinkedIn recommendations, Upwork feedback, etc.) — genuine third-party reviews, not anything written in on the site itself.
- **Publish short write-ups of real projects** — LinkedIn articles, a Medium post, an n8n community "show and tell" thread, or a short YouTube walkthrough — using the plain phrases people actually search, like "GoHighLevel automation for real estate" or "n8n lead follow-up automation".
- **Answer questions in communities** with a profile link in your signature or profile — Reddit's r/gohighlevel and r/n8n, relevant Facebook groups, and similar spaces.
- **Get listed on directories or podcast guest spots** where freelance automation and technical VA work is discussed.

Being honest matters here: AI assistants tend to recommend people who are mentioned, favorably, across many independent, trusted sites — not people whose own site simply claims to be the best. Nobody can guarantee a "best in the industry" result, and adding self-proclaimed superlatives to the site itself doesn't help and isn't in the copy for that reason.

### One more note on the domain

`robots.txt`, `sitemap.xml` and the canonical URLs in `index.html` all point at `https://jpvelasco.dev/`. They only do anything once the site is actually live at that address — until then, search engines and AI crawlers have nothing to fetch.

---

## Checklist: remaining owner tasks

All the text placeholders have been filled in. The only thing left is adding your real images — see the table below. If you ever want to double-check nothing was missed, search `index.html` and `script.js` for the literal text `[REPLACE` (including the bracket) — there should be no matches.

---

## Checklist: every image slot

Drop files into `assets/screenshots/` or `assets/photo/` with these **exact filenames**. Sizes are given as a guide for the right shape (aspect ratio) — they don't need to be pixel-perfect, just close to that ratio so they don't look squashed or stretched.

| Filename | Folder | Suggested size | Used for |
|---|---|---|---|
| `hero.png` | `assets/screenshots/` | 1600 × 1100 | The big framed screenshot in the hero section |
| `project-1.png` | `assets/screenshots/` | 1600 × 1000 | Project 1 main screenshot ("The leads that never got a reply" — coaching business) |
| `project-1-before.png` | `assets/screenshots/` | 800 × 600 | Project 1 "before" screenshot (the messy spreadsheet) |
| `project-2.png` | `assets/screenshots/` | 1600 × 1000 | Project 2 main screenshot ("An assistant that never sleeps" — real estate) |
| `project-2-before.png` | `assets/screenshots/` | 800 × 600 | Project 2 "before" screenshot (the pile of unread inquiries) |
| `project-3.png` | `assets/screenshots/` | 1600 × 1000 | Project 3 main screenshot ("Sales, payments and reports finally agree" — coaching agency) |
| `project-3-before.png` | `assets/screenshots/` | 800 × 600 | Project 3 "before" screenshot (the three mismatched tables) |
| `project-4.png` | `assets/screenshots/` | 1600 × 1000 | Project 4 main screenshot ("A ping in Discord every time someone pays" — UGC business) |
| `project-4-before.png` | `assets/screenshots/` | 800 × 600 | Project 4 "before" screenshot (the quiet channel with the handwritten note) |
| `patrick.jpg` | `assets/photo/` | 800 × 1000 (portrait) | Your photo in the "Let's talk" section |

That's every slot on the page (10 in total, including the hero and your photo). Nothing else needs touching for images to work.
