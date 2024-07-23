import React, { useEffect } from "react";
import { useCart } from "./cartProvider";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  BUY_NOW_TITLE,
  CART_TITLE,
  CART_MESSAGE,
  PRICE_TITLE,
  QTY_TITLE,
  TOTAL_TITLE,
} from "./appDefault";

const Cart = () => {
  const { calculateTotal, buyNow, cartItems, setCartItems } = useCart();
  const nav = useNavigate();
  console.log(cartItems);
  useEffect(() => {
    cartItems.forEach((item) => {
      if (item.Qty === 0) {
        handleDeleteC(item.id);
        // window.location.reload();
      }
    });
    const cartItemsData =
      JSON.parse(sessionStorage.getItem("cartItems")) || cartItems || [];
    setCartItems(cartItemsData);
  }, [cartItems, setCartItems]);

  const handleBuyNow = () => {
    cartItems.forEach((item) => {
      buyNow(item);
      if (item.Qty > 0) {
        nav(`/checkout`, { state: item });
        // window.location.reload();
      } else {
        alert("Quantity is not selected");
        // window.location.reload();
      }
    });
  };

  const handleDeleteC = (id) => {
    const filteredCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(filteredCartItems);
    sessionStorage.setItem("cartItems", JSON.stringify(filteredCartItems));
    // window.location.reload();
  };

  const handleQuantityChangeC = (id, newQuantity) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === id ? { ...item, Qty: Number(newQuantity) } : item
    );
    setCartItems(updatedCartItems);
    sessionStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    // window.location.reload();
  };

  return (
    <div className="container">
      <h2>{CART_TITLE}</h2>
      {cartItems.length === 0 ? (
        <div>{CART_MESSAGE}</div>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} />
              <div>
                <h3>{item.title}</h3>
                <p>
                  {PRICE_TITLE}
                  {item.Price}/-
                </p>
                <label>
                  {QTY_TITLE}
                  <select
                    name="Qty:"
                    value={item.Qty}
                    onChange={(e) =>
                      handleQuantityChangeC(item.id, e.target.value)
                    }
                  >
                    {[
                      ...Array(Math.max(item.TQty || item.TQty, 0) + 1).keys(),
                    ].map((q) => (
                      <option key={q} value={q}>
                        {q === 0 ? "0 (del)" : q}
                      </option>
                    ))}
                  </select>
                </label>
                <button onClick={() => handleDeleteC(item.id)}>
                  <DeleteIcon />
                </button>
              </div>
            </div>
          ))}
          <div className="total">
            <h3>
              {TOTAL_TITLE}
              {calculateTotal(cartItems)}
            </h3>
            <button onClick={handleBuyNow} className="btn btn-success">
              {BUY_NOW_TITLE}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
