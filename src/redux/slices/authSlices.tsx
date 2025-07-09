import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Tipagem para o usuário retornado da API
interface User {
  id: string;
  name: string;
  email: string;
  // adicione outros campos conforme sua API
}

// Tipagem para o estado do slice
interface AuthState {
  user: User | null;
  guestId: string | null;
  loading: boolean;
  error: string | null;
}

// Recupera o user do localStorage
const userFromStorage: User | null = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo") as string)
  : null;

// Corrigindo o problema do guestId (antes tinha loop)
let initialGuestId = localStorage.getItem("guestId");

if (!initialGuestId) {
  initialGuestId = `guest_${new Date().getTime()}`;
  localStorage.setItem("guestId", initialGuestId);
}

// Estado inicial com tipagem
const initialState: AuthState = {
  user: userFromStorage,
  guestId: initialGuestId,
  loading: false,
  error: null,
};

// Tipagem dos dados enviados para login e registro (exemplo)
interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

// Tipagem do erro que queremos capturar no rejectWithValue
interface ErrorResponse {
  message: string;
}

// Async thunk para login do usuário, com tipos explícitos
export const loginUser = createAsyncThunk<
  User,                // tipo de retorno do thunk
  LoginData,           // tipo do argumento que recebe
  { rejectValue: ErrorResponse } // tipo do rejectWithValue
>(
  "auth/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/login`,
        userData
      );
      localStorage.setItem("userInfo", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);
      return response.data.user;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue({
          message: error.response?.data?.message || error.message,
        });
      }
      return rejectWithValue({ message: "Unknown error" });
    }
  }
);

// Async thunk para registro do usuário
export const registerUser = createAsyncThunk<
  User,
  RegisterData,
  { rejectValue: ErrorResponse }
>(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/register`,
        userData
      );
      localStorage.setItem("userInfo", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);
      return response.data.user;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue({
          message: error.response?.data?.message || error.message,
        });
      }
      return rejectWithValue({ message: "Unknown error" });
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.guestId = `guest_${new Date().getTime()}`;
      localStorage.removeItem("userInfo");
      localStorage.removeItem("token");
      localStorage.setItem("guestId", state.guestId);
    },
    generateNewGuestId: (state) => {
      state.guestId = `guest_${new Date().getTime()}`;
      localStorage.setItem("guestId", state.guestId);
    },
  },
  extraReducers: (builder) => {
    builder
      // loginUser
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        // action.payload tem tipo ErrorResponse | undefined
        state.error = action.payload ? action.payload.message : "Failed to login";
      })

      // registerUser
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : "Failed to register";
      });
  },
});

export const { logout, generateNewGuestId } = authSlice.actions;
export default authSlice.reducer;
