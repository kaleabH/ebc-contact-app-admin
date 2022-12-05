import React, { useState } from "react";
import ReactDOM from "react-dom";
import TextField from "@mui/material/TextField";

function SearchBox({
  masterDataSource,
  setFilteredDataSource,
  handleSettingDivision,
}) {
  const [searchItem, setSearchItem] = useState("");
  const handleTextInput = (e) => {
    let text = e.target.value;
    if (text) {
      const newData = masterDataSource.filter(function(item) {
        const itemData = item.firstName
          ? item.firstName.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearchItem(text);
    } else {
      setFilteredDataSource(masterDataSource);
      setSearchItem(text);
    }
  };
  return ReactDOM.createPortal(
    <div>
      <TextField
        autoComplete="given-name"
        name="search"
        required
        fullWidth
        id="Search"
        InputLabelProps={{
          style: { color: "#807b6f" },
        }}
        className="rounded"
        label="Search Contacts"
        style={{ backgroundColor: "white" }}
        value={searchItem}
        onChange={handleTextInput}
        autoFocus
      />
      <div>
        <div
          className="btn-group w-100 mt-2"
          role="group"
          aria-label="Basic example"
        >
          <button
            type="button"
            className="btn btn-success"
            onClick={() => {
              handleSettingDivision("all");
            }}
          >
            All
          </button>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => {
              handleSettingDivision("internal");
            }}
          >
            Internal
          </button>
          <button
            type="button"
            className="btn btn-success"
            onClick={() => {
              handleSettingDivision("external");
            }}
          >
            External
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("search")
  );
}

export default SearchBox;
