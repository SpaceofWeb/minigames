let words = [
	'hangman', 'simple', 'programming', 'cookie', 'developer'
];



function game() {
	let searchWord = words[Math.floor(Math.random() * words.length)].split('');
	// let searchWord = words[2].split('');
	let inputWord = '_ '.repeat(searchWord.length);
	let err = '';
	let repeat = true;
	let lives = 6;


	while(repeat) {
		let l = prompt(`${err}Lives: ${lives}\nSearch word: ${inputWord}\nWrite a letter:`);
		err = '';

		if (l === null) {
			repeat = false;
			break;
		} else if (!l.match(/^[A-z]$/)) {
			err = 'Error: Letter must be one character of latin alphabet\n';
			continue;
		}


		let finded = false;
		let m = searchWord.indexOf(l);

		while (m !== -1) {
			finded = true;
			searchWord[m] = '';
			let a = inputWord.split(' ');

			a[m] = l;

			inputWord = a.join(' ');

			m = searchWord.indexOf(l);
		}

		!finded && err === '' && lives--;

		if (lives <= 0) {

			repeat = false;
			alert(`You lose!\nSearch word: ${searchWord.join(' ')}`);
			game();

		} else if (inputWord.indexOf('_') === -1) {

			repeat = false;
			alert(`You win!\nSearch word: ${inputWord}`);
			game();
		}
	}
}


game();



