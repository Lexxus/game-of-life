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

  // array of cells
  cells: [],

  // pool of links by cell ID to cell in the cells array
  pool: {},

  // array of indexes in cells array for dead cells
  holes: [],

  removed: 0,
  maxLiveCells: 0,

  isReady: false,

  currentCycle: 0,

  init: function (graphicDriver) {
    if (graphicDriver) this.gd = graphicDriver;
    this.cells = [];
    this.pool = {};
    this.holes = [];
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
    const id = x + 'n' + y;
    let i = this.pool[id];
    let cell;

    if (i >= 0) {
      cell = this.cells[i];

      if (!cell) throw new Error('Cell not found in pool: ' + id);

      if (live) {
        if (!cell.isLive || link) {
          cell.alive();
        } else {
          cell.die();
        }
      } else if (link) {
        cell.linksCount++;
      }
      cell.toDel = 0;
    } else {
      if (this.holes.length) {
        i = this.holes.shift();
      } else {
        i = this.cells.length;
      }
      this.pool[id] = i;
      cell = new Cell(x, y, live, link);
      this.cells[i] = cell;
      cell.update(live);
    }

    return cell;
  },

  cycle() {
    const t = Date.now();

    if (!this.isReady) {
      this.impact();
    }
    const cells = this.cells;
    let nLive = 0

    for (let i = 0, n = cells.length; i < n; ++i) {
      const cell = cells[i];

      if (cell) {
        cell.lifeCycle();
        if (cell?.isLive) ++nLive;
      }
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
      totalCells: cells.length - this.holes.length,
      removedCells,
      maxLiveCells: this.maxLiveCells,
      time: Date.now() - t
    }
  },

  getInfo() {
    return {
      cycle: this.currentCycle,
      liveCells: this.cells.reduce((n, c) => n + (c?.isLive ? 1 : 0), 0),
      totalCells: this.cells.length - this.holes.length,
      removedCells: this.removed,
      maxLiveCells: this.maxLiveCells
    };
  },

  testCycle() {
    if (!this.isReady) {
      this.impact();
    }
    const cells = this.cells
    let n = 0;

    for (var id in cells) {
      if (cells.hasOwnProperty(id)) {
        cells[id].testCycle();
        ++n;
      }
    }
  },

  impact() {
    const cells = this.cells;

    for (let i = 0, n = cells.length; i < n; ++i) {
      if (cells[i]) {
        const cell = cells[i];

        if (cell.isLive) cell.impact();
      }
    }
    this.isReady = true;
  },

  remove(cell) {
    if (cell.nbh) {
      for (let i = 0; i < 8; ++i) {
        cell.nbh[i].linksCount--;
      }
      cell.nbh = null;
    }
    if (cell.linksCount === 0) {
      if (cell.toDel++ > 5) {
        const id = cell.id;
        const i = this.pool[id];

        // highlight removed cell
        // this.gd.drawText(cell.x, cell.y, '+', '#FF8888');
        this.holes.push(i);
        this.pool[id] = undefined;
        this.cells[i] = undefined;
        this.removed++;
      }
    }
  },

  refresh(zoom) {
    this.gd.drawGrid(zoom);
    const cells = this.cells;

    for (let i = 0, n = cells.length; i < n; ++i) {
      if (cells[i]) {
        const cell = cells[i];
        if (cell.isLive) this.gd.drawCell(cell.x, cell.y);
      }
    }
  },

  save() {
    const pattern = this.cells.filter((c) => c?.isLive)
      .map((c) => [c.x, c.y]);

    console.log(this.convertCellsToData(pattern));
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
      const dy = cell[1] - y;

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
  points = 0;
  linksCount = 0;
  nbh = null;

  constructor(x, y, live, link) {
    this.x = x;
    this.y = y;
    this.id = x + 'n' + y;
    this.isLive = false;
    this.points = 0;
    this.linksCount = link ? 1 : 0;
    this.toDel = 0;

    //if(live) this.alive();
    //else this.die();
  }

  update(live) {
    if (live)
      this.alive();
    else
      this.die();
  }

  alive() {
    if (this.isLive) return;

    if (!this.nbh) {
      const x = this.x;
      const y = this.y;
      // neighborhood
      const nbh = [];

      nbh[0] = Life.createCell(x, y + 1, false, true);
      nbh[1] = Life.createCell(x + 1, y + 1, false, true);
      nbh[2] = Life.createCell(x + 1, y, false, true);
      nbh[3] = Life.createCell(x + 1, y - 1, false, true);
      nbh[4] = Life.createCell(x, y - 1, false, true);
      nbh[5] = Life.createCell(x - 1, y - 1, false, true);
      nbh[6] = Life.createCell(x - 1, y, false, true);
      nbh[7] = Life.createCell(x - 1, y + 1, false, true);
      this.nbh = nbh;
    }
    this.isLive = true;

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
      color = this.nbh ? 'red' : '#777777';
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
