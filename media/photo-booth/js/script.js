'use strict';

const fotoAppBlock = document.querySelector('.app');
const fotoCtrlBlock = document.querySelector('.controls');
const takeFotoBtn = document.getElementById('take-photo');
const errorMsgBox = document.getElementById('error-message');
const fotoList = document.querySelector('.list');
const fotoBoothApiUrl = 'https://neto-api.herokuapp.com/photo-booth';
const requestOptions = {
    method: 'POST',
    'Content-Type': 'multipart/form-data'
};

let makeFotoSound;
let errorChecking = false;

(function() {
    sendImage('');
})();

(function() {
    navigator.mediaDevices
        .getUserMedia({ video: true, audio: false })
        .then(stream => {
            const video = document.createElement('video');
            video.src = URL.createObjectURL(stream);
            video.id = 'video-stream';
            if (!errorChecking) {
                fotoAppBlock.appendChild(video);
                fotoBlock.classList.add('visible');
            }
        })
        .catch(error => {
            errorChecking = true;
            errorMsgBox.textContent = 'Нет доступа к камере';
            errorMsgBox.classList.add('visible');
            console.error(error);
        });
})();

(function() {
    makeFotoSound = document.createElement('audio');
    makeFotoSound.src = './audio/click.mp3';
    document.body.appendChild(makeFotoSound);
})();

takeFotoBtn.addEventListener('click', event => {
    try {
        const video = document.getElementById('video-stream');

        if (!video) {
            throw new Error('Не удалось найти видео-поток');
        }

        const canvas = document.createElement('canvas');
        const canvasContext = canvas.getContext('2d');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvasContext.drawImage(video, 0, 0);
        const imageUrl = canvas.toDataURL();
        const imageHtml = captureImage(imageUrl);

        if (!fotoList.childNodes.length) {
            fotoList.appendChild(imageHtml);
        } else {
            fotoList.insertBefore(imageHtml, fotoList.childNodes[0]);
        }
        makeFotoSound.play();

    } catch (e) {
        console.log('Возникла ошибка: ', e.message);
    }
});

function captureImage(imgPath) {
    const figure = document.createElement('figure');
    const img = document.createElement('img');
    const figcaption = document.createElement('figcaption');
    const anchor = document.createElement('a');
    const icon = document.createElement('i');
    icon.classList.add('material-icons');
    const anchorDownload = anchor.cloneNode();
    const anchorUpload = anchor.cloneNode();
    const anchorDelete = anchor.cloneNode();
    const iconDownload = icon.cloneNode();
    const iconUpload = icon.cloneNode();
    const iconDelete = icon.cloneNode();
    img.src = imgPath;

    iconDownload.textContent = 'file_download';
    anchorDownload.href = imgPath;
    anchorDownload.download = 'snapshot.png';
    anchorDownload.appendChild(iconDownload);

    iconUpload.textContent = 'file_upload';
    anchorUpload.appendChild(iconUpload);

    iconDelete.textContent = 'delete';
    anchorDelete.appendChild(iconDelete);
    [anchorDownload, anchorUpload, anchorDelete].forEach(node => {
        figcaption.appendChild(node);
    });
    figure.appendChild(img);
    figure.appendChild(figcaption);

    anchorDownload.addEventListener('click', event => {
        event.currentTarget.style.display = 'none';
    });

    anchorUpload.addEventListener('click', event => {
        const clickedBtn = event.currentTarget;
        const response = sendImage(imgPath);

        response
            .then(apiResponse => clickedBtn.style.display = 'none')
            .catch(console.error);
    });

    anchorDelete.addEventListener('click', event => {
        figure.remove();
    });

    return figure;
}

function sendImage(imageSrc) {
    return fetch(imageSrc)
        .then(response => response.blob())
        .then(imageBlob => {
            const sendingOptions = Object.assign({}, requestOptions);
            const requestData = new FormData();

            requestData.append('image', imageBlob);
            sendingOptions.body = requestData;
            return fetch(fotoBoothApiUrl, sendingOptions);
        })
        .then(apiResponse => {
            if (apiResponse.status < 200 || apiResponse.status >= 300) {
                throw new Error('API availability issues');
            }

            return new Promise((done, fail) => {
                try {
                    done(apiResponse);
                } catch (e) {
                    fail(e);
                }
            });
        })
        .catch(error => {
            errorChecking = true;
            errorMsgBox.textContent = 'Проблема с доступностью API';
            errorMsgBox.classList.add('visible');
            console.error(error);

            return false;
        });
}