'use strict';

const wrapMenu = document.getElementsByClassName('wrapper-dropdown')[0];

function selectedMenu() {
	wrapMenu.classList.toggle('active');
}

wrapMenu.onclick = selectedMenu;
