'use strict';

const request = new XMLHttpRequest();
request.addEventListener('load', loadContent);
request.open('GET', 'components/e-mail.html');
request.send();

const content = document.querySelector('#content');
const tabs = document.querySelectorAll('nav a');
const preload = document.querySelector('#preloader');

Array.from(tabs).forEach(tab => { tab.addEventListener('click', defaultEvent); });

function defaultEvent(event) {
    for (let tab of tabs) {
        tab.classList.remove('active');
    }
    this.classList.add('active');
    event.priventDefault();
    request.addEventListener('loadstart', onLoadcontent);
    request.addEventListener('load', loadContent);
    request.addEventListener('onload', onLoadEndContent);
    request.open('GET', this.href);
    request.send();
}

function onLoadcontent() {
    content.innerHTML = request.responseText;
}

function loadContent() {
    preload.classList.remove('hidden');
}

function onLoadEndContent() {
    preload.classList.add('hidden');
}