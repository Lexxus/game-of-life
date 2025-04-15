import { patterns } from './patterns.js';
import GDI from './gdi.js';

/**
 * Create Patterns Panel
 * @param { onSave, onPaste } params
 * @param { function } params.onSave - Function to print the current state in the console
 * @param { function } params.onPaste - Function to paste a pattern on the grid
 * @returns { void }
 * @description Initializes the patterns panel, allowing users to select and paste patterns.
 * The panel displays a list of patterns with their previews. When a pattern is clicked, it is pasted onto the grid.
 * The panel can be toggled open or closed, and a save button is provided to print the current state into the console.
 */
export function patternsPanel({ onSave, onPaste }) {
  const container = document.getElementById('patterns');
  const PREVIEW_SIZE = 100;
  const canvas = document.createElement('canvas');

  canvas.width = PREVIEW_SIZE;
  canvas.height = PREVIEW_SIZE;
  const gd = new GDI(canvas);

  patterns.forEach((pattern) => {
    const patternDiv = document.createElement('li');
    const [ minX, maxX, minY, maxY ] = pattern.cells.reduce(
      (acc, [x, y]) => {
        acc[0] = Math.min(acc[0], x);
        acc[1] = Math.max(acc[1], x);
        acc[2] = Math.min(acc[2], y);
        acc[3] = Math.max(acc[3], y);
        return acc;
      },
      [Infinity, -Infinity, Infinity, -Infinity]
    );
    const dx = maxX - minX;
    const dy = maxY - minY;
    const maxSize = Math.min(PREVIEW_SIZE, Math.max(dx, dy));
    const scale = Math.max(1, Math.min(10, Math.round(PREVIEW_SIZE / maxSize)));
    const x0 = PREVIEW_SIZE / 2 - Math.round((dx * scale) / 2) - (minX * scale);
    const previewHeight = dy > PREVIEW_SIZE ? dy : PREVIEW_SIZE;
    const y0 = previewHeight / 2 + Math.round((dy * scale) / 2) + (minY * scale);

    canvas.height = previewHeight;
    patternDiv.className = 'pattern';
    patternDiv.dataset.id = pattern.id;
    patternDiv.title = pattern.description;
    gd.clear();
    gd.step = scale;
    gd.setX0Y0(x0, y0);
    patternDiv.innerHTML = `
      <h3 class="pattern-title">${pattern.name}</h3>
      <img width="${PREVIEW_SIZE}" height="${previewHeight}" alt="${pattern.description}" />
    `;
    pattern.cells.forEach(([x, y]) => gd.drawCell(x, y));
    const img = patternDiv.querySelector('img');
    img.src = canvas.toDataURL();
    container.appendChild(patternDiv);
  });

  document.getElementById('btnPatterns').onclick = (e) => {
    container.classList.toggle('collapsed');
    e.currentTarget.classList.toggle('btn-active');
  };

  document.getElementById('btnSave').onclick = () => {
    onSave();
  }

  container.addEventListener('click', (e) => {
    const patternDiv = e.target.classList.contains('pattern') ? e.target : e.target.closest('.pattern');

    if (patternDiv) {
      const patternId = patternDiv.dataset.id;
      const pattern = patterns.find((p) => p.id === patternId);

      if (pattern) {
        onPaste(pattern.cells);
        // pattern.cells.forEach(([x, y]) => {
        //   Life.createCell(x, y, true);
        // });
      }
    }
  });

  container.addEventListener('wheel', (e) => {
    e.stopImmediatePropagation();
  });
}

export default patternsPanel;
