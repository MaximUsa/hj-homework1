'use strict';

const main = document.querySelector('.todo-list');
const done = main.querySelector('.done');
const undone = main.querySelector('.undone');
const inputs = main.querySelectorAll('input');

function list() {
    console.log(this.hasAttribute('checked'))

    if (this.hasAttribute('checked')) {
        undone.appendChild(this.parentElement)
        this.removeAttribute('checked')
    } else {
        done.appendChild(this.parentElement);
        this.setAttribute('checked', true);
    }
}

Array.from(inputs).forEach(input => input.addEventListener('click', list));