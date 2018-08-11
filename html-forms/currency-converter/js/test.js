const main = document.querySelector('#content');
			const loader = document.querySelector('#loader');
			const selectFrom = document.querySelector('#from')
			const selectTo = document.querySelector('#to');
			const source = document.querySelector('#source');
			const result = document.querySelector('#result');

const xhr = new XMLHttpRequest();
xhr.addEventListener('load', onLoad);
xhr.addEventListener('loadstart', onLoadStart);
xhr.addEventListener('loadend', onLoadEnd);
xhr.addEventListener("error", onError);
xhr.open("GET", "https://neto-api.herokuapp.com/currency");
xhr.send();

source.addEventListener('input', showMessage);
selectFrom.addEventListener('input', showMessage);
selectTo.addEventListener('input', showMessage);

function onLoad() {
	if (xhr.status !== 200) {
		console.log(`Ответ ${xhr.status}: ${xhr.statusText}`);
	} else {
		const data = JSON.parse(xhr.responseText);
		let str ='';
		data.forEach((item) => {
			str += `<option value="${item.value}">${item.code}</option>`;
		})
		selectFrom.innerHTML = str;
		selectTo.innerHTML = str;
		showMessage();
	}
}

function showMessage() {
	result.value = (Math.round(source.value * selectFrom.value / selectTo.value * 100) / 100).toFixed(2);
	console.log(`from = ${selectFrom.value}    to=${selectTo.value}`)
}

function onLoadStart() {
	loader.classList.remove('hidden');
	main.classList.add('hidden');
}

function onLoadEnd() {
	loader.classList.add('hidden');
	main.classList.remove('hidden');
}

function onError() {
	console.log("Сработало событие error");