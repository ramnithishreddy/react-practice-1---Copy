import React, { createContext, useContext, useEffect, useState } from "react";
import data from "./data.json";

const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [checkoutItems, setCheckoutItems] = useState([]);
  const [currentQuantity, setCurrentQuantity] = useState(Number(0));
  const [sortedData, setSortedData] = useState(data.Grocery);
  const [first, setFirst] = useState("");
  const [updatedCartItems, setUpdatedCartItems] = useState([]);
  const [success, setSuccess] = useState(false);

  // const addToCart = (item) => {
  //   // if (item.length > 0) {
  //   //   setCartItems([...cartItems, { ...item }]);
  //   // }
  //   const index = cartItems?.findIndex((cartItem) => cartItem.id === item.id);
  //   if (index !== -1) {
  //     setUpdatedCartItems([...updatedCartItems, [...cartItems]]);
  //     updatedCartItems[index].Qty < item.TQty
  //       ? (updatedCartItems[index].Qty += Number(item.Qty))
  //       : setCartItems(
  //           updatedCartItems[index].Qty < item.TQty
  //             ? updatedCartItems
  //             : (alert("item is out of stock"),
  //               updatedCartItems[index].Qty <= item.TQty
  //                 ? first
  //                 : updatedCartItems[index].Qty >= item.TQty
  //                 ? setFirst([...first, { ...item }])
  //                 : setCartItems([...cartItems, { ...item }]))
  //         );
  //   } else {
  //     setCartItems([...cartItems, { ...item }]);
  //     setFirst([...first, { ...item }]);
  //   }
  //   setCartItems(
  //     updatedCartItems[index].Qty < item.TQty
  //       ? updatedCartItems
  //       : (alert("item is out of stock"),
  //         updatedCartItems[index].Qty > item.TQty
  //           ? first
  //           : updatedCartItems[index].Qty >= item.TQty
  //           ? setFirst([...first, { ...item }])
  //           : setCartItems([...cartItems, { ...item }]))
  //   );
  // };

  useEffect(() => {
    const cartItemsJSON = JSON.stringify(cartItems);
    sessionStorage.setItem("cartItems", cartItemsJSON);
  }, [cartItems]);

  const addToCart = (item) => {
    let Qtycount;
    const index = cartItems?.findIndex((cartItem) => cartItem.id === item.id);
    if (index !== -1) {
      if (first.length > 0 && updatedCartItems.length > 0) {
        Qtycount = (first[index]?.Qty || 0) + Number(item.Qty);
        if (Qtycount <= item.TQty) {
          const updatedItems = [...updatedCartItems];
          updatedItems[index].Qty = Qtycount;
          setUpdatedCartItems(updatedItems);
        }
      }
      if (Qtycount > item.TQty) {
        alert("item is out of stock");
        setCartItems(first);
      }
    } else {
      setCartItems([...cartItems, { ...item }]);
      setFirst([...first, { ...item }]);
      setUpdatedCartItems([...updatedCartItems, { ...item }]);
    }
    if (updatedCartItems.length > 0) {
      if (updatedCartItems[index]?.Qty <= item.TQty) {
        setCartItems(updatedCartItems);
      }
    }
    // if (updatedCartItems.length > 0) {
    //   if (updatedCartItems[index]?.Qty <= item.TQty) {
    //     setFirst(updatedCartItems);
    //   }
    // }
    if (success) {
      setFirst([]);
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
    const sortedItems = [...sortedData].sort((a, b) => a.Price - b.Price);
    setSortedData(sortedItems);
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
