import { Icon } from "@mui/material";
import React, { useEffect, useState } from "react";

function Contact(props) {
  const { onContactClick, setLoaded } = props;
  const { firstName, lastName, phone } = props.contact;
  const [userColor, setUserColor] = useState("");

  function random_rgba() {
    var o = Math.round,
      r = Math.random,
      s = 255;
    return "rgba(" + o(r() * s) + "," + o(r() * s) + "," + o(r() * s) + ",1)";
  }

  useEffect(() => {
    const color = random_rgba();
    setUserColor(
      color !== "rgba(0,0,0,1)" && "rgba(255,255,255,1)"
        ? color
        : "rgba(139,160,29,1)"
    );
  }, []);

  return (
    <div
      style={{ minWidth: "210px" }}
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
                color: userColor,
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
