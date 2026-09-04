/**
 * Conway's Game of Life
 * http://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
 *
 * @author Oleksii Teterin
 * @version 2.0
 */

/**
 * Life, static control object
 */
export const Life = {
  // graphic driver
  gd: null,

  cells: new Map(),

  removed: 0,
  maxLiveCells: 0,

  isReady: false,

  currentCycle: 0,

  init: function (graphicDriver) {
    if (graphicDriver) this.gd = graphicDriver;
    this.cells.clear();
    this.removed = 0;
    this.isReady = false;
    this.currentCycle = 0;
    this.maxLiveCells = 0;

    if (this.gd) {
      this.gd.drawGrid();
    } else {
      throw new Error('Graphic driver not initialized (Canvas Element)');
    }
  },

  createCell(x, y, live, link) {
    const id = createId(x, y);
    let cell = this.cells.get(id);

    if (cell) {
      if (live) {
        if (!cell.isLive || link) {
          cell.alive();
        } else {
          cell.die();
        }
      } else if (link) {
        cell.linksCount++;
      }
      cell.staleFactor = 0;
    } else {
      cell = new Cell(x, y, link);
      this.cells.set(id, cell);
      cell.update(live);
    }

    return cell;
  },

  cycle() {
    const t = Date.now();

    if (!this.isReady) {
      this.impact();
    }
    let nLive = 0

    let n = this.cells.size;
    for (const cell of this.cells.values()) {
      // .lifeCycle() mutates cells by adding new cells
      // this skip iterating new cells
      if (n-- <= 0) break;
      cell.lifeCycle();
      if (cell.isLive) ++nLive;
    }
    this.currentCycle++;
    const removedCells = this.removed;

    this.impact();

    this.removed = 0;

    if (nLive > this.maxLiveCells) {
      this.maxLiveCells = nLive;
    }

    return {
      cycle: this.currentCycle,
      liveCells: nLive,
      totalCells: this.cells.size,
      removedCells,
      maxLiveCells: this.maxLiveCells,
      time: Date.now() - t
    }
  },

  getInfo() {
    return {
      cycle: this.currentCycle,
      liveCells: this.cells.values().reduce((n, c) => n + (c.isLive ? 1 : 0), 0),
      totalCells: this.cells.size,
      removedCells: this.removed,
      maxLiveCells: this.maxLiveCells
    };
  },

  testCycle() {
    if (!this.isReady) {
      this.impact();
    }

    this.cells.values().forEach((cell) => {
      cell.testCycle();
    });
  },

  impact() {
    for (const cell of this.cells.values()) {
      if (cell.isLive) {
        cell.impact();
      }
    }
    this.isReady = true;
  },

  remove(cell) {
    if (cell.nbh.length) {
      for (let i = 0; i < 8; ++i) {
        const nbh = cell.nbh[i];
        if (nbh.linksCount > 0) nbh.linksCount--;
      }
      cell.nbh.length = 0;
    }
    if (cell.linksCount === 0) {
      if (cell.staleFactor++ > 5) {
        // highlight removed cell
        // this.gd.drawText(cell.x, cell.y, '+', '#FF8888');

        this.cells.delete(cell.id);
        this.removed++;
      }
    }
  },

  refresh(zoom) {
    this.gd.drawGrid(zoom);
    this.cells.values().forEach((cell) => {
      if (cell.isLive) {
        this.gd.drawCell(cell.x, cell.y);
      }
    });
  },

  save() {
    const pattern = Array.from(this.cells.values().filter((c) => c.isLive)
      .map((c) => [c.x, c.y]));

    if (!pattern.length) {
      return Promise.reject("No alive cells");
    }
    const patternRLE = this.convertCellsToData(pattern);

    console.log(patternRLE);
    return copyToClipboard(patternRLE);
  },

  convertCellsToData(cells) {
    const minX = cells.reduce((min, cell) => Math.min(min, cell[0]), Infinity);
    const sCells = cells.sort(([x1, y1], [x2, y2]) => {
      if (y1 === y2) {
        return x1 - x2;
      }
      return y2 - y1;
    });

    let data = "";
    let x = minX;

    let i = 0;
    let cell = sCells[i];
    let y = cell[1];
    let xLen = 0;

    while (cell) {
      const dy = Math.abs(cell[1] - y);

      if (dy !== 0) {
        if (xLen > 0) {
          data += (xLen > 1 ? xLen : "") + "o";
          xLen = 0;
        }
        data += (dy > 1 ? dy : "") + "$";
        y = cell[1];
        x = minX;
      }
      const dx = cell[0] - x;

      if (dx > 0) {
        if (xLen > 0) {
          data += (xLen > 1 ? xLen : "") + "o";
        }
        data += (dx > 1 ? dx : "") + "b";
        x = cell[0] + 1;
        xLen = 1;
      } else {
        x++;
        xLen++;
      }

      cell = sCells[++i];
    }

    if (xLen > 0) {
      data += (xLen > 1 ? xLen : "") + "o";
    }

    return data + "!";
  }

};

