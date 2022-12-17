import React, { useState } from "react";
import ReactDOM from "react-dom";
import { addCategory } from "../util/contactsApi2";
import Loading from "./Loading";

function AddCategory({ onRefresh }) {
  const [showForm, setShowForm] = useState(false);
  const [division, setDivision] = useState("");
  const [apiMutated, setApiMutated] = useState(true);
  const [category, setCategory] = useState("");
  const [unfilled, setUnfilled] = useState(false);
  return ReactDOM.createPortal(
    <div>
      <button
        onClick={() => {
          setShowForm((prevShowForm) => !prevShowForm);
          setUnfilled(false);
        }}
        type="button"
        className="btn btn-labeled btn-success"
      >
        <span
          style={{
            height: "100%",
            width: "20%",
            padding: "8px 13px",
            marginLeft: "-12px",
            background: "green",
          }}
        >
          <i className="fa fa-plus-circle"></i>
        </span>
        Add Catagories
      </button>
      {!apiMutated ? (
        <Loading />
      ) : (
        showForm && (
          <form
            style={{ width: "250px" }}
            className="d-flex row align-items-center bg-light border border-primary rounded"
          >
            <div>
              <h3>Add Category</h3>
            </div>
            <div className="d-flex column justify-content-between">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  value="internal"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                  checked={division === "internal"}
                  onChange={(e) => {
                    setDivision(e.target.value);
                  }}
                />
                <label className="form-check-label" htmlFor="flexRadioDefault1">
                  internal
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  value="external"
                  name="flexRadioDefault"
                  id="flexRadioDefault2"
                  checked={division === "external"}
                  onChange={(e) => {
                    setDivision(e.target.value);
                  }}
                />
                <label className="form-check-label" htmlFor="flexRadioDefault2">
                  external
                </label>
              </div>
            </div>
            <div className="form-group mb-2">
              <label htmlFor="inputPassword2" className="sr-only">
                category
              </label>
              <input
                className="form-control"
                id="inputPassword2"
                placeholder="category"
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              />
            </div>
            {unfilled && (
              <h6 className="text-danger">
                category and division name required
              </h6>
            )}
            <button
              onClick={async (e) => {
                e.preventDefault();
                if (category === "" || division === "") {
                  setUnfilled(true);
                  return;
                } else {
                  let apiResponse;
                  setApiMutated(false);
                  apiResponse = await addCategory(category, division);
                  setApiMutated(apiResponse);
                  onRefresh(true);
                  setShowForm(false);
                }
              }}
              className="btn btn-primary mb-2"
            >
              Add
            </button>
          </form>
        )
      )}
    </div>,
    document.getElementById("addCategory")
  );
}

export default AddCategory;
