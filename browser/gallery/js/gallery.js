'use strict';

let arrImg = [
	'breuer-building.jpg',
	'guggenheim-museum.jpg',
	'headquarters.jpg',
	'IAC.jpg',
	'new-museum.jpg'
]

function prevPhoto() {
	step -=1;
	if (step <0) {
		step = arrImg.length - 1;
	}
	slider.src = `i/${arrImg[step]}`;
}

function nextPhoto() {
	step +=1;
	if (step === arrImg.length ){
		step = 0;
	}
	slider.src = `i/${arrImg[step]}`;
}

let step = -1;
const slider = document.getElementById('currentPhoto');
const prevButton = document. getElementById('prevPhoto');
const nextButton = document.getElementById('nextPhoto');

prevPhoto();
prevButton.onclick = prevPhoto;
nextButton.onclick = nextPhoto;