import React, { useEffect, useState } from "react";
import { deleteCategory } from "../util/contactsApi2";
import ConfirmFormPortal from "./ConfirmFormPortal";
import FormConfirm from "./FormConfirm";
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
  const [showDelete, setShowDelete] = useState(false);
  // const [selectedDivison, setSelectedDivision] = useState("");
  const [showFormConfirm, setShowFormConfirm] = useState(false);

  useEffect(() => {
    setShowList(false);

    if (selectedCategory !== "") setSelectedCat(selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    setShowList(false);
    setSelectedCat("");
  }, [division]);

  const handleCategoryDelete = () => {
    deleteCategory(selectedCat);
  };

  return (
    <div>
      {showDelete && (
        <>
          {" "}
          <button
            onClick={() => {
              if (selectedCat !== "") setShowFormConfirm(true);
            }}
            className="btn btn-danger"
          >
            delete
          </button>
          {showFormConfirm && (
            <ConfirmFormPortal>
              <FormConfirm
                handleApi={() => {
                  handleCategoryDelete();
                }}
                setVisiblity={setShowFormConfirm}
              >
                {" "}
                <span className="text-danger">
                  {" "}
                  deleting category will also delete the contacts in that
                  category.do you still want to delete{" "}
                </span>
              </FormConfirm>
            </ConfirmFormPortal>
          )}
        </>
      )}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          height: 38,
        }}
      >
        <button
          onClick={() => {
            setShowDelete((pervShowDelete) => !pervShowDelete);
          }}
          className="btn btn-light"
          style={{ marginRight: "10px" }}
        >
          {" "}
          {selectedCat || "Categories"}{" "}
        </button>
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
          <div className="bg-light rounded">
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
