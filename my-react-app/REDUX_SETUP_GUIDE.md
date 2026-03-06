# Redux Implementation Guide for My React App

## Overview
Redux has been successfully integrated into your React e-commerce application. It provides centralized state management for cart, authentication, and product data.

## Directory Structure
```
src/
├── redux/
│   ├── slices/
│   │   ├── cartSlice.js       - Cart and checkout state management
│   │   ├── authSlice.js       - User authentication state
│   │   └── productsSlice.js   - Products and filters state
│   ├── hooks/
│   │   ├── useCart.js         - Custom hook for cart operations
│   │   ├── useAuth.js         - Custom hook for auth operations
│   │   ├── useProducts.js     - Custom hook for products operations
│   │   └── index.js           - Export all hooks
│   └── store.js               - Redux store configuration
└── ... (rest of your app)
```

## Redux Slices & Their Purposes

### 1. Cart Slice (`src/redux/slices/cartSlice.js`)
Manages shopping cart and checkout operations.

**State:**
- `cartItems[]` - Items in the shopping cart
- `checkoutItems[]` - Items being checked out
- `totalAmount` - Total price of items in cart
- `totalQuantity` - Total quantity of items in cart

**Actions:**
```javascript
addToCart(item)               // Add item to cart
removeFromCart(itemId)        // Remove item from cart
updateCartItemQuantity(id, qty) // Update item quantity
clearCart()                   // Clear entire cart
addToCheckout(item)           // Add item to checkout
loadCartFromStorage()         // Restore cart from session storage
```

### 2. Auth Slice (`src/redux/slices/authSlice.js`)
Manages user authentication and profile information.

**State:**
- `isLoggedIn` - Boolean indicating login status
- `user` - User profile object
- `error` - Error message if any
- `loading` - Loading state during auth operations
- `rememberMe` - Remember me preference

**Actions:**
```javascript
loginStart()                  // Start login process
loginSuccess(user, email, rememberMe) // Successful login
loginFailure(error)           // Failed login
logout()                      // Logout user
updateUserProfile(profileData) // Update user info
loadUserFromStorage()         // Restore user from localStorage
```

### 3. Products Slice (`src/redux/slices/productsSlice.js`)
Manages product data, filtering, and sorting.

**State:**
- `allProducts` - All product data from data.json
- `filteredProducts` - Products after applying filters
- `selectedCategory` - Currently selected category
- `searchTerm` - Current search term
- `filters` - Object containing sort, price range, rating filters
- `loading` - Loading state
- `error` - Error message if any

**Actions:**
```javascript
setCategory(category)         // Switch product category
setSearchTerm(term)           // Search products
clearSearch()                 // Clear search
setSortBy(sortOption)         // Sort products
setPriceRange(range)          // Filter by price
setRatingFilter(rating)       // Filter by rating
resetFilters()                // Reset all filters
```

## Custom Hooks (Recommended Usage)

All custom hooks are exported from `src/redux/hooks/index.js`. Import and use them in your components:

### useCart Hook
```javascript
import { useCart } from "../redux/hooks";

const MyComponent = () => {
  const {
    cartItems,
    checkoutItems,
    totalAmount,
    totalQuantity,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    loadCartFromStorage,
  } = useCart();
  
  // Use in component
  return (
    <div>
      <button onClick={() => addToCart(item)}>Add to Cart</button>
      <p>Total: ₹{totalAmount}</p>
      <p>Items: {totalQuantity}</p>
    </div>
  );
};
```

### useAuth Hook
```javascript
import { useAuth } from "../redux/hooks";

const MyComponent = () => {
  const {
    isLoggedIn,
    user,
    error,
    loading,
    loginSuccess,
    logout,
    updateUserProfile,
  } = useAuth();
  
  return (
    <div>
      {isLoggedIn ? (
        <div>Welcome, {user.fullName}!</div>
      ) : (
        <div>Please log in</div>
      )}
    </div>
  );
};
```

### useProducts Hook
```javascript
import { useProducts } from "../redux/hooks";

const MyComponent = () => {
  const {
    filteredProducts,
    selectedCategory,
    filters,
    setCategory,
    setSearchTerm,
    setSortBy,
  } = useProducts();
  
  return (
    <div>
      <select onChange={(e) => setCategory(e.target.value)}>
        <option value="Grocery">Grocery</option>
        <option value="Mobiles">Mobiles</option>
        <option value="Fashion">Fashion</option>
      </select>
    </div>
  );
};
```

