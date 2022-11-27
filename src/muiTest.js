// import contacts from "./contacts.json";
const contacts = require("./contacts.json");
// console.log(contacts);
const updateContacts = (contact) => {
  try {
    const newContacts = [
      ...contacts.map((cont) => {
        if (cont.id === contact.id) {
          cont = { ...contact };
        }
        return cont;
      }),
    ];
    console.log("the updated contact in the function", newContacts);
    // await api.put("/", newContacts, config);
  } catch (err) {
    return console.log("update contact error", err);
  }
};
updateContacts({
  id: 13,
  firstName: "kaleab",
  lastName: "hailu",
  email: "kaleabhailu46@gmail.com",
  phone: "+251 92 331 8738",
  image: null,
});
