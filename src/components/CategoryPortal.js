import React from "react";
import ReactDOM from "react-dom";
import CategoryList from "./CategoryList";

function CategoryPortal(props) {
  return ReactDOM.createPortal(
    <div>
      <CategoryList {...props} />
    </div>,
    document.getElementById("category")
  );
}

export default CategoryPortal;
