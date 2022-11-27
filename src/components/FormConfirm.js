import React from "react";

function FormConfirm(props) {
  const { children, setVisiblity, handleApi } = props;
  return (
    <div
      className="container"
      style={{
        height: "90%",
        width: "90%",
        position: "absolute",
        top: "0",
        bottom: "0",
        left: "0",
        right: "0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <div
        className="container"
        style={{
          height: "70%",
          width: "70%",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#fff",
          borderRadius: "20px",
          backgroundColor: "white",
        }}
      >
        <div
          style={{
            flex: 1,
            justifyContent: "center",
            display: "flex",
            alignItems: "center",
          }}
        >
          <h4 className="text-center">{children}</h4>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            flex: 1,
            width: "100%",
          }}
        >
          <button
            onClick={() => {
              //   handleVisiblity(true);
              handleApi();
            }}
            className="btn btn-primary"
          >
            Ok
          </button>
          <button
            onClick={() => {
              setVisiblity(false);
            }}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default FormConfirm;
