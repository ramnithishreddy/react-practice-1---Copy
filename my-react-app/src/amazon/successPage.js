import React from "react";
import "./successPage.css";
import { useLocation, useNavigate } from "react-router-dom";
import Data from "./data.json";
import { useCart } from "./cartProvider";
import { CART_BUTTON } from "./appDefault";

const SuccessPage = () => {
  const navigate = useNavigate();
  const { currentQuantity, setCurrentQuantity } = useCart();
  const loc = useLocation();
  const item = loc.state;
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
  const relatedProducts = item ? getRelatedProducts(item) : [];
  return (
    <div className="success-page">
      <div className="success-message">
        <h2>Order Placed Successfully!</h2>
        <p>Your order has been successfully placed.</p>
        <p>Thank you for shopping with us!</p>
      </div>
      <div className="related-products">
        <h3>You may also like</h3>
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
  );
};

export default SuccessPage;
