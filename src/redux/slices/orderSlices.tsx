import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { OrderItemProps, ShippingAddress } from '../../Pages/MyOrders';

// Interfaces
interface Order {
  id: number;
  createdAt: Date;
  shippingAddress: ShippingAddress;
  orderItems: OrderItemProps[];
  totalPrice?: number;
  isPaid?: boolean;
  [key: string]: any;
}

interface OrderDetails {
  id: string;
  [key: string]: any;
}

interface OrderState {
  orders: Order[];
  totalOrders: number;
  orderDetails: OrderDetails | null;
  loading: boolean;
  error: string | null;
}

// ✅ Async Thunk corrigido - token consistente
export const fetchUserOrders = createAsyncThunk<
  { orders: Order[]; totalOrders: number },
  void,
  { rejectValue: string }
>("order/fetchUserOrders", async (_, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token"); // ✅ Consistente com fetchOrderDetails
    
    if (!token) {
      return rejectWithValue("Token não encontrado");
    }

    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/orders/my-orders`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response.data)
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message || error.response?.data || "Erro na requisição");
    }
    return rejectWithValue(
      error instanceof Error ? error.message : "Erro desconhecido"
    );
  }
});

// ✅ Async Thunk para detalhes do pedido
export const fetchOrderDetails = createAsyncThunk<
  OrderDetails,
  string,
  { rejectValue: string }
>("order/fetchOrderDetails", async (orderId, { rejectWithValue }) => {
  try {
    const token = localStorage.getItem("token");
    
    if (!token) {
      return rejectWithValue("Token não encontrado");
    }

    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/orders/${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message || error.response?.data || "Erro na requisição");
    }
    return rejectWithValue(
      error instanceof Error ? error.message : "Erro desconhecido"
    );
  }
});

const initialState: OrderState = {
  orders: [], // ✅ Sempre array
  totalOrders: 0,
  orderDetails: null,
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    // ✅ Reducers úteis adicionados
    clearOrders: (state) => {
      state.orders = [];
      state.totalOrders = 0;
      state.error = null;
    },
    clearOrderDetails: (state) => {
      state.orderDetails = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ✅ fetchUserOrders cases
      .addCase(fetchUserOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
        // ✅ NÃO limpar orders durante loading - mantém dados existentes
      })
      .addCase(
        fetchUserOrders.fulfilled,
        (state, action: PayloadAction<{ orders: Order[]; totalOrders: number }>) => {
          state.loading = false;
          state.error = null;
          state.orders = action.payload.orders || []; // ✅ Fallback para array vazio
          state.totalOrders = action.payload.totalOrders || 0;
        }
      )
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Erro ao buscar pedidos.";
        // ✅ NÃO limpar orders em caso de erro - mantém dados existentes
      })
      
      // ✅ fetchOrderDetails cases
      .addCase(fetchOrderDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchOrderDetails.fulfilled,
        (state, action: PayloadAction<OrderDetails>) => {
          state.loading = false;
          state.error = null;
          state.orderDetails = action.payload;
        }
      )
      .addCase(fetchOrderDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Erro ao buscar detalhes do pedido.";
        // ✅ orderDetails pode permanecer com dados anteriores ou null
      });
  },
});

export const { clearOrders, clearOrderDetails, clearError } = orderSlice.actions;
export default orderSlice.reducer;