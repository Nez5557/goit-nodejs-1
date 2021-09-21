const listContacts = require("./listContacts");
const updateContacts = require("./updateContacts");

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(
      (contact) => contact.id === Number(contactId)
    );
    if (index === -1) {
      throw new Error(`Contact with ID: ${contactId} not found`);
    }

    contacts.splice(index, 1);
    await updateContacts(contacts);
    console.log(
      `The contact with ID: ${contactId} was removed! Contact list: `
    );

    return contacts;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = removeContact;
