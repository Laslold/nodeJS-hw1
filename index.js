const contactsOperation = require("./contact");

const { Command } = require("commander");
const program = new Command();
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
      const contactsList = await contactsOperation.listContacts();
      console.table(contactsList);
      break;

    case "get":
      const contactsId = await contactsOperation.getContactById(id);
      if (!contactsId) {
        throw new Error(`Contact with id=${id} not found`);
      }
      console.table(contactsId);
      break;

    case "add":
      const contactsAdd = await contactsOperation.addContact(
        name,
        email,
        phone
      );
      console.table(contactsAdd);
      break;

    case "remove":
      const contactsRemove = await contactsOperation.removeContact(id);
      console.table(contactsRemove);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
