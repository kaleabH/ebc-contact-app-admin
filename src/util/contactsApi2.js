const axios = require("axios");
const api = axios.create({
  /*for the jsonbin api*/
  // baseURL: "https://api.jsonbin.io/v3/b/6389d05b003d6444ce60c326",

  baseURL:
    "https://api.jsonstorage.net/v1/json/b8b28667-4983-42a1-b60b-4aad38f39f99/07ddc6f8-5d5b-4e0b-91d0-9056035ed2f3",
});
/* for the jsonbin api*/
// const key = "$2b$10$oyACctGkJDCjwuEKOcpRPO4dwjCqEFoYOznrF5ngbtxVzGLyyur2S";

const key = "0fd11bd1-3ecd-42c3-a3f9-a0a2b73f2b11";
const config = {
  /*for the jsonbin api*/
  // headers: { "X-Master-Key": key },

  /*for the jsonStorage api*/
  params: { apikey: key },
  headers: { authorization: key },
};
export const getCategories = async (division) => {
  // if nothing is passed to this method it will return all the categories
  try {
    // const request = await api.get("/", config);

    /*for the jsonStorage api*/

    const request = await api.get("/");

    // const data = await request.data.record;

    /*for the jsonStorage api*/
    const data = await request.data;
    const internal = data.internal;
    const external = data.external;
    const categories = [];

    if (division) {
      if (division === "internal") {
        for (const prop in internal) {
          categories.push(prop.toString());
        }
      } else if (division === "external") {
        for (const prop in external) {
          categories.push(prop.toString());
        }
      }
    } else {
      for (const prop in internal) {
        categories.push(prop.toString());
      }
      for (const prop in external) {
        categories.push(prop.toString());
      }
    }
    console.log("fetched categories", categories);
    return categories;
  } catch (err) {
    console.log(err);
  }
};

export const getContacts = async () => {
  try {
    // const request = await api.get("/", config);

    /*for the jsonStorage api*/

    const request = await api.get("/");
    console.log("the request is  ", request);
    // const data = await request.data.record;

    /*for the jsonStorage api*/
    const data = await request.data;
    const internal = data.internal;
    const external = data.external;
    const contacts = [];
    for (const prop in internal) {
      contacts.push(...internal[prop]);
    }
    for (const prop in external) {
      contacts.push(...external[prop]);
    }

    console.log("the all fetched data is", contacts);
    return contacts;
  } catch (err) {
    console.log(err);
  }
};
export const getContactsByCategory = async (category) => {
  // let division = "";
  console.log("the category inside the getContactsByCategory", category);
  try {
    // const request = await api.get("/", config);

    /*for the jsonStorage api*/

    const request = await api.get("/");
    console.log("the api response", request.data);
    // const data = await request.data.record;

    /*for the jsonStorage api*/
    const data = await request.data;

    let contacts = [];

    for (const prop in data) {
      if (data[prop].hasOwnProperty(category)) {
        contacts = [...data[prop][category]];
      }
    }

    console.log("the contact fetched by category", contacts);
    return contacts;
  } catch (err) {
    console.error(err);
  }
};

export const getInternalContacts = async () => {
  try {
    // const request = await api.get("/", config);

    /*for the jsonStorage api*/

    const request = await api.get("/");

    // const data = await request.data.record;

    /*for the jsonStorage api*/
    const data = await request.data;
    const internal = data.internal;
    const contacts = [];
    for (const prop in internal) {
      contacts.push(...internal[prop]);
    }
    console.log("the internal fetched data is", contacts);
    return contacts;
  } catch (err) {
    console.log(err);
  }
};

export const getExternalContacts = async () => {
  try {
    // const request = await api.get("/", config);

    /*for the jsonStorage api*/

    const request = await api.get("/");

    // const data = await request.data.record;

    /*for the jsonStorage api*/
    const data = await request.data;
    const external = data.external;
    const contacts = [];

    for (const prop in external) {
      contacts.push(...external[prop]);
    }

    console.log("the external fetched data is", contacts);
    return contacts;
  } catch (err) {
    console.log(err);
  }
};

export const updateContacts = async (contact) => {
  try {
    // const contacts = await getContacts();
    // console.log("get contacts values", contacts);
    console.log("get contact to be updated", contact);

    await deleteContact(contact.id);

    await addContact(contact);
    console.log("the updated contact in the function", await getContacts());

    return true;
  } catch (err) {
    return console.log("update contact error", err);
  }
};

