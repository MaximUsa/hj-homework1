'use strict';

const body = document.querySelector('body')

const connect = new WebSocket('wss://neto-api.herokuapp.com/mouse');

connect.addEventListener('open', () => {
    showBubbles(connect);
});

body.addEventListener('click', event => {
    connect.send(JSON.stringify({
        x: event.x,
        y: event.y
    }));
})