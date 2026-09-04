import GDI from './gdi.js';
import Life from './life.js';
import { renderPatternsPanel } from './patterns-panel.js';

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

  const $CtrlPanel = document.getElementById('controlPanel');
  const $CtrlPanelMini = document.getElementById('controlPanelMini');
  const $LifeCycle = document.getElementById('life-cycle');
  const $Cells = document.getElementById('cells');
  const $MaxCells = document.getElementById('max-cells');
  const $Time = document.getElementById('time');
  const $Coords = document.getElementById('coords');
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
  resetPosition();

  document.onselectstart = function() {
    return false;
  }

  Life.init(gd);

  window.addEventListener('resize', function() {
    gd.canvas.width = document.body.clientWidth;
    gd.canvas.height = document.body.clientHeight;

    Life.refresh();
  });

  document.getElementById('btnCtrlClose').onclick = function() {
    $CtrlPanel.classList.remove('opened');
    setTimeout(() => {
      $CtrlPanelMini.classList.remove('hidden');
    }, 300);
  }

  document.getElementById('btnCtrlOpen').onclick = function() {
    $CtrlPanelMini.classList.add('hidden');
    $CtrlPanel.classList.add('opened');
  }

  Array.from(document.getElementsByClassName('action-step')).forEach((e) => e.onclick = handleStep);
  Array.from(document.getElementsByClassName('action-start')).forEach((e) => e.onclick = handleStart);
  Array.from(document.getElementsByClassName('action-clear')).forEach((e) => e.onclick = handleClear);

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

  document.addEventListener('wheel', function(e) {
    if (e.wheelDelta > 0) zoomIn();
    else zoomOut();
  });

  document.getElementById('btnHome').onclick = (e) => {
    if (e.shiftKey) {
      const cell = e.ctrlKey ? Life.cells.findLast((c) => c?.isLive) : Life.cells.find((c) => c?.isLive);

      if (cell) {
        moveToCell(cell);
        Life.refresh();
        return;
      }
    }
    resetPosition();
    Life.refresh();
  };

  document.getElementById('btnSave').onclick = function() { handleSave(this); }

  renderPatternsPanel({
    onPaste: handlePaste,
  });

  gd.canvas.onmousedown = function(e) {
    if (e.ctrlKey && allowDrawing) {
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
  gd.canvas.onmousemove = function(e) {
    if (isMoving) {
      if (e.ctrlKey && allowDrawing) {
        const xy = gd.convertXY(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);

        Life.createCell(xy.x, xy.y, true, true);
        showInfo(Life.getInfo());
      } else {
        gd.moveBy(e.pageX - startX, e.pageY - startY);
      }
    }
  }
  gd.canvas.onmouseup = function(e) {
    if (isMoving) {
      this.classList.remove('moving');
      isMoving = false;
    }
    if (e.ctrlKey && allowDrawing) return;
    const byX = e.pageX - startX;
    const byY = e.pageY - startY;

    if (byX !== 0 || byY !== 0) {
      gd.moveComplete(byX, byY);
      Life.refresh();
      const {x, y} = gd.convertXY(Math.round(w / 2), Math.round(h / 2));
      updateCoords(x, y);
    }
    allowCycle = true;
  }
  document.onkeydown = (e) => {
    if (e.ctrlKey && allowDrawing) {
      gd.canvas.classList.remove('movable');
    }
  }
  document.onkeyup = (e) => {
    if (e.ctrlKey) {
      gd.canvas.classList.add('movable');
    }
  }

  function resetPosition() {
    gd.setX0Y0(Math.round(w / 2), Math.round(h / 2));
    updateCoords(0, 0);
  }

  function moveToCell(cell) {
    const { x, y } = cell;

    gd.setX0Y0(-x * gd.step + Math.round(w / 2), y * gd.step + Math.round(h / 2));
    updateCoords(x, y);
  }

  function handleStep() {
    showInfo(Life.cycle());
  }

  function handleStart() {
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

          if (info.liveCells < 1) stopLife();
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

      const btns = document.getElementsByClassName('action-start');

      for (let btn of btns) {
        if (btn.textContent === 'Start') btn.textContent = 'Pause';
        btn.classList.remove('icon-play');
        btn.classList.add('icon-pause');
      }
      Array.from(document.getElementsByClassName('action-step')).forEach((e) => e.disabled = true);
      document.getElementById('btnRnd').disabled = true;
      gd.canvas.classList.add('movable');
      allowCycle = true;
      isPaused = false;
      setTimeout(runCycle, 200);
    } else {
      stopLife();
    }
  }

  function handleClear() {
    stopLife();
    Life.init();
    allowDrawing = true;
    showInfo();
  }

  function showInfo(info) {
    $LifeCycle.textContent = info ? info.cycle : 0;
    $Cells.textContent = info ? `${info.liveCells} / ${info.totalCells}` : 0;
    $MaxCells.textContent = info ? info.maxLiveCells : 0;

    const fc = Math.round(1000 / (info?.time || 1));

    if (fps.min > fc) fps.min = fc;
    if (fps.max < fc) fps.max = fc;
    $Time.textContent = info ? `${fps.min}/${fc}/${fps.max}` : '';
  }

  function updateCoords(x, y) {
    $Coords.textContent = `${x} : ${y}`;
  }

  function stopLife() {
    const btns = document.getElementsByClassName('action-start');

    for (let btn of btns) {
      if (btn.textContent === 'Pause') btn.textContent = 'Start';
      btn.classList.remove('icon-pause');
      btn.classList.add('icon-play');
    }
    Array.from(document.getElementsByClassName('action-step')).forEach((e) => e.disabled = false);

    isPaused = true;
    allowDrawing = true;
    document.getElementById('btnRnd').disabled = false;
    gd.canvas.classList.remove('movable');
  }

  function _zoomCenter(zm) {
    const shiftX = Math.round(w / 2);
    const shiftY = Math.round(h / 2);
    const {x, y} = gd.convertXY(shiftX, shiftY);
    gd.setX0Y0(-x * zm + shiftX, y * zm + shiftY);
  }

  function zoomIn() {
    allowCycle = false;
    zoom++;
    $Zoom.textContent = zoom;
    _zoomCenter(zoom);
    Life.refresh(zoom);
    allowCycle = true;
  }

  function zoomOut() {
    if (zoom > 2) {
      allowCycle = false;
      zoom--;
      $Zoom.innerHTML = zoom;
      _zoomCenter(zoom);
      Life.refresh(zoom);
      allowCycle = true;
    }
  }

  function handleSave(el) {
    Life.save().then(() => {
      const cEl = el.cloneNode();
      const { top, left, width } = el.getBoundingClientRect();

      cEl.style.top = `${top}px`;
      cEl.style.left = `${left}px`;
      cEl.style.width = `${width}px`;
      cEl.textContent = 'copied';
      cEl.classList.add('fade-up');
      document.body.appendChild(cEl);
      setTimeout(() => document.body.removeChild(cEl), 2e3);
    }).catch(console.warn);
  }

  function handlePaste(cells, width, height) {
    handleClear();
    const xShift = Math.floor(width / 2);
    const yShift = Math.floor(height / 2);
    cells.forEach(([x, y]) => {
      Life.createCell(x - xShift, y + yShift, true);
    });
    showInfo(Life.getInfo());
  }
});
