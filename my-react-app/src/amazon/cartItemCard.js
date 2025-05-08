import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { QTY_TITLE } from "./appDefault";

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
  } = item;

  const quantityLimit = maxQuantity || TQty || 0;

  return (
    <div className="shopping-cart-items">
      <div>
        <a target="_blank" rel="noopener noreferrer" href="##">
          <img src={image} alt={title} width="180" height="180" />
        </a>
      </div>

      <ul className="cart-list">
        <li>
          <span className="cart-title">{title}</span>
        </li>
        <li>
          <span className="cart-title cart-title-price">
            ₹{Price}.00
          </span>
        </li>
        {showStock && (
          <li>
            <span className="list-item">
              {TQty === 0 ? (
                <span className="list-item list-item-color-danger">
                  Out of stock
                </span>
              ) : (
                <span className="list-item list-item-color-success">
                  In stock
                </span>
              )}
            </span>
          </li>
        )}
        {showShipping && (
          <li>
            <span className="list-item">
              {Price >= 500
                ? "Eligible for FREE Shipping"
                : "Not Eligible for FREE Shipping"}
            </span>
          </li>
        )}
      </ul>

      <div>
        <label>
          {QTY_TITLE}
          <select
            value={Qty}
            onChange={(e) => onQuantityChange(id, e.target.value)}
          >
            {[...Array(quantityLimit + 1).keys()].map((q) => (
              <option key={q} value={q}>
                {q === 0 ? "0 (Remove)" : q}
              </option>
            ))}
          </select>
        </label>
        <button onClick={() => onDecrement ? onDecrement(id) : onDelete(id)}>
          <DeleteIcon />
        </button>
      </div>
    </div>
  );
};

export default CartItemCard;
