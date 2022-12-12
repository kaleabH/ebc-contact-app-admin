import React, { useState } from "react";
import ReactDOM from "react-dom";
import { loadCSS } from "fg-loadcss";
import ContactAddForm from "./ContactAddForm";

function AddContacts(props) {
  const { onRefresh } = props;
  const [addForm, setAddForm] = useState(false);
  const [loaded, setLoaded] = useState(true);
  React.useEffect(() => {
    const node = loadCSS(
      "https://use.fontawesome.com/releases/v5.14.0/css/all.css",
      // Inject before JSS
      document.querySelector("#font-awesome-css") || document.head.firstChild
    );

    return () => {
      node.parentNode.removeChild(node);
    };
  }, []);

  return ReactDOM.createPortal(
    <div>
      <button
        onClick={() => {
          setAddForm(true);
          setLoaded(true);
        }}
        type="button"
        className="btn btn-labeled btn-danger"
      >
        <span
          style={{
            height: "100%",
            width: "20%",
            padding: "8px 13px",
            marginLeft: "-12px",
            background: "#f02b70",
          }}
        >
          <i className="fa fa-plus-circle"></i>
        </span>
        Add Contact
      </button>
      {addForm && (
        <ContactAddForm
          onRefresh={onRefresh}
          loaded={loaded}
          setLoaded={(load) => {
            setLoaded(load);
          }}
          onClose={() => {
            setAddForm(false);
            setLoaded(true);
          }}
        />
      )}
    </div>,
    document.getElementById("addContact")
  );
}

export default AddContacts;
