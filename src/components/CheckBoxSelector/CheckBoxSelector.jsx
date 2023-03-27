import React, { useState } from "react";

import "./CheckBoxSelector.css";

export function CheckBoxSelector() {
  // State with list of all checked item
  const [checked, setChecked] = useState([]);
  const checkList = ["REMISIONES", "INSPECCIONES", "HISTORICO", "INCIDENCIA"];

  // Add/Remove checked item from list
  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };

  // Generate string of checked items
  const checkedItems = checked.length
    ? checked.reduce((total, item) => {
        return total + ", " + item;
      })
    : "";

  // Return classes based on whether item is checked
  var isChecked = (item) =>
    checked.includes(item) ? "checked-item" : "not-checked-item";

  return (
    <div className="fixedContainer">
      <div className="checkList">
        <h5>BASES REMISIONES</h5>
        <div className="list-container">
          {checkList.map((item, index) => (
            <div key={index}>
              <input value={item} type="checkbox" onChange={handleCheck} />
              <span className={isChecked(item)}>{item}</span>
            </div>
          ))}
        </div>
      </div>
{/* 
      <div>
        {`Items checked are: ${checkedItems}`}
      </div> */}
    </div>
  );
}