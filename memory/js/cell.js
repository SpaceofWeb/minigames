class Cell {
	constructor(nx, ny, val) {
		this.nx = nx;
		this.ny = ny;
		this.x = this.nx * res;
		this.y = this.ny * res + offsetY;
		this.cx = this.x + res / 2;
		this.cy = this.y + res / 2;
		this.hidden = true;
		this.opened = false;
		this.val = val;
	}



	draw() {
		if (this.hidden) {
			fill(255);
			text('#', this.cx, this.cy);
		} else {
			if (this.opened) {
				fill('#F4D03F');
				rect(this.x, this.y, res, res);
				fill(0);
				text(this.val, this.cx, this.cy);
			} else {
				fill('#82E0AA');
				rect(this.x, this.y, res, res);
				fill(0);
				text(this.val, this.cx, this.cy);
			}
		}
	}


	checkCords(nx, ny) {
		return (this.nx === nx && this.ny === ny) ? this : false;
	}


	show() {
		this.hidden = false;
	}


	hide() {
		this.hidden = true;
	}


	open() {
		this.opened = true;
	}
}