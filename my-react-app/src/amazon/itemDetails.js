import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "./cartProvider";
import {
  PRICE_TITLE,
  QTY_TITLE,
  BUY_NOW_TITLE,
  CART_BUTTON,
  ITEM_MESSAGE,
  ADD_TO_CART_SUCCESS,
  SELECT_QUANTITY,
  CURRENCY,
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  SAVE_FOR_LATER,
} from "./appDefault";
import { addWishlistItem, removeWishlistItem, persistWishlist, loadWishlist } from "./cartUtils";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

const ItemDetails = () => {
  const loc = useLocation();
  const item = loc.state;
  const { addToCart, buyNow } = useCart();
  const [currentQuantity, setCurrentQuantity] = useState(item ? Math.max(Number(item.Qty), 1) : 1);
  const [isFavorite, setIsFavorite] = useState(false);
  const nav = useNavigate();

  if (!item) {
    return (
      <div className="item-not-found">
        <h2 className="cart-message">{ITEM_MESSAGE}</h2>
      </div>
    );
  }

  const handleAddToCart = () => {
    const itemQty = { ...item, Qty: Number(currentQuantity) };
    if (itemQty.Qty > 0) {
      addToCart(itemQty);
      alert(ADD_TO_CART_SUCCESS);
    } else {
      alert(SELECT_QUANTITY);
    }
  };

  const handleBuyNow = () => {
    const itemQty = { ...item, Qty: Number(currentQuantity) };
    if (itemQty.Qty > 0) {
      buyNow(itemQty);
      nav(`/checkout`, { state: itemQty });
    } else {
      alert(SELECT_QUANTITY);
    }
  };

  const handleQuantityChange = (newQuantity) => {
    setCurrentQuantity(Math.max(1, Number(newQuantity)));
  };

  const handleToggleWishlist = () => {
    const wishlist = loadWishlist();
    if (isFavorite) {
      removeWishlistItem(wishlist, item.id);
    } else {
      addWishlistItem(wishlist, item);
    }
    persistWishlist(wishlist);
    setIsFavorite(!isFavorite);
  };

  const discount = item.Discount || Math.floor(Math.random() * 30) + 5;
  const originalPrice = Math.round(item.Price / (1 - discount / 100));

  return (
    <div className="item-details-page">
      <div className="item-details-container">
        <div className="item-details-row">
          <div className="item-image-section">
            <div className="item-image-large">
              <img src={item.image} alt={item.title} />
              {item.isPrime && <div className="prime-badge-large">Prime</div>}
            </div>
            <div className="item-actions">
              <button 
                className="share-btn"
                onClick={() => alert("Share functionality coming soon!")}
                title="Share this item"
              >
                <ShareIcon /> Share
              </button>
              <button 
                className={`wishlist-btn ${isFavorite ? 'active' : ''}`}
                onClick={handleToggleWishlist}
                title={isFavorite ? REMOVE_FROM_WISHLIST : ADD_TO_WISHLIST}
              >
                {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </button>
            </div>
          </div>

          <div className="item-info">
            <h1 className="item-title">{item.title}</h1>

            <div className="rating-section">
              <div className="stars">
                {'★'.repeat(Math.floor(item.Rating || (Math.random() * 3 + 3)))}{' '}
                <span className="rating-count">({item.Reviews || Math.floor(Math.random() * 5000 + 500)} ratings)</span>
              </div>
              <span className="rating-value">{(item.Rating || 4.2).toFixed(1)} out of 5</span>
            </div>

            <div className="price-section">
              <div className="price-row">
                <span className="price-label">{PRICE_TITLE}</span>
                <span className="price-original" style={{ textDecoration: 'line-through', color: '#565959' }}>
                  {CURRENCY}{originalPrice}
                </span>
                <span className="price-current">{CURRENCY}{item.Price}</span>
                <span className="discount-badge">-{discount}% OFF</span>
              </div>
              <p className="you-save">You Save: {CURRENCY}{originalPrice - item.Price} ({discount}%)</p>
            </div>

            <div className="stock-info">
              {item.TQty > 0 ? (
                <span className="in-stock">✓ In Stock - Delivery by Tomorrow</span>
              ) : (
                <span className="out-of-stock">Out of Stock</span>
              )}
            </div>

            <div className="quantity-section">
              <label className="quantity-label">
                {QTY_TITLE}
                <select
                  value={currentQuantity}
                  onChange={(e) => handleQuantityChange(e.target.value)}
                  className="quantity-select"
                >
                  {[...Array(Math.max(item.TQty || 10, 10) + 1).keys()].map((q) => (
                    <option key={q} value={q}>
                      {q === 0 ? "Select Qty" : q}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="button-group">
              <button 
                onClick={handleAddToCart}
                className="btn btn-add-to-cart"
                disabled={item.TQty === 0}
              >
                {CART_BUTTON}
              </button>
              <button 
                onClick={handleBuyNow}
                className="btn btn-buy-now"
                disabled={item.TQty === 0}
              >
                {BUY_NOW_TITLE}
              </button>
              <button
                className="btn-favorite"
                onClick={() => setIsFavorite(!isFavorite)}
                title="Add to Wishlist"
              >
                {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </button>
            </div>

            <div className="delivery-info">
              <h4>Delivery & Returns</h4>
              <ul>
                <li>✓ FREE Delivery on orders over ₹500</li>
                <li>✓ 30-day easy returns</li>
                <li>✓ Authentic & guaranteed</li>
                <li>✓ Secure checkout</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="item-description">
          <h3>Product Details</h3>
          <p>
            {item.description || "High quality product with excellent features. Perfect for everyday use with guaranteed authenticity and reliability."}
          </p>
        </div>

        <div className="item-highlights">
          <h3>Highlights</h3>
          <ul>
            <li>Premium Quality Material</li>
            <li>Durable & Long-lasting</li>
            <li>Easy to Use</li>
            <li>Great Value for Money</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
