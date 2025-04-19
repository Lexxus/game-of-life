/**
 * Graphic Display Interface
 *
 * @author Oleksii Teterin
 * @version 2.0
 */

export class GDI {
  step = 1;
  x0 = 0;
  y0 = 0;
  color = 'black';
  imgData = undefined;
  context2d = undefined;

  constructor(canvasOrId, options) {
    const canvas = typeof canvasOrId === 'string' ? document.getElementById(canvasOrId) : canvasOrId;

    if (canvas) {
      this.canvas = canvas;
      this.context2d = canvas.getContext('2d');
    } else {
      throw new Error('Canvas not found');
    }
    if (!options) {
      options = {};
    }
    this.step = options.step || 5;
    this.x0 = options.x0 || 0;
    this.y0 = options.y0 || 0;
    this.color = options.color || 'black';

    this.context2d.fillStyle = this.color;
  }

  setX0Y0(x, y) {
    this.x0 = x;
    this.y0 = y;
  }

  translateBy(x, y) {
    this.x0 += x;
    this.y0 += y;
  }

  convertXY(x, y) {
    return {
      x: Math.floor((x - this.x0) / this.step),
      y: Math.floor((this.y0 - y) / this.step)
    }
  }

  clear(color) {
    const ctx = this.context2d;

    if (color) {
      const bColor = ctx.fillStyle;

      ctx.fillStyle = color;
      ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      ctx.fillStyle = bColor;
    } else {
      ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  drawGrid(zoom) {
    const step = zoom || this.step;
    const w = this.canvas.width;
    const h = this.canvas.height;
    const ctx = this.context2d;
    let x = this.x0 % step;
    let y = this.y0 % step;
    let xx = 0, yy = Math.floor(this.y0 / step) - 1;

    ctx.clearRect(0, 0, w, h);

    ctx.strokeStyle = '#F1F1F1';
    ctx.beginPath();

    ctx.font = '7px Arial';
    //draw vertical lines
    while (x < w) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      //this.context2d.fillText(xx, x+1, step-1);
      x += step;
      xx++;
    }
    //draw horizontal lines
    while (y < h) {
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      //this.context2d.fillText(yy, 1, y + step - 1);
      y += step;
      yy--;
    }
    ctx.stroke();

    // draw axios
    ctx.strokeStyle = '#E7E7E7';
    ctx.beginPath();
    ctx.moveTo(0, this.y0);
    ctx.lineTo(w, this.y0);
    ctx.moveTo(this.x0, 0);
    ctx.lineTo(this.x0, h);
    ctx.stroke();

    this.step = step;
  }

  getRealXY(x, y) {
    return {
      x: this.x0 + x * this.step,
      y: this.y0 - y * this.step - this.step
    }
  }

  drawCell(x, y, color) {
    const xy = this.getRealXY(x, y);
    const wh = this.step > 1 ? this.step - 1 : 1;

    if (color) this.context2d.fillStyle = color;

    this.context2d.fillRect(
      xy.x, xy.y,
      wh, wh
    );

    if (color) this.context2d.fillStyle = this.color;
  }

  clearCell(x, y) {
    const xy = this.getRealXY(x, y);
    const wh = this.step > 1 ? this.step - 1 : 1;

    this.context2d.clearRect(
      xy.x, xy.y,
      wh, wh
    );
  }

  drawText(x, y, text, color) {
    const xy = this.getRealXY(x, y);
    const sh = this.step / 3;
    const ctx = this.context2d;

    ctx.font = Math.round(sh + sh) + 'px Arial';
    if (color) ctx.fillStyle = color;
    ctx.fillText(text, xy.x + sh, xy.y + sh + sh);
    if (color) ctx.fillStyle = this.color;
  }

  moveBy(byX, byY) {
    const w = this.canvas.width;
    const h = this.canvas.height;
    const ctx = this.context2d;

    if (!this.imgData) {
      this.imgData = ctx.getImageData(0, 0, w, h);
    }
    ctx.clearRect(0, 0, w, h);
    ctx.putImageData(this.imgData, byX, byY);
  }

  moveComplete(byX, byY) {
    this.translateBy(byX, byY);
    this.imgData = undefined;
  }
}

export default GDI;
