import { renderHook, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { useAuth } from "../redux/hooks";
import { createMockStore, createMockStoreWithUser } from "./reduxTestUtils";

describe("useAuth Hook", () => {
  describe("return object structure", () => {
    it("should return auth state properties", () => {
      const store = createMockStore();
      const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
      const { result } = renderHook(() => useAuth(), { wrapper });

      expect(result.current).toHaveProperty("isLoggedIn");
      expect(result.current).toHaveProperty("user");
      expect(result.current).toHaveProperty("error");
      expect(result.current).toHaveProperty("loading");
      expect(result.current).toHaveProperty("rememberMe");
    });

    it("should return auth action functions", () => {
      const store = createMockStore();
      const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
      const { result } = renderHook(() => useAuth(), { wrapper });

      expect(result.current).toHaveProperty("loginStart");
      expect(result.current).toHaveProperty("loginSuccess");
      expect(result.current).toHaveProperty("loginFailure");
      expect(result.current).toHaveProperty("logout");
      expect(result.current).toHaveProperty("setRememberMe");
      expect(result.current).toHaveProperty("loadUserFromStorage");
      expect(result.current).toHaveProperty("clearError");
      expect(result.current).toHaveProperty("updateUserProfile");
    });
  });

  describe("Initial state", () => {
    it("should have isLoggedIn as false initially", () => {
      const store = createMockStore();
      const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
      const { result } = renderHook(() => useAuth(), { wrapper });

      expect(result.current.isLoggedIn).toBe(false);
    });

    it("should have null user initially", () => {
      const store = createMockStore();
      const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
      const { result } = renderHook(() => useAuth(), { wrapper });

      expect(result.current.user).toBeNull();
    });

    it("should have null error initially", () => {
      const store = createMockStore();
      const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
      const { result } = renderHook(() => useAuth(), { wrapper });

      expect(result.current.error).toBeNull();
    });

    it("should have loading as false initially", () => {
      const store = createMockStore();
      const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
      const { result } = renderHook(() => useAuth(), { wrapper });

      expect(result.current.loading).toBe(false);
    });

    it("should have rememberMe as false initially", () => {
      const store = createMockStore();
      const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
      const { result } = renderHook(() => useAuth(), { wrapper });

      expect(result.current.rememberMe).toBe(false);
    });
  });

  describe("Authenticated user state", () => {
    it("should return logged-in user data", () => {
      const userData = {
        fullName: "John Doe",
        email: "john@example.com",
        userId: "user123",
      };
      const store = createMockStoreWithUser(userData);
      const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
      const { result } = renderHook(() => useAuth(), { wrapper });

      expect(result.current.isLoggedIn).toBe(true);
      expect(result.current.user).toEqual(userData);
    });

    it("should preserve user data across hook calls", () => {
      const userData = {
        fullName: "Jane Smith",
        email: "jane@example.com",
      };
      const store = createMockStoreWithUser(userData);
      const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
      const { result, rerender } = renderHook(() => useAuth(), { wrapper });

      const firstCallUser = result.current.user;
      rerender();
      const secondCallUser = result.current.user;

      expect(firstCallUser).toEqual(secondCallUser);
    });
  });

  describe("Actions availability", () => {
    it("should provide loginStart function", () => {
      const store = createMockStore();
      const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
      const { result } = renderHook(() => useAuth(), { wrapper });

      expect(typeof result.current.loginStart).toBe("function");
    });

    it("should provide loginSuccess function", () => {
      const store = createMockStore();
      const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
      const { result } = renderHook(() => useAuth(), { wrapper });

      expect(typeof result.current.loginSuccess).toBe("function");
    });

    it("should provide loginFailure function", () => {
      const store = createMockStore();
      const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
      const { result } = renderHook(() => useAuth(), { wrapper });

      expect(typeof result.current.loginFailure).toBe("function");
    });

    it("should provide logout function", () => {
      const store = createMockStore();
      const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
      const { result } = renderHook(() => useAuth(), { wrapper });

      expect(typeof result.current.logout).toBe("function");
    });

    it("should provide updateUserProfile function", () => {
      const store = createMockStore();
      const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
      const { result } = renderHook(() => useAuth(), { wrapper });

      expect(typeof result.current.updateUserProfile).toBe("function");
    });

    it("should provide setRememberMe function", () => {
      const store = createMockStore();
      const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
      const { result } = renderHook(() => useAuth(), { wrapper });

      expect(typeof result.current.setRememberMe).toBe("function");
    });

    it("should provide clearError function", () => {
      const store = createMockStore();
      const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
      const { result } = renderHook(() => useAuth(), { wrapper });

      expect(typeof result.current.clearError).toBe("function");
    });

    it("should provide loadUserFromStorage function", () => {
      const store = createMockStore();
      const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
      const { result } = renderHook(() => useAuth(), { wrapper });

      expect(typeof result.current.loadUserFromStorage).toBe("function");
    });
  });

  describe("Login actions", () => {
    it("loginStart should be callable", () => {
      const store = createMockStore();
      const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
      const { result } = renderHook(() => useAuth(), { wrapper });

      expect(() => {
        act(() => {
          result.current.loginStart();
        });
      }).not.toThrow();
    });

    it("loginSuccess should be callable with credentials", () => {
      const store = createMockStore();
      const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
      const { result } = renderHook(() => useAuth(), { wrapper });

      const userData = {
        fullName: "Test User",
        email: "test@example.com",
        userId: "test123",
      };

      expect(() => {
        act(() => {
          result.current.loginSuccess(userData, userData.email, false);
        });
      }).not.toThrow();
    });

    it("loginFailure should be callable with error", () => {
      const store = createMockStore();
      const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
      const { result } = renderHook(() => useAuth(), { wrapper });

      expect(() => {
        act(() => {
          result.current.loginFailure("Invalid credentials");
        });
      }).not.toThrow();
    });
  });

  describe("Logout action", () => {
    it("logout should be callable when logged in", () => {
      const store = createMockStoreWithUser({
        fullName: "John",
        email: "john@example.com",
      });
      const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
      const { result } = renderHook(() => useAuth(), { wrapper });

      expect(() => {
        act(() => {
          result.current.logout();
        });
      }).not.toThrow();
    });

    it("logout should be callable when not logged in", () => {
      const store = createMockStore();
      const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
      const { result } = renderHook(() => useAuth(), { wrapper });

      expect(() => {
        act(() => {
          result.current.logout();
        });
      }).not.toThrow();
    });
  });

  describe("UpdateUserProfile action", () => {
    it("should be callable", () => {
      const store = createMockStoreWithUser({
        fullName: "John",
        email: "john@example.com",
      });
      const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
      const { result } = renderHook(() => useAuth(), { wrapper });

      expect(() => {
        act(() => {
          result.current.updateUserProfile({ fullName: "Jane" });
        });
      }).not.toThrow();
    });

    it("should accept profile update object", () => {
      const store = createMockStoreWithUser({
        fullName: "John",
        email: "john@example.com",
      });
      const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
      const { result } = renderHook(() => useAuth(), { wrapper });

      const updates = { fullName: "Updated Name", email: "updated@example.com" };

      expect(() => {
        act(() => {
          result.current.updateUserProfile(updates);
        });
      }).not.toThrow();
    });

    it("should handle single field update", () => {
      const store = createMockStoreWithUser({
        fullName: "John",
        email: "john@example.com",
      });
      const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
      const { result } = renderHook(() => useAuth(), { wrapper });

      expect(() => {
        act(() => {
          result.current.updateUserProfile({ fullName: "NewName" });
        });
      }).not.toThrow();
    });
  });

  describe("RememberMe action", () => {
    it("setRememberMe should be callable", () => {
      const store = createMockStore();
      const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
      const { result } = renderHook(() => useAuth(), { wrapper });

      expect(() => {
        act(() => {
          result.current.setRememberMe(true);
        });
      }).not.toThrow();
    });

    it("setRememberMe should accept boolean values", () => {
      const store = createMockStore();
      const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
      const { result } = renderHook(() => useAuth(), { wrapper });

      expect(() => {
        act(() => {
          result.current.setRememberMe(true);
          result.current.setRememberMe(false);
        });
      }).not.toThrow();
    });
  });

  describe("Error action", () => {
    it("clearError should be callable", () => {
      const store = createMockStore();
      const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
      const { result } = renderHook(() => useAuth(), { wrapper });

      expect(() => {
        act(() => {
          result.current.clearError();
        });
      }).not.toThrow();
    });
  });

  describe("Storage action", () => {
    it("loadUserFromStorage should be callable", () => {
      const store = createMockStore();
      const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
      const { result } = renderHook(() => useAuth(), { wrapper });

      expect(() => {
        act(() => {
          result.current.loadUserFromStorage();
        });
      }).not.toThrow();
    });
  });

  describe("Multiple hook instances", () => {
    it("should return consistent state across multiple instances", () => {
      const store = createMockStoreWithUser({
        fullName: "John",
        email: "john@example.com",
      });
      const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

      const { result: result1 } = renderHook(() => useAuth(), { wrapper });
      const { result: result2 } = renderHook(() => useAuth(), { wrapper });

      expect(result1.current.user).toEqual(result2.current.user);
      expect(result1.current.isLoggedIn).toBe(result2.current.isLoggedIn);
    });

    it("should update all instances when state changes", () => {
      const store = createMockStore();
      const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

      const { result } = renderHook(() => useAuth(), { wrapper });

      expect(result.current.loading).toBe(false);

      act(() => {
        result.current.loginStart();
      });

      expect(result.current.loading).toBe(true);
    });
  });
});
