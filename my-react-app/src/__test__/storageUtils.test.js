import {
  getUserByEmailOrPhone,
  updateUserProfile,
  addPaymentMethod,
  addAddress,
  addOrder,
  resetPassword,
  logout,
  isUserLoggedIn,
  getCurrentUserEmail,
} from "../amazon/storageUtils";

describe("storageUtils", () => {
  const mockUser = {
    userId: "USER_123",
    fullName: "Test User",
    email: "test@example.com",
    password: "testpass",
    phone: "9876543210",
    createdAt: "2024-01-01T00:00:00Z",
    profile: {
      firstName: "Test",
      lastName: "User",
      email: "test@example.com",
      phone: "9876543210",
      address: "123 Main St",
      city: "Test City",
      state: "TS",
      zipCode: "12345",
    },
    paymentDetails: [],
    addresses: [],
    orders: [],
  };

  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
    sessionStorage.clear();
  });

  describe("getUserByEmailOrPhone", () => {
    it("should retrieve user by email when user exists", () => {
      const allUsers = {
        "test@example.com": mockUser,
      };
      localStorage.setItem("allUsers", JSON.stringify(allUsers));

      const result = getUserByEmailOrPhone("test@example.com");
      expect(result).toEqual(mockUser);
    });

    it("should retrieve user by phone when user exists", () => {
      const allUsers = {
        "9876543210": mockUser,
      };
      localStorage.setItem("allUsers", JSON.stringify(allUsers));

      const result = getUserByEmailOrPhone("9876543210");
      expect(result).toEqual(mockUser);
    });

    it("should return undefined when user does not exist", () => {
      localStorage.setItem("allUsers", JSON.stringify({}));

      const result = getUserByEmailOrPhone("nonexistent@example.com");
      expect(result).toBeUndefined();
    });

    it("should return undefined when localStorage is empty", () => {
      const result = getUserByEmailOrPhone("test@example.com");
      expect(result).toBeUndefined();
    });

    it("should handle multiple users in localStorage", () => {
      const allUsers = {
        "test1@example.com": { ...mockUser, userId: "USER_1" },
        "test2@example.com": { ...mockUser, userId: "USER_2" },
      };
      localStorage.setItem("allUsers", JSON.stringify(allUsers));

      expect(getUserByEmailOrPhone("test1@example.com")).toEqual({
        ...mockUser,
        userId: "USER_1",
      });
      expect(getUserByEmailOrPhone("test2@example.com")).toEqual({
        ...mockUser,
        userId: "USER_2",
      });
    });
  });

  describe("updateUserProfile", () => {
    it("should update user profile when user exists", () => {
      localStorage.setItem(
        "allUsers",
        JSON.stringify({ "test@example.com": mockUser })
      );

      const updatedProfile = {
        firstName: "Updated",
        lastName: "Name",
        email: "test@example.com",
        phone: "1234567890",
        address: "456 Oak St",
        city: "New City",
        state: "NS",
        zipCode: "54321",
      };

      const result = updateUserProfile("test@example.com", updatedProfile);
      expect(result).toBe(true);

      const storedUser = JSON.parse(localStorage.getItem("allUsers"))[
        "test@example.com"
      ];
      expect(storedUser.profile).toEqual(updatedProfile);
    });

    it("should return false when user does not exist", () => {
      localStorage.setItem("allUsers", JSON.stringify({}));

      const result = updateUserProfile("test@example.com", {});
      expect(result).toBe(false);
    });

    it("should only update profile, not other fields", () => {
      localStorage.setItem(
        "allUsers",
        JSON.stringify({ "test@example.com": mockUser })
      );

      const newProfile = { firstName: "NewFirst", lastName: "NewLast" };
      updateUserProfile("test@example.com", newProfile);

      const storedUser = JSON.parse(localStorage.getItem("allUsers"))[
        "test@example.com"
      ];
      expect(storedUser.userId).toBe(mockUser.userId); // Should remain unchanged
      expect(storedUser.profile).toEqual(newProfile);
    });
  });

  describe("addPaymentMethod", () => {
    it("should add payment method when user exists", () => {
      localStorage.setItem(
        "allUsers",
        JSON.stringify({ "test@example.com": mockUser })
      );

      const cardData = {
        cardType: "Visa",
        cardNumber: "1234567890123456",
        expiryDate: "12/25",
        cardholderName: "Test User",
      };

      const result = addPaymentMethod("test@example.com", cardData);
      expect(result).toBe(true);

      const storedUser = JSON.parse(localStorage.getItem("allUsers"))[
        "test@example.com"
      ];
      expect(storedUser.paymentDetails.length).toBe(1);
      expect(storedUser.paymentDetails[0].cardType).toBe("Visa");
      expect(storedUser.paymentDetails[0].isDefault).toBe(false);
      expect(storedUser.paymentDetails[0].id).toMatch(/^CARD_/);
    });

    it("should return false when user does not exist", () => {
      localStorage.setItem("allUsers", JSON.stringify({}));

      const result = addPaymentMethod("test@example.com", {});
      expect(result).toBe(false);
    });

    it("should add multiple payment methods", () => {
      localStorage.setItem(
        "allUsers",
        JSON.stringify({ "test@example.com": mockUser })
      );

      const card1 = {
        cardType: "Visa",
        cardNumber: "1111111111111111",
        expiryDate: "12/25",
        cardholderName: "Test User",
      };
      const card2 = {
        cardType: "MasterCard",
        cardNumber: "2222222222222222",
        expiryDate: "06/26",
        cardholderName: "Test User",
      };

      addPaymentMethod("test@example.com", card1);
      addPaymentMethod("test@example.com", card2);

      const storedUser = JSON.parse(localStorage.getItem("allUsers"))[
        "test@example.com"
      ];
      expect(storedUser.paymentDetails.length).toBe(2);
      expect(storedUser.paymentDetails[0].cardType).toBe("Visa");
      expect(storedUser.paymentDetails[1].cardType).toBe("MasterCard");
    });
  });

  describe("addAddress", () => {
    it("should add address when user exists", () => {
      localStorage.setItem(
        "allUsers",
        JSON.stringify({ "test@example.com": mockUser })
      );

      const addressData = {
        street: "123 Main St",
        city: "TestCity",
        state: "TS",
        zipCode: "12345",
        isDefault: false,
      };

      const result = addAddress("test@example.com", addressData);
      expect(result).toBe(true);

      const storedUser = JSON.parse(localStorage.getItem("allUsers"))[
        "test@example.com"
      ];
      expect(storedUser.addresses.length).toBe(1);
      expect(storedUser.addresses[0].street).toBe("123 Main St");
      expect(storedUser.addresses[0].id).toMatch(/^ADDR_/);
    });

    it("should return false when user does not exist", () => {
      localStorage.setItem("allUsers", JSON.stringify({}));

      const result = addAddress("test@example.com", {});
      expect(result).toBe(false);
    });

    it("should add multiple addresses", () => {
      localStorage.setItem(
        "allUsers",
        JSON.stringify({ "test@example.com": mockUser })
      );

      const addr1 = {
        street: "123 Main St",
        city: "City1",
        state: "ST",
        zipCode: "12345",
      };
      const addr2 = {
        street: "456 Oak Ave",
        city: "City2",
        state: "ST",
        zipCode: "54321",
      };

      addAddress("test@example.com", addr1);
      addAddress("test@example.com", addr2);

      const storedUser = JSON.parse(localStorage.getItem("allUsers"))[
        "test@example.com"
      ];
      expect(storedUser.addresses.length).toBe(2);
      expect(storedUser.addresses[0].street).toBe("123 Main St");
      expect(storedUser.addresses[1].street).toBe("456 Oak Ave");
    });
  });

  describe("addOrder", () => {
    it("should add order when user exists", () => {
      localStorage.setItem(
        "allUsers",
        JSON.stringify({ "test@example.com": mockUser })
      );

      const orderData = {
        items: ["item1", "item2"],
        total: 1000,
        status: "pending",
      };

      const result = addOrder("test@example.com", orderData);
      expect(result).toBe(true);

      const storedUser = JSON.parse(localStorage.getItem("allUsers"))[
        "test@example.com"
      ];
      expect(storedUser.orders.length).toBe(1);
      expect(storedUser.orders[0].items).toEqual(["item1", "item2"]);
      expect(storedUser.orders[0].total).toBe(1000);
      expect(storedUser.orders[0].id).toMatch(/^ORD_/);
      expect(storedUser.orders[0].date).toBeDefined();
    });

    it("should return false when user does not exist", () => {
      localStorage.setItem("allUsers", JSON.stringify({}));

      const result = addOrder("test@example.com", {});
      expect(result).toBe(false);
    });

    it("should set order date automatically", () => {
      localStorage.setItem(
        "allUsers",
        JSON.stringify({ "test@example.com": mockUser })
      );

      const beforeTime = new Date();
      addOrder("test@example.com", { items: ["item1"] });
      const afterTime = new Date();

      const storedUser = JSON.parse(localStorage.getItem("allUsers"))[
        "test@example.com"
      ];
      const orderDate = new Date(storedUser.orders[0].date);

      expect(orderDate.getTime()).toBeGreaterThanOrEqual(beforeTime.getTime());
      expect(orderDate.getTime()).toBeLessThanOrEqual(afterTime.getTime());
    });

    it("should add multiple orders", () => {
      localStorage.setItem(
        "allUsers",
        JSON.stringify({ "test@example.com": mockUser })
      );

      addOrder("test@example.com", { items: ["item1"], total: 100 });
      addOrder("test@example.com", { items: ["item2"], total: 200 });
      addOrder("test@example.com", { items: ["item3"], total: 300 });

      const storedUser = JSON.parse(localStorage.getItem("allUsers"))[
        "test@example.com"
      ];
      expect(storedUser.orders.length).toBe(3);
      expect(storedUser.orders[0].total).toBe(100);
      expect(storedUser.orders[1].total).toBe(200);
      expect(storedUser.orders[2].total).toBe(300);
    });
  });

  describe("resetPassword", () => {
    it("should reset password by email when user exists", () => {
      const userWithPassword = { ...mockUser, password: "oldPassword" };
      localStorage.setItem(
        "allUsers",
        JSON.stringify({ "test@example.com": userWithPassword })
      );

      const result = resetPassword("test@example.com", "newPassword");
      expect(result).toBe(true);

      const storedUser = JSON.parse(localStorage.getItem("allUsers"))[
        "test@example.com"
      ];
      expect(storedUser.password).toBe("newPassword");
    });

    it("should reset password by phone when user exists", () => {
      const userWithPassword = { ...mockUser, password: "oldPassword" };
      localStorage.setItem(
        "allUsers",
        JSON.stringify({ "9876543210": userWithPassword })
      );

      const result = resetPassword("9876543210", "newPassword");
      expect(result).toBe(true);

      const storedUser = JSON.parse(localStorage.getItem("allUsers"))[
        "9876543210"
      ];
      expect(storedUser.password).toBe("newPassword");
    });

    it("should return false when user does not exist", () => {
      localStorage.setItem("allUsers", JSON.stringify({}));

      const result = resetPassword("test@example.com", "newPassword");
      expect(result).toBe(false);
    });

    it("should not affect other user data", () => {
      const userWithPassword = {
        ...mockUser,
        password: "oldPassword",
        userId: "USER_123",
      };
      localStorage.setItem(
        "allUsers",
        JSON.stringify({ "test@example.com": userWithPassword })
      );

      resetPassword("test@example.com", "newPassword");

      const storedUser = JSON.parse(localStorage.getItem("allUsers"))[
        "test@example.com"
      ];
      expect(storedUser.userId).toBe("USER_123");
      expect(storedUser.email).toBe("test@example.com");
      expect(storedUser.password).toBe("newPassword");
    });
  });

  describe("logout", () => {
    it("should clear sessionStorage", () => {
      sessionStorage.setItem("userEmail", "test@example.com");
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("userName", "Test User");

      logout();

      expect(sessionStorage.getItem("userEmail")).toBeNull();
      expect(sessionStorage.getItem("isLoggedIn")).toBeNull();
      expect(sessionStorage.getItem("userName")).toBeNull();
    });

    it("should not affect localStorage", () => {
      localStorage.setItem("testKey", "testValue");
      sessionStorage.setItem("sessionKey", "sessionValue");

      logout();

      expect(localStorage.getItem("testKey")).toBe("testValue");
      expect(sessionStorage.getItem("sessionKey")).toBeNull();
    });

    it("should handle empty sessionStorage", () => {
      expect(() => {
        logout();
      }).not.toThrow();

      expect(sessionStorage.length).toBe(0);
    });
  });

  describe("isUserLoggedIn", () => {
    it("should return true when isLoggedIn is set to true", () => {
      sessionStorage.setItem("isLoggedIn", "true");

      const result = isUserLoggedIn();
      expect(result).toBe(true);
    });

    it("should return false when isLoggedIn is set to false", () => {
      sessionStorage.setItem("isLoggedIn", "false");

      const result = isUserLoggedIn();
      expect(result).toBe(false);
    });

    it("should return false when isLoggedIn is not set", () => {
      const result = isUserLoggedIn();
      expect(result).toBe(false);
    });

    it("should return false when isLoggedIn is set to other values", () => {
      sessionStorage.setItem("isLoggedIn", "yes");

      const result = isUserLoggedIn();
      expect(result).toBe(false);
    });

    it("should be case-sensitive for true value", () => {
      sessionStorage.setItem("isLoggedIn", "True");

      const result = isUserLoggedIn();
      expect(result).toBe(false);
    });
  });

  describe("getCurrentUserEmail", () => {
    it("should return email when set in sessionStorage", () => {
      sessionStorage.setItem("userEmail", "test@example.com");

      const result = getCurrentUserEmail();
      expect(result).toBe("test@example.com");
    });

    it("should return null when userEmail is not set", () => {
      const result = getCurrentUserEmail();
      expect(result).toBeNull();
    });

    it("should return the current stored email", () => {
      sessionStorage.setItem("userEmail", "first@example.com");
      let result = getCurrentUserEmail();
      expect(result).toBe("first@example.com");

      sessionStorage.setItem("userEmail", "second@example.com");
      result = getCurrentUserEmail();
      expect(result).toBe("second@example.com");
    });

    it("should handle email with special characters", () => {
      const specialEmail = "user+test.name@example.co.uk";
      sessionStorage.setItem("userEmail", specialEmail);

      const result = getCurrentUserEmail();
      expect(result).toBe(specialEmail);
    });
  });

  describe("Integration Tests", () => {
    it("should handle complete user registration flow", () => {
      const allUsers = {};
      localStorage.setItem("allUsers", JSON.stringify(allUsers));

      // Add new user
      const newUser = {
        ...mockUser,
        paymentDetails: [],
        addresses: [],
        orders: [],
      };
      const allUsersData = JSON.parse(localStorage.getItem("allUsers"));
      allUsersData["test@example.com"] = newUser;
      localStorage.setItem("allUsers", JSON.stringify(allUsersData));

      // Retrieve user
      const retrievedUser = getUserByEmailOrPhone("test@example.com");
      expect(retrievedUser).toEqual(newUser);

      // Add address
      addAddress("test@example.com", {
        street: "123 Main",
        city: "Test",
      });

      // Add payment
      addPaymentMethod("test@example.com", {
        cardType: "Visa",
        cardNumber: "1234",
      });

      // Verify additions
      const updatedUser = getUserByEmailOrPhone("test@example.com");
      expect(updatedUser.addresses.length).toBe(1);
      expect(updatedUser.paymentDetails.length).toBe(1);
    });

    it("should handle login and logout flow", () => {
      // Login
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("userEmail", "test@example.com");

      expect(isUserLoggedIn()).toBe(true);
      expect(getCurrentUserEmail()).toBe("test@example.com");

      // Logout
      logout();

      expect(isUserLoggedIn()).toBe(false);
      expect(getCurrentUserEmail()).toBeNull();
    });
  });
});