/**
 * Cell class
 */
class Cell {
  x = 0;
  y = 0;
  id = '';
  isLive = false;
  // the main life factor:
  // if it is not 2 or 3 the cell will die
  points = 0;
  // number of cells pointing to this one
  linksCount = 0;
  // neighborhoods
  nbh = [];
  // to avoid frequently recreate cell
  // do not remove it immediately but after some life cycles
  staleFactor = 0;

  constructor(x, y, link) {
    this.x = x;
    this.y = y;
    this.id = createId(x, y);
    this.isLive = false;
    this.points = 0;
    this.linksCount = link ? 1 : 0;
    this.staleFactor = 0;
  }

  update(live) {
    if (live)
      this.alive();
    else
      this.die();
  }

  alive() {
    if (this.isLive) return;

    if (!this.nbh.length) {
      const x = this.x;
      const y = this.y;
      // neighborhoods
      const nbh = this.nbh;

      nbh[0] = Life.createCell(x, y + 1, false, true);
      nbh[1] = Life.createCell(x + 1, y + 1, false, true);
      nbh[2] = Life.createCell(x + 1, y, false, true);
      nbh[3] = Life.createCell(x + 1, y - 1, false, true);
      nbh[4] = Life.createCell(x, y - 1, false, true);
      nbh[5] = Life.createCell(x - 1, y - 1, false, true);
      nbh[6] = Life.createCell(x - 1, y, false, true);
      nbh[7] = Life.createCell(x - 1, y + 1, false, true);
    }
    this.isLive = true;
    this.staleFactor = 0;

    Life.gd.drawCell(this.x, this.y);
  }

  die() {
    this.isLive = false;

    Life.gd.clearCell(this.x, this.y);
  }

  impact() {
    for (let i = 0; i < 8; ++i) {
      this.nbh[i].points++;
    }
  }

  testCycle() {
    const colors = [
      '#FF0000',
      '#AAAAAA',
      '#4444FF',
      '#44FF44',
      '#884444',
      '#CC4444',
      '#DDDD44',
      '#BBBB00',
      '#888800',
      '#444400'
    ];
    let color;

    if (this.isLive) {
      Life.gd.drawCell(this.x, this.y);
      color = '#FFFFFF';
    } else {
      Life.gd.clearCell(this.x, this.y);
      color = this.nbh.length ? 'red' : '#777777';
    }

    Life.gd.drawText(this.x, this.y, this.linksCount, color);
  }

  lifeCycle() {
    const p = this.points;

    if (p < 2 || p > 3) {
      if (this.isLive) this.die();
      if (p === 0) {
        Life.remove(this);
      }
    } else if (p === 3) {
      this.alive();
    }
    this.points = 0;
  }
}

export default Life;

function createId(x, y) {
  return `${x}n${y}`;
}

async function copyToClipboard(text) {
  return navigator.clipboard.writeText(text);
}

