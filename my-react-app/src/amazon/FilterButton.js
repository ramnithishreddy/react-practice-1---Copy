import React from "react";

const FilterButton = ({ handleLowToHigh, handleHighToLow }) => {
  return (
    <div className="buttons">
      <button onClick={handleLowToHigh}>Low to High</button>
      <button onClick={handleHighToLow}>High to Low</button>
    </div>
  );
};

export default FilterButton;