export const deleteContact = async (id) => {
  try {
    console.log("deleteContact");
    // const request = await api.get("/", config);

    /*for the jsonStorage api*/

    const request = await api.get("/");

    // const data = await request.data.record;

    /*for the jsonStorage api*/
    const data = await request.data;

    const contacts = await getContacts();
    let division = "";
    let category = "";
    contacts.map((cont) => {
      if (cont.id === id) {
        division = cont.division;
        category = cont.category;
      }
      return cont;
    });

    const newCategory = {
      [category]: [
        ...data[division][category].filter((contact) => contact.id !== id),
      ],
    };
    const newDivision = { ...data[division], ...newCategory };
    const newContacts = { ...data, [division]: newDivision };

    // const newContacts = [...contacts.filter((contact) => contact.id !== id)];
    console.log("contacts after deletion", newContacts);
    await api.put("/", newContacts, config);
    return true;
  } catch (err) {
    return console.error(err);
  }
};
export const addContact = async (contact) => {
  try {
    console.log("the contact to be added function", contact);
    // const request = await api.get("/", config);

    /*for the jsonStorage api*/

    const request = await api.get("/");

    // const data = await request.data.record;

    /*for the jsonStorage api*/
    const data = await request.data;
    // const contacts = await getContacts();

    const division = contact.division;
    const category = contact.category;

    //  const newContacts = {...data};
    const newCategory = {
      [category]: [...data[division][category], { ...contact }],
    };
    const newDivision = { ...data[division], ...newCategory };
    const newContacts = { ...data, [division]: newDivision };
    //the above line of code can be replace with
    //const newContacts = { ...data,[division]:{...data[division], [category]:{...data[division][category], contact}} }

    //don't push like this :-
    // const newContacts = contacts.push(contact);
    //push and assign in different line the push method returns the array length
    // contacts.push(contact);
    // const newContacts = contacts;
    console.log("the new contacts list after addContacts", newContacts);
    await api.put("/", newContacts, config);
    return true;
  } catch (err) {
    return console.log("add contact error", err);
  }
};

export const addCategory = async (category, division) => {
  try {
    console.log("add category");
    // const request = await api.get("/", config);

    /*for the jsonStorage api*/

    const request = await api.get("/");

    // const data = await request.data.record;

    /*for the jsonStorage api*/
    const data = await request.data;
    // const contacts = await getContacts();

    //  const newContacts = {...data};
    const newCategory = { [category]: [] };
    const newDivision = { ...data[division], ...newCategory };
    const newContacts = { ...data, [division]: newDivision };
    //the above line of code can be replace with
    //const newContacts = { ...data,[division]:{...data[division], [category]:{...data[division][category], contact}} }

    //don't push like this :-
    // const newContacts = contacts.push(contact);
    //push and assign in different line the push method returns the array length
    // contacts.push(contact);
    // const newContacts = contacts;
    console.warn(
      "the new contacts list after new category addition",
      newContacts
    );
    console.warn("the new division ", newDivision);
    console.warn("the category", newCategory);
    await api.put("/", newContacts, config);
    return true;
  } catch (err) {
    return console.log("add contact error", err);
  }
};
export const deleteCategory = async (category) => {
  try {
    console.log("delete category");
    // const request = await api.get("/", config);

    /*for the jsonStorage api*/

    const request = await api.get("/");

    // const data = await request.data.record;

    /*for the jsonStorage api*/
    const data = await request.data;
    let division = "";

    for (const prop in data.internal) {
      if (prop === category) {
        console.log("found inside the internal");
        division = "internal";
      }
    }
    for (const prop in data.external) {
      if (prop === category) {
        console.log("found inside the external");
        division = "external";
      }
    }

    console.log("the category is side the delete", category);
    console.log("the division is side the delete", division);

    let newDivision = {};

    for (const prop in data[division]) {
      if (prop !== category) {
        newDivision = { ...newDivision, [prop]: data[division][prop] };
        /* the other way to do it */
        // newDivision[prop] = data[division][prop];
      }
    }

    const newContacts = { ...data, [division]: newDivision };
    console.warn("the new contacts list after category deletion", newContacts);
    console.warn("the new division ", newDivision);
    await api.put("/", newContacts, config);
    window.location.reload();
    return true;
  } catch (err) {
    return console.log("category error", err);
  }
};
