'use sctrict';

const contentform = document.querySelector('.contentform');
const inputs = contentform.querySelectorAll('input, textarea');
const buttomSubmit = contentform.querySelector('.button-contact');
const main = document.querySelector('#output');
const buttomChange = main.querySelector('.button-contact');
const outputs = main.querySelectorAll('output');

function feedBackForm() {
    if (this.name === 'zip') {
        this.value = this.value.replace(/\D/g, '');
    }
    if (Array.from(inputs).every(input => input.value)) {
        buttomSubmit.removeAttribute('disabled');
        submitForm();
    }
};

function submitForm() {
    outputs.forEach((output) => {
        inputs.forEach((input) => {
            if (output.id === input.name) {
                output.value = input.value
            }
        });
    });
}

function showForm(event) {
    event.preventDefault();
    contentform.classList.toggle('hidden');
    main.classList.toggle('hidden');
}


Array.from(inputs).forEach((input) => input.addEventListener('input', feedBackForm));
buttomSubmit.addEventListener('click', showForm);
buttomChange.addEventListener('click', showForm);

