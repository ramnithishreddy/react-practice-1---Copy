/**
 * LocalStorage & SessionStorage Data Structure Documentation
 * 
 * This file documents how user data is stored in localStorage and sessionStorage
 * throughout the Amazon Clone application.
 */

/**
 * LOCALSTORAGE STRUCTURE
 * =======================
 * 
 * 1. allUsers (Object)
 *    - Key: 'allUsers'
 *    - Structure: Object with email/phone as keys mapping to user objects
 *    
 *    Example:
 *    {
 *      "user@example.com": { ...userData },
 *      "9876543210": { ...userData }
 *    }
 * 
 * User Object Structure:
 * {
 *   userId: string (unique identifier, format: "USER_timestamp"),
 *   fullName: string,
 *   email: string,
 *   password: string (encrypted in production),
 *   phone: string (10-digit Indian number),
 *   createdAt: ISO timestamp string,
 *   
 *   profile: {
 *     firstName: string,
 *     lastName: string,
 *     email: string,
 *     phone: string,
 *     address: string,
 *     city: string,
 *     state: string,
 *     zipCode: string
 *   },
 *   
 *   paymentDetails: [
 *     {
 *       id: string (format: "CARD_timestamp"),
 *       cardType: string (Visa, MasterCard, Amex),
 *       cardNumber: string,
 *       expiryDate: string (MM/YY format),
 *       cardholderName: string,
 *       isDefault: boolean
 *     }
 *   ],
 *   
 *   addresses: [
 *     {
 *       id: string (format: "ADDR_timestamp"),
 *       type: string (shipping/billing),
 *       name: string,
 *       phone: string,
 *       street: string,
 *       city: string,
 *       state: string,
 *       zipCode: string,
 *       isDefault: boolean
 *     }
 *   ],
 *   
 *   orders: [
 *     {
 *       id: string,
 *       date: ISO timestamp string,
 *       total: number (in rupees),
 *       status: string (pending/shipped/delivered/cancelled),
 *       items: number,
 *       products: [ { id, name, price, quantity } ]
 *     }
 *   ],
 *   
 *   wishlist: [ productIds ],
 *   
 *   preferences: {
 *     emailNotifications: boolean,
 *     orderUpdates: boolean,
 *     promotionalEmails: boolean
 *   }
 * }
 * 
 * 2. rememberedEmail (String)
 *    - Key: 'rememberedEmail'
 *    - Value: Email address of user who checked "Remember Me"
 *    - Purpose: Pre-fill email field on sign-in page
 */

/**
 * SESSIONSTORAGE STRUCTURE
 * ========================
 * 
 * Session storage is cleared when user closes the browser.
 * Used for temporary session data during the current session.
 * 
 * 1. isLoggedIn (String)
 *    - Key: 'isLoggedIn'
 *    - Value: 'true' or 'false'
 *    - Purpose: Track if user is currently logged in
 * 
 * 2. userEmail (String)
 *    - Key: 'userEmail'
 *    - Value: User's email address
 *    - Purpose: Identifier for current logged-in user
 * 
 * 3. userName (String)
 *    - Key: 'userName'
 *    - Value: User's full name
 *    - Purpose: Display greeting/welcome message
 * 
 * 4. userId (String)
 *    - Key: 'userId'
 *    - Value: Unique user ID
 *    - Purpose: Quick access to user's unique identifier
 * 
 * 5. userProfile (JSON String)
 *    - Key: 'userProfile'
 *    - Value: Stringified complete user object
 *    - Purpose: Full user data available during session
 * 
 * 6. forgotPasswordEmail (String)
 *    - Key: 'forgotPasswordEmail'
 *    - Value: Email/phone entered in forgot password flow
 *    - Purpose: Track which account user is resetting password for
 */

/**
 * USAGE EXAMPLES
 * ==============
 */

// Example 1: Store user during signup
const exampleUser = {
  userId: "USER_1707115234567",
  fullName: "John Doe",
  email: "john@example.com",
  password: "Secure123",
  phone: "9876543210",
  createdAt: "2024-02-05T10:30:34.567Z",
  profile: {
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "9876543210",
    address: "123 Main Street",
    city: "Mumbai",
    state: "Maharashtra",
    zipCode: "400001"
  },
  paymentDetails: [
    {
      id: "CARD_1707115234567",
      cardType: "Visa",
      cardNumber: "4111111111111111",
      expiryDate: "12/25",
      cardholderName: "John Doe",
      isDefault: true
    }
  ],
  addresses: [
    {
      id: "ADDR_1707115234567",
      type: "shipping",
      name: "John Doe",
      phone: "9876543210",
      street: "123 Main Street",
      city: "Mumbai",
      state: "Maharashtra",
      zipCode: "400001",
      isDefault: true
    }
  ],
  orders: [],
  wishlist: [],
  preferences: {
    emailNotifications: true,
    orderUpdates: true,
    promotionalEmails: false
  }
};

