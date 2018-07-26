'use strict';

let arrImg = [
'airmax-jump.png',
'airmax-on-foot.png',
'airmax-playground.png',
'airmax-top-view.png',
'airmax.png'];

comst slider =document.getElementById('slider');
let step = 0

function sliderShow() {
	if(step === arrImg.length){
		step = 0; 
	}
	slider.src = `i/${arrImg[step]}`;
	step +=1;
};

setInterval(sliderShow, 4000);