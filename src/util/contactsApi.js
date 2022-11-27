const axios = require("axios");
const api = axios.create({
  baseURL:
    "https://api.jsonstorage.net/v1/json/b8b28667-4983-42a1-b60b-4aad38f39f99/56f707f6-4355-40d7-a720-1ff179e0486e",
});
const key = "0fd11bd1-3ecd-42c3-a3f9-a0a2b73f2b11";
const config = {
  params: { apikey: key },

  header: { authorization: key },
};
export const getContacts = async () => {
  try {
    const contacts = await api.get("/");

    const data = await contacts.data;
    console.log("the fetched data is", data);
    return data;
  } catch (err) {
    return err;
  }
};

export const updateContacts = async (contact) => {
  try {
    const contacts = await getContacts();
    console.log("get contacts values", contacts);
    const newContacts = [
      ...contacts.map((cont) => {
        if (cont.id === contact.id) {
          cont = { ...contact };
        }
        return cont;
      }),
    ];
    console.log("the updated contact in the function", newContacts);
    await api.put("/", newContacts, config);
    return true;
  } catch (err) {
    return console.log("update contact error", err);
  }
};

export const deleteContact = async (id) => {
  try {
    console.log("deleteContact");
    const contacts = await getContacts();
    const newContacts = [...contacts.filter((contact) => contact.id !== id)];
    console.log("contacts after deletion", newContacts);
    await api.put("/", newContacts, config);
    return true;
  } catch (err) {
    return err;
  }
};
export const addContact = async (contact) => {
  try {
    const contacts = await getContacts();
    console.log("the contact to be added function", contact);
    //don't push like this :-
    // const newContacts = contacts.push(contact);
    //push and assign in different line the push method returns the array length
    contacts.push(contact);
    const newContacts = contacts;
    console.log("the new contacts list after addContacts", newContacts);
    await api.put("/", newContacts, config);
    return true;
  } catch (err) {
    return console.log("add contact error", err);
  }
};
