import GDI from './gdi.js';

// maximum patterns per page
const MAX_PATTERNS = 25;
// maximum pages in page-nav panel
const MAX_PAGES = 7;
const PREVIEW_SIZE = 100;

export const categories = {
  basics: {
    id: "basics",
    name: "Basics",
    description: "Basic patterns and structures.",
  },
  agars: {
    id: "agars",
    name: "Agars",
    description: "An agar is a pattern that can tile the Life universe periodically both in space and in time.",
    link: "https://conwaylife.com/wiki/Agar",
  },
  glider_synth: {
    id: "glider_synth",
    name: "Glider Synthesis",
    description: "Patterns that can be synthesized from gliders.",
    link: "https://conwaylife.com/wiki/Glider_synthesis",
  },
  guns: {
    id: "guns",
    name: "Guns",
    description: "Patterns that produce gliders.",
    link: "https://conwaylife.com/wiki/Gun",
  },
  conduits: {
    id: "conduits",
    name: "Conduits",
    description: "A conduit is an arrangement of still lifes and/or oscillators that move an active reaction to another location without themselves being permanently damaged.",
    link: "https://conwaylife.com/wiki/Conduit",
  },
  fuses: {
    id: "fuses",
    name: "Fuses",
    description: "A fuse is a wick that burns at one end.",
    link: "https://conwaylife.com/wiki/Fuse",
  },
  induction_coils: {
    id: "induction_coils",
    name: "Induction Coils",
    description: "An induction coil is any object used to stabilize an edge (or edges) of another pattern without touching.",
    link: "https://conwaylife.com/wiki/Induction_coil",
  },
  methuselahs: {
    id: "methuselahs",
    name: "Methuselahs",
    description: "Patterns that takes a large number of generations in order to stabilize and becomes much larger than its initial configuration.",
    link: "https://conwaylife.com/wiki/Methuselah",
  },
  oscillators: {
    id: "oscillators",
    name: "Oscillators",
    description: "Patterns that repeat after a certain number of generations.",
    link: "https://conwaylife.com/wiki/Oscillator",
  },
  puffers: {
    id: "puffers",
    name: "Puffers",
    description: "Patterns that move and leave a trail of debris.",
    link: "https://conwaylife.com/wiki/Puffer_train",
  },
  rakes: {
    id: "rakes",
    name: "Rakes",
    description: "A rake is a puffer whose debris consists of spaceships.",
    link: "https://conwaylife.com/wiki/Rake",
  },
  reflectors: {
    id: "reflectors",
    name: "Reflectors",
    description: "A stable or oscillating pattern that can reflect some specific type of spaceship (usually a glider) without suffering permanent damage.",
    link: "https://conwaylife.com/wiki/Reflector",
  },
  spaceships: {
    id: "spaceship",
    name: "Spaceships",
    description: "Patterns that move across the grid.",
    link: "https://conwaylife.com/wiki/Spaceship",
  },
  spacefillers: {
    id: "spacefiller",
    name: "Spacefillers",
    description: "A pattern that grows at a quadratic rate by filling the plane with an agar.",
    link: "https://conwaylife.com/wiki/Spacefiller",
  },
  still_lifes: {
    id: "still_life",
    name: "Still Lifes",
    description: "Patterns that do not change over time.",
    link: "https://conwaylife.com/wiki/Still_life",
  },
  sawtooths: {
    id: "sawtooth",
    name: "Sawtooths",
    description: "A pattern whose population grows without bound but does not tend to infinity.",
    link: "https://conwaylife.com/wiki/Sawtooth",
  },
  sparks: {
    id: "spark",
    name: "Sparks",
    description: "Sparks are patterns that die.",
    link: "https://conwaylife.com/wiki/Spark",
  },
  tagalongs: {
    id: "tagalong",
    name: "Tagalongs",
    description: "A pattern that is not a spaceship by itself, but can be attached to the rear of another spaceship to form a larger spaceship.",
    link: "https://conwaylife.com/wiki/Tagalong",
  },
  waves: {
    id: "wave",
    name: "Waves",
    description: "A repeating pattern that moves similarly to a spaceship, although it is infinite.",
    link: "https://conwaylife.com/wiki/Wave",
  },
  wicks: {
    id: "wick",
    name: "Wicks",
    description: "A wick is a stable or oscillating linearly repeating pattern. The difference from an agar is that it is one-dimensional.",
    link: "https://conwaylife.com/wiki/Wick",
  },
  other: {
    id: "other",
    name: "Other",
  }
};

let patterns = [];

async function loadPatterns(source) {
  try {
    const res = await fetch(source);
    patterns = await res.json();
  } catch(error) {
    console.error(error);
  }
}

