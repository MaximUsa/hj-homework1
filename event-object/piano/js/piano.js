'use strict';


const higher = ['first.mp3', 'second.mp3', 'third.mp3', 'fourth.mp3', 'fifth.mp3'];
const lower = ['first.mp3', 'second.mp3', 'third.mp3', 'fourth.mp3', 'fifth.mp3'];
const middle = ['first.mp3', 'second.mp3', 'third.mp3', 'fourth.mp3', 'fifth.mp3'];

const setOfSounds = document.getElementsByClassName('set')[0];
const keyPiano = document.getElementsByTagName('li'); 
const player = document.getElementsByTagName('audio');

const arrayKeyPiano = Array.from(keyPiano);

function song(event){
	if (event.altKey){
		setOfSounds.classList.remove('middle'); 
		setOfSounds.classList.remove('lower');
		setOfSounds.classList.add('higher');
		player[arrayKeyPiano.indexOf(this)].src = `sounds/higher/${higher[arrayKeyPiano.indexOf(this)]}`; 
		player[arrayKeyPiano.indexOf(this)].play(); 
	}else if (event.shiftKey){
			setOfSounds.classList.remove('middle');
			setOfSounds.classList.remove('higher');
			setOfSounds.classList.add('lower');
			player[arrayKeyPiano.indexOf(this)].src = `sounds/lower/${lower[arrayKeyPiano.indexOf(this)]}`;
			player[arrayKeyPiano.indexOf(this)].play();
	}else{
		setOfSounds.classList.remove('lower');
		setOfSounds.classList.remove('higher');
		setOfSounds.classList.add('middle');
		player[arrayKeyPiano.indexOf(this)].src = `sounds/middle/${middle[arrayKeyPiano.indexOf(this)]}`;
		player[arrayKeyPiano.indexOf(this)].play();
	}
}

for (const key of arrayKeyPiano){
	key.addEventListener('click', song);
}