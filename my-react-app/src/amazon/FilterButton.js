import React from "react";
import { LEFT_FILTER_BUTTON, RIGHT_FILTER_BUTTON } from "./appDefault";

const FilterButton = ({ handleLowToHigh, handleHighToLow }) => {
  return (
    <div className="buttons">
      <button onClick={handleLowToHigh}>{LEFT_FILTER_BUTTON}</button>
      <button onClick={handleHighToLow}>{RIGHT_FILTER_BUTTON}</button>
    </div>
  );
};

export default FilterButton;
