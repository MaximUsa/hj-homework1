'use strict';

const drum = document.getElementsByClassName('drum-kit__drum');

function playDrum() {
	this.getElementsByTagName('audio')[0].pause()
	this.getElementsByTagName('audio')[0].currentTime = 0;
	this.getElementsByTagName('audio')[0].play();

}

for (let i of drum){
	i.onclick = playDrum;
}
