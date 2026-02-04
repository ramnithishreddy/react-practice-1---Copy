export const updateItemQuantity = (items, id, newQuantity) => {
  const updatedItems = items.map((item) =>
    item.id === id ? { ...item, Qty: Number(newQuantity) } : item
  );
  return updatedItems;
};

export const decrementOrRemoveItem = (items, id) => {
  const updatedItems = items
    .map((item) =>
      item.id === id ? { ...item, Qty: item.Qty - 1 } : item
    )
    .filter((item) => item.Qty > 0);
  return updatedItems;
};

export const removeItemById = (items, id) =>
  items.filter((item) => item.id !== id);

export const persistToSession = (key, data) => {
  sessionStorage.setItem(key, JSON.stringify(data));
};

export const loadFromSession = (key) =>
  JSON.parse(sessionStorage.getItem(key)) || [];

// New Utility Functions

export const calculateCartTotal = (items) => {
  return items.reduce((total, item) => total + (item.Price * item.Qty), 0);
};

export const calculateDiscount = (items) => {
  return items.reduce((total, item) => {
    const discount = item.Discount || 0;
    return total + (item.Price * item.Qty * discount / 100);
  }, 0);
};

export const calculateTotalItems = (items) => {
  return items.reduce((total, item) => total + item.Qty, 0);
};

export const applyDiscountCode = (total, code) => {
  const discounts = {
    "SAVE10": 0.10,
    "SAVE20": 0.20,
    "WELCOME": 0.15,
    "AMAZON50": 50
  };
  
  if (discounts[code]) {
    const discount = typeof discounts[code] === 'number' && discounts[code] < 1
      ? total * discounts[code]
      : discounts[code];
    return Math.max(0, total - discount);
  }
  return total;
};

export const validateItemQuantity = (quantity, maxQuantity) => {
  const qty = Number(quantity);
  return qty >= 1 && qty <= maxQuantity;
};

export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0
  }).format(price);
};

export const calculateDeliveryDays = (basePrice) => {
  // Prime members: 1-2 days, Regular: 5-7 days
  return basePrice >= 500 ? { min: 1, max: 2 } : { min: 5, max: 7 };
};

export const getItemDiscount = (originalPrice, salePrice) => {
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
};

export const sortItems = (items, sortBy) => {
  const sorted = [...items];
  
  switch(sortBy) {
    case 'low-to-high':
      return sorted.sort((a, b) => a.Price - b.Price);
    case 'high-to-low':
      return sorted.sort((a, b) => b.Price - a.Price);
    case 'rating':
      return sorted.sort((a, b) => (b.Rating || 0) - (a.Rating || 0));
    case 'newest':
      return sorted.reverse();
    default:
      return sorted;
  }
};

export const filterByPriceRange = (items, minPrice, maxPrice) => {
  return items.filter(item => item.Price >= minPrice && item.Price <= maxPrice);
};

export const filterByRating = (items, minRating) => {
  return items.filter(item => (item.Rating || 0) >= minRating);
};

export const getRelatedItems = (items, tags, limit = 4) => {
  return items
    .filter(item => item.Tags?.some(tag => tags.includes(tag)))
    .slice(0, limit);
};

export const clearCart = () => {
  sessionStorage.removeItem('cartItems');
  return [];
};

export const addWishlistItem = (wishlist, item) => {
  const exists = wishlist.some(w => w.id === item.id);
  return exists ? wishlist : [...wishlist, item];
};

export const removeWishlistItem = (wishlist, itemId) => {
  return wishlist.filter(item => item.id !== itemId);
};

export const persistWishlist = (wishlist) => {
  sessionStorage.setItem('wishlist', JSON.stringify(wishlist));
};

export const loadWishlist = () => {
  return JSON.parse(sessionStorage.getItem('wishlist')) || [];
};
  