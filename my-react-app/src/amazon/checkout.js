import React, { useState } from "react";
import { useCart } from "./cartProvider";
import { useLocation, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  ORDER_BUTTON,
  PAYMENT_STATUS,
  CHECKOUT_TITLE,
  CHECKOUT_MESSAGE,
  PRICE_TITLE,
  QTY_TITLE,
  TOTAL_TITLE,
} from "./appDefault";

const Checkout = () => {
  const { checkoutItems, calculateTotal, setCheckoutItems } = useCart();
  const [paymentInProgress, setPaymentInProgress] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const item = location.state;

  const handlePayment = async () => {
    if (checkoutItems.some((item) => item.Qty <= 0)) {
      alert("Please select quantities for all items.");
      return;
    }

    setPaymentInProgress(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const paymentSuccess = Math.random() < 0.8; 

    if (paymentSuccess) {
      setCheckoutItems([]);
      navigate(`/successPage`, { state: item.Tags });
    } else {
      alert("Payment failed. Please try again.");
      setPaymentInProgress(false);
    }
  };

  const handleDelete = (id) => {
    const filteredItems = checkoutItems.filter((item) => item.id !== id);
    setCheckoutItems(filteredItems);
  };

  const handleQuantityChange = (id, newQuantity) => {
    const quantity = Number(newQuantity); 
    const updatedItems = checkoutItems.map((item) => {
      if (item.id === id) {
        const maxQuantity = item.maxQuantity || item.TQty;
        return quantity > maxQuantity ? item : { ...item, Qty: quantity };
      }
      return item;
    });

    const validItems = updatedItems.filter((item) => item.Qty > 0);
    setCheckoutItems(validItems);
  };

  return (
    <div className="container">
      <h2 className="checkout-title">{CHECKOUT_TITLE}</h2>
      {checkoutItems.length === 0 ? (
        <div className="checkout-message">{CHECKOUT_MESSAGE}</div>
      ) : (
        <div>
          {checkoutItems.map((item) => (
            <div key={item.id} className="checkout-item">
              <img src={item.image} alt={item.title} className="item-image" />
              <div className="item-details">
                <h3 className="item-title">{item.title}</h3>
                <p className="item-price">
                  {PRICE_TITLE} ₹{item.Price}/-
                </p>
                <label className="quantity-label">
                  {QTY_TITLE}
                  <select
                    value={item.Qty}
                    onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                  >
                    {[...Array(Math.max(item.maxQuantity || item.TQty, 0) + 1).keys()].map((q) => (
                      <option key={q} value={q}>
                        {q === 0 ? "0 (del)" : q}
                      </option>
                    ))}
                  </select>
                </label>
                <button onClick={() => handleDelete(item.id)} className="delete-button">
                  <DeleteIcon />
                </button>
              </div>
            </div>
          ))}
          <div className="total">
            <h3>
              {TOTAL_TITLE} ₹{calculateTotal(checkoutItems)}/-
            </h3>
            <button onClick={handlePayment} className="btn" disabled={paymentInProgress}>
              {paymentInProgress ? PAYMENT_STATUS : ORDER_BUTTON}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
