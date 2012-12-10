/**
 * Graphic Display Interface
 *
 * @author Alexey Teterin
 * @version 1.0
 */

var GDI = function(canvas, options){
	if(typeof canvas === 'string'){
		canvas = document.getElementById(canvas);
	}
	if(canvas){
		this.canvas = canvas;
		this.context = canvas.getContext('2d');
	}else {
		throw new Error('Canvas not found');
	}
	if(!options){
		options = {};
	}
	this.step = options.step || 5;
	this.x0 = options.x0 || 0;
	this.y0 = options.y0 || 0;
	this.color = options.color || 'black';

	this.context.fillStyle = this.color;
}

GDI.prototype.setX0Y0 = function(x, y){
	this.x0 = x;
	this.y0 = y;
}

GDI.prototype.translateBy = function(x, y){
	this.x0 += x;
	this.y0 += y;
}

GDI.prototype.convertXY = function(x, y){
	return {
		x: Math.floor((x - this.x0) / this.step),
		y: Math.floor((this.y0 - y) / this.step)
	}
}

GDI.prototype.drawGrid = function(zoom){
	var step = zoom || this.step,
		w = this.canvas.width,
		h = this.canvas.height,
		x = this.x0 % step, 
		y = this.y0 % step,
		ctx = this.context,
		xx = 0, yy = Math.floor(this.y0 / step) - 1;
	
	ctx.clearRect(0, 0, w, h);

	ctx.strokeStyle = '#F1F1F1';
	ctx.beginPath();
	
	this.context.font = '7px Arial';
	//draw vertical lines
	while(x < w){
		ctx.moveTo(x, 0);
		ctx.lineTo(x, h);
		//this.context.fillText(xx, x+1, step-1);
		x += step;
		xx++;
	}
	//draw horizontal lines
	while(y < h){
		ctx.moveTo(0, y);
		ctx.lineTo(w, y);
		//this.context.fillText(yy, 1, y + step - 1);
		y += step;
		yy--;
	}
	ctx.stroke();

	this.step = step;
}

GDI.prototype.getRealXY = function(x, y){
	return {
		x: this.x0 + x * this.step,
		y: this.y0 - y * this.step - this.step
	}
}

GDI.prototype.drawCell = function(x, y, color){
	var xy = this.getRealXY(x, y),
		wh = this.step - 1;

	if(color) this.context.fillStyle = color;
	
	this.context.fillRect(
		xy.x, xy.y,
		wh, wh
	);
	
	if(color) this.context.fillStyle = this.color;
}

GDI.prototype.clearCell = function(x, y){
	var xy = this.getRealXY(x, y),
		wh = this.step - 1;

	this.context.clearRect(
		xy.x, xy.y,
		wh, wh
	);

}

GDI.prototype.drawText = function(x, y, text, color){
	var xy = this.getRealXY(x, y),
		sh = this.step / 3;
	
	this.context.font = Math.round(sh+sh)+'px Arial';
	if(color) this.context.fillStyle = color;
	this.context.fillText(text, xy.x + sh, xy.y + sh + sh);
	if(color) this.context.fillStyle = this.color;
}

GDI.prototype.moveBy = function(byX, byY){
	var w = this.canvas.width,
		h = this.canvas.height;
	if(!this.imgData){
		this.imgData = this.context.getImageData(0, 0, w, h);
	}
	this.context.clearRect(0,0, w,h);
	this.context.putImageData(this.imgData, byX, byY);
}

GDI.prototype.moveComplete = function(byX, byY){
	this.translateBy(byX, byY);
	delete(this.imgData);
}