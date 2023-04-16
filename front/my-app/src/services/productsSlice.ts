import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import jwt_decode from "jwt-decode";
import { RootState } from '../app/store';
import { Product } from '../models/products';
import { getproducts } from './productsAPI';

export interface LoginState {
 products : Product[]
}

const initialState: LoginState = {
  products: []
};


export const getproductsAsync = createAsyncThunk(
  'products/getproducts',
  async () => {
    const response = await getproducts();
    return response.data;
  }
);


export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    logout: (state) => {
   
    },
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(getproductsAsync.fulfilled, (state, action) => {
       state.products = action.payload
      
      })

  },
});

export const { logout } = productsSlice.actions;
export const selectProducts = (state: RootState) => state.products.products;



export default productsSlice.reducer;
