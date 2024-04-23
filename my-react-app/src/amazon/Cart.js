import React, { useEffect } from "react";
import { useCart } from "./CartProvider";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

const Cart = () => {
  const { calculateTotal, buyNow, cartItems, setCartItems } = useCart();
  const nav = useNavigate();

  useEffect(() => {
    cartItems.forEach((item) => {
      if (item.Qty === 0) {
        handleDeleteC(item.id);
        window.location.reload();
      }
    });
  }, [cartItems]);

  const cartItemsData =
    JSON.parse(sessionStorage.getItem("cartItems")) || cartItems || [];
  console.log("CARTITEMS==", cartItemsData);

  const handleBuyNow = () => {
    cartItemsData.forEach((item) => {
      buyNow(item);
      if (item.Qty > 0) {
        nav(`/Checkout`, { state: item });
        // window.location.reload();
      } else {
        alert("Quantity is not selected");
        // window.location.reload();
      }
    });
  };

  const handleDeleteC = (id) => {
    const filteredCartItems = cartItemsData.filter((item) => item.id !== id);
    setCartItems(filteredCartItems);
    sessionStorage.setItem("cartItems", JSON.stringify(filteredCartItems));
    // window.location.reload();
  };

  const handleQuantityChangeC = (id, newQuantity) => {
    const updatedCartItems = cartItemsData.map((item) =>
      item.id === id ? { ...item, Qty: Number(newQuantity) } : item
    );
    setCartItems(updatedCartItems);
    sessionStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    // window.location.reload();
  };

  return (
    <div className="container">
      <h2>Cart Items:</h2>
      {cartItemsData.length === 0 ? (
        <div>Cart is empty.</div>
      ) : (
        <div>
          {cartItemsData.map((item) => (
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
                  <DeleteIcon />
                </button>
              </div>
            </div>
          ))}
          <div className="total">
            <h3>Total: ₹{calculateTotal(cartItemsData)}</h3>
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
