const path = require('path');
const fs = require('fs').promises;
const contactsPath = path.resolve('./db/contacts.json')


function listContacts() {
    async function fetchContacts() {
        const contactsList = await fs.readFile(contactsPath, 'utf-8');
        const result = JSON.parse(contactsList)
        console.table(result)
    };

    fetchContacts();
};

function getContactById(contactId) {
    async function fetchbyId(contactId) {
        const contactsList = await fs.readFile(contactsPath, 'utf-8');
        const result = JSON.parse(contactsList);
        const findContact = result.find(item => item.id === contactId);
        
        if (!findContact) {
            console.log(`this id doesn't exist`);
            return
        };
        
        console.log(findContact)
    };

    fetchbyId(contactId);
};

function removeContact(contactId) {
    async function fetchbyId(contactId) {
        const contactsList = await fs.readFile(contactsPath, 'utf-8');
        const result = JSON.parse(contactsList);

        if (!result.find(item => item.id === contactId)) {
            console.log(`this id doesn't exist`);
            return
        }

        const newList = result.filter(item => item.id !== contactId);
        await fs.writeFile(contactsPath, JSON.stringify(newList, null, 2), 'utf-8');
        listContacts();
    };

    fetchbyId(contactId);
};

function addContact(name, email, phone) {
    async function fetch(name, email, phone) {
        const responce = await fs.readFile(contactsPath, 'utf-8');
        const contacts = JSON.parse(responce);
        const lastId = contacts.map(item => item.id)[contacts.length - 1];

        const newContacts = [...contacts, {
            name,
            email,
            phone,
            id: lastId + 1
        }];

        await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2), 'utf-8');
        listContacts();
    };

    fetch(name, email, phone)
};

module.exports = {
    listContacts, getContactById, removeContact, addContact
};