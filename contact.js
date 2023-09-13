const fs = require("fs/promises");

const { v4 } = require("uuid");
const path = require("path");
const contactsPath = path.join(__dirname, "./db/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const list = JSON.parse(data);

  return list;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  if (!result) {
    return null;
  }
  return result;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  const [remove] = contacts.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return remove;
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = { id: v4(), name, email, phone };
  const updatedContacts = [newContact, ...contacts];
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
  return newContact;
};
module.exports = { listContacts, getContactById, addContact, removeContact };
