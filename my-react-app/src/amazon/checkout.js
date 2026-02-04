import React, { useState, useMemo } from "react";
import { useCart } from "./cartProvider";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ORDER_BUTTON,
  PAYMENT_STATUS,
  CHECKOUT_TITLE,
  CHECKOUT_MESSAGE,
  TOTAL_TITLE,
} from "./appDefault";
import {
  updateItemQuantity,
  decrementOrRemoveItem,
  removeItemById,
  persistToSession,
} from "./cartUtils";
import CartItemCard from "./cartItemCard";

const Checkout = () => {
  const { checkoutItems, calculateTotal, setCheckoutItems } = useCart();
  const [paymentInProgress, setPaymentInProgress] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const item = location.state || {};

  const handleDeleteItem = (id) => {
    const updatedCartItems = decrementOrRemoveItem(checkoutItems, id);
    setCheckoutItems(updatedCartItems);
    persistToSession("checkoutItems", updatedCartItems);
  };

  const handleDelete = (id) => {
    const updatedCartItems = removeItemById(checkoutItems, id);
    setCheckoutItems(updatedCartItems);
    persistToSession("checkoutItems", updatedCartItems);
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity === "0") {
      handleDelete(id);
    } else {
      const updatedItems = updateItemQuantity(checkoutItems, id, newQuantity);
      setCheckoutItems(updatedItems);
      persistToSession("checkoutItems", updatedItems);
    }
  };

  const handlePayment = async () => {
    if (checkoutItems.some((item) => (item.Qty ?? 0) <= 0)) {
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

  const totalAmount = useMemo(
    () => calculateTotal(checkoutItems),
    [checkoutItems, calculateTotal]
  );

  return (
    <div className="container">
      <h2 className="checkout-title">{CHECKOUT_TITLE}</h2>
      {checkoutItems.length === 0 ? (
        <div className="checkout-message">{CHECKOUT_MESSAGE}</div>
      ) : (
        <div>
          {checkoutItems.map((item) => (
            <CartItemCard
              key={item.id}
              item={item}
              onQuantityChange={handleQuantityChange}
              onDecrement={handleDeleteItem}
              onDelete={handleDelete}
              showStock={false}
              showShipping={false}
            />
          ))}
          <div className="total">
            <h3>
              {TOTAL_TITLE} ₹{totalAmount}/-
            </h3>
            <button
              onClick={handlePayment}
              className="btn"
              disabled={paymentInProgress}
            >
              {paymentInProgress
                ? PAYMENT_STATUS || "Processing..."
                : ORDER_BUTTON || "Place Order"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
