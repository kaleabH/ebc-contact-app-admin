import React, { useState } from "react";
import ReactDOM from "react-dom";
import Loading from "./Loading";

function CategoryList({
  categories,
  handleSettingCategory,
  loaded,
  loading,
  division,
}) {
  const [showList, setShowList] = useState(false);

  return ReactDOM.createPortal(
    <div className="bg-light rounded">
      <div style={{ display: "flex", flexDirection: "row" }}>
        <h4 style={{ marginRight: "10px" }}>Category </h4>
        <button
          className="btn btn-info dropdown-toggle mb-2"
          aria-haspopup="true"
          aria-expanded="false"
          onClick={() => {
            setShowList((prevShowList) => !prevShowList);
          }}
        >
          {division}
        </button>
      </div>
      {loading ? (
        <Loading />
      ) : (
        loaded &&
        showList && (
          <div>
            <ul
              className="scrollmenu"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                listStyleType: "none",
                maxHeight: "300px",
                padding: "0px !important",
              }}
            >
              {categories.map((category) => (
                <li style={{ marginBottom: "6px" }} key={category}>
                  <button
                    className="btn btn-light"
                    onClick={() => {
                      handleSettingCategory(category);
                    }}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )
      )}
    </div>,
    document.getElementById("category")
  );
}

export default CategoryList;
