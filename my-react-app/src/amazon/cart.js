import React, { useEffect } from "react";
import { useCart } from "./cartProvider";
import { useNavigate } from "react-router-dom";
import {
  BUY_NOW_TITLE,
  CART_TITLE,
  CART_MESSAGE,
  TOTAL_TITLE,
} from "./appDefault";
import {
  updateItemQuantity,
  decrementOrRemoveItem,
  removeItemById,
  persistToSession,
  loadFromSession,
} from "./cartUtils";
import CartItemCard from "./cartItemCard";

const Cart = () => {
  const { calculateTotal, buyNow, cartItems, setCartItems } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    setCartItems(loadFromSession("cartItems"));
  }, [setCartItems]);

  const handleDeleteItem = (id) => {
    const updatedCartItems = decrementOrRemoveItem(cartItems, id);
    setCartItems(updatedCartItems);
    persistToSession("cartItems", updatedCartItems);
  };

  const handleDelete = (id) => {
    const updatedCartItems = removeItemById(cartItems, id);
    setCartItems(updatedCartItems);
    persistToSession("cartItems", updatedCartItems);
  };

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity === "0") {
      handleDelete(id);
    } else {
      const updatedCartItems = updateItemQuantity(cartItems, id, newQuantity);
      setCartItems(updatedCartItems);
      persistToSession("cartItems", updatedCartItems);
    }
  };

  const handleBuyNow = () => {
    if (cartItems.length === 0 || cartItems.every((item) => item.Qty <= 0)) {
      alert("Quantity is not selected");
      return;
    }

    cartItems.forEach((item) => {
      if (item.Qty > 0) {
        buyNow(item);
        navigate(`/checkout`, { state: item });
      }
    });
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
            <CartItemCard
              key={item.id}
              item={item}
              onQuantityChange={handleQuantityChange}
              onDecrement={handleDeleteItem}
              onDelete={handleDelete}
              showStock={true}
              showShipping={true}
            />
          ))}
          <div className="total">
            <div className="subtotal">
              <span className="cart-title">
                {TOTAL_TITLE} ({totalItemCount} {itemText}):{" "}
              </span>
              <span className="cart-title list-text-bold cart-title-price">
                <span className="list-item">₹</span>
                {calculateTotal(cartItems)}.00
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
