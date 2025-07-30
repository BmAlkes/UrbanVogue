import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../../axiosInstance";

// Interfaces
interface CartProduct {
  productId: string;
  name?: string;
  quantity: number;
  price: number;
  size: string;
  color: string;
  image: string;
  totalPrice: number;
}

export interface Cart {
  products: CartProduct[];
  totalPrice: number; // add if needed
}

interface CartState {
  cart: Cart;
  loading: boolean;
  error: string | null;
}

interface FetchCartParams {
  userId?: string;
  guestId?: string;
}

export interface AddToCartParams {
  productId: string;
  quantity?: number;
  size?: string;
  color?: string;
  guestId?: string | null;
  userId?: string;
}

interface MergeCartParams {
  user: any;
  guestId: string;
}

// Helpers
const loadCartFromLocalStorage = (): Cart => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : { products: [], totalPrice: 0 };
};

const saveCartToLocalStorage = (cart: Cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Thunks
export const fetchCart = createAsyncThunk<Cart, FetchCartParams>(
  "cart/fetchCart",
  async ({ userId, guestId }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        {
          params: { userId, guestId },
        }
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || "Unknown Axios error");
      }
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);

export const addToCart = createAsyncThunk<Cart, AddToCartParams>(
  "cart/addToCart",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        params
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || "Unknown Axios error");
      }
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);

export const updateCartItemQuantity = createAsyncThunk<Cart, AddToCartParams>(
  "cart/updateCartItem",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        params
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || "Unknown Axios error");
      }
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);

export const removeFromCart = createAsyncThunk<Cart, AddToCartParams>(
  "cart/removeFromCart",
  async (params, { rejectWithValue }) => {
    try {
      console.log(`${import.meta.env.VITE_BACKEND_URL}/api/cart`);
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        { data: params } // ✅ Configuração como segundo parâmetro
      );

      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || "Unknown Axios error");
      }
      return rejectWithValue(
        error instanceof Error ? error.message : "Unknown error"
      );
    }
  }
);

export const mergeCart = createAsyncThunk<Cart, MergeCartParams>(
  "cart/mergeCart",
  async ({ user, guestId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      const response = await axiosInstance.post(
        "/api/cart",
        { user, guestId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || "Erro desconhecido");
      }
      return rejectWithValue(
        error instanceof Error ? error.message : "Erro inesperado"
      );
    }
  }
);

// Slice
const initialState: CartState = {
  cart: loadCartFromLocalStorage(),
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cart = { products: [], totalPrice: 0 };
      localStorage.removeItem("cart");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action: PayloadAction<Cart>) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToLocalStorage(state.cart);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action: PayloadAction<Cart>) => {
        state.loading = false;
        const products = action.payload.products;

        const totalPrice = products.reduce((sum, product) => {
          return sum + product?.price * product.quantity;
        }, 0);
        state.cart = {
          products,
          totalPrice,
        };

        saveCartToLocalStorage(state.cart);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to add to cart";
      })
      .addCase(updateCartItemQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateCartItemQuantity.fulfilled,
        (state, action: PayloadAction<Cart>) => {
          state.loading = false;
          state.cart = action.payload;
          saveCartToLocalStorage(state.cart);
        }
      )
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Failed to update cart item";
      })
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        removeFromCart.fulfilled,
        (state, action: PayloadAction<Cart>) => {
          state.loading = false;
          state.cart = action.payload;
          saveCartToLocalStorage(state.cart);
        }
      )
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error =
          (action.payload as string) || "Failed to remove from cart";
      })
      .addCase(mergeCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(mergeCart.fulfilled, (state, action: PayloadAction<Cart>) => {
        state.loading = false;
        state.cart = action.payload;
        saveCartToLocalStorage(state.cart);
      })
      .addCase(mergeCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
