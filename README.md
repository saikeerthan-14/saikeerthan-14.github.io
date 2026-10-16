# Sai Keerthan — portfolio

Static portfolio and a controllable 48-second elevator pitch. Built with HTML, CSS, JavaScript, and local fonts. No build step or secrets required.

## Local preview

```sh
python3 -m http.server 4173
```

Visit http://localhost:4173 and `/elevator-pitch/`.

## Publishing

This directory is published at https://saikeerthan-14.github.io/ from the dedicated `saikeerthan-14/saikeerthan-14.github.io` repository. GitHub Pages uses the `main` branch root. `.nojekyll` preserves the static files without Jekyll processing.

The original copy is also retained in the profile repository under `portfolio/`. Future website edits should be made in the dedicated Pages repository.

## Content and controls

- `index.html`: introduction, project showcase, contribution links, contact.
- `elevator-pitch/index.html`: player and accessible text transcript.
- `pitch.js`: eight chapters, six seconds each. Play/pause, seek, restart, chapter selection, and keyboard controls.
- `style.css`: responsive design and reduced-motion support.

The embedded pitch plays automatically unless reduced motion is enabled. The standalone pitch starts paused. Playback pauses when its document is hidden. This is a silent browser presentation; no audio track is included.

Public projects and PRs are linked with their documented status. The scheduling illustration is conceptual, not benchmark data.
