import { useDispatch, useSelector } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  setRememberMe,
  loadUserFromStorage,
  clearError,
  updateUserProfile,
} from "../slices/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const { isLoggedIn, user, error, loading, rememberMe } = useSelector(
    (state) => state.auth
  );

  return {
    isLoggedIn,
    user,
    error,
    loading,
    rememberMe,
    loginStart: () => dispatch(loginStart()),
    loginSuccess: (user, email, rememberMe) =>
      dispatch(loginSuccess({ user, email, rememberMe })),
    loginFailure: (error) => dispatch(loginFailure(error)),
    logout: () => dispatch(logout()),
    setRememberMe: (remember) => dispatch(setRememberMe(remember)),
    loadUserFromStorage: () => dispatch(loadUserFromStorage()),
    clearError: () => dispatch(clearError()),
    updateUserProfile: (profileData) => dispatch(updateUserProfile(profileData)),
  };
};
