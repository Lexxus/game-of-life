import { categories, patterns } from './patterns.js';
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
  const $Panel = document.getElementById('patternsPanel');
  const $Form = document.getElementById('patternForm');
  const $Categories = document.getElementById('patternCategories');
  const $Search = document.getElementById('patternSearch');
  const $Patterns = document.getElementById('patterns');

  const PREVIEW_SIZE = 100;
  const canvas = document.createElement('canvas');

  canvas.width = PREVIEW_SIZE;
  canvas.height = PREVIEW_SIZE;
  const gd = new GDI(canvas);

  const $SearchBtn = $Categories.firstElementChild;
  $Categories.innerHTML = '';
  // create category selector
  Object.entries(categories).forEach(([id, cat], i) => {
    const $label = document.createElement('label');

    $label.className = 'btn-radio';
    $label.title = cat.description || '';
    $label.innerHTML = `
      <input type="radio" name="category" value="${id}" />
      ${cat.name}
    `;
    $Categories.appendChild($label);
  });
  $Categories.appendChild($SearchBtn);

  renderPatterns($Form.elements.category.value);

  document.getElementById('btnPatterns').onclick = (e) => {
    $Panel.classList.toggle('opened');
    e.currentTarget.classList.toggle('btn-active');
  };

  document.getElementById('btnClose').onclick = () => {
    $Panel.classList.remove('opened');
    document.getElementById('btnPatterns').classList.remove('btn-active');
  }

  document.getElementById('btnSave').onclick = () => {
    onSave();
  }

  $Patterns.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') return;
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

  $Form.addEventListener('change', (e) => {
    if (e.target.name === 'category') {
      const categoryId = e.target.value;

      $Search.style.display = categoryId ? 'none' : 'block';
      renderPatterns(categoryId);
      $Patterns.scrollTop = 0;
    }
  });

  let searchTimeout;
  document.getElementById('search').addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    const query = e.target.value;

    searchTimeout = setTimeout(() => renderPatterns('', query), 500);
  });

  $Patterns.addEventListener('wheel', (e) => {
    e.stopImmediatePropagation();
  });

  function renderPatterns(categoryId, query = '') {
    const $description = document.getElementById('categoryDescription');
    const category = categories[categoryId];
    const queryLc = query.toLowerCase() || '';

    $Patterns.innerHTML = '';
    const foundPatterns = category
      ? patterns.filter((p) => ((Array.isArray(p.category) ? p.category.includes(categoryId) : p.category === categoryId) || (categoryId === 'other' && !p.category)))
      : patterns.filter((p) => query.length > 1 && p.name.toLowerCase().includes(queryLc));

    if (!category) {
      $description.innerHTML = `Search result for "<b>${query}</b>". Found <b>${foundPatterns.length}</b> patterns.`;
    } else {
      $description.innerHTML = category.link ? `${category.description} <a href="${category.link}" target="_blank" rel="noreferrer">wiki</a>` : '';
    }
    foundPatterns
      .sort((a, b) => a.name.localeCompare(b.name))
      .forEach((pattern) => {
        if (!pattern.data) return;
        const $li = document.createElement('li');

        const { cells, width, height } = convertToCells(pattern.data);
        const w = Math.min(PREVIEW_SIZE, width);
        const scale = Math.max(1, Math.min(10, Math.floor(PREVIEW_SIZE / w)));
        const x0 = Math.floor(PREVIEW_SIZE / 2 - w * scale / 2);
        const previewHeight = height * scale > PREVIEW_SIZE ? height * scale : PREVIEW_SIZE;
        const y0 = previewHeight / 2 - Math.floor((height / 2 - 1) * scale);

        canvas.height = previewHeight;
        $li.className = 'pattern';
        $li.dataset.id = pattern.id;
        $li.title = pattern.description;

        gd.clear('white');
        gd.step = scale;
        gd.setX0Y0(x0, y0);

        const patternName = pattern.link ? `<a href="${pattern.link}" target="_blank" rel="noreferrer">${pattern.name}</a>` : pattern.name;
        $li.innerHTML = `
          <h3 class="pattern-title" title="${pattern.name}">${patternName}</h3>
          <img class="preview" width="${PREVIEW_SIZE}" height="${previewHeight}" alt="${pattern.description}" />
        `;

        cells.forEach(([x, y]) => gd.drawCell(x, y));
        const img = $li.querySelector('img');

        img.src = canvas.toDataURL();
        $Patterns.appendChild($li);
      });
  }
}

function convertToCells(data, baseX = 0, baseY = 0, flipY = true) {
  const cells = [];
  let x = baseX || 0;
  let y = baseY || 0;
  let buff = '';
  let width = 0;
  let height = 1;

  for (let i = 0; i < data.length; ++i) {
    const dxy = +buff || 1;
    switch (data[i]) {
      case '$':
        y = y + (flipY ? -1 : 1) * dxy;
        width = Math.max(width, x - baseX);
        height += dxy;
        x = baseX;
        buff = '';
        break;
      case 'b':
        x += dxy;
        buff = '';
        break;
      case 'o':
        for (let j = 0; j < dxy; ++j) {
          cells.push([ x, y ]);
          x++;
        }
        buff = '';
        break;
      case '!':
        width = Math.max(width, x - baseX);
        break;
      default:
        buff += data[i];
        break;
    }
  }

  return { cells, width, height };
}

export default patternsPanel;
