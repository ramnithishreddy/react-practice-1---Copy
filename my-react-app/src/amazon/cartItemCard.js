import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { QTY_TITLE, CURRENCY, FREE_SHIPPING_THRESHOLD, FREE_SHIPPING_TEXT, PAID_SHIPPING_TEXT } from "./appDefault";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

const CartItemCard = ({
  item,
  onQuantityChange,
  onDelete,
  onDecrement,
  showStock = true,
  showShipping = true,
}) => {
  const {
    id,
    title,
    image,
    Price,
    Qty = 0,
    TQty = 0,
    maxQuantity,
    Discount = 0,
    Rating = 0,
    isPrime = false,
  } = item;

  const quantityLimit = maxQuantity || TQty || 0;
  const originalPrice = Math.round(Price / (1 - Discount / 100));
  const totalPrice = Price * Qty;
  const isEligibleForFreeShipping = Price >= FREE_SHIPPING_THRESHOLD;

  return (
    <div className="shopping-cart-items">
      <div className="cart-item-image">
        <a target="_blank" rel="noopener noreferrer" href="##">
          <img src={image} alt={title} width="180" height="180" className="item-image" />
        </a>
        {isPrime && <div className="prime-badge">Prime</div>}
      </div>

      <ul className="cart-list">
        <li>
          <span className="cart-title">{title}</span>
        </li>
        
        <li className="price-section">
          <div className="price-info">
            <span className="cart-title cart-title-price">
              {CURRENCY}{Price}.00
            </span>
            {Discount > 0 && (
              <>
                <span className="original-price">
                  {CURRENCY}{originalPrice}.00
                </span>
                <span className="discount-badge">{Discount}% OFF</span>
              </>
            )}
          </div>
        </li>

        {Rating > 0 && (
          <li>
            <span className="rating-info">
              ⭐ {Rating.toFixed(1)} ({item.Reviews || 0} reviews)
            </span>
          </li>
        )}

        {showStock && (
          <li>
            <span className="list-item">
              {TQty === 0 ? (
                <span className="list-item list-item-color-danger">
                  ❌ Out of stock
                </span>
              ) : (
                <span className="list-item list-item-color-success">
                  ✓ In stock
                </span>
              )}
            </span>
          </li>
        )}

        {showShipping && (
          <li>
            <span className="shipping-info">
              <LocalShippingIcon className="shipping-icon" />
              {isEligibleForFreeShipping ? (
                <span className="free-shipping">{FREE_SHIPPING_TEXT}</span>
              ) : (
                <span className="paid-shipping">{PAID_SHIPPING_TEXT}</span>
              )}
            </span>
          </li>
        )}

        <li className="total-price">
          Subtotal: <strong>{CURRENCY}{totalPrice}.00</strong>
        </li>
      </ul>

      <div className="cart-item-actions">
        <label className="quantity-label">
          {QTY_TITLE}
          <select
            value={Qty}
            onChange={(e) => onQuantityChange(id, e.target.value)}
            className="quantity-select"
          >
            {[...Array(quantityLimit + 1).keys()].map((q) => (
              <option key={q} value={q}>
                {q === 0 ? "0 (Remove)" : q}
              </option>
            ))}
          </select>
        </label>
        
        <button 
          onClick={() => onDecrement ? onDecrement(id) : onDelete(id)}
          className="delete-button"
          title="Delete item"
          aria-label="Delete item from cart"
        >
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
};

export default CartItemCard;
