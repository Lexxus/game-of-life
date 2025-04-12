/**
 * Conway's Game of Life execution
 *
 * @author Oleksii Teterin
 * @version 2.0
 */
setTimeout(function () {
  let runDelay = 2;
  let zoom = 6;
  const gd = new GDI('life', { step: zoom });

  const $LifeCycle = document.getElementById('life-cycle');
  const $Cells = document.getElementById('cells');
  const $MaxCells = document.getElementById('max-cells');
  const $Time = document.getElementById('time');
  const $Zoom = document.getElementById('zoomValue');

  const fps = { min: 1000, max: 0 };

  let w = document.body.clientWidth;
  let h = document.body.clientHeight;
  let allowDrawing = true;
  let isReady = false;
  let allowCycle = true;
  let isMoving = false;
  let isPaused = true;
  let startX, startY;

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

  $Zoom.innerHTML = zoom;

  gd.canvas.width = w;
  gd.canvas.height = h;
  gd.setX0Y0(Math.round(w / 2), Math.round(h / 2));

  document.onselectstart = function (e) {
    return false;
  }

  Life.init(gd);

  // var x = 25, y = 25;
  // Life.createCell(x, y, true, gd);
  // Life.createCell(x, y+1, true, gd);
  // Life.createCell(x, y+2, true, gd);
  // Life.createCell(x+1, y+2, true, gd);
  // Life.createCell(x+2, y+2, true, gd);
  // Life.createCell(x+2, y+1, true, gd);
  // Life.createCell(x+2, y, true, gd);
  // Life.testCycle();

  document.getElementById('btnStep').onclick = function (e) {
    if (!isReady) return;
    allowDrawing = false;

    showInfo(Life.cycle());
    //Life.testCycle();
  };

  document.getElementById('btnStart').onclick = function (e) {
    if (!isReady) return;
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

      e.target.textContent = '|| Pause';
      document.getElementById('btnStep').disabled = true;
      document.getElementById('btnRnd').disabled = true;
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
    isReady = false;
    showInfo();
  }

  document.getElementById('btnRnd').onclick = function () {
    const ww = 100, hh = 100;

    for (let j = 0; j < 2000; ++j) {
      Life.createCell(Math.round(Math.random() * ww) - 50, Math.round(Math.random() * hh) - 50, true);
    }
    isReady = true;
  }

  document.getElementById('btnZoomIn').onclick = zoomIn;
  document.getElementById('btnZoomOut').onclick = zoomOut;

  document.addEventListener('wheel', function (e) {
    if (e.wheelDelta > 0) zoomIn();
    else zoomOut();
  });

  gd.canvas.onmousedown = function (e) {
    if (!e.ctrlKey && allowDrawing) {
      const xy = gd.convertXY(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);

      Life.createCell(xy.x, xy.y, true);

      isReady = true;
    } else {
      allowCycle = false;
      startX = e.pageX;
      startY = e.pageY;
    }
    isMoving = true;
  }
  gd.canvas.onmousemove = function (e) {
    if (isMoving) {
      if (!e.ctrlKey && allowDrawing) {
        const xy = gd.convertXY(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);

        Life.createCell(xy.x, xy.y, true, true);
      } else {
        gd.moveBy(e.pageX - startX, e.pageY - startY);
      }
    }
  }
  gd.canvas.onmouseup = function (e) {
    isMoving = false;
    if (!e.ctrlKey && allowDrawing) return;
    const byX = e.pageX - startX;
    const byY = e.pageY - startY;

    if (byX !== 0 || byY !== 0) {
      gd.moveComplete(byX, byY);
      Life.refresh();
    }
    allowCycle = true;
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
    isPaused = true;
    document.getElementById('btnStart').textContent = '>> Start';
    allowDrawing = true;
    document.getElementById('btnStep').disabled = false;
    document.getElementById('btnRnd').disabled = false;
  }
}, 100);
