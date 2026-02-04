import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import FilterButton from "./filterButton";
import { useCart } from "./cartProvider";
import data from "./data.json";

const Grocery = () => {
  const navigate = useNavigate();
  const {
    handleLowToHigh,
    handleHighToLow,
    sortedData,
    currentQuantity,
    setCurrentQuantity,
  } = useCart();
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);

  const onItemClick = (item) => {
    item = {
      ...item,
      Qty: Math.max(Number(currentQuantity), 1),
    };
    setCurrentQuantity(Number(item.Qty));
    navigate(`/itemDetails`, { state: item });
  };

  const filteredItems = useMemo(() => {
    if (!selectedPriceRange) return sortedData;
    return sortedData.filter((item) => {
      if (selectedPriceRange === "0-100") return item.Price < 100;
      if (selectedPriceRange === "100-500") return item.Price >= 100 && item.Price < 500;
      if (selectedPriceRange === "500-1000") return item.Price >= 500 && item.Price < 1000;
      if (selectedPriceRange === "1000+") return item.Price >= 1000;
      return true;
    });
  }, [sortedData, selectedPriceRange]);

  return (
    <div className="category-page">
      <div className="category-header">
        <h1>🛒 Grocery</h1>
        <p>{filteredItems.length} products available</p>
      </div>

      <div className="category-container">
        <aside className="category-sidebar">
          <div className="filter-section">
            <h3>Price Range</h3>
            <div className="filter-options">
              <label className="filter-option">
                <input
                  type="radio"
                  name="price"
                  value="all"
                  checked={!selectedPriceRange}
                  onChange={() => setSelectedPriceRange(null)}
                />
                All Prices
              </label>
              <label className="filter-option">
                <input
                  type="radio"
                  name="price"
                  value="0-100"
                  onChange={() => setSelectedPriceRange("0-100")}
                />
                Under ₹100
              </label>
              <label className="filter-option">
                <input
                  type="radio"
                  name="price"
                  value="100-500"
                  onChange={() => setSelectedPriceRange("100-500")}
                />
                ₹100 - ₹500
              </label>
              <label className="filter-option">
                <input
                  type="radio"
                  name="price"
                  value="500-1000"
                  onChange={() => setSelectedPriceRange("500-1000")}
                />
                ₹500 - ₹1,000
              </label>
              <label className="filter-option">
                <input
                  type="radio"
                  name="price"
                  value="1000+"
                  onChange={() => setSelectedPriceRange("1000+")}
                />
                ₹1,000 and above
              </label>
            </div>
          </div>
        </aside>

        <main className="category-content">
          <FilterButton
            handleLowToHigh={handleLowToHigh}
            handleHighToLow={handleHighToLow}
          />
          {filteredItems.length > 0 ? (
            <div className="item-container">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="item"
                  onClick={() => onItemClick(item)}
                  data-testid="item"
                  role="button"
                  tabIndex="0"
                >
                  <div className="item-image-wrapper">
                    <img src={item.image} alt={item.title} className="item-image" />
                  </div>
                  <h4 className="item-title">{item.title}</h4>
                  <p className="item-price">
                    <span className="price-currency">₹</span>
                    {item.Price}
                  </p>
                  <button className="add-to-cart-btn" onClick={(e) => {
                    e.stopPropagation();
                    onItemClick(item);
                  }}>
                    View Details
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-products">
              <p>No products found in this price range.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Grocery;
