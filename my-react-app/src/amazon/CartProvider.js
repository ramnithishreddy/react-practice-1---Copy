import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export default function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [checkoutItems, setCheckoutItems] = useState([]);

  const addToCart = (item) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      updateCartItems([...cartItems], item.id, { Qty: existingItem.Qty + 1 });
    } else {
      updateCartItems([...cartItems, { ...item, Qty: item.Qty }]);
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

  const CbuyNow = (item) => {
    setCheckoutItems((prevItems) => [...prevItems, { ...item, Qty: item.Qty }]);
  };

  const calculateTotal = (items) => {
    return items.reduce((total, item) => total + item.Price * item.Qty, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        checkoutItems,
        buyNow,
        CbuyNow,
        addToCart,
        updateCartItems,
        calculateTotal,
        setCartItems,
        setCheckoutItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  return useContext(CartContext);
};

/* import React, { createContext, useContext, useState } from 'react'

const CartContext = createContext()

export default function CartProvider({ children }){
  const [cartItems, setCartItems] = useState([])
  const [checkoutItems, setCheckoutItems] = useState([])
 
  const addToCart = (item) => {
    console.log(item.id,'cartpro8')

    const existingItem = cartItems.find(cartItem => cartItem.id === item.id)
    if (existingItem) {
      setCartItems((prevItems) =>
        prevItems.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, Qty: cartItem.Qty + 1 } : cartItem
        )
      )
    } else {
      setCartItems(prevItems => [...prevItems, { ...item, Qty: 1 }])
    }
  }

  const buyNow = (item) => {
    const existingItem = checkoutItems.find(checkoutItem => checkoutItem.id === item.id)
    console.log(checkoutItems,'2626cartpro')
    if (existingItem) {
      setCheckoutItems((prevItems) =>
        prevItems.map((checkoutItem) =>
          checkoutItem.id === item.id ? { ...checkoutItem, Qty: checkoutItem.Qty + 1 } : checkoutItem
        )
      )
    } else {
      setCheckoutItems((prevItems) => [...prevItems, { ...item, Qty: 1 }])
    }
  }
  const CbuyNow = (item) => {
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id && cartItem.id !== item.id)
    console.log(cartItems,'3838cartpro')
    if (existingItem) {
      setCheckoutItems((prevItems) =>
        prevItems.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, Qty: cartItem.Qty + 1 } : cartItem
        )
      )
    } else {
      setCheckoutItems((prevItems) => [...prevItems, { ...item, Qty: 1 }])
    }
  }

  const CcalculateTotal = () => {
      let total = 0;
      for (const item of cartItems) {
        total += item.Price * item.Qty;
      }
      return total;
  }
  const BcalculateTotal = () => {
    let total = 0;
    for (const item of cartItems) {
      total += item.Price * item.Qty;
    }
    return total;
  }

  return (
    <CartContext.Provider value={{ cartItems, checkoutItems, addToCart, buyNow, CbuyNow, CcalculateTotal, BcalculateTotal, setCartItems, setCheckoutItems}}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  return useContext(CartContext)
}



 */
