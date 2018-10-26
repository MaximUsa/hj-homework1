'use strict';

let video = document.createElement('video');
let app = document.querySelector('.app');
app.appendChild(video);
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');

const btn = document.querySelector('div.controls');
const list = document.querySelector('div.list');
document.addEventListener('DOMContentLoaded', () => {
    navigator.mediaDevices
        .getUserMedia({video: true, audio: false})
        .then(stream => {
            btn.style.display = 'block';
            video.autoplay = true;
            video.srcObject = new MediaStream(stream);
        })
        .catch(err => document.getElementById('error-message').textContent = err);
});

btn.firstElementChild.addEventListener('click', event => {
    event.preventDefault();
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);
    let picSRC = canvas.toDataURL();
    listPhoto(picSRC);
});

function listPhoto(url) {
    let pic = document.createElement('figure');
    pic.innerHTML = `
  <img src="${url}">
  <figcaption>
    <a href="${url}" download="snapshot.png">
      <i class="material-icons">file_download</i>
    </a>
    <a><i class="material-icons">file_upload</i></a>
    <a><i class="material-icons">delete</i></a>
    </figcaption>
    `;
    if (list.firstElementChild) {
        list.insertBefore(pic, list.firstElementChild);
    } else {
        list.appendChild(pic);
    }
    list.querySelectorAll('figcaption > a')[2].addEventListener('click', deletePic);

    list.querySelectorAll('figcaption > a')[1].addEventListener('click', upload);
}

Array.from(list.querySelectorAll('figure')).forEach(el => {
    el.addEventListener('mouseover', event => {
        event.preventDefault();
        el.querySelector('figcaption').style.visibility = 'visible';
    })
});

function upload(event) {
    event.preventDefault();
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', event => console.log(event.responseText));
    xhr.addEventListener('error', e => console.error(e));
    xhr.open('POST', 'https://neto-api.herokuapp.com/photo-booth', true);
    let formData = new FormData();
    canvas.toBlob(blob => {
        formData.append('image', blob);
        xhr.send(formData);
    });
}

function deletePic(event) {
    event.preventDefault();
    console.log(event.currentTarget.parentElement.parentElement);
    list.removeChild(event.currentTarget.parentElement.parentElement);
}