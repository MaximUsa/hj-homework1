'use strict';

const formSignIn = document.querySelector('.sign-in-htm');
const formSignUp = document.querySelector('.sign-up-htm');
const btnSingnIn = formSignIn.querySelector('.button');
const btnSingnUp = formSignUp.querySelector('.button');

const outputSignIn = formSignIn.querySelector('.error-message');
const outputSignUp = formSignUp.querySelector('.error-message');

const xhr = new XMLHttpRequest();

function signIn(event) {
    let obj = {}
    const formData = new formData(formSignIn);

    for (const [key, value] of formData) {
        obj[key] = value;
    }

    event.preventDefault();
    xhr.addEventListener('load', onLoad);
    xhr.open('POST', 'https://neto-api.herokuapp.com/signin');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(obj));

    function onLoad() {
        if (xhr.status !== 200) {
            console.log(`Answer ${xhr.status} :${xhr.statusText}`);
        } else {
            const response = JSON.parse(xhr.responseText);

            if (response.error) {
                outputSignIn.value = response.message;
            } else {
                outputSignIn.value = `Пользователь ${response.name} успешно авторизирован!`
            }
        }
    }
}

function signUp(event) {
    let obj = {}
    const formData = new formData(formSignUp);

    for (const [key, value] of formData) {
        obj[key] = value;
    }

    event.preventDefault();
    xhr.addEventListener('load', onLoad);
    xhr.open('POST', 'https://neto-api.herokuapp.com/signup');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(obj));

    function onLoad() {
        if (xhr.status !== 200) {
            console.log(`Answer ${xhr.status} :${xhr.statusText}`);
        } else {
            const response = JSON.parse(xhr.responseText);

            if (response.error) {
                outputSignUp.value = response.message;
            } else {
                outputSignUp.value = `Пользователь ${response.name} успешно зарегистрирован!`
            }
        }
    }
}

btnSingnIn.addEventListener('click', signIn);
btnSingnUp.addEventListener('click', signUp);