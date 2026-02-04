import React, { useState, useEffect } from "react";
import "./successPage.css";
import { useLocation, useNavigate } from "react-router-dom";
import Data from "./data.json";
import { useCart } from "./cartProvider";
import { CART_BUTTON } from "./appDefault";

const SuccessPage = () => {
  const navigate = useNavigate();
  const { currentQuantity, setCurrentQuantity, checkoutItems } = useCart();
  const loc = useLocation();
  const item = loc.state;
  const [orderNumber] = useState(Math.floor(Math.random() * 1000000000));
  const [orderTotal] = useState(Math.floor(Math.random() * 50000) + 500);

  const getRelatedProducts = (tags) => {
    let relatedProducts = [];
    for (const category in Data) {
      const products = Data[category];
      const filtered = products.filter((product) =>
        product.Tags.some((tag) => tags.includes(tag))
      );
      relatedProducts = [...relatedProducts, ...filtered];
    }
    return relatedProducts.slice(0, 6);
  };

  const onItemClick = (item) => {
    item = {
      ...item,
      Qty: Number(currentQuantity) === 0 ? +1 : Number(currentQuantity),
    };
    setCurrentQuantity(Number(item.Qty));
    navigate(`/itemDetails`, { state: item });
  };

  const handleContinueShopping = () => {
    navigate("/");
  };

  const getDeliveryDate = () => {
    const date = new Date();
    date.setDate(date.getDate() + Math.floor(Math.random() * 7) + 3);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const relatedProducts = item ? getRelatedProducts(item) : [];

  return (
    <div className="success-page">
      <div className="success-message">
        <h2>✓ Order Placed Successfully!</h2>
        <p>Your order has been confirmed.</p>
        <p>Thank you for shopping with us!</p>
      </div>

      <div className="order-details">
        <h3>Order Details</h3>
        <div className="order-info-grid">
          <div className="order-info-item">
            <label>Order Number</label>
            <div className="value">#{orderNumber}</div>
          </div>
          <div className="order-info-item">
            <label>Estimated Delivery</label>
            <div className="value">{getDeliveryDate()}</div>
          </div>
          <div className="order-info-item">
            <label>Order Status</label>
            <div className="value" style={{ color: "#28a745" }}>
              Processing
            </div>
          </div>
          <div className="order-info-item">
            <label>Total Amount</label>
            <div className="value">₹{orderTotal}/-</div>
          </div>
        </div>
      </div>

      <div className="related-products">
        <h3>You may also like</h3>
        <div className="products-container">
          {relatedProducts.map((product) => (
            <div
              className="product"
              key={product.id}
              onClick={() => onItemClick(product)}
            >
              <img src={product.image} alt={product.title} />
              <h4>{product.title}</h4>
              <p>₹{product.Price}</p>
              <button>{CART_BUTTON}</button>
            </div>
          ))}
        </div>
      </div>

      <div className="continue-shopping">
        <button onClick={handleContinueShopping}>Continue Shopping</button>
      </div>
    </div>
  );
};

export default SuccessPage;