// Store in localStorage
const allUsers = JSON.parse(localStorage.getItem("allUsers") || "{}");
allUsers[exampleUser.email] = exampleUser;
allUsers[exampleUser.phone] = exampleUser;
localStorage.setItem("allUsers", JSON.stringify(allUsers));

// Store in sessionStorage after login
sessionStorage.setItem("userEmail", exampleUser.email);
sessionStorage.setItem("userName", exampleUser.fullName);
sessionStorage.setItem("isLoggedIn", "true");
sessionStorage.setItem("userId", exampleUser.userId);
sessionStorage.setItem("userProfile", JSON.stringify(exampleUser));

/**
 * Example 2: Retrieve user during signin
 */
function getUserByEmailOrPhone(emailOrPhone) {
  const allUsers = JSON.parse(localStorage.getItem("allUsers") || "{}");
  return allUsers[emailOrPhone];
}

/**
 * Example 3: Update user profile
 */
function updateUserProfile(email, updatedProfileData) {
  const allUsers = JSON.parse(localStorage.getItem("allUsers") || "{}");
  if (allUsers[email]) {
    allUsers[email].profile = updatedProfileData;
    localStorage.setItem("allUsers", JSON.stringify(allUsers));
    return true;
  }
  return false;
}

/**
 * Example 4: Add payment method
 */
function addPaymentMethod(email, cardData) {
  const allUsers = JSON.parse(localStorage.getItem("allUsers") || "{}");
  if (allUsers[email]) {
    allUsers[email].paymentDetails.push({
      id: `CARD_${Date.now()}`,
      ...cardData,
      isDefault: false
    });
    localStorage.setItem("allUsers", JSON.stringify(allUsers));
    return true;
  }
  return false;
}

/**
 * Example 5: Add address
 */
function addAddress(email, addressData) {
  const allUsers = JSON.parse(localStorage.getItem("allUsers") || "{}");
  if (allUsers[email]) {
    allUsers[email].addresses.push({
      id: `ADDR_${Date.now()}`,
      ...addressData,
      isDefault: false
    });
    localStorage.setItem("allUsers", JSON.stringify(allUsers));
    return true;
  }
  return false;
}

/**
 * Example 6: Add order
 */
function addOrder(email, orderData) {
  const allUsers = JSON.parse(localStorage.getItem("allUsers") || "{}");
  if (allUsers[email]) {
    allUsers[email].orders.push({
      id: `ORD_${Date.now()}`,
      date: new Date().toISOString(),
      ...orderData
    });
    localStorage.setItem("allUsers", JSON.stringify(allUsers));
    return true;
  }
  return false;
}

/**
 * Example 7: Reset password
 */
function resetPassword(emailOrPhone, newPassword) {
  const allUsers = JSON.parse(localStorage.getItem("allUsers") || "{}");
  if (allUsers[emailOrPhone]) {
    allUsers[emailOrPhone].password = newPassword;
    localStorage.setItem("allUsers", JSON.stringify(allUsers));
    return true;
  }
  return false;
}

/**
 * Example 8: Logout (clear session)
 */
function logout() {
  sessionStorage.clear();
}

/**
 * Example 9: Check if user is logged in
 */
function isUserLoggedIn() {
  return sessionStorage.getItem("isLoggedIn") === "true";
}

/**
 * Example 10: Get current user's email
 */
function getCurrentUserEmail() {
  return sessionStorage.getItem("userEmail");
}

/**
 * LOCAL vs SESSION STORAGE DECISION MATRIX
 * ========================================
 * 
 * localStorage:
 * - User credentials (email, phone, password)
 * - User profile information
 * - Addresses and payment methods
 * - Order history
 * - Wishlist
 * - Preferences
 * - Remembered email for auto-fill
 * 
 * sessionStorage:
 * - Current login status
 * - Currently logged-in user's email
 * - Currently logged-in user's name
 * - Currently logged-in user's ID
 * - Full user object for quick access
 * - Forgot password flow email
 * 
 * Why this approach:
 * - localStorage persists across browser sessions (good for user data)
 * - sessionStorage clears when browser closes (good for security)
 * - Session data provides quick access without re-parsing localStorage
 * - Two-key approach (email + phone) for user lookup flexibility
 */

export {
  exampleUser,
  getUserByEmailOrPhone,
  updateUserProfile,
  addPaymentMethod,
  addAddress,
  addOrder,
  resetPassword,
  logout,
  isUserLoggedIn,
  getCurrentUserEmail
};
