import React, { useEffect, useState } from "react";
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
  const [quantity, setQuantity] = useState(0)
  const nav = useNavigate();
  useEffect(() => {
    cartItems.forEach((item) => {
      const Quantity = item.Qty > 1 ? item.Qty - 1 : quantity;
      setQuantity(Quantity)
    });
    const cartItemsData =
      JSON.parse(sessionStorage.getItem("cartItems")) || cartItems || [];
    setCartItems(cartItemsData);
  }, []);

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
    cartItems.forEach((item) => {
      if (item.Qty === 0) {
        console.log("Hii")
        handleDeleteC(item.id);
        // window.location.reload();
      }
    });
    setCartItems(updatedCartItems);
    sessionStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    // window.location.reload();
  };
  console.log('quantity:', quantity, 'cart length:', cartItems.length, 'cart + qun:', cartItems.length + quantity)
  return (
    <div className="container">
      <h1 className="shopping-cart">{CART_TITLE}</h1>
      {cartItems.length === 0 ? (
        <h2 className="cart-message">{CART_MESSAGE}</h2>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div>
              <div className="shopping-cart-items">
                <div>
                  <a target="_blank" href="##"><img src={item.image} alt={item.title} width="180" height="180" /></a>
                </div>
                <ul className="cart-list">
                  <li>
                    <span>
                      <a target="_blank" href="##">
                        <span className="cart-title cart-title-color">{item.title}</span>
                      </a>
                    </span></li>
                  <div>
                    <div>
                      <div>
                        <div>
                          <span class="cart-title list-text-bold cart-title-price"><span className="list-item">₹</span>{item.Price}.00</span>
                        </div>
                      </div>
                    </div></div><div>
                    <li>{item.TQty === 0 ? <span className="list-item list-item-color-danger">Out of stock</span> : <span className="list-item list-item-color-success">In stock</span>}</li><li><span class="list-item">{item.Price >= 500 ? 'Eligible for FREE Shipping' : 'Not Eligible for FREE Shipping'}</span></li><p>
                      <img alt="" src="https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px._CB485936079_.png" height="18px" />
                    </p><li><span><span>
                      <div class="list-item"><label><input type="checkbox" name="" value="" /><span class="list-padding">This will be a gift</span></label></div></span>
                    </span></li>
                    <li><span>
                      <span class="list-item list-text-bold">
                        {item.Colors ? 'Colour:' : item.Flavour ? 'Flavour:' : ''} {' '}
                      </span>
                      <span class="list-item">
                        {item.Colors ? item.Colors[0] : item.Flavour}
                      </span>
                    </span></li>
                  </div>
                </ul></div>
              <div>
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
            <div className="subtotal">
              <span className="cart-title">
                {TOTAL_TITLE} ({cartItems?.length + quantity} {cartItems?.length > 1 || quantity > 0 ? 'items' : 'item'}):{' '}
              </span>
              <div>
                <span className="cart-title list-text-bold cart-title-price"><span className="list-item"> ₹</span>{calculateTotal(cartItems)}.00</span>
              </div>
            </div>
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
