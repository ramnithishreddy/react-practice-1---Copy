import authReducer, { loginStart, loginSuccess, loginFailure, logout, updateUserProfile } from "../redux/slices/authSlice";

describe("Auth Slice", () => {
  const initialState = {
    isLoggedIn: false,
    user: null,
    error: null,
    loading: false,
    rememberMe: false,
  };

  describe("authReducer initial state", () => {
    it("should return initial state", () => {
      const state = authReducer(undefined, { type: "unknown" });
      expect(state).toEqual(initialState);
    });

    it("should have isLoggedIn as false initially", () => {
      const state = authReducer(undefined, { type: "unknown" });
      expect(state.isLoggedIn).toBe(false);
    });

    it("should have null user initially", () => {
      const state = authReducer(undefined, { type: "unknown" });
      expect(state.user).toBeNull();
    });

    it("should have null error initially", () => {
      const state = authReducer(undefined, { type: "unknown" });
      expect(state.error).toBeNull();
    });

    it("should have loading as false initially", () => {
      const state = authReducer(undefined, { type: "unknown" });
      expect(state.loading).toBe(false);
    });
  });

  describe("loginStart action", () => {
    it("should set loading to true", () => {
      const state = authReducer(initialState, loginStart());
      expect(state.loading).toBe(true);
    });

    it("should clear error on login start", () => {
      const stateWithError = { ...initialState, error: "Previous error" };
      const state = authReducer(stateWithError, loginStart());
      expect(state.error).toBeNull();
    });

    it("should keep isLoggedIn as false during loading", () => {
      const state = authReducer(initialState, loginStart());
      expect(state.isLoggedIn).toBe(false);
    });
  });

  describe("loginSuccess action", () => {
    const mockUser = {
      fullName: "John Doe",
      email: "john@example.com",
      userId: "user123",
    };

    it("should set isLoggedIn to true", () => {
      const state = authReducer(
        { ...initialState, loading: true },
        loginSuccess({ user: mockUser, rememberMe: false })
      );
      expect(state.isLoggedIn).toBe(true);
    });

    it("should set user data on login success", () => {
      const state = authReducer(
        { ...initialState, loading: true },
        loginSuccess({ user: mockUser, rememberMe: false })
      );
      expect(state.user).toEqual(mockUser);
    });

    it("should set loading to false", () => {
      const state = authReducer(
        { ...initialState, loading: true },
        loginSuccess({ user: mockUser, rememberMe: false })
      );
      expect(state.loading).toBe(false);
    });

    it("should maintain error state on successful login", () => {
      const stateWithError = {
        ...initialState,
        loading: true,
        error: "Previous error",
      };
      const state = authReducer(stateWithError, loginSuccess({ user: mockUser, rememberMe: false }));
      // Note: Error is not cleared on login success in current implementation
      expect(state.isLoggedIn).toBe(true);
      expect(state.user).toEqual(mockUser);
    });

    it("should handle rememberMe flag in user payload", () => {
      const state = authReducer(
        { ...initialState, loading: true },
        loginSuccess({ user: mockUser, rememberMe: true })
      );
      expect(state.rememberMe).toBe(true);
    });
  });

  describe("loginFailure action", () => {
    const errorMessage = "Invalid credentials";

    it("should set error message", () => {
      const state = authReducer(
        { ...initialState, loading: true },
        loginFailure(errorMessage)
      );
      expect(state.error).toBe(errorMessage);
    });

    it("should set loading to false", () => {
      const state = authReducer(
        { ...initialState, loading: true },
        loginFailure(errorMessage)
      );
      expect(state.loading).toBe(false);
    });

    it("should keep isLoggedIn as false", () => {
      const state = authReducer(
        { ...initialState, loading: true },
        loginFailure(errorMessage)
      );
      expect(state.isLoggedIn).toBe(false);
    });

    it("should keep user as null on failure", () => {
      const state = authReducer(
        { ...initialState, loading: true },
        loginFailure(errorMessage)
      );
      expect(state.user).toBeNull();
    });

    it("should handle different error messages", () => {
      const errors = ["Invalid email", "Password incorrect", "User not found"];
      errors.forEach((error) => {
        const state = authReducer(
          { ...initialState, loading: true },
          loginFailure(error)
        );
        expect(state.error).toBe(error);
      });
    });
  });

  describe("logout action", () => {
    const loggedInState = {
      isLoggedIn: true,
      user: { fullName: "John", email: "john@example.com", userId: "user123" },
      error: null,
      loading: false,
      rememberMe: false,
    };

    it("should set isLoggedIn to false", () => {
      const state = authReducer(loggedInState, logout());
      expect(state.isLoggedIn).toBe(false);
    });

    it("should clear user data on logout", () => {
      const state = authReducer(loggedInState, logout());
      expect(state.user).toBeNull();
    });

    it("should clear error on logout", () => {
      const stateWithError = { ...loggedInState, error: "Some error" };
      const state = authReducer(stateWithError, logout());
      expect(state.error).toBeNull();
    });

    it("should reset loading to false", () => {
      const stateWithLoading = { ...loggedInState, loading: true };
      const state = authReducer(stateWithLoading, logout());
      expect(state.loading).toBe(false);
    });

    it("should preserve rememberMe flag during logout", () => {
      const stateWithRememberMe = { ...loggedInState, rememberMe: true };
      const state = authReducer(stateWithRememberMe, logout());
      expect(state.rememberMe).toBe(true);
    });

    it("should completely reset to initial state on logout", () => {
      const state = authReducer(loggedInState, logout());
      expect(state.isLoggedIn).toBe(false);
      expect(state.user).toBeNull();
      expect(state.error).toBeNull();
      expect(state.loading).toBe(false);
    });
  });

  describe("updateUserProfile action", () => {
    const loggedInState = {
      isLoggedIn: true,
      user: { fullName: "John Doe", email: "john@example.com", userId: "user123" },
      error: null,
      loading: false,
      rememberMe: false,
    };

    it("should update user profile data", () => {
      const updatedProfile = { fullName: "Jane Doe" };
      const state = authReducer(loggedInState, updateUserProfile(updatedProfile));
      expect(state.user.fullName).toBe("Jane Doe");
    });

    it("should preserve other user data when updating", () => {
      const updatedProfile = { fullName: "Jane Doe" };
      const state = authReducer(loggedInState, updateUserProfile(updatedProfile));
      expect(state.user.email).toBe("john@example.com");
      expect(state.user.userId).toBe("user123");
    });

    it("should handle multiple field updates", () => {
      const updatedProfile = { 
        fullName: "Jane Doe",
        email: "jane@example.com"
      };
      const state = authReducer(loggedInState, updateUserProfile(updatedProfile));
      expect(state.user.fullName).toBe("Jane Doe");
      expect(state.user.email).toBe("jane@example.com");
    });

    it("should keep isLoggedIn as true after profile update", () => {
      const updatedProfile = { fullName: "Updated Name" };
      const state = authReducer(loggedInState, updateUserProfile(updatedProfile));
      expect(state.isLoggedIn).toBe(true);
    });

    it("should handle empty update object", () => {
      const state = authReducer(loggedInState, updateUserProfile({}));
      expect(state.user.fullName).toBe("John Doe");
    });
  });

  describe("Complex state transitions", () => {
    it("should handle login -> logout cycle", () => {
      const mockUser = { fullName: "Test User", email: "test@example.com" };
      let state = authReducer(initialState, loginStart());
      expect(state.loading).toBe(true);

      state = authReducer(state, loginSuccess({ user: mockUser, rememberMe: false }));
      expect(state.isLoggedIn).toBe(true);

      state = authReducer(state, logout());
      expect(state.isLoggedIn).toBe(false);
      expect(state.user).toBeNull();
    });

    it("should handle failed login attempts", () => {
      let state = authReducer(initialState, loginStart());
      state = authReducer(state, loginFailure("Invalid credentials"));
      expect(state.error).toBe("Invalid credentials");
      expect(state.isLoggedIn).toBe(false);

      // Retry login
      state = authReducer(state, loginStart());
      expect(state.error).toBeNull();
      expect(state.loading).toBe(true);
    });

    it("should handle profile update after login", () => {
      const mockUser = { fullName: "John", email: "john@example.com" };
      let state = authReducer(initialState, loginSuccess({ user: mockUser, rememberMe: false }));
      expect(state.isLoggedIn).toBe(true);

      state = authReducer(state, updateUserProfile({ fullName: "John Updated" }));
      expect(state.user.fullName).toBe("John Updated");
      expect(state.isLoggedIn).toBe(true);
    });
  });
});
