import React, { useState } from "react";
import ReactDOM from "react-dom";
import { loadCSS } from "fg-loadcss";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
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
      <IconButton
        onClick={() => {
          setAddForm(true);
          setLoaded(true);
        }}
        sx={{ margin: 0, padding: 0, marginTop: 1 }}
      >
        <Icon
          baseClassName="fas"
          className="fa-plus-circle "
          sx={{ color: "#f01d51", fontSize: 60 }}
        />
      </IconButton>
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
