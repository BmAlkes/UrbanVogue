import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { FilterProps } from "../../components/Products/FilterSideBar";

//Async thunk to fetch products by collection and optional filters  

export const fetchProductsByFilters = createAsyncThunk(
  "products/fetchByFilters",
  async ({ collection, size, color,gender,minPrice,maxPrice, sortBy, search, category, material,brand, limit}:FilterProps) => {
    const query = new URLSearchParams();

    if (collection) query.append("collection", collection as string);
    if (size && size.length) size.forEach(s => query.append("size", s));
    if (gender) query.append("gender", gender);
    if (color) query.append("color", color);
    if (minPrice !== undefined) query.append("minPrice", String(minPrice));
    if (maxPrice !== undefined) query.append("maxPrice", String(maxPrice));
    if (sortBy) query.append("sortBy", sortBy as string);
    if (search) query.append("search", search as string);
    if (category) query.append("category", category);
    if (material && material.length) material.forEach(m => query.append("material", m));
    if (brand && brand.length) brand.forEach(b => query.append("brand", b));
    if (limit !== undefined) query.append("limit", String(limit));

    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/products?${query.toString()}`,
    );
    return response.data;
  }
);

// export const fecthProductById =