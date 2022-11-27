import { Icon } from "@mui/material";
import React from "react";

function Contact(props) {
  const { onContactClick, setLoaded } = props;
  const { firstName, lastName, phone } = props.contact;

  return (
    <div
      className="col-3 pt-4"
      onClick={() => {
        setLoaded(true);
        onContactClick(props.contact);
      }}
    >
      <div className="Card ">
        <div className="Avatar">
          <div style={{ flex: "1" }}>
            <Icon
              baseClassName="fas"
              className="fa-user-circle "
              sx={{
                color: "purple",
                textAlign: "center",
                fontSize: 50,
              }}
            />
          </div>
        </div>
        <div>
          <div className="Name">{firstName + " " + lastName}</div>
          <div className="Phone">{phone}</div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
