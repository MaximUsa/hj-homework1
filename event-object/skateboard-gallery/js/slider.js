'use strict';

const galleryNavigation = document.getElementById('nav')
const links = galleryNavigation.getElementsByTagName('a');
const viewSkate = document.getElementById('view');


function show(event){
	event.preventDefault();
	viewSkate.src = this.href;
	if (this.classList.contains('gallery-current')){
		return;
	}
	for (const link of links){
		link.classList.remove('gallery-current')
		link.removeAttribute('class')
	}
	this.classList.add('gallery-current');
}


Array.from(links).forEach(link => link.addEventListener('click', show));