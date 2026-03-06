import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: null,
  error: null,
  loading: false,
  rememberMe: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },

    loginSuccess: (state, action) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.rememberMe = action.payload.rememberMe || false;

      // Save user to localStorage
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      if (action.payload.rememberMe && action.payload.email) {
        localStorage.setItem("rememberedEmail", action.payload.email);
      }
    },

    loginFailure: (state, action) => {
      state.loading = false;
      state.isLoggedIn = false;
      state.error = action.payload;
      state.user = null;
    },

    logout: (state) => {
      state.isLoggedIn = false;
      state.user = null;
      state.error = null;
      state.loading = false;
      localStorage.removeItem("user");
      localStorage.removeItem("authToken");
    },

    setRememberMe: (state, action) => {
      state.rememberMe = action.payload;
    },

    loadUserFromStorage: (state) => {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        state.user = JSON.parse(savedUser);
        state.isLoggedIn = true;
      }

      const rememberedEmail = localStorage.getItem("rememberedEmail");
      if (rememberedEmail) {
        state.rememberMe = true;
      }
    },

    clearError: (state) => {
      state.error = null;
    },

    updateUserProfile: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem("user", JSON.stringify(state.user));
      }
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  setRememberMe,
  loadUserFromStorage,
  clearError,
  updateUserProfile,
} = authSlice.actions;

export default authSlice.reducer;
