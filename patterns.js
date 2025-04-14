const patterns = [
  {
    id: 'glider',
    name: 'Glider',
    description: 'A small pattern that moves diagonally across the grid.',
    cells: [
      [1, 2],
      [2, 0],
      [1, 0],
      [0, 0],
      [0, 1]
    ]
  },
  {
    id: 'toad',
    name: 'Toad',
    description: 'A period-2 oscillator that flips between two states.',
    cells: [
      [0, 1],
      [1, 0],
      [1, 1],
      [1, 2],
      [2, 1]
    ]
  },
{
    id: 'beacon',
    name: 'Beacon',
    description: 'A period-2 oscillator that flips between two states.',
    cells: [
      [0, 0],
      [0, 1],
      [1, 0],
      [2, 2],
      [2, 3],
      [3, 2]
    ]
  },
  {
    id: 'pulsar',
    name: 'Pulsar',
    description: 'A larger oscillator that creates a pulsating effect.',
    cells: [
      [0, 2],
      [0, 3],
      [0, 4],
      [2, 0],
      [2, 1],
      [2, 4],
      [2, 5],
      [3, 0],
      [3, 1],
      [3, 4],
      [3, 5],
      [4, 2],
      [4, 3],
      [5, 2],
      [5, 3]
    ]
  },
  {
    id: 'spaceship',
    name: 'Spaceship',
    description: 'A pattern that moves across the grid.',
    cells: [
      [0, 1],
      [0, 2],
      [0, 3],
      [1, 0],
      [1, 3],
      [2, 1],
      [2, 2],
      [2, 3]
    ]
  },
  {
    id: 'pentadecathlon',
    name: 'Pentadecathlon',
    description: 'A period-15 oscillator that creates a complex pattern.',
    cells: [
      [0, 1],
      [0, 2],
      [0, 3],
      [1, 0],
      [1, 4],
      [2, 1],
      [2, 2],
      [2, 3],
      [3, 0],
      [3, 4],
      [4, 1],
      [4, 2],
      [4, 3]
    ]
  },
  {
    id: 'caterpillar',
    name: 'Caterpillar',
    description: 'A long pattern that moves across the grid.',
    cells: [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
      [0, 4],
      [1, 2]
    ]
  },
  {
    id: 'bHeptomino',
    name: 'B-Heptomino',
    description: 'A somewhat vigorous, commonly seen bit of fluff, which lends to Life\'s growth tendencies.  This piece is used in PUFTRAIN, RAKE, RAKE2, RAKE3, BHEPTPUF, GUN46, TRACK, GUNSTAR, GUNSTAR2, GUNSTAR3, BI-GUN, and the p46, p54, and p100 shuttles in OSCSPN2 and OSCSPN3, and in many other patterns.',
    cells: [
      [0, 0],
      [0, 1],
      [1, 1],
      [1, 2],
      [2, 0],
      [2, 1],
      [3, 0]
    ]
  },
  {
    id: 'biGun',
    name: 'Bi-Gun',
    description: 'Two-barrelled p46 glider gun',
    cells: [
      [-9, -7], [-8, -7], [-7, -7],
      [-7, -6], [-7, -5], [-8, -4],
      [-8, -2], [-7, -1], [-7, 0],
      [-9, 1], [-8, 1], [-7, 1],
      [6, -3], [7, -3], [8, -3],
      [6, -2], [6, -1], [7, 0],
      [7, 2], [6, 3], [6, 4],
      [6, 5], [7, 5], [8, 5],
      [23, -3], [24, -3], [24, -2],
      [-25, 0], [-25, 1], [-24, 1]
    ]
  },
  {
    id: 'bHeptpuff',
    name: 'B-Heptomino puffer',
    description: "An extension of PUFTRAIN, but at these lengths, the ends need to be hit by rakes. Even with the rakes, there are only a finite number of lengths that don\'t eventually self-destruct. For a stable dirty puffer, see LINEPUF.",
    cells: [
      [8, -53], [8, -52], [9, -52], [9, -51], [10, -51], [8, -50],
      [9, -50], [8, -46], [9, -46], [9, -45], [10, -45], [8, -44],
      [9, -44], [8, -43], [8, -41], [8, -40], [9, -40], [9, -39],
      [10, -39], [8, -38], [9, -38], [8, -34], [9, -34], [9, -33],
      [10, -33], [8, -32], [9, -32], [8, -31], [8, -29], [8, -28],
      [9, -28], [9, -27], [10, -27], [8, -26], [9, -26], [8, -22],
      [9, -22], [9, -21], [10, -21], [8, -20], [9, -20], [8, -19],
      [8, -17], [8, -16], [9, -16], [9, -15], [10, -15], [8, -14],
      [9, -14], [8, -10], [9, -10], [9, -9], [10, -9], [8, -8],
      [9, -8], [8, -7], [8, -5], [8, -4], [9, -4], [9, -3],
      [10, -3], [8, -2], [9, -2], [8, 2], [9, 2], [9, 3],
      [10, 3], [8, 4], [9, 4], [8, 5], [8, 7], [8, 8],
      [9, 8], [9, 9], [10, 9], [8, 10], [9, 10], [8, 14],
      [9, 14], [9, 15], [10, 15], [8, 16], [9, 16], [8, 17],
      [8, 19], [8, 20], [9, 20], [9, 21], [10, 21], [8, 22],
      [9, 22], [8, 26], [9, 26], [9, 27], [10, 27], [8, 28],
      [9, 28], [8, 29], [8, 31], [8, 32], [9, 32], [9, 33],
      [10, 33], [8, 34], [9, 34], [8, 38], [9, 38], [9, 39],
      [10, 39], [8, 40], [9, 40], [8, 41], [8, 43], [8, 44],
      [9, 44], [9, 45], [10, 45], [8, 46], [9, 46], [8, 50],
      [9, 50], [9, 51], [10, 51], [8, 52], [9, 52], [8, 53],
      [32, -73], [35, -73], [36, -72], [32, -71], [36, -71], [33, -70],
      [34, -70], [35, -70], [36, -70], [32, -66], [33, -65], [34, -65],
      [34, -64], [34, -63], [33, -62], [32, -59], [35, -59], [36, -58],
      [32, -57], [36, -57], [33, -56], [34, -56], [35, -56], [36, -56],
      [29, -67], [30, -67], [27, -65], [28, -65], [26, -64], [27, -64],
      [25, -63], [26, -63], [26, -62], [30, -62], [31, -61], [25, -59],
      [26, -59], [24, -58], [25, -58], [26, -58], [27, -58], [24, -57],
      [25, -57], [27, -57], [28, -57], [26, -56], [27, -56], [16, -74],
      [17, -74], [18, -74], [19, -74], [15, -73], [19, -73], [19, -72],
      [15, -71], [18, -71], [12, -69], [13, -69], [14, -69], [11, -67],
      [14, -67], [11, -66], [13, -66], [10, -59], [11, -59], [8, -58],
      [9, -58], [11, -58], [12, -58], [8, -57], [9, -57], [10, -57],
      [11, -57], [9, -56], [10, -56], [6, -65], [7, -64], [5, -63],
      [6, -63], [7, -63], [1, -60], [2, -59], [0, -58], [1, -58],
      [2, -58], [33, 56], [34, 56], [35, 56], [36, 56], [32, 57],
      [36, 57], [36, 58], [32, 59], [35, 59], [33, 62], [34, 63],
      [34, 64], [33, 65], [34, 65], [32, 66], [33, 70], [34, 70],
      [35, 70], [36, 70], [32, 71], [36, 71], [36, 72], [32, 73],
      [35, 73], [26, 56], [27, 56], [24, 57], [25, 57], [27, 57],
      [28, 57], [24, 58], [25, 58], [26, 58], [27, 58], [25, 59],
      [26, 59], [31, 61], [26, 62], [30, 62], [25, 63], [26, 63],
      [26, 64], [27, 64], [27, 65], [28, 65], [29, 67], [30, 67],
      [15, 71], [18, 71], [19, 72], [15, 73], [19, 73], [16, 74],
      [17, 74], [18, 74], [19, 74], [11, 66], [13, 66], [11, 67],
      [14, 67], [12, 69], [13, 69], [14, 69], [5, 63], [6, 63],
      [7, 63], [7, 64], [6, 65], [0, 58], [1, 58], [2, 58],
      [2, 59], [1, 60], [9, 56], [10, 56], [8, 57], [9, 57],
      [10, 57], [11, 57], [8, 58], [9, 58], [11, 58], [12, 58],
      [10, 59], [11, 59]
    ]
  }
  // Add more patterns as needed
  // {
  //   id: 'newPattern',
  //   name: 'New Pattern',
  //   description: 'Description of the new pattern.',
  //   cells: [
  //     [x1, y1],
  //     [x2, y2],
  //     // Add more coordinates as needed
  //   ]
  // }
];

document.addEventListener('DOMContentLoaded', () => {
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
    Life.save();
  }

  container.addEventListener('click', (e) => {
    const patternDiv = e.target.classList.contains('pattern') ? e.target : e.target.closest('.pattern');

    if (patternDiv) {
      const patternId = patternDiv.dataset.id;
      const pattern = patterns.find((p) => p.id === patternId);

      if (pattern) {
        pattern.cells.forEach(([x, y]) => {
          Life.createCell(x, y, true);
        });
      }
    }
  });

  container.addEventListener('wheel', (e) => {
    e.stopImmediatePropagation();
  });
});
