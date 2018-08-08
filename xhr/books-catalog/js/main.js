'use strict';

const request = new XMLHttpRequest();
request.addEventListener('load', onLoad);
request.addEventListener('error', onError);
request.open('GET', 'https://neto-api.herokuapp.com/book/');
request.send();

const content = document.querySelector('#content');
content.innerHtml = '';

function onLoad() {
    if (request.status !== 200) {
        console.log(`Ответ ${request.status}: ${request.satatusText}`);
    } else {
        const booksCat = JSON.parse(request.responseText);
        let newBook, index;
        for (const book of booksCat) {
            content.appendChild(document.createElement('li'));
            newBook = document.querySelectorAll('#content > li');
            index = booksCat.indexOf(book);
            newBook[index].innerHtml = `<img src = "${book.cover.small}">`;
            newBook[index].dataset.title = book.title;
            newBook[index].dataset.author = book.author.name;
            newBook[index].dataset.info = book.info;
            newBook[index].dataset.price = book.price;
        }
    }
}

function onError() {
    console.log('Сработало событие error');
}