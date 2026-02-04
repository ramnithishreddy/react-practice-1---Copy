import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import data from "./data.json";
import FilterButton from "./filterButton";
import { useCart } from "./cartProvider";

const Mobiles = () => {
  const navigate = useNavigate();
  const [sortedData, setSortedData] = useState(data.Mobiles);
  const { currentQuantity, setCurrentQuantity } = useCart();
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);

  const onItemClick = (item) => {
    item = {
      ...item,
      Qty: Math.max(Number(currentQuantity), 1),
    };
    setCurrentQuantity(Number(item.Qty));
    navigate(`/itemDetails`, { state: item });
  };

  const handleLowToHigh = () => {
    const sortedItems = [...data.Mobiles].sort((a, b) => a.Price - b.Price);
    setSortedData(sortedItems);
  };

  const handleHighToLow = () => {
    const sortedItems = [...data.Mobiles].sort((a, b) => b.Price - a.Price);
    setSortedData(sortedItems);
  };

  const filteredItems = useMemo(() => {
    if (!selectedPriceRange) return sortedData;
    return sortedData.filter((item) => {
      if (selectedPriceRange === "0-20000") return item.Price < 20000;
      if (selectedPriceRange === "20000-50000") return item.Price >= 20000 && item.Price < 50000;
      if (selectedPriceRange === "50000-100000") return item.Price >= 50000 && item.Price < 100000;
      if (selectedPriceRange === "100000+") return item.Price >= 100000;
      return true;
    });
  }, [sortedData, selectedPriceRange]);

  return (
    <div className="category-page">
      <div className="category-header">
        <h1>📱 Mobiles</h1>
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
                  value="0-20000"
                  onChange={() => setSelectedPriceRange("0-20000")}
                />
                Under ₹20,000
              </label>
              <label className="filter-option">
                <input
                  type="radio"
                  name="price"
                  value="20000-50000"
                  onChange={() => setSelectedPriceRange("20000-50000")}
                />
                ₹20,000 - ₹50,000
              </label>
              <label className="filter-option">
                <input
                  type="radio"
                  name="price"
                  value="50000-100000"
                  onChange={() => setSelectedPriceRange("50000-100000")}
                />
                ₹50,000 - ₹1,00,000
              </label>
              <label className="filter-option">
                <input
                  type="radio"
                  name="price"
                  value="100000+"
                  onChange={() => setSelectedPriceRange("100000+")}
                />
                ₹1,00,000 and above
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

export default Mobiles;
