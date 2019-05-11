// let rows = 10, cols = 10;
let rows = 4, cols = 4;
let res;
let cells;
let selectedCells;
let offsetY = 40;
let steps;
let startTime;


function setup() {
	createCanvas(windowWidth, windowHeight);

	// cols = floor(windowWidth / res);
	// rows = floor(windowHeight / res);

	start();

	textSize(24);
}



function draw() {
	drawBackground();
	drawStats();

	textAlign(CENTER, CENTER);
	noStroke();
	fill(255);

	for (let c of cells) {
		c.draw();
	}
}



function start() {
	cells = new Set;
	selectedCells = new Set;
	steps = 0;
	startTime = new Date().getTime();
	res = ((width < height - offsetY) ? width / cols : (height - offsetY) / rows) - 1;

	createCells();
}



function drawBackground() {
	background(0);

	noFill();
	stroke(200);
	strokeWeight(1);

	for (let i = 0; i <= cols; i++)
		line(i * res, offsetY, i * res, rows * res + offsetY);

	for (let i = 0; i <= rows; i++)
		line(0, i * res + offsetY, cols * res, i * res + offsetY);
}



function drawStats() {
	textAlign(LEFT, CENTER);
	fill(255);
	text(`Timer: ${time()}          Steps: ${steps}`, offsetY + 6, offsetY / 2);
	fill('#D4E6F1');
	noStroke();
	rect(0, 0, offsetY, offsetY);
	textAlign(CENTER, CENTER);
	fill(0);
	text('DIF', offsetY / 2, offsetY / 2);
}



function time() {
	let t = floor((new Date().getTime() - startTime) / 1000);
	let m = floor(t / 60);
	let s = t % 60;

	m = (0 <= m && m < 10) ? `0${m}` : `${m}`;
	s = (0 <= s && s < 10) ? `0${s}` : `${s}`;

	return `${m}:${s}`;
}



function genNumbers(n) {
	let h = ceil(n / 2);
	let a = [];

	for (let i = 0; i < h; i++) {
		let r = Math.floor(Math.random() * n);
		a.push(r);
		a.push(r);
	}

	return a;
}



function createCells() {
	let numbers = genNumbers(rows * cols);

	for (let i = 0; i < cols; i++) {
		for (let j = 0; j < rows; j++) {
			let r = Math.floor(Math.random() * numbers.length);
			let n = numbers[r];
			numbers.splice(r, 1);

			cells.add(new Cell(i, j, n));
		}
	}
}



function mousePressed() {
	if (0 < mouseX && mouseX < offsetY && 0 < mouseY && mouseY < offsetY) {
		changeDifficult();
		return;
	}


	let nx = floor(mouseX / res);
	let ny = floor((mouseY - offsetY) / res);

	if (nx < 0 || nx >= cols
			|| ny < 0 || ny >= rows) return;


	let cell;
	for (let c of cells) {
		cell = c.checkCords(nx, ny);

		if (cell !== false) break;
	}

	selectCell(cell);
}



function selectCell(cell) {
	if (selectedCells.size >= 2 || cell.opened || !cell.hidden) return;

	cell.show();
	selectedCells.add(cell);

	if (selectedCells.size >= 2) {
		++steps;
		let [c1, c2] = [...selectedCells];

		if (c1.val === c2.val) {
			c1.open();
			c2.open();

			selectedCells.clear();
			checkForEnd();
		} else {

			setTimeout(() => {
				c1.hide();
				c2.hide();

				selectedCells.clear();
			}, 1000);
		}
	}
}



function changeDifficult() {
	let d = parseInt(prompt('Set your even number beetween 4 and 16'));

	if (isNaN(d) || typeof d !== 'number') return;

	d = Math.min(Math.max(4, d), 16);

	if (d % 2 !== 0) return;

	cols = d;
	rows = d;
	start();
}



function checkForEnd() {
	for (let c of cells) {
		if (!c.opened) return false;
	}

	endgame();
}



function endgame() {
	setTimeout(() => {
		alert(`You won in ${steps} steps. Your time: ${time()}`);
		start();
	}, 300);
}
