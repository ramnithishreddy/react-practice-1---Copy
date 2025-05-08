import React, { createContext, useContext, useEffect, useState } from "react";
import data from "./data.json";

const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [checkoutItems, setCheckoutItems] = useState([]);
  const [currentQuantity, setCurrentQuantity] = useState(Number(0));
  const [sortedData, setSortedData] = useState(data.Grocery);
  const [cachedLowToHigh, setCachedLowToHigh] = useState(null);
  const [initialCartState, setInitialCartState] = useState("");
  const [updatedCartItems, setUpdatedCartItems] = useState([]);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const cartItemsJSON = JSON.stringify(cartItems);
    sessionStorage.setItem("cartItems", cartItemsJSON);
  }, [cartItems]);

  const addToCart = (item) => {
    let Qtycount = 0;
    const index = cartItems?.findIndex((cartItem) => cartItem.id === item.id);
    if (index !== -1) {
      if (Array.isArray(initialCartState) && Array.isArray(updatedCartItems) && initialCartState.length > 0 && updatedCartItems.length > 0) {
        Qtycount = (initialCartState[index]?.Qty || 0) + Number(item.Qty);
        const initialCartItems = [...initialCartState];
        initialCartItems[index].Qty = Qtycount;
        if (Qtycount <= item.TQty) {
          const updatedItems = [...updatedCartItems];
          updatedItems[index].Qty = Qtycount;
          setUpdatedCartItems(updatedItems);
        }
      }
      if (Qtycount > item.TQty) {
        alert("item is out of stock");
        setCartItems(initialCartState);
      }
    } else {
      setCartItems([...cartItems, { ...item }]);
      setInitialCartState([...initialCartState, { ...item }]);
      setUpdatedCartItems([...updatedCartItems, { ...item }]);
    }
    if (index !== -1 && updatedCartItems.length > 0 && updatedCartItems[index]?.Qty <= item.TQty) {
        setCartItems(updatedCartItems);
    }

    if (success) {
      setInitialCartState([]);
      setUpdatedCartItems([]);
      setSuccess(false);
    }
  };

  const updateCartItems = (items, itemId) => {
    const updatedItems = items.map((item) =>
      item.id === itemId ? { ...item, Qty: item.Qty } : item
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
            ? { ...checkoutItem, Qty: checkoutItem.Qty + 1 }
            : checkoutItem
        )
      );
    } else {
      setCheckoutItems((prevItems) => [
        ...prevItems,
        { ...item, Qty: item.Qty },
      ]);
    }
  };

  const calculateTotal = (items) => {
    return items?.reduce((total, item) => total + item.Price * item.Qty, 0);
  };

  const handleLowToHigh = () => {
    if (!cachedLowToHigh) {
      const sortedItems = [...sortedData].sort((a, b) => a.Price - b.Price);
      setCachedLowToHigh(sortedItems);
      setSortedData(sortedItems);
    } else {
      setSortedData(cachedLowToHigh);
    }
  };

  const handleHighToLow = () => {
    const sortedItems = [...sortedData].sort((a, b) => b.Price - a.Price);
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
