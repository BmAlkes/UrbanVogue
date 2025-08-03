import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { FilterProps } from "../../components/Products/FilterSideBar";

//Async thunk to fetch products by collection and optional filters
export interface Product {
  _id:string
 name: string;
  price: number;
  sku: string;
  countInStock: number;
  description: string;
  category: string;
  brand: string;
  sizes: string[];
  colors: string[];
  colletion: string;
  material: string;
  gender: string;
  images: Image[];
  totalPrice?: number;
  originalPrice?: number;
}
export interface Image {
  url: string;
}


interface Filters {
  category: string;
  size: string;
  color: string;
  gender: string;
  brand: string;
  minPrice: string;
  maxPrice: string;
  sortBy: string;
  search: string;
  material: string;
  collection: string;
}

interface ProductState {
  products: Product[];
  selectedProduct: Product | null;
  similarProducts: Product[];
  loading: boolean;
  error: string | null;
  filters: Filters;
}
export const fetchProductsByFilters = createAsyncThunk(
  "products/fetchByFilters",
  async ({
    collection,
    size,
    color,
    gender,
    minPrice,
    maxPrice,
    sortBy,
    search,
    category,
    material,
    brand,
    limit,
  }: FilterProps) => {
    const query = new URLSearchParams();

    if (collection) query.append("collection", collection as string);
    if (size && size.length) size.forEach((s) => query.append("size", s));
    if (gender) query.append("gender", gender);
    if (color) query.append("color", color);
    if (minPrice !== undefined) query.append("minPrice", String(minPrice));
    if (maxPrice !== undefined) query.append("maxPrice", String(maxPrice));
    if (sortBy) query.append("sortBy", sortBy as string);
    if (search) query.append("search", search as string);
    if (category) query.append("category", category);
    if (material && material.length)
      material.forEach((m) => query.append("material", m));
    if (brand && brand.length) brand.forEach((b) => query.append("brand", b));
    if (limit !== undefined) query.append("limit", String(limit));

    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/products?${query.toString()}`
    );
    return response.data;
  }
);

//Async thunk to fetch product details by ID
export const fecthProductDetails = createAsyncThunk(
  "products/fetchProductsDetails",
  async (id: string) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`
    );
    return response.data;
  }
);

//Async thunk to update product details
// redux/slices/productSlices.ts

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, productData }: { id: string; productData:any}) => {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,
      productData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  }
);


// async thunk to get similar products
export const fetchSimilarProducts = createAsyncThunk(
  "products/fetchSimilarProducts",
  async (id: string) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/products/similar/${id}`
    );
    return response.data;
  }
);
const initialState: ProductState = {
  products: [],
  selectedProduct: null,
  similarProducts: [],
  loading: false,
  error: null,
  filters: {
    category: "",
    size: "",
    color: "",
    gender: "",
    brand: "",
    minPrice: "",
    maxPrice: "",
    sortBy: "",
    search: "",
    material: "",
    collection: "",
  },
};
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },
    clearFilters: (state) => {
      state.filters = {
        category: "",
        size: "",
        color: "",
        gender: "",
        brand: "",
        minPrice: "",
        maxPrice: "",
        sortBy: "",
        search: "",
        material: "",
        collection: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByFilters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByFilters.fulfilled, (state, action) => {
        state.loading = false;
        state.products = Array.isArray(action.payload) ? action.payload : [];
        state.error = null;
      })
      .addCase(fetchProductsByFilters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch products";
      })
      //handle fetching single product details
      .addCase(fecthProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fecthProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fecthProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch product details";
      })
      //handle updating product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        const updatedProduct = action.payload;
        const index = state.products.findIndex(
          (product) => product._id === updatedProduct._id
        );
        if (index !== -1) {
          state.products[index] = updatedProduct;
        }
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to update product";
      })
      .addCase(fetchSimilarProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.similarProducts = action.payload;
      })
      .addCase(fetchSimilarProducts.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ?? "Failed to fetch similar products";
      });
  },
});

export const { setFilters, clearFilters } = productSlice.actions;
export default productSlice.reducer;