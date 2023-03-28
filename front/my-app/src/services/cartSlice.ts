import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import CartItemType from "../models/cartItem";



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

// Function to retrieve cart data from local storage
const loadState = (): CartState | undefined => {
  try {
    const serializedState = localStorage.getItem('cart');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
}

// Function to save cart data to local storage
const saveState = (state: CartState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cart', serializedState);
  } catch {
    // Ignore write errors
  }
}
const updateCartInLocalStorage = (cartItems: CartItemType[], 
  totalAmount: number, quantity:number) => {
  const cartState = { cartItems, totalAmount ,quantity  };
  saveState(cartState);
};


export const cartSlice = createSlice({
  name: "cart",
  initialState: loadState() || initialState, // initialize state from local storage if available
  reducers: {
    

    addToCart: (state, { payload }: PayloadAction<CartItemType>) => {
      

      const isItemExist = state.cartItems.find((item) => item.id === payload.id);
      if (!isItemExist) {
        state.cartItems = [...state.cartItems, { ...payload }];
        state.quantity += payload.quantity

      } else {
        state.cartItems = state.cartItems.map((item) => {
          if (item.id === payload.id) {
            return { ...item, quantity: item.quantity + payload.quantity}
                    
          
          } else {
            return item;
          }
        });
      }
    
      state.totalAmount += Number(payload.price) * payload.quantity;
      state.quantity = state.cartItems.reduce((total, item) => total + item.quantity, 0);
      updateCartInLocalStorage(state.cartItems, state.totalAmount, state.quantity);
    },
   
    removeFromCart: (state, { payload }: PayloadAction<CartItemType>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== payload.id
      );
      state.quantity -= payload.quantity;
      state.totalAmount -= Number(payload.price || 0) * payload.quantity;

      saveState(state);
    },
    addProdQuantity: (state, { payload }: PayloadAction<CartItemType>) => {
      const isItemExist = state.cartItems.find((item) => item.id === payload.id);
      if (!isItemExist) {
        state.cartItems = [...state.cartItems, { ...payload, quantity: 1 }];
        state.quantity += 1;
      } else {
        state.cartItems = state.cartItems.map((item) => {
          if (item.id === payload.id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
        state.quantity += 1;
      }
      state.totalAmount += Number(payload.price);
      saveState(state);
    
    },
    addItemQuantity: (state, { payload }: PayloadAction<CartItemType>) => {
      state.cartItems = state.cartItems.map((item) => {
        if (item.id === payload.id) {
          return { ...item, quantity: item.quantity + 1 };
          
        } else {
          return item;
        }
      });
      state.quantity += 1
      state.totalAmount += Number(payload.price);

      saveState(state);
    },

    subtractItemQuantity: (state, { payload }: PayloadAction<CartItemType>) => {
      const subItem = state.cartItems.find((item) => item.id === payload.id);
      if (subItem?.quantity === 1) {
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== subItem.id
        );
      } else {
        subItem!.quantity -= 1;
      }
      state.quantity -= 1;
      state.totalAmount -= Number(subItem!.price);

      saveState(state);
    },

     clearCart: (state )=> {
      console.log("first")
      state.cartItems = [];
      state.totalAmount = 0;
      state.quantity = 0;
      saveState(state);
      
    },


  },
});

export const {
  addToCart,
  removeFromCart,
  addItemQuantity,
  subtractItemQuantity,
  addProdQuantity,
  clearCart,
} = cartSlice.actions;



export default cartSlice.reducer;
