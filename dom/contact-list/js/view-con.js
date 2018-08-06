const parseContacts = JSON.parse(loadContacts());

const contactsList = document.querySelector('.contacts-list');

function addContact(contactJson) {
	let contactsDataNew;
	let index;
	for (const contact of contactJson) { 
		contactsList.appendChild(document.createElement('li'));
		contactsDataNew = document.querySelectorAll('.contacts-list > li');
		index = contactJson.indexOf(contact);
		contactsDataNew[index].innerHTML =`<strong> ${contact.name} </strong>`;
		contactsDataNew[index].dataset.phone = contact.phone;
		contactsDataNew[index].dataset.email = contact.email;	
	}
}

addContact(parseContacts);