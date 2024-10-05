import React, { useEffect } from "react";
import { useCart } from "./cartProvider";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  BUY_NOW_TITLE,
  CART_TITLE,
  CART_MESSAGE,
  QTY_TITLE,
  TOTAL_TITLE,
} from "./appDefault";

const Cart = () => {
  const { calculateTotal, buyNow, cartItems, setCartItems } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const storedCartItems = JSON.parse(sessionStorage.getItem("cartItems")) || [];
    setCartItems(storedCartItems);
  }, [setCartItems]);

  const handleBuyNow = () => {
    if (cartItems.length === 0 || cartItems.every(item => item.Qty <= 0)) {
      alert("Quantity is not selected");
      return;
    }

    cartItems.forEach(item => {
      if (item.Qty > 0) {
        buyNow(item);
        navigate(`/checkout`, { state: item });
      }
    });
  };

  const handleDeleteItem = (id) => {
    const updatedCartItems = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCartItems);
    sessionStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  const handleQuantityChange = (id, newQuantity) => {
    const updatedCartItems = cartItems.map(item =>
      item.id === id ? { ...item, Qty: Number(newQuantity) } : item
    );

    if (newQuantity === "0") {
      handleDeleteItem(id);
    } else {
      setCartItems(updatedCartItems);
      sessionStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    }
  };

  const totalItemCount = cartItems.reduce((total, item) => total + item.Qty, 0);
  const itemText = totalItemCount === 1 ? "item" : "items";

  return (
    <div className="container">
      <h1 className="shopping-cart">{CART_TITLE}</h1>
      {cartItems.length === 0 ? (
        <h2 className="cart-message">{CART_MESSAGE}</h2>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="shopping-cart-items">
              <div>
                <a target="_blank" rel="noopener noreferrer" href="##">
                  <img src={item.image} alt={item.title} width="180" height="180" />
                </a>
              </div>
              <ul className="cart-list">
                <li>
                  <span>
                    <a target="_blank" rel="noopener noreferrer" href="##">
                      <span className="cart-title">{item.title}</span>
                    </a>
                  </span>
                </li>
                <div>
                  <span className="cart-title cart-title-price">
                    <span className="list-item">₹</span>{item.Price}.00
                  </span>
                </div>
                <li>
                  <span className="list-item">
                    {item.TQty === 0 ? (
                      <span className="list-item list-item-color-danger">Out of stock</span>
                    ) : (
                      <span className="list-item list-item-color-success">In stock</span>
                    )}
                  </span>
                </li>
                <li>
                  <span className="list-item">
                    {item.Price >= 500 ? 'Eligible for FREE Shipping' : 'Not Eligible for FREE Shipping'}
                  </span>
                </li>
              </ul>
              <div>
                <label>
                  {QTY_TITLE}
                  <select
                    value={item.Qty}
                    onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                  >
                    {[...Array(Math.max(item.TQty || 0, 0) + 1).keys()].map((q) => (
                      <option key={q} value={q}>
                        {q === 0 ? "0 (del)" : q}
                      </option>
                    ))}
                  </select>
                </label>
                <button onClick={() => handleDeleteItem(item.id)}>
                  <DeleteIcon />
                </button>
              </div>
            </div>
          ))}
          <div className="total">
            <div className="subtotal">
              <span className="cart-title">
                {TOTAL_TITLE} ({totalItemCount} {itemText}):{' '}
              </span>
              <span className="cart-title list-text-bold cart-title-price">
                <span className="list-item">₹</span>{calculateTotal(cartItems)}.00
              </span>
            </div>
            <button onClick={handleBuyNow} className="btn">
              {BUY_NOW_TITLE}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
