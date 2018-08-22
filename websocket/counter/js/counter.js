'use strict';

const outCount = document.querySelector('.counter');
const outErrors = document.querySelector('.errors');

const connect = new WebSocket('wss://neto-api.herokuapp.com/counter');

connect.addEventListener('message', event => {
    let message = JSON.parse(event.data);
    outCount.innerText = `${message.connections}`;
    outErrors.value = `${message.errors}`;
});

window.addEventListener('beforeunload', () => {
    connection.close(1000)
});