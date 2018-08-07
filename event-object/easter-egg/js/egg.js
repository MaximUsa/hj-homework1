'use strict';

const nav = document.getElementsByTagName('nav')[0];
const secret = document.getElementsByClassName('secret')[0];
let arrKey = [];
let secretKey = "KeyY,KeyT,KeyN,KeyJ,KeyK,KeyJ,KeyU,KeyB,KeyZ";


function eggs() {
    arrKey.push(event.code);
    if (arrKey.join().search(secretKey) != -1) {
        secret.classList.add('visible');
        return arrKey = [];
    } else {
        secret.classList.remove('visible');
    }

}

function navVisi() {
    if (event.ctrlKey && event.altKey && event.code === 'KeyT') {
        nav.classList.toggle('visible');
    } // else {
    //     nav.classList.remove('visible');
    // }
}

function allEvent(event) {
    eggs();
    navVisi();
}

document.addEventListener('keydown', allEvent);