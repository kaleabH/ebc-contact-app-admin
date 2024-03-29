import React, { useState, useReducer, useEffect } from "react";
import ReactDOM from "react-dom";
import Button from "./Button";
import Form from "./Form";
import { deleteContact, updateContacts } from "../util/contactsApi2";
import Loading from "./Loading";
import FormConfirm from "./FormConfirm";
import useConfirmState from "../hooks/useConfirmState";
const reducer = (contact, action) => {
  return { ...contact, [action.name]: action.value };
};
function ContactDetails(props) {
  const {
    contact,
    setClickedContact,
    onRefresh,
    loaded,
    setLoaded,
    loading,
    setLoading,
    setOpenDetail,
  } = props;
  const [edit, setEdit] = useState(false);
  const [newContact, dispatch] = useReducer(reducer, contact);

  const [visible, setVisiblity] = useConfirmState();
  const [unfilledField, setUnfilledField] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    loading && setLoaded(false);
    setUnfilledField(false);
    setErrorMessage("");
  }, [setLoaded, loading]);

  const deleteHandler = async (e) => {
    e.preventDefault();
    setVisiblity(true);
    // don't use window.cofirm(), window.alert(), window.prompt()
    // or any window popup methods while using electron
    // it causes some components to freeze and glitch i.e:-
    // confirmed = window.confirm(
    //   `Are you sure to delete ${contact.firstName} ${contact.lastName}`
    // );
  };
  const handleDeleteApi = async (e) => {
    // e.preventDefault();
    setLoading(true);
    setVisiblity(false);
    setOpenDetail(false);
    let apiMutated = await deleteContact(contact.id);
    onRefresh(apiMutated);
    setLoading(false);
    setClickedContact({});
  };
  const handleChange = (e) => {
    dispatch(e.target);
  };

  const handleClick = (e) => {
    setErrorMessage("");
    e.preventDefault();
    let fieldFlag = false;
    for (let prop in newContact) {
      if (newContact[prop] === "") {
        fieldFlag = true;
        console.log(prop, newContact[prop]);
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
    // confirmed = window.confirm("do you want to save changes ");
  };

  const handleEditApi = async (e) => {
    // e.preventDefault();
    setLoading(true);
    setVisiblity(false);
    setOpenDetail(false);
    let apiMutated = await updateContacts(newContact);
    onRefresh(apiMutated);
    setLoading(false);
    setClickedContact({});
  };

  return ReactDOM.createPortal(
    <>
      {loading ? (
        <Loading />
      ) : edit ? (
        loaded && (
          <Form
            disabled={false}
            required={true}
            edit={edit}
            {...props}
            contact={newContact}
            onChange={handleChange}
            formConfirm={
              visible && (
                <FormConfirm
                  setVisiblity={setVisiblity}
                  handleApi={handleEditApi}
                >
                  {"do you want to save changes "}
                </FormConfirm>
              )
            }
          >
            {" "}
            <>
              {unfilledField && <h5 className="text-danger">{errorMessage}</h5>}
              <Button
                sm={12}
                onClick={handleClick}
                title={"Save"}
                style={{ backgroundColor: "blue" }}
              />
            </>
          </Form>
        )
      ) : (
        loaded && (
          <Form
            {...props}
            disabled={true}
            required={false}
            contact={newContact}
            edit={edit}
            formConfirm={
              visible && (
                <FormConfirm
                  setVisiblity={setVisiblity}
                  handleApi={handleDeleteApi}
                >
                  {`Are you sure to delete ${contact.firstName} ${contact.lastName}`}
                </FormConfirm>
              )
            }
          >
            <Button
              sm={6}
              title={"Edit"}
              onClick={() => {
                setEdit(true);
              }}
              style={{ backgroundColor: "blue" }}
            />
            <Button
              sm={6}
              title={"Delete"}
              onClick={deleteHandler}
              style={{ backgroundColor: "red" }}
            />
          </Form>
        )
      )}
    </>,
    document.getElementById("contactDetail")
  );
}

export default ContactDetails;
