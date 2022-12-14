import React, { useEffect, useState } from "react";
import Loading from "./Loading";

function CategoryList({
  selectedCategory,
  categories,
  handleSettingCategory,
  loaded,
  loading,
  division,
}) {
  const [showList, setShowList] = useState(false);
  const [selectedCat, setSelectedCat] = useState("");

  useEffect(() => {
    if (selectedCategory !== "") setSelectedCat(selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="bg-light rounded">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          height: 38,
        }}
      >
        <h5 style={{ marginRight: "10px" }}> {selectedCat || "Category"} </h5>
        <button
          className="btn btn-info dropdown-toggle"
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
    </div>
  );
}

export default CategoryList;
