const todoList = document.querySelector('.list-block');
const output = todoList.querySelector('output');
const checkbox = todoList.querySelectorAll('input');
const h3 = document.querySelector('h3');
let counter = 0;


for (const key of checkbox) {
    key.addEventListener('click', chekedTodo);
    key.checked = false;

    if (key.checked) {
        ++counter;
    }
    outputValue();
}

function chekedTodo() {
    this.checked ? ++counter : --counter;
    counter === 4 ? todoList.classList.add('complete') : todoList.classList.remove('complete');
    outputValue();
}

function outputValue() {
    output.value = `${counter} из ${checkbox.length}`;
}