loadPatterns('/patterns.json');

/**
 * Create Patterns Panel
 * @param { onPaste } params
 * @param { function } params.onPaste - Function to paste a pattern on the grid
 * @returns { void }
 * @description Initializes the patterns panel, allowing users to select and paste patterns.
 * The panel displays a list of patterns with their previews. When a pattern is clicked, it is pasted onto the grid.
 * The panel can be toggled open or closed, and a save button is provided to print the current state into the console.
 */
export function renderPatternsPanel({ onPaste }) {
  const $Panel = document.getElementById('patternsPanel');
  const $Form = document.getElementById('patternForm');
  const $Categories = document.getElementById('patternCategories');
  const $Search = document.getElementById('patternSearch');
  const $Patterns = document.getElementById('patterns');

  const canvas = document.createElement('canvas');

  canvas.width = PREVIEW_SIZE;
  canvas.height = PREVIEW_SIZE;
  const gd = new GDI(canvas);
  const previewCache = {};

  let currentCategoryId = '';
  let currentQuery = '';

  const $SearchBtn = $Categories.firstElementChild;
  $Categories.innerHTML = '';

  // create category selector
  Object.entries(categories).forEach(([id, cat]) => {
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

  $Patterns.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') return;
    const patternDiv = e.target.classList.contains('pattern') ? e.target : e.target.closest('.pattern');

    if (patternDiv) {
      const patternId = patternDiv.dataset.id;
      const pattern = patterns.find((p) => p.id === patternId);

      if (pattern) {
        const { cells, width, height } = convertToCells(pattern.data);

        onPaste(cells, width, height);
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

  function renderPatterns(categoryId = '', query = '', page = 0) {
    const $description = document.getElementById('categoryDescription');
    const category = categories[categoryId];
    const queryLc = query.toLowerCase() || '';

    currentCategoryId = categoryId;
    currentQuery = query;

    $Patterns.innerHTML = '';
    const foundPatterns = category
      ? patterns.filter((p) => ((categoryId === 'other' && !p.category) || (Array.isArray(p.category) ? p.category.includes(categoryId) : p.category === categoryId)))
      : patterns.filter((p) => query.length > 1 && p.name.toLowerCase().includes(queryLc));

    if (!category) {
      $description.innerHTML = `Search result for "<b>${query}</b>". Found <b>${foundPatterns.length}</b> patterns.`;
    } else {
      $description.innerHTML = `<div>Found <b>${foundPatterns.length}</b> patterns.</div>`
        + (category.link ? `${category.description} <a href="${category.link}" target="_blank" rel="noreferrer">Wiki</a>` : '');
    }
    const pages = Math.ceil(foundPatterns.length / MAX_PATTERNS);

    renderPageNav(page, pages);

    const iStart = page * MAX_PATTERNS;
    const iEnd = iStart + MAX_PATTERNS;

    foundPatterns
      .sort((a, b) => a.name.localeCompare(b.name))
      .slice(iStart, iEnd)
      .forEach(async (pattern) => {
        const $li = document.createElement('li');
        $li.className = 'pattern';
        $li.dataset.id = pattern.id;
        $li.title = pattern.description;

        const patternName = pattern.wiki ? `<a href="${pattern.wiki}" target="_blank" rel="noreferrer">${pattern.name}</a>` : pattern.name;
        $li.innerHTML = `
          <h3 class="pattern-title" title="${pattern.name}">${patternName}</h3>
          <img class="preview" width="${PREVIEW_SIZE}" height="${PREVIEW_SIZE}" alt="${pattern.description || ''}" />
        `;
        $Patterns.appendChild($li);

        const img = $li.querySelector('img');
        let imgSrc = previewCache[pattern.id];

        if (!imgSrc) {
          let data = pattern.data;
          if (!data) {
            if (!pattern.link) return;
            const res = await fetch(`/rle/${pattern.link}`);
            const text = await res.text();
            data = text.split(/\n\r?/).filter((l) => !l.match(/^\#|x/)).join('');
            pattern.data = data;
          }
          const { cells, width, height } = convertToCells(data);
          const w = Math.min(PREVIEW_SIZE, width);
          const h = Math.min(PREVIEW_SIZE, height);
          const scale = Math.max(1, Math.min(10, Math.floor(PREVIEW_SIZE / w), Math.floor(PREVIEW_SIZE / h)));
          const previewWidth = width * scale > PREVIEW_SIZE ? width * scale : PREVIEW_SIZE;
          const x0 = Math.floor(PREVIEW_SIZE / 2 - w * scale / 2);
          const previewHeight = height * scale > PREVIEW_SIZE ? height * scale : PREVIEW_SIZE;
          const y0 = previewHeight / 2 - Math.floor((height / 2 - 1) * scale);

          resetCanvas(previewWidth, previewHeight);

          gd.step = scale;
          gd.setX0Y0(x0, y0);

          cells.forEach(([x, y]) => gd.drawCell(x, y));

          const sc = Math.min(Math.min(1, PREVIEW_SIZE / width), Math.min(1, PREVIEW_SIZE / height));
          try {
            img.dataset.scale = sc;
            gd.context2d.scale(sc, sc);
          } catch(error) {
            console.error('Pattern scaling failed:', sc, patternName);
            resetCanvas(PREVIEW_SIZE, PREVIEW_SIZE);
          }
          imgSrc = canvas.toDataURL();

          // Chrome does not throw error when canvas in error state
          if (imgSrc.length < 20) {
            resetCanvas(PREVIEW_SIZE, PREVIEW_SIZE);
            imgSrc = canvas.toDataURL();
          }
          previewCache[pattern.id] = imgSrc;
        }
        img.src = imgSrc;
      });
  }

  function resetCanvas(w, h) {
    // reset canvas
    canvas.width = w;
    canvas.height = h;
    gd.context2d = canvas.getContext('2d');
    gd.clear('white');
  }

  function handlePageClick({ currentTarget }) {
    const page = +currentTarget.dataset.page;

    renderPatterns(currentCategoryId, currentQuery, page);
  }

  function renderPageNav(activePage, totalPages) {
    document.getElementById('pageNav').classList.toggle('hidden', totalPages < 2);
    const $btnPrev = document.getElementById('btnPageNavPrev');
    const $btnNext = document.getElementById('btnPageNavNext');
    const $pageNums = document.getElementById('pageNums');

    if (!$btnPrev.onclick) {
      $btnPrev.onclick = handlePageClick;
      $btnNext.onclick = handlePageClick;
    }

    $btnPrev.disabled = activePage < 1;
    $btnPrev.dataset.page = activePage - 1;
    $btnNext.disabled = activePage >= totalPages - 1;
    $btnNext.dataset.page = activePage + 1;

    $pageNums.innerHTML = '';
    const pages = Math.min(MAX_PAGES, totalPages) - 1;
    const isOverflow = totalPages > MAX_PAGES;
    // in short mode number of elipsis button
    let rangeBtnIndex = Math.floor((MAX_PAGES - 1) / 2);
    // only one elipsis button
    const isShortMode = activePage <= rangeBtnIndex || activePage >= (totalPages - rangeBtnIndex - 1);
    // in long mode (two elipsis buttons) number of buttons on the center
    const centerPages = pages - 3;
    const halfCenterPages = Math.floor(centerPages / 2);

    if (activePage === rangeBtnIndex) {
      rangeBtnIndex += 1;
    } else if (activePage === totalPages - rangeBtnIndex - 1) {
      rangeBtnIndex -= 1;
    }

    for (let i = 0; i <= pages; ++i) {
      const $btn = document.createElement('button');
      let isActive = false;
      let textContent = i + 1;
      let page = i;

      $btn.className = 'btn';

      if (activePage === i && !isOverflow) {
        isActive = true;
      } else {
        if (isOverflow) {
          if (i === 0 || i === pages) {
            if (i === pages) {
              page = totalPages - 1;
              textContent = totalPages;
            }
          } else if (isShortMode) {
            if (i === rangeBtnIndex) {
              textContent = '...';
              page = Math.floor((totalPages - MAX_PAGES + 1) / 2) + i - 1;
            } else if (i > rangeBtnIndex) {
              textContent = totalPages - pages + i;
              page = textContent - 1;
            }
          } else {
            if (i === 1 || i === pages - 1) {
              textContent = '...';
              page = i === 1 ? Math.floor((activePage - halfCenterPages) / 2) : totalPages - Math.floor((totalPages - activePage - halfCenterPages) / 2);
            } else {
              page = activePage - halfCenterPages + i - 2;
              textContent = page + 1;
            }
          }
        }
        isActive = activePage === page;
      }

      $btn.textContent = textContent;

      if (isActive) {
        $btn.className += ' page-current';
        $btn.disabled = true;
      } else {
        $btn.dataset.page = page;
        $btn.onclick = handlePageClick;
      }
      $pageNums.appendChild($btn);
    }
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
        if (/\d/.test(data[i])) {
          buff += data[i];
        }
        break;
    }
  }

  return { cells, width, height };
}

export default renderPatternsPanel;
