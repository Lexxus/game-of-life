# Changelog

All notable changes to this project are documented in this file based on git tags (release versions).

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [v2.2.1] - 2026-09-06

Patch release focused on pattern data correctness.

### Fixed

- Fix patterns data in `patterns.json` (normalized, ~573 insertions / ~560 deletions).
- Small fixes in `index.html` and `js/patterns-panel.js` related to patterns handling.

## [v2.2] - 2026-09-05

UI / core feature release with a life-engine performance refactor.

### Added

- Add stop-if-stable toggle with still-life detection.
- Coordinates display, centered zoom, clipboard copy UX and canvas error recovery.
- Patterns library: add categories and fix patterns data.

### Changed

- Replace `cells` array + pool + holes with `Map` in the Life engine. This simplify the logic and fix memory leaks.

## [v2.1] - 2026-09-02

Patterns-library and UI-polish release, merged via PR #2.

### Added

- Patterns library:
  - Add `patterns.json` generated library.
  - Add 1636 `rle/` files (+255,606 lines) - full RLE pattern collection.
  - Add icons with `css/ui.css` / `index.html` rework.
- UI controls and drawing interaction:
  - Add button tooltips for discoverability.
  - Add home button to reset viewport position.
- Pagination: ellipsis navigation and active page styling fix.

### Changed

- Reformat JS files.
- Change panel background color.
- Remove dead code: add `.gitattributes`, drop obsolete `js/patterns.js` (-505 lines).

### Fixed

- Fix drawing to require `Ctrl+click`, matching documented behavior.
- Fix: clear canvas on paste, cleanup `Cell` logic and fix patterns data.

## [v2.0] - 2025-04-19

First tagged release.

Includes the original 2012-12-10 implementation (`Initial commit`, `Code`, demo page, `About` link, figures, README updates) plus the April 2025 modernization:

### Added

- Add patterns support improve patterns, add search patterns.
- Optimize preview images.
- Update README / demo page wiring.

### Changed

- Reformat and refactoring.
- Convert to ES modules.
- Change patterns format to RLE.
- Small improvements.

---

[v2.2.1]: https://github.com/Lexxus/game-of-life/compare/v2.2...v2.2.1
[v2.2]: https://github.com/Lexxus/game-of-life/compare/v2.1...v2.2
[v2.1]: https://github.com/Lexxus/game-of-life/compare/v2.0...v2.1
[v2.0]: https://github.com/Lexxus/game-of-life/releases/tag/v2.0
