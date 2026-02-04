import React, { createContext, useContext, useEffect, useState } from "react";
import data from "./data.json";

const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [checkoutItems, setCheckoutItems] = useState([]);
  const [currentQuantity, setCurrentQuantity] = useState(0);
  const [sortedData, setSortedData] = useState(data.Grocery);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const cartItemsJSON = JSON.stringify(cartItems);
    sessionStorage.setItem("cartItems", cartItemsJSON);
  }, [cartItems]);

  const addToCart = (item) => {
    const index = cartItems.findIndex((cartItem) => cartItem.id === item.id);

    if (index !== -1) {
      const updatedItems = [...cartItems];
      const newQty = updatedItems[index].Qty + item.Qty;

      if (newQty > item.TQty) {
        alert("Item is out of stock");
        return;
      }

      updatedItems[index].Qty = newQty;
      setCartItems(updatedItems);
    } else {
      setCartItems([...cartItems, { ...item }]);
    }

    if (success) {
      setCartItems([]);
      setSuccess(false);
    }
  };

  const updateCartItems = (items, itemId, newQuantity) => {
    const updatedItems = items.map((item) =>
      item.id === itemId ? { ...item, Qty: newQuantity } : item
    );
    setCartItems(updatedItems);
  };

  const buyNow = (item) => {
    const existingItem = checkoutItems.find(
      (checkoutItem) => checkoutItem.id === item.id
    );

    if (existingItem) {
      setCheckoutItems((prevItems) =>
        prevItems.map((checkoutItem) =>
          checkoutItem.id === item.id
            ? { ...checkoutItem, Qty: checkoutItem.Qty + item.Qty }
            : checkoutItem
        )
      );
    } else {
      setCheckoutItems((prevItems) => [...prevItems, { ...item }]);
    }
  };

  const calculateTotal = (items) => {
    return items.reduce((total, item) => total + item.Price * item.Qty, 0);
  };

  const handleLowToHigh = () => {
    const sortedItems = [...data.Grocery].sort((a, b) => a.Price - b.Price);
    setSortedData(sortedItems);
  };

  const handleHighToLow = () => {
    const sortedItems = [...data.Grocery].sort((a, b) => b.Price - a.Price);
    setSortedData(sortedItems);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        checkoutItems,
        buyNow,
        addToCart,
        updateCartItems,
        calculateTotal,
        setCartItems,
        setCheckoutItems,
        handleLowToHigh,
        handleHighToLow,
        sortedData,
        setSortedData,
        currentQuantity,
        setCurrentQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  return useContext(CartContext);
};
