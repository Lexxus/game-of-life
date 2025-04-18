import GDI from './gdi.js';
import Life from './life.js';
import patternsPanel from './patterns-panel.js';

/**
 * Conway's Game of Life execution
 *
 * @author Oleksii Teterin
 * @version 2.0
 */
document.addEventListener('DOMContentLoaded', () => {
  const MAX_SPEED = 1000;
  let zoom = 6;
  const gd = new GDI('life', { step: zoom });

  const $LifeCycle = document.getElementById('life-cycle');
  const $Cells = document.getElementById('cells');
  const $MaxCells = document.getElementById('max-cells');
  const $Time = document.getElementById('time');
  const $Zoom = document.getElementById('zoomValue');
  const $Speed = document.getElementById('speed');

  const fps = { min: 1000, max: 0 };

  let w = document.body.clientWidth;
  let h = document.body.clientHeight;
  let allowDrawing = true;
  let allowCycle = true;
  let isMoving = false;
  let isPaused = true;
  let startX, startY;

  let speed = $Speed.value;
  let runDelay = MAX_SPEED / speed;

  document.getElementById('speedValue').innerHTML = speed;

  $Zoom.innerHTML = zoom;

  gd.canvas.width = w;
  gd.canvas.height = h;
  gd.setX0Y0(Math.round(w / 2), Math.round(h / 2));

  document.onselectstart = function (e) {
    return false;
  }

  Life.init(gd);

  document.getElementById('btnStep').onclick = function (e) {
    allowDrawing = false;

    showInfo(Life.cycle());
  };

  document.getElementById('btnStart').onclick = function (e) {
    allowDrawing = false;

    if (isPaused) {
      let live = 0
      let n0 = 5
      let n = n0;

      function runCycle() {
        if (isPaused) return;
        if (allowCycle) {
          const info = Life.cycle();

          showInfo(info);

          if (info.liveCells < 3) stopLife();
          if (info.liveCells === live) {
            if (--n === 0) {
              stopLife();
            }
          } else {
            n = n0;
            live = info.liveCells;
          }
          setTimeout(runCycle, runDelay);
        } else {
          setTimeout(runCycle, 500);
        }
      }

      const btn = e.target;

      btn.textContent = 'Pause';
      btn.classList.remove('icon-play');
      btn.classList.add('icon-pause');
      document.getElementById('btnStep').disabled = true;
      document.getElementById('btnRnd').disabled = true;
      gd.canvas.classList.add('movable');
      allowCycle = true;
      isPaused = false;
      setTimeout(runCycle, 200);
    } else {
      stopLife();
    }
  };

  document.getElementById('btnClear').onclick = function () {
    stopLife();
    Life.init();
    allowDrawing = true;
    showInfo();
  }

  document.getElementById('btnRnd').onclick = () => {
    const w = 100;
    const w2 = w / 2;
    const h = 100;
    const h2 = h / 2;

    for (let j = 0; j < 2000; ++j) {
      Life.createCell(Math.round(Math.random() * w) - w2, Math.round(Math.random() * h) - h2, true);
    }
  }

  $Speed.oninput = (e) => {
    document.getElementById('speedValue').innerHTML = e.target.value;
  }
  $Speed.onchange = (e) => {
    speed = e.target.value;
    runDelay = MAX_SPEED / speed;
  }

  document.getElementById('btnZoomIn').onclick = zoomIn;
  document.getElementById('btnZoomOut').onclick = zoomOut;

  document.addEventListener('wheel', function (e) {
    if (e.wheelDelta > 0) zoomIn();
    else zoomOut();
  });

  patternsPanel({
    onSave: handleSave,
    onPaste: handlePaste,
  });

  gd.canvas.onmousedown = function (e) {
    if (!e.ctrlKey && allowDrawing) {
      const xy = gd.convertXY(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);

      Life.createCell(xy.x, xy.y, true);
      showInfo(Life.getInfo());
    } else {
      allowCycle = false;
      startX = e.pageX;
      startY = e.pageY;
      this.classList.add('moving');
    }
    isMoving = true;
  }
  gd.canvas.onmousemove = function (e) {
    if (isMoving) {
      if (!e.ctrlKey && allowDrawing) {
        const xy = gd.convertXY(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);

        Life.createCell(xy.x, xy.y, true, true);
        showInfo(Life.getInfo());
      } else {
        gd.moveBy(e.pageX - startX, e.pageY - startY);
      }
    }
  }
  gd.canvas.onmouseup = function (e) {
    if (isMoving) {
      this.classList.remove('moving');
      isMoving = false;
    }
    if (!e.ctrlKey && allowDrawing) return;
    const byX = e.pageX - startX;
    const byY = e.pageY - startY;

    if (byX !== 0 || byY !== 0) {
      gd.moveComplete(byX, byY);
      Life.refresh();
    }
    allowCycle = true;
  }
  document.onkeydown = function (e) {
    if (e.ctrlKey && allowDrawing) {
      gd.canvas.classList.add('movable');
    }
  }
  document.onkeyup = function (e) {
    if (!e.ctrlKey && allowDrawing) {
      gd.canvas.classList.remove('movable');
    }
  }

  function showInfo(info) {
    $LifeCycle.innerHTML = info ? info.cycle : 0;
    $Cells.innerHTML = info ? info.liveCells + ' / ' + info.totalCells : 0;
    $MaxCells.innerHTML = info ? info.maxLiveCells : 0;

    const fc = Math.round(1000 / (info?.time || 1));

    if (fps.min > fc) fps.min = fc;
    if (fps.max < fc) fps.max = fc;
    $Time.innerHTML = info ? fps.min + '/' + fc + '/' + fps.max : '';
  }

  function stopLife() {
    const btn = document.getElementById('btnStart');

    btn.textContent = 'Start';
    btn.classList.remove('icon-pause');
    btn.classList.add('icon-play');

    isPaused = true;
    allowDrawing = true;
    document.getElementById('btnStep').disabled = false;
    document.getElementById('btnRnd').disabled = false;
    gd.canvas.classList.remove('movable');
  }

  function zoomIn() {
    allowCycle = false;
    zoom++;
    $Zoom.innerHTML = zoom;
    Life.refresh(zoom);
    allowCycle = true;
  }

  function zoomOut() {
    if (zoom > 2) {
      allowCycle = false;
      zoom--;
      $Zoom.innerHTML = zoom;
      Life.refresh(zoom);
      allowCycle = true;
    }
  }

  function handleSave() {
    Life.save();
  }

  function handlePaste(cells) {
    cells.forEach(([x, y]) => {
      Life.createCell(x, y, true);
    });
  }
});
