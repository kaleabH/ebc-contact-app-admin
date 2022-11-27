import React, { useState, useEffect } from "react";
import Contact from "./Contact";
import { getContacts } from "../util/contactsApi";
import ContactDetails from "./ContactDetails";
import SearchBox from "./SearchBox";

function ContactsList({ refresh, onRefresh }) {
  const [contacts, setContacts] = useState([]);
  const [loaded, setLoaded] = useState(true);
  const [filteredDataSource, setFilteredDataSource] = useState([]);

  useEffect(() => {
    refresh &&
      getContacts().then((contacts) => {
        setContacts(contacts);
        onRefresh(false);
      });
    setFilteredDataSource(contacts);
  }, [setContacts, onRefresh, refresh, loaded, contacts]);

  const [clickedContact, setClickedContact] = useState({});
  const handleContactClick = (contact) => {
    setClickedContact(contact);
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {filteredDataSource.map((contact) => (
          <Contact
            key={contact.id}
            contact={contact}
            setLoaded={(load) => {
              setLoaded(load);
            }}
            onContactClick={handleContactClick}
          />
        ))}
      </div>
      {clickedContact.hasOwnProperty("id") && (
        <ContactDetails
          onRefresh={onRefresh}
          loaded={loaded}
          setLoaded={(load) => {
            setLoaded(load);
          }}
          onClose={() => {
            setClickedContact({});
            setLoaded(true);
          }}
          contact={clickedContact}
        />
      )}
      <SearchBox
        masterDataSource={contacts}
        setFilteredDataSource={(data) => {
          setFilteredDataSource(data);
        }}
      />
    </div>
  );
}

export default ContactsList;
