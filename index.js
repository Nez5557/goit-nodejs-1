const { program } = require("commander");
const contactsOperations = require("./controllers/contacts");

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await contactsOperations.listContacts();
      console.table(contacts);
      break;

    case "get":
      const contactById = await contactsOperations.getContactById(id);
      console.log(contactById);
      break;

    case "add":
      const newContactsList = await contactsOperations.addContact(
        name,
        email,
        phone
      );
      console.table(newContactsList);
      break;

    case "remove":
      const contactsAfterRemove = await contactsOperations.removeContact(id);
      console.table(contactsAfterRemove);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

(async function () {
  await invokeAction(argv);
})();
