import React, { useState, useReducer, useEffect } from "react";
import ReactDOM from "react-dom";
import Button from "./Button";
import Form from "./Form";
import { addContact } from "../util/contactsApi2";
import Loading from "./Loading";
import useConfirmState from "../hooks/useConfirmState";
import FormConfirm from "./FormConfirm";

const { v4: uuidv4 } = require("uuid");

const initialContact = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  category: "",
  division: "",
  position: "",
  location: "",
  image: "image",
};

const reducer = (contact, action) => {
  return { ...contact, [action.name]: action.value, id: uuidv4() };
};

function ContactAddForm({ onClose, onRefresh, loaded, setLoaded, setAddForm }) {
  // const closeRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [contact, dispatch] = useReducer(reducer, initialContact);
  const [visible, setVisiblity] = useConfirmState();
  const [unfilledField, setUnfilledField] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    loading && setLoaded(false);
    setUnfilledField(false);
    setErrorMessage("");
  }, [setLoaded, loading]);
  const handleChange = (e) => {
    dispatch(e.target);
  };
  const handleClick = (e) => {
    setErrorMessage("");
    e.preventDefault();
    let fieldFlag = false;
    for (let prop in contact) {
      if (contact[prop] === "") {
        fieldFlag = true;
        setErrorMessage((prevError) => `${prop} is required, ` + prevError);
      }
    }
    /** what out when using useState inside a loop setting the value iteratively */
    setUnfilledField(fieldFlag);
    if (fieldFlag === false) {
      setVisiblity(true);
      setErrorMessage("");
    }
    // don't use window.cofirm(), window.alert(), window.prompt()
    // or any window popup methods while using electron
    // it causes some components to freeze and glitch i.e:-
    // confirmed = window.confirm("do you want to add this contact");
  };
  const handleApi = async (e) => {
    // e.preventDefault();
    setLoading(true);
    setVisiblity(false);
    let apiMutated = await addContact(contact);

    onRefresh(apiMutated);
    setLoading(false);
    setAddForm(false);
  };
  return ReactDOM.createPortal(
    <>
      {loading ? (
        <Loading />
      ) : (
        /*loaded && */ <Form
          contact={contact}
          onClose={onClose}
          // ref={closeRef}
          edit={true}
          onChange={handleChange}
          formConfirm={
            visible && (
              <FormConfirm setVisiblity={setVisiblity} handleApi={handleApi}>
                {"do you want to add this contact "}
              </FormConfirm>
            )
          }
        >
          <>
            {unfilledField && <h5 className="text-danger">{errorMessage}</h5>}
            <Button
              sm={12}
              onClick={handleClick}
              title={"Add Contact"}
              style={{ backgroundColor: "blue" }}
            />
          </>
        </Form>
      )}
    </>,
    document.getElementById("contactAddForm")
  );
}

export default ContactAddForm;
