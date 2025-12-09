import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Use relative paths to go through Vite proxy in development

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const res = await fetch(`/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || "Login failed");
      }

      // Save token
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      // Optionally save user
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      return data; // { token, user }
    } catch (err) {
      return rejectWithValue(err.message || "Network error");
    }
  }
);

// Simple register (adapt if you use OTP)
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetch(`/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || "Registration failed");
      }

      return data; // maybe { message: ... }
    } catch (err) {
      return rejectWithValue(err.message || "Network error");
    }
  }
);

// Dummy OTP thunks (you can wire your real backend here)
export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const res = await fetch(`/auth/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || "OTP verification failed");
      }

      return data;
    } catch (err) {
      return rejectWithValue(err.message || "Network error");
    }
  }
);

export const resendOtp = createAsyncThunk(
  "auth/resendOtp",
  async ({ email }, { rejectWithValue }) => {
    try {
      const res = await fetch(`/auth/resend-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || "Failed to resend OTP");
      }

      return data;
    } catch (err) {
      return rejectWithValue(err.message || "Network error");
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  isAuthenticated: !!localStorage.getItem("token"),
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,

  // OTP related
  showOtpInput: false,
  pendingVerificationEmail: null,
  otpLoading: false,
  otpError: null,

  // Lockout
  isLocked: false,
  lockoutUntil: null,
  loginAttempts: 0,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    clearOtpError(state) {
      state.otpError = null;
    },
    resetOtpState(state) {
      state.showOtpInput = false;
      state.pendingVerificationEmail = null;
      state.otpError = null;
      state.otpLoading = false;
    },
    incrementLoginAttempts(state) {
      state.loginAttempts += 1;
    },
    setLockout(state, action) {
      state.isLocked = true;
      state.lockoutUntil = action.payload;
    },
    checkLockoutStatus(state) {
      if (state.isLocked && state.lockoutUntil) {
        if (new Date() >= new Date(state.lockoutUntil)) {
          state.isLocked = false;
          state.loginAttempts = 0;
          state.lockoutUntil = null;
        }
      }
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    setUser(state, action) {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    updateProfile(state, action) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    updatePreferences(state, action) {
      if (state.user) {
        state.user = { ...state.user, preferences: action.payload };
      }
    },
  },
  extraReducers: (builder) => {
    // LOGIN
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user || null;
        state.loginAttempts = 0;
        state.isLocked = false;
        state.lockoutUntil = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Login failed";
      });

    // REGISTER
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        // Show OTP input after successful registration
        state.showOtpInput = true;
        state.pendingVerificationEmail = action.meta.arg.email;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Registration failed";
      });

    // OTP VERIFY
    builder
      .addCase(verifyOtp.pending, (state) => {
        state.otpLoading = true;
        state.otpError = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.otpLoading = false;
        state.showOtpInput = false;
        state.pendingVerificationEmail = null;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.otpLoading = false;
        state.otpError = action.payload || "OTP verification failed";
      });

    // RESEND OTP
    builder
      .addCase(resendOtp.pending, (state) => {
        state.otpLoading = true;
        state.otpError = null;
      })
      .addCase(resendOtp.fulfilled, (state) => {
        state.otpLoading = false;
      })
      .addCase(resendOtp.rejected, (state, action) => {
        state.otpLoading = false;
        state.otpError = action.payload || "Failed to resend OTP";
      });
  },
});

export const {
  clearError,
  clearOtpError,
  resetOtpState,
  incrementLoginAttempts,
  setLockout,
  checkLockoutStatus,
  logout,
  setUser,
  updateProfile,
  updatePreferences,
} = authSlice.actions;

// Additional action creators that components expect
export const logoutUser = logout;

export default authSlice.reducer;
