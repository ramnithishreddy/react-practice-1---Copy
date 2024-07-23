import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import data from "./data.json";
import FilterButton from "./filterButton";
import { useCart } from "./cartProvider";
import { PRICE_TITLE } from "./appDefault";

export default function Fashion() {
  const navigate = useNavigate();
  const [sortedData, setSortedData] = useState(data.Fashion);
  const { currentQuantity, setCurrentQuantity } = useCart();

  const onItemClick = (item) => {
    item = {
      ...item,
      Qty: Number(currentQuantity) === 0 ? +1 : Number(currentQuantity),
    };
    setCurrentQuantity(Number(item.Qty));
    navigate(`/itemDetails`, { state: item });
  };

  const handleLowToHigh = () => {
    const sortedItems = [...data.Fashion].sort((a, b) => a.Price - b.Price);
    setSortedData(sortedItems);
  };

  const handleHighToLow = () => {
    const sortedItems = [...data.Fashion].sort((a, b) => b.Price - a.Price);
    setSortedData(sortedItems);
  };

  return (
    <div>
      <FilterButton
        handleLowToHigh={handleLowToHigh}
        handleHighToLow={handleHighToLow}
      />
      <div className="Style">
        {sortedData.map((item) => (
          <div key={item.id} className="item" onClick={() => onItemClick(item)}>
            <img src={item.image} alt={item.title} />
            <p>{item.title}</p>
            <p>
              {PRICE_TITLE}
              {item.Price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
