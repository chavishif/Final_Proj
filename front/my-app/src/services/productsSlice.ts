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

// export const refreshAsync = createAsyncThunk(
//   'products/refresh',
//   async (token:string ) => {
//     const response = await refresh(token);
//     return response.data;
//   }
// );

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
       console.log( action.payload)
       state.products = action.payload
      
      })
      // .addCase(registerAsync.fulfilled, (state, action) => {
      //  state.registered = true
        
      //   })
      //   .addCase(refreshAsync.fulfilled, (state, action) => {
      //     console.log(action.payload.access)
      //     state.access = action.payload.access
      //     state.refresh = action.payload.refresh
      //     // console.log( jwt_decode(action.payload.refresh))
      //     // console.log( jwt_decode(state.access))
      //     localStorage.setItem("access",state.access)
      //     localStorage.setItem("refresh", state.refresh)
      //     state.username=jwt_decode<any>(state.access).username
      //     state.logged =true
      //   })
  },
});

export const { logout } = productsSlice.actions;
export const selectProducts = (state: RootState) => state.products.products;



export default productsSlice.reducer;
