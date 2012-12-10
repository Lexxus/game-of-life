/**
 * Conway's Game of Life
 * http://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
 *
 * @author Alexey Teterin
 * @version 1.0
 */
 
 /**
  * Life, static control object
  */
var Life = {
	// array of cells
	cells:[],
	
	// hash of links by cell ID to cell in the cells array
	hash:{},
	
	// array of indexes in cells array for dead cells
	holes:[],
	
	removed: 0,
	maxLiveCells: 0,
	
	isReady: false,
	
	currentCycle: 0,

	init: function(graphicDriver){
		if(graphicDriver) this.gd = graphicDriver;
		this.cells = [];
		this.hash = {};
		this.holes = [];
		this.removed = 0;
		this.isReady = false;
		this.currentCycle = 0;
		this.maxLiveCells = 0;

		if(this.gd){
			this.gd.drawGrid();
		}else{
			throw new Error('Graphic driver not initialized (Canvas Element)');
		}
	},
	
	createCell: function(x, y, live, link){
		var id = x + 'n' + y,
			i = this.hash[id],
			cell;

		if(i >= 0){
			cell = this.cells[i];
			if(live) {
				if(!cell.live || link){
					cell.alive();
				}else{
					cell.die();
				}
			}else if(link){
				cell.linksCount++;
			}
			cell.toDel = 0;
		}else{
			if(this.holes.length){
				i = this.holes.shift();
			}else{
				i = this.cells.length;
				this.cells[i] = null;
			}
			this.hash[id] = i;
			cell = new Cell(x, y, live, link);
			this.cells[i] = cell;
			cell.update(live);
		}
		//if(live) console.log('set '+x+', '+y);
		
		return cell;
	},
	
	cycle: function(){
		//console.time('cycle');
		var t = Date.now();

		if(!this.isReady){
			this.impact();
		}
		var cells = this.cells, nLive = 0, rem;
		for(var i = 0, n = cells.length; i < n; ++i){
			if(cells[i]){
				cells[i].lifeCycle();
				if(cells[i] && cells[i].live) ++nLive;
			}
		}
		this.currentCycle++;
		//console.log('Step '+this.currentCycle);
		//console.log('count: '+n +', removed: '+this.removed);
		rem = this.removed;

		this.impact();

		this.removed = 0;

		if(nLive > this.maxLiveCells){
			this.maxLiveCells = nLive;
		}

		//console.timeEnd('cycle');

		return {
			cycle: this.currentCycle,
			liveCells: nLive,
			totalCells: n - this.holes.length,
			removedCells: rem,
			maxLiveCells: this.maxLiveCells,
			time: Date.now() - t
		}
	},
	
	testCycle: function(){
		if(!this.isReady){
			this.impact();
		}
		var cells = this.cells, n = 0;
		for(var id in cells){
			if(cells.hasOwnProperty(id)){
				cells[id].testCycle();
				++n;
			}
		}
		console.log('count: '+n);
	},
	
	impact: function(){
		var cell, cells = this.cells;
		for(var i = 0, n = cells.length; i < n; ++i){
			if(cells[i]){
				cell = cells[i];
				if(cell.live) cell.impact();
			}
		}
		this.isReady = true;
	},
	
	remove: function(cell){
		var i;
		if(cell.nbh){
			for(i = 0; i < 8; ++i){
				cell.nbh[i].linksCount--;
			}
			delete(cell.nbh);
		}
		if(cell.linksCount == 0){
			if(cell.toDel++ > 5){
				var id = cell.id;
				i = this.hash[id];
				//console.log('x Remove cell '+cell.id);
				this.gd.drawText(cell.x, cell.y, '+', '#FF8888');
				this.holes.push(i);
				delete(this.hash[id]);
				this.cells[i] = null;
				this.removed++;
			}
		}
	},

	refresh: function(zoom){
		this.gd.drawGrid(zoom);
		var cell, cells = this.cells;
		for(var i = 0, n = cells.length; i < n; ++i){
			if(cells[i]){
				cell = cells[i];
				if(cell.live) this.gd.drawCell(cell.x, cell.y);
			}
		}
	}
};


/**
 * Cell class
 */
var Cell = function(x, y, live, link){
	this.x = x;
	this.y = y;
	this.id = x+'n'+y;
	this.live = false;
	this.points = 0;
	this.linksCount = link ? 1 : 0;
	this.toDel = 0;
	
	//if(live) this.alive();
	//else this.die();
}

Cell.prototype.update = function(live){
	if(live)
		this.alive();
	else
		this.die();
}

Cell.prototype.alive = function(){
	if(this.live) return;
	
	if(!this.nbh){
		var x = this.x, y = this.y;
		// neighborhood
		var nbh = [];
		nbh[0] = Life.createCell(x, y+1, false, true);
		nbh[1] = Life.createCell(x+1, y+1, false, true);
		nbh[2] = Life.createCell(x+1, y, false, true);
		nbh[3] = Life.createCell(x+1, y-1, false, true);
		nbh[4] = Life.createCell(x, y-1, false, true);
		nbh[5] = Life.createCell(x-1, y-1, false, true);
		nbh[6] = Life.createCell(x-1, y, false, true);
		nbh[7] = Life.createCell(x-1, y+1, false, true);
		this.nbh = nbh;
	}
	this.live = true;

	Life.gd.drawCell(this.x, this.y);
}
Cell.prototype.die = function(){
	this.live = false;
		
	Life.gd.clearCell(this.x, this.y);
}

Cell.prototype.impact = function(){
	for(var i = 0; i < 8; ++i){
		this.nbh[i].points++;
	}
}

Cell.prototype.testCycle = function(){
	var colors = [
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
	], color;
	if(this.live){
		Life.gd.drawCell(this.x, this.y);
		color = '#FFFFFF';
	}else{
		Life.gd.clearCell(this.x, this.y);
		color = this.nbh ? 'red' : '#777777';
	}

	Life.gd.drawText(this.x, this.y, this.linksCount, color);
}

Cell.prototype.lifeCycle = function(){
	var p = this.points;
	if(p < 2 || p > 3){
		if(this.live) this.die();
		if(p == 0){
			Life.remove(this);
		}
	}else if(p == 3){
		this.alive();
	}
	this.points = 0;
}