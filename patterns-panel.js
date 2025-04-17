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
    if (!pattern.data) return;
    const patternDiv = document.createElement('li');

    const { cells, width, height } = convertToCells(pattern.data);
    const w = Math.min(PREVIEW_SIZE, width);
    const scale = Math.max(1, Math.min(10, Math.floor(PREVIEW_SIZE / w)));
    const x0 = PREVIEW_SIZE / 2 - Math.floor((w * scale) / 2);
    const previewHeight = height > PREVIEW_SIZE ? height : PREVIEW_SIZE;
    const y0 = previewHeight / 2 - (Math.floor(height / 2) - 1) * scale;

    console.log(pattern.id, w, scale, previewHeight, x0, y0);

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

    cells.forEach(([x, y]) => gd.drawCell(x, y));
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
        const { cells } = convertToCells(pattern.data);

        onPaste(cells);
      }
    }
  });

  container.addEventListener('wheel', (e) => {
    e.stopImmediatePropagation();
  });
}

function convertToCells(data, baseX = 0, baseY = 0, flipY = true) {
  const cells = [];
  let x = baseX || 0;
  let y = baseY || 0;
  let buff = '';
  let width = 0;
  let height = 1;

  for (let i = 0; i < data.length; ++i) {
    switch (data[i]) {
      case '$':
        y = y + (flipY ? -1 : 1) * (+buff || 1);
        width = Math.max(width, x - baseX);
        height += 1;
        x = baseX;
        buff = '';
        break;
      case 'b':
        x += (+buff || 1);
        buff = '';
        break;
      case 'o':
        for (let j = 0, n = (+buff || 1); j < n; ++j) {
          cells.push([ x, y ]);
          x++;
        }
        buff = '';
        break;
      case '!':
        break;
      default:
        buff += data[i];
        break;
    }
  }

  return { cells, width, height };
}

export default patternsPanel;
