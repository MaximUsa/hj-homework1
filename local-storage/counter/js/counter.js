'use strict';

const plusCount = document.querySelector('#increment');
const minusCount = document.querySelector('#decrement');
const resetCount = document.querySelector('#reset');
const counter = document.querySelector('#counter');

function calcCount() {
    let count = localStorage.getItem('count');

    if (event.target.id === 'increment') {
        counter.textContent = ++count;
        minusCount.disabled = false;

    }
    if ((event.target.id === 'decrement') && !minusCount.disabled) {
        counter.textContent = --count;
    }
    count === 0 ? minusCount.disabled = true : minusCount.disabled = false;
    localStorage.setItem('count', count);
}

function resetCounter() {
    localStorage.setItem('count', 0);
    counter.textContent = localStorage.getItem('count');
    minusCount.disabled = true;
}

localStorage.getItem('count') ? counter.textContent = localStorage.getItem('count') : localStorage.setItem('count', 0);
localStorage.getItem('count') === 0 ? minusCount.disabled = true : minusCount.disabled = false;

plusCount.addEventListener('click', calcCount);
minusCount.addEventListener('click', calcCount);
resetCount.addEventListener('click', resetCounter);