## Files Updated for Redux Integration

### Main App Files
- ✅ `src/index.js` - Wrapped with Redux Provider
- ✅ `src/amazon/cart.js` - Uses Redux hooks
- ✅ `src/amazon/nav.js` - Uses Redux cart state
- ✅ `src/amazon/itemDetails.js` - Uses Redux to add to cart
- ✅ `src/amazon/checkout.js` - Uses Redux checkout items
- ✅ `src/amazon/signin.js` - Uses Redux authentication
- ✅ `src/amazon/signup.js` - Uses Redux for user registration
- ✅ `src/amazon/successPage.js` - Uses Redux state
- ✅ `src/amazon/fashion.js` - Removed cartProvider dependency
- ✅ `src/amazon/grocery.js` - Removed cartProvider dependency
- ✅ `src/amazon/mobiles.js` - Removed cartProvider dependency

## How to Use Redux in Your Components

### Example 1: Adding Item to Cart
```javascript
import { useCart } from "../redux/hooks";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  
  const handleAddToCart = () => {
    addToCart({
      ...product,
      Qty: 1,
    });
  };
  
  return <button onClick={handleAddToCart}>Add to Cart</button>;
};
```

### Example 2: Displaying Cart Count
```javascript
import { useCart } from "../redux/hooks";

const Header = () => {
  const { totalQuantity } = useCart();
  
  return <span className="cart-count">{totalQuantity}</span>;
};
```

### Example 3: Checking User Authentication
```javascript
import { useAuth } from "../redux/hooks";

const ProtectedRoute = () => {
  const { isLoggedIn, user } = useAuth();
  
  if (!isLoggedIn) return <div>Please log in</div>;
  
  return <div>Welcome, {user.fullName}</div>;
};
```

## State Persistence

- **Cart Data**: Automatically saved to `sessionStorage` and restored on refresh
- **User Data**: Automatically saved to `localStorage` and restored on app load
- **Remembered Email**: Saves email if user checks "Remember Me" during sign-in

## Performance Optimization Tips

1. **Use Selectors**: Access only the state you need
   ```javascript
   const { cartItems } = useCart(); // Only subscribe to cartItems changes
   ```

2. **Memoize Components**: Use React.memo for frequently re-rendering components
   ```javascript
   export default React.memo(ProductCard);
   ```

3. **Split Redux Slices**: Consider splitting products into more granular slices if the app grows

## Testing Redux with React Testing Library

Redux state can be tested by providing a mock store or using real Redux in tests:

```javascript
import { Provider } from "react-redux";
import store from "../redux/store";

describe("Cart Component", () => {
  it("displays cart items", () => {
    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );
    // Assertions...
  });
});
```

## Migration Notes

The app has been migrated from Context API (CartProvider) to Redux:
- All state management is now centralized in Redux
- Session storage is still used for persistence
- Local state remains in components where it makes sense
- Old CartProvider is still in the codebase but no longer used

## Future Enhancements

Consider these additions:
1. **Async Thunks**: For API calls (fetch products, verify payment)
2. **Redux Middleware**: For logging or analytics
3. **Normalization**: For better data structure as the app grows
4. **Selectors**: Using reselect library for memoized selectors
5. **Error Handling**: More comprehensive error state management
6. **Notifications**: Toast/alert state management

## Troubleshooting

### Issue: Components not updating after Redux actions
**Solution**: Ensure you're calling the hook action, not importing the action directly
```javascript
// ❌ Wrong
import { addToCart } from "../redux/slices/cartSlice";
addToCart(item);

// ✅ Correct
import { useCart } from "../redux/hooks";
const { addToCart } = useCart();
addToCart(item);
```

### Issue: Session data not persisting
**Solution**: Make sure your browser allows session storage and check browser dev tools

### Issue: useCart hook not updating UI
**Solution**: Verify that component is wrapped with Redux Provider in index.js

## Support & Resources

- [Redux Documentation](https://redux.js.org/)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [React-Redux Hooks API](https://react-redux.js.org/api/hooks)
