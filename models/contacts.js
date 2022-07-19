const fs = require('fs/promises');
const path = require("path");
const contactsPath = path.join(__dirname, "contacts.json");
const {v4} = require("uuid");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
}

const updateContacts = async (contacts) =>  await fs.writeFile(contactsPath, JSON.stringify(contacts));


const getById = async (contactId) => {
  const contacts = await listContacts();
  const contactById = contacts.find(contact => contact.id === contactId);
  if(!contactById){
      return null;
  }
  return contactById;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const contactIndex = contacts.findIndex(contact => contact.id === contactId);
  if (contactIndex === -1) {
      return null;
  }
  const newArray = contacts.filter((_, index) => index !== contactIndex);
  updateContacts(newArray);
  return contacts[contactIndex];
}

const addContact = async ({ name, email, phone }) => {
  const contacts = await listContacts();
    const newContact = {id: v4(), name, email, phone};
    contacts.push(newContact);
    updateContacts(contacts);
    return newContact;
}

const updateContact = async (contactId, { name, email, phone }) => {
  const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === contactId);
    if(idx === -1){
        return null;
    }
    contacts[idx] = { id: contactId, name, email, phone };
    await updateContacts(contacts);
    return contacts[idx];
}

module.exports = {
  listContacts,
  getById,
  removeContact,
  addContact,
  updateContact,
}
