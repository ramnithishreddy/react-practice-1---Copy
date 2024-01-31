import React from "react";
import { useCart } from "./CartProvider";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

const Cart = () => {
  const { cartItems, calculateTotal, buyNow, setCartItems } = useCart();
  const nav = useNavigate();
  const checkk = (id) => {
    let check = cartItems.filter((item) => item.id !== id && item.id === id);
    setCartItems(check);
  };

  const handleBuyNow = () => {
    cartItems.forEach((item) => {
      buyNow(item);

      if (item.Qty > 0) {
        nav("/Checkout");
        cartItems.filter((item) => {
          return checkk(item.id);
        });
      } else alert("Quantity is not selected");
    });
  };

  const handleDeleteC = (id) => {
    const filteredCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(filteredCartItems);
  };

  const handleQuantityChangeC = (id, newQuantity) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === id
        ? {
            ...item,
            Qty: Number(newQuantity),
          }
        : item
    );
    setCartItems(updatedCartItems);
  };

  return (
    <div className="container">
      <h2>Cart Items:</h2>
      {cartItems?.length === 0 ? (
        <div>Cart is empty.</div>
      ) : (
        <div>
          {cartItems?.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} />
              <div>
                <h3>{item.title}</h3>
                <p>Price: ₹{item.Price}/-</p>
                <label>
                  Qty:
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
                  {" "}
                  <DeleteIcon />{" "}
                </button>
              </div>
            </div>
          ))}
          <div className="total">
            <h3>Total: ₹{calculateTotal(cartItems)}</h3>
            <button onClick={handleBuyNow} className="btn btn-success">
              Buy Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
