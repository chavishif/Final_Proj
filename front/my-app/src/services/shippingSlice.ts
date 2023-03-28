import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import CartItemType from "../models/cartItem";
import ShippingType from "../models/shipping";
import { createorder } from "./shippingAPI";



export interface CartState {
  quantity: number;
  cartItems: CartItemType[];
  totalAmount: number;
  wishlistquantity?:number

}

 export const initialState: CartState  = {
   quantity: 0,
   cartItems: [],
   totalAmount: 0,
   wishlistquantity: 0
 };
 
 export const createorderAsync = createAsyncThunk(
  'shipping/createorder',
  async (shipping:ShippingType) => {
    // console.log(shipping)
    const response = await createorder(shipping);
    return response;
  }
);


export const shippingSlice = createSlice({
  name: "shipping",
  initialState,
  reducers: {
    

    addToCart: (state, { payload }: PayloadAction<CartItemType>) => {
      

    
    }


  },
});

export const {
 
} = shippingSlice.actions;



export default shippingSlice.reducer;
