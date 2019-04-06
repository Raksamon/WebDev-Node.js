// Part Contact
document.querySelector('#ContactResult').style.visibility = 'hidden';
class Contact {
    constructor(subject, message, name, gender, phone, email) {
        this.subject = subject;
        this.message = message;
        this.name = name;
        this.gender = gender;
        this.phone = phone;
        this.email = email;
    }
}

class UI {
    static displayContacts() {
        const contacts = Store.getContacts();
        contacts.forEach((contact) => UI.addContactToList(contact));
    }

    static addContactToList(contact) {
        const list = document.querySelector('#contact-list');
        const row = document.createElement('tr');
        row.innerHTML = `
		<td>${contact.subject} <br>${contact.message}</td>
		<td>${contact.name} <br> ${contact.gender}</td>	
		<td>${contact.phone} <br> ${contact.email}</td>
		<td><a href="#" class="btn btn-sm delete"> X </a></td>
	  `;
        list.appendChild(row);
    }

    static deleteContact(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const msg = document.querySelector('.msg');
        const form = document.querySelector('#contact-form');
        msg.insertBefore(div, form);
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

    static clearFields() {
        document.querySelector('#subject').value = '';
        document.querySelector('#message').value = '';
        document.querySelector('#name').value = '';
        document.querySelector('#gender').value = '';
        document.querySelector('#phone').value = '';
        document.querySelector('#email').value = '';
    }
}

class Store {
    static getContacts() {
        let contacts;
        if (localStorage.getItem('contacts') === null) {
            contacts = [];
        } else {
            contacts = JSON.parse(localStorage.getItem('contacts'));
        }

        return contacts;
    }

    static addContact(contact) {
        const contacts = Store.getContacts();
        contacts.push(contact);
        localStorage.setItem('contacts', JSON.stringify(contacts));
    }

    static removeContact(isnb) {
        const contacts = Store.getContacts();

        contacts.forEach((contact, index) => {
            if (contact.isnb === isnb) {
                contacts.splice(index, 1);
            }
        });

        localStorage.setItem('contacts', JSON.stringify(contacts));
    }
}

document.addEventListener('DOMContentLoaded', UI.displayContacts);
document.querySelector('#contact-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const subject = document.querySelector('#subject').value;
    const message = document.querySelector('#message').value;
    const name = document.querySelector('#name').value;
    const gender = document.querySelector('#gender').value;
    const phone = document.querySelector('#phone').value;
    const email = document.querySelector('#email').value;



    if (subject === '' || message === '' || name === '' || gender === '' || phone === '' || email === '') {
        document.querySelector('#ContactResult').style.visibility='hidden';
        UI.showAlert('Please enter all fields');
    } else {
        document.querySelector('#ContactResult').style.visibility='';
        const contact = new Contact(subject, message, name, gender, phone, email);
        UI.addContactToList(contact);
        Store.addContact(contact);
        UI.showAlert('Added', 'success');
        UI.clearFields();
    }
});

document.querySelector('#contact-list').addEventListener('click', (e) => {
    UI.deleteContact(e.target);
    Store.removeContact(e.target.parentElement.previousElementSibling.textContent);
    UI.showAlert('Removed', 'success');
});
