# Drew Bloomfield — Portfolio V2 (review branch)

This is an **unpublished redesign proposal**. Do not merge until Drew approves the design and content.

## Architecture
- `index.html`: page sections, authentic supplied copy, video thumbnail and links.
- `styles.css`: palette, typography, layout, mobile rules.
- `script.js`: accessible enlarged video dialog and film metadata.

No build process or package manager is required. GitHub Pages can serve these files from the repository root.

## Preview
Download this branch as a ZIP, extract it, and open `index.html` in a browser. YouTube media requires internet. A feature branch does **not** automatically get its own GitHub Pages URL.

## Editing a film
1. In `index.html`, find the film article (e.g., `id="pages"` or `id="data-op"`). Edit title, role, description, and thumbnail URL.
2. In `script.js`, update the corresponding `films` entry with the correct YouTube video ID.
3. For a new film, duplicate an article inside `.work-layout`, give it a unique `data-film` value, and add the matching `films` entry.
4. Keep descriptions in the student's own words and confirm all credits before publishing.

## Outstanding content
- Confirm or revise the exact bio excerpts used here; the text is quoted verbatim from Drew's supplied wording.
- Provide a professional contact email or link and approve publication.
- Supply DATA OP synopsis, creative decisions and reflection.
- Supply additional details for Pages, including production year/runtime if desired.
- Approve the images/YouTube thumbnails; these currently use the two provided YouTube IDs.
- Decide whether to add additional real projects or remove unused placeholders from production (this V2 displays only two).
- Test media embed permissions, mobile browsers, keyboard access, and reduced motion on a real device.

## Publishing
Review the pull request, test the branch locally, approve the content, then merge into `main`. GitHub Pages should update if configured to publish from `main` / `(root)`.
