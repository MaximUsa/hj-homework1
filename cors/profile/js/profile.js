'use strict';

const userName = document.querySelector('[data-name]');
const desc = document.querySelector('[data-description]');
const pic = document.querySelector('[data-pic]');
const position = document.querySelector('[data-position]');
const techno = document.querySelector('[data-technologies]');
const content = document.querySelector('.content');

function loadData(url) {
    const funcName = 'callback';
    return new Promise((done, fail) => {
        window[funcName] = done;
        const script = document.createElement('script');
        script.src = `${url}?jsop = ${funcName}`;
        document.body.appendChild(script);
    });
}

function prof(userData) {
    userName.textContent = userData.name;
    desc.textContent = userData.desc;
    pic.src = userData.pic;
    position.textContent = userData.position;

    loadData(`https://neto-api.herokuapp.com/profile/${userData.id}/technologies`)
        .then(technology);
    content.style.display = 'initial';
}

function technology(technoData) {
    Array.from(technoData).forEach(el => {
        const span = document.createElement('span');
        techno.appendChild(span);
        techno.lastElementChild.classList.add('devicons');
        techno.lastElementChild.classList.add(`devicons-${el}`);
    });
}

loadData('https://neto-api.herokuapp.com/profile/me')
    .then(prof);