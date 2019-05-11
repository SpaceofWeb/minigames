let words = ['area','book','business','case','child','company','country','day','eye','fact','family','government','group','hand','home','job','life','lot','man','money','month','mother','night','number','part','people','place','point','problem','program','question','right','room','school','state','story','student','study','system','thing','time','water','way','week','woman','word','work','world','year'];


let searchWord, inputWord, $searchWord, startLives = 6, lives;




function setup() {
	createCanvas(400, 400);

	setFrameRate(20);
	fill(255);


	$searchWord = $('#searchWord');

	$('.letters>div').on('click', e => {
		e.currentTarget.classList.add('checked');
		addLetter(e.currentTarget.innerText.toLowerCase());
	});

	start();
}



function draw() {
	background(0);

	stroke(0);
	strokeWeight(1);
	rect(30, 30, 30, height - 30);
	rect(20, 40, width / 2 + 20, 10);

	stroke(255);
	rect(width / 2 + 20, 36, 5, height / 3, 20);

	// BODY
	lives < 5 && rect(218, 164, 10, height / 3, 20);

	// HEAD
	lives < 6 && ellipse(width / 2 + 24, height / 3, 70, 70);

	strokeWeight(6);
	// LEFT ARM
	lives < 4 && line(223, 174, 190, 225);
	// RIGHT ARM
	lives < 3 && line(224, 174, 256, 225);

	strokeWeight(8);
	// LEFT LEG
	lives < 2 && line(223, 294, 190, 368);
	// RIGHT LEG
	lives < 1 && line(224, 294, 256, 368);

}




function start() {
	$('.letters>div').removeClass('checked');
	lives = startLives;
	searchWord = getWord();
	inputWord = '_ '.repeat(searchWord.length);

	setWord();
}



function getWord() {
	let r = Math.floor(Math.random() * words.length);
	return words[r];
}



function setWord() {
	$searchWord.text(inputWord);
}



function addLetter(l) {
	let finded = false;
	let s = '';

	for (let i = 0; i < searchWord.length; i++) {
		let char = searchWord[i];

		if (char === l) {
			s += `${l} `;
			finded = true;
		} else {
			s += `${inputWord[i * 2]} `;
		}
	}

	inputWord = s;

	!finded && lives--;

	setWord();
	checkForEnd();
}



function checkForEnd() {
	lives < 1 && lose();

	for (let l of inputWord) {
		if (l === '_') return;
	}

	win();
}



function win() {
	setTimeout(() => {
		alert(`You won!\nSearch word: ${searchWord.split('').join(' ')}`);
		start();
	}, 300);
}



function lose() {
	setTimeout(() => {
		alert(`You lose!\nSearch word: ${searchWord.split('').join(' ')}`);
		start();
	}, 300);
}


