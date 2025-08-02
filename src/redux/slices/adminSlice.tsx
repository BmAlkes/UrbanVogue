import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Interfaces
interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  [key: string]: any;
}

interface AdminState {
  users: User[];
  loading: boolean;
  error: string | null;
}

interface UpdateUserParams {
  id: string;
  name?: string;
  email?: string;
  role: string;
}

// Fetch all users
export const fetchUsers = createAsyncThunk<User[], void, { rejectValue: string }>(
  "admin/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || "Unknown Axios error");
      }
      return rejectWithValue(error instanceof Error ? error.message : "Unknown error");
    }
  }
);

// Add user
export const addUser = createAsyncThunk<User, Partial<User>, { rejectValue: string }>(
  "admin/addUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users`, userData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || "Unknown Axios error");
      }
      return rejectWithValue(error instanceof Error ? error.message : "Unknown error");
    }
  }
);

// Update user
export const updateUser = createAsyncThunk<User, UpdateUserParams, { rejectValue: string }>(
  "admin/updateUser",
  async ({ id, name, email, role }, { rejectWithValue }) => {
    console.log(id)
    try {
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`,
        { name, email, role },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || "Unknown Axios error");
      }
      return rejectWithValue(error instanceof Error ? error.message : "Unknown error");
    }
  }
);

// Delete user
export const deleteUser = createAsyncThunk<User, string, { rejectValue: string }>(
  "admin/deleteUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/admin/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || "Unknown Axios error");
      }
      return rejectWithValue(error instanceof Error ? error.message : "Unknown error");
    }
  }
);

const initialState: AdminState = {
  users: [],
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Erro ao buscar usuários.";
      })
      .addCase(addUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Erro ao adicionar usuário.";
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        const index = state.users.findIndex((user) => user._id === action.payload._id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Erro ao atualizar usuário.";
      })
      .addCase(deleteUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.loading = false;
        state.users = state.users.filter((user) => user._id !== action.payload._id);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Erro ao excluir usuário.";
      })
      
  },
});

export default adminSlice.reducer;