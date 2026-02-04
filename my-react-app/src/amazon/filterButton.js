import React, { useState } from "react";
import { LEFT_FILTER_BUTTON, RIGHT_FILTER_BUTTON } from "./appDefault";
import SortIcon from "@mui/icons-material/Sort";

const FilterButton = ({ handleLowToHigh, handleHighToLow }) => {
  const [sortBy, setSortBy] = useState(null);

  const handleSort = (type, callback) => {
    setSortBy(type);
    callback();
  };

  return (
    <div className="filter-controls">
      <div className="sort-container">
        <SortIcon className="sort-icon" />
        <span className="sort-label">Sort by Price:</span>
        <button
          onClick={() => handleSort("low", handleLowToHigh)}
          className={`sort-btn ${sortBy === "low" ? "active" : ""}`}
          title={LEFT_FILTER_BUTTON}
        >
          {LEFT_FILTER_BUTTON}
        </button>
        <button
          onClick={() => handleSort("high", handleHighToLow)}
          className={`sort-btn ${sortBy === "high" ? "active" : ""}`}
          title={RIGHT_FILTER_BUTTON}
        >
          {RIGHT_FILTER_BUTTON}
        </button>
      </div>
    </div>
  );
};

export default FilterButton;
