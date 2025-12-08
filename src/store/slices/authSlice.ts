import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, Profile } from "../api/merchantApi";

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("authToken"),
  isAuthenticated: !!localStorage.getItem("authToken"),
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.error = null;
      localStorage.setItem("authToken", action.payload.token);
      localStorage.setItem("merchantId", action.payload.user.merchant_id);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem("authToken");
      localStorage.removeItem("merchantId");
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    setProfile: (state, action: PayloadAction<Profile>) => {
      const profile = action.payload;
      // Convert Profile to User format
      const user: User = {
        merchant_id: profile.merchant_id,
        email: profile.email,
        first_name: profile.first_name,
        last_name: profile.last_name,
        full_name: profile.full_name,
        phone: profile.phone,
        wallet_no: profile.wallet_no,
        account_no: profile.account_no,
        account_name: profile.account_name,
        reference: profile.reference,
        bank: profile.bank,
        status: profile.status,
        onedisk_id: profile.onedisk_id,
        onedisk_access_token: profile.onedisk_access_token,
      };
      state.user = user;
      localStorage.setItem("merchantId", user.merchant_id);
    },
  },
});

export const {
  setCredentials,
  logout,
  setLoading,
  setError,
  clearError,
  updateUser,
  setProfile,
} = authSlice.actions;
export default authSlice.reducer;
