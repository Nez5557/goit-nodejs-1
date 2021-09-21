const listContacts = require("./listContacts");
const updateContacts = require("./updateContacts");

const addContact = async (name, email, phone) => {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: contacts[contacts.length - 1].id + 1,
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    await updateContacts(contacts);

    console.log("File successfully written!");
    return contacts;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = addContact;