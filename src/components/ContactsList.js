import React, { useState, useEffect } from "react";
import Contact from "./Contact";
import CategoryList from "./CategoryList";
import {
  getContacts,
  getExternalContacts,
  getInternalContacts,
  getCategories,
  getContactsByCategory,
} from "../util/contactsApi2";
import ContactDetails from "./ContactDetails";
import SearchBox from "./SearchBox";
import Loading from "./Loading";

function ContactsList({ refresh, onRefresh }) {
  const [loading, setLoading] = useState(false);
  const [division, setDivision] = useState("all");
  const [contacts, setContacts] = useState([]);
  const [loaded, setLoaded] = useState(true);
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [clickedContact, setClickedContact] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const handleSettingCategory = (cat) => {
    setLoading(true);
    // onRefresh(true);
    setSelectedCategory(cat);
  };

  const handleContactClick = (contact) => {
    setClickedContact(contact);
  };
  const handleSettingDivision = (division) => {
    setLoading(true);
    onRefresh(true);
    setDivision(division);
  };

  useEffect(() => {
    console.log("the division selected is", division);

    if (selectedCategory !== "") {
      refresh &&
        //  getCategories().then((cats) => setCategories(cats));
        onRefresh(true);
      // setLoading(true);
      getContactsByCategory(selectedCategory).then((conts) => {
        setContacts(conts);
        onRefresh(false);
        setLoading(false);
        setSelectedCategory("");
        console.log("the contact according to category", conts);
      });
    } else {
      switch (division) {
        case "all":
          refresh && getCategories().then((cats) => setCategories(cats));
          getContacts().then((conts) => {
            setContacts(conts);
            setSelectedCategory("");
            onRefresh(false);
            setLoading(false);
            console.log("the all contacts", conts);
          });
          break;
        case "internal":
          refresh &&
            getCategories("internal").then((cats) => setCategories(cats));
          getInternalContacts().then((conts) => {
            onRefresh(false);
            setLoading(false);
            setContacts(conts);
          });
          break;
        case "external":
          refresh &&
            getCategories("external").then((cats) => setCategories(cats));
          getExternalContacts().then((conts) => {
            onRefresh(false);
            setLoading(false);
            setContacts(conts);
          });
          break;
        default:
      }
    }
    setFilteredDataSource(contacts);
  }, [
    setContacts,
    onRefresh,
    refresh,
    loaded,
    loading,
    setLoaded,
    categories,
    // selectedCategory,
    // contacts,
    // division,
  ]);

  console.log("loading value", loading);
  return (
    <>
      <CategoryList
        categories={categories}
        loaded={loaded}
        loading={loading}
        division={division}
        handleSettingCategory={handleSettingCategory}
      />{" "}
      {loading ? (
        <Loading />
      ) : (
        loaded && (
          <div style={{ maxWidth: "960px" }} className="container mt-4">
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
                loading={loading}
                setLoading={(value) => {
                  setLoading(value);
                }}
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
              handleSettingDivision={handleSettingDivision}
            />
          </div>
        )
      )}
    </>
  );
}

export default ContactsList;
