import React from "react";
import { useCart } from "./CartProvider";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

const Checkout = () => {
  let { checkoutItems, calculateTotal, setCheckoutItems } = useCart();
  const checkk = (id) => {
    let check = checkoutItems.filter((item) => item.id !== id);
    setCheckoutItems(check);
  };
  const nav = useNavigate();
  const handleAlert = () => {
    checkoutItems.filter((item) => {
      return checkk(item.id);
    });
    alert("Order Placed Successfully");
    nav("/");
  };
  const handleDelete = (id) => {
    let filterData = checkoutItems.filter((items) => items.id !== id);
    setCheckoutItems(filterData);
  };
  const handleQuantityChange = (id, newQuantity) => {
    let check = checkoutItems.map((item) => {
      if (item.id === id) {
        const maxQuantity = item.maxQuantity || 10;
        if (maxQuantity === 0 && newQuantity > 0) {
          return null;
        } else {
          return { ...item, Qty: newQuantity };
        }
      }
      return item;
    });

    check = check.filter((item) => item !== null);

    setCheckoutItems(check);
  };

  return (
    <div className="container">
      <h2>Checkout</h2>
      {checkoutItems.length === 0 ? (
        <div>Your checkout is empty.</div>
      ) : (
        <div>
          {checkoutItems.map((item) => (
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
                      handleQuantityChange(item.id, e.target.value)
                    }
                  >
                    {[
                      ...Array(Math.max(item.maxQuantity || 10, 0) + 1).keys(),
                    ].map((q) => (
                      <option key={q} value={q}>
                        {q === 0 ? "0" : q}
                      </option>
                    ))}
                  </select>
                </label>

                <button onClick={() => handleDelete(item.id)}>
                  {" "}
                  <DeleteIcon />{" "}
                </button>
              </div>
            </div>
          ))}
          <div className="total">
            <h3>Total: ₹{calculateTotal(checkoutItems)}/-</h3>
            <button onClick={handleAlert}>Place Order</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
