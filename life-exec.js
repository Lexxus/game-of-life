/**
 * Conway's Game of Life execution
 *
 * @author Alexey Teterin
 * @version 1.0
 */
setTimeout(function(){
	var zoom = 6,
		gd = new GDI('life', {step: zoom}),
		w = document.body.clientWidth,
		h = document.body.clientHeight,
		elLifeCycle = document.getElementById('life-cycle'),
		elCells = document.getElementById('cells'),
		elMaxCells = document.getElementById('max-cells'),
		elTime = document.getElementById('time'),
		elZoom = document.getElementById('zoomValue'),
		allowDrawing = true,
		isReady = false,
		allowCycle = true,
		isMoving = false,
		isPaused = true,
		startX, startY,
		fps = {min:1000, max:0};

	elZoom.innerHTML = zoom;

	gd.canvas.width = w;
	gd.canvas.height = h;
	gd.setX0Y0(Math.round(w / 2), Math.round(h / 2));
	//gd.drawGrid();
	
	document.onselectstart = function(e){
		return false;
	}

	Life.init(gd);
	
	/*
	var x = 25, y = 25;
	Life.createCell(x, y, true, gd);
	Life.createCell(x, y+1, true, gd);
	Life.createCell(x, y+2, true, gd);
	Life.createCell(x+1, y+2, true, gd);
	Life.createCell(x+2, y+2, true, gd);
	Life.createCell(x+2, y+1, true, gd);
	Life.createCell(x+2, y, true, gd);
	*/
	//Life.testCycle();

	document.getElementById('btnStep').onclick = function(e){
		if(!isReady) return;
		allowDrawing = false;

		showInfo(Life.cycle());
		//Life.testCycle();
	};
	
	document.getElementById('btnStart').onclick = function(e){
		if(!isReady) return;
		allowDrawing = false;

		if(isPaused){
			var live = 0, n0 = 5, n = n0, that = this;
			this.innerHTML = '|| Pause';
			document.getElementById('btnStep').disabled = true;
			document.getElementById('btnRnd').disabled = true;
			allowCycle = true;
			isPaused = false;
			setTimeout(function(){
				if(isPaused) return;
				if(allowCycle){
					var info = Life.cycle();
					showInfo(info);
					if(info.liveCells < 3) stopLife();
					if(info.liveCells == live){
						if(--n == 0){
							stopLife();
						}
					}else{
						n = n0;
						live = info.liveCells;
					}
					setTimeout(arguments.callee, 2);
				}else{
					setTimeout(arguments.callee, 500);
				}
			}, 200);
		}else {
			stopLife();
		}
	};

	document.getElementById('btnClear').onclick = function(e){
		stopLife();
		//gd.drawGrid();
		Life.init();
		allowDrawing = true;
		isReady = false;
		showInfo();
	}

	document.getElementById('btnRnd').onclick = function(e){
		var ww = 100, hh = 100;
		for(var j = 0; j < 2000; ++j){
			Life.createCell(Math.round(Math.random()*ww)-50, Math.round(Math.random()*hh)-50, true);
		}
		isReady = true;
	}

	document.getElementById('btnZoomSub').onclick = function(e){
		if(zoom > 2){
			allowCycle = false;
			zoom--;
			elZoom.innerHTML = zoom;
			Life.refresh(zoom);
			allowCycle = true;
		}
	}
	document.getElementById('btnZoomAdd').onclick = function(e){
		allowCycle = false;
		zoom++;
		elZoom.innerHTML = zoom;
		Life.refresh(zoom);
		allowCycle = true;
	}
	
	gd.canvas.onmousedown = function(e){
		if(allowDrawing){
			var xy = gd.convertXY(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);

			Life.createCell(xy.x, xy.y, true);

			isReady = true;
		}else{
			allowCycle = false;
			startX = e.pageX;
			startY = e.pageY;
		}
		isMoving = true;
	}
	gd.canvas.onmousemove = function(e){
		if(isMoving){
			if(allowDrawing){
				var xy = gd.convertXY(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);

				Life.createCell(xy.x, xy.y, true, true);
			}else{
				gd.moveBy(e.pageX - startX, e.pageY - startY);
			}
		}
	}
	gd.canvas.onmouseup = function(e){
		isMoving = false;
		if(allowDrawing) return;
		var byX = e.pageX - startX,
			byY = e.pageY - startY;
		if(byX != 0 || byY !=0){
			gd.moveComplete(byX, byY);
			Life.refresh();
		}
		allowCycle = true;
	}

	function showInfo(info){
		elLifeCycle.innerHTML = info ? info.cycle : 0;
		elCells.innerHTML = info ? info.liveCells + ' / ' + info.totalCells : 0;
		elMaxCells.innerHTML = info ? info.maxLiveCells : 0;

		if(info){
			var fc = Math.round(1000 / (info.time || 1));
			if(fps.min > fc) fps.min = fc;
			if(fps.max < fc) fps.max = fc;
		}
		elTime.innerHTML = info ? fps.min +'/'+ fc +'/'+ fps.max : '';
	}

	function stopLife(){
		isPaused = true;
		document.getElementById('btnStart').innerHTML = '&gt;&gt;Start';
		//allowDrawing = true;
		document.getElementById('btnStep').disabled = false;
		document.getElementById('btnRnd').disabled = false;
	}
}, 100);