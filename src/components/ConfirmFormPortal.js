import React from "react";
import ReactDOM from "react-dom";

const ConfirmFormPortal = ({ children }) => {
  return ReactDOM.createPortal(
    <div
      style={{
        position: "absolute",
        top: "0",
        bottom: "0",
        left: "0",
        right: "0",
        display: "grid",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.3)",
      }}
    >
      <div
        style={{
          display: "inline-block",
          minHeight: "300px",
          position: "relative",
          minWidth: "300px",

          justifySelf: "center",
        }}
      >
        {children}
      </div>
    </div>,
    document.getElementById("confirmForm")
  );
};

export default ConfirmFormPortal;
