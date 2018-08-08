const request = new XMLHttpRequest();
request.addEventListener('load', loadContent);
request.open('GET', 'https://netology-fbb-store-api.herokuapp.com/weather');
request.send();

function loadContent() {
    if (request.status === 200) {
        const response = JSON.parse(request.responseText);
        setData(response);
    }

};