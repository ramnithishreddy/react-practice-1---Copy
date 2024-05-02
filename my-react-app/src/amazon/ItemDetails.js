import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "./CartProvider";
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
  const [currentQuantity, setCurrentQuantity] = useState(Number(item.Qty));
  const nav = useNavigate();

  if (!item) {
    return <div>{ITEM_MESSAGE}</div>;
  }

  const handleAddToCart = () => {
    const itemQty = { ...item, Qty: Number(currentQuantity) };

    if (itemQty.Qty > 0) {
      addToCart(itemQty);
      nav("/Cart");
      // window.location.reload();
    } else alert("Quantity is not selected");
  };

  const handleBuyNow = () => {
    const itemQty = { ...item, Qty: Number(currentQuantity) };
    if (itemQty.Qty > 0) {
      buyNow(itemQty);
      nav(`/Checkout`, { state: itemQty });
    } else alert("Quantity is not selected");
  };

  const handleQuantityChangeC = (newQuantity) => {
    setCurrentQuantity(Number(newQuantity));
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <img src={item.image} alt={item.title} />
        </div>
        <div className="col-md-6">
          <h2>{item.title}</h2>
          <h4>
            {PRICE_TITLE}
            {item.Price}/-
          </h4>
          <label>
            {QTY_TITLE}
            <select
              name="Qty:"
              value={currentQuantity}
              onChange={(e) => handleQuantityChangeC(e.target.value)}
            >
              {[...Array(Math.max(item.TQty || item.TQty, 0) + 1).keys()].map(
                (q) => (
                  <option key={q} value={q}>
                    {q === 0 ? "select" : q}
                  </option>
                )
              )}
            </select>
          </label>
          <button onClick={handleAddToCart} className="btn btn-primary">
            {CART_BUTTON}
          </button>
          <button onClick={handleBuyNow} className="btn btn-success">
            {BUY_NOW_TITLE}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
