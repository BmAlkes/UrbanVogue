import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Order {
  _id: string;
  status: string;
  [key: string]: any;
}

interface AdminOrderState {
  orders: Order[];
  totalOrders: number;
  totalSales: number;
  loading: boolean;
  error: string | null;
}

interface UpdateOrderStatusParams {
  id: string;
  status: string;
}

// Fetch all orders (admin only)
export const fecthAllOrders = createAsyncThunk<Order[], void, { rejectValue: string }>(
  "admin/fetchAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/orders`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || 'Unknown Axios error');
      }
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

// Update order delivery status
export const updateOrderStatus = createAsyncThunk<Order, UpdateOrderStatusParams, { rejectValue: string }>(
  "admin/updateOrderStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${id}`, { status }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || 'Unknown Axios error');
      }
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

// Delete an order
export const deleteOrder = createAsyncThunk<Order, string, { rejectValue: string }>(
  "admin/deleteOrder",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/admin/orders/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || 'Unknown Axios error');
      }
      return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
    }
  }
);

const initialState: AdminOrderState = {
  orders: [],
  totalOrders: 0,
  totalSales: 0,
  loading: false,
  error: null,
};

const adminOrderSlice = createSlice({
  name: 'adminOrder',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fecthAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fecthAllOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
        state.loading = false;
        state.orders = action.payload;
        state.totalOrders = action.payload.length;
        state.totalSales = action.payload.reduce((total, order) => total + (order.totalPrice || 0), 0);
        state.error = null;
      })
      .addCase(fecthAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Erro ao buscar pedidos';
      })
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action: PayloadAction<Order>) => {
        state.loading = false;
        const index = state.orders.findIndex(order => order._id === action.payload._id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Erro ao atualizar pedido';
      })
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action: PayloadAction<Order>) => {
        state.loading = false;
        state.orders = state.orders.filter(order => order._id !== action.payload._id);
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Erro ao deletar pedido';
      });
  },
});

export default adminOrderSlice.reducer;