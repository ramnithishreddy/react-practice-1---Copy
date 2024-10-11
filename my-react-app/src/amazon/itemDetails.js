import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "./cartProvider";
import {
  PRICE_TITLE,
  QTY_TITLE,
  BUY_NOW_TITLE,
  CART_BUTTON,
  ITEM_MESSAGE,
} from "./appDefault";

const ItemDetails = () => {
  const loc = useLocation();
  const item = loc.state;
  const { addToCart, buyNow } = useCart();
  const [currentQuantity, setCurrentQuantity] = useState(item ? Number(item.Qty) : 0);
  const nav = useNavigate();

  if (!item) {
    return <h2 className="cart-message">{ITEM_MESSAGE}</h2>;
  }

  const handleAddToCart = () => {
    const itemQty = { ...item, Qty: Number(currentQuantity) };
    if (itemQty.Qty > 0) {
      addToCart(itemQty);
      nav("/cart");
    } else {
      alert("Quantity is not selected");
    }
  };

  const handleBuyNow = () => {
    const itemQty = { ...item, Qty: Number(currentQuantity) };
    if (itemQty.Qty > 0) {
      buyNow(itemQty);
      nav(`/checkout`, { state: itemQty });
    } else {
      alert("Quantity is not selected");
    }
  };

  const handleQuantityChangeC = (newQuantity) => {
    setCurrentQuantity(Number(newQuantity));
  };

  return (
    <div className="item-details-container">
      <div className="item-details-row">
        <div className="item-image">
          <img src={item.image} alt={item.title} />
        </div>
        <div className="item-info">
          <h1 className="item-title">{item.title}</h1>
          <h2 className="item-price">
            {PRICE_TITLE} {item.Price}/-
          </h2>
          <label className="quantity-label">
            {QTY_TITLE}
            <select
              value={currentQuantity}
              onChange={(e) => handleQuantityChangeC(e.target.value)}
              className="quantity-select"
            >
              {[...Array(Math.max(item.TQty || 0, 0) + 1).keys()].map((q) => (
                <option key={q} value={q}>
                  {q === 0 ? "Select" : q}
                </option>
              ))}
            </select>
          </label>
          <div className="button-group">
            <button onClick={handleAddToCart} className="btn btn-primary">
              {CART_BUTTON}
            </button>
            <button onClick={handleBuyNow} className="btn btn-success">
              {BUY_NOW_TITLE}
            </button>
          </div>
        </div>
      </div>
      <div className="item-description">
        <h3>Description</h3>
        <p>{item.description || "No description available."}</p>
      </div>
    </div>
  );
};

export default ItemDetails;
