'use strict';

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.addEventListener('click', load);
load();

function load() {
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 1; i <= randomInt(200, 400); i++) {
        const x = random(0, canvas.width);
        const y = random(0, canvas.height);
        const z = random(0, 1.1);
        const alpha = random(0.8, 1);
        const color = colorRandom();

        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.globalAlpha = alpha;
        ctx.arc(x, y, z, 0, 2 * Math.PI);
        ctx.fill();
    }
}

function random(from, to) {
    return from + ((to - from) * Math.random());
}

function randomInt(from, to) {
    return Math.round(random(from, to));
}

function colorRandom() {
    const rColor = random(0, 3)
    if (rColor < 1) {
        return '#ffffff'
    } else if (rColor < 2) {
        return '#ffefd5'
    } else {
        return '#3decff'
    }
}