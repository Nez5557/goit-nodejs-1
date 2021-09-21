const listContacts = require("./listContacts");

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const contact = contacts.find(
      (contact) => contact.id === Number(contactId)
    );

    if (!contact) {
      throw new Error(`Contact with ID: ${contactId} not found`);
    }

    return contact;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = getContactById;
