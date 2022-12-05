import React from "react";
import ReactDOM from "react-dom";
function CheckInternet() {
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
        <h4>no internet connection</h4>
      </div>
    </div>,
    document.getElementById("noInternet")
  );
}

export default CheckInternet;
