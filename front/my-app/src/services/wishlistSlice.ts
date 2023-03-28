import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { store } from "../app/store";
import CartItemType from "../models/cartItem";
import { CartState } from "./cartSlice";
import { addToCart as addToCartAction } from "./cartSlice"


export interface WishlistState {
  quantity: number;
  cartItems: CartItemType[];
  totalAmount: number;
}

export const initialState: WishlistState = {
  quantity: 0,
  cartItems: [],
  totalAmount: 0,
};
// Function to retrieve cart data from local storage
const loadState = (): WishlistState | undefined => {
  try {
    const serializedState = localStorage.getItem("wishlist");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

// Function to save cart data to local storage
const saveState = (state: WishlistState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("wishlist", serializedState);
  } catch {
    // Ignore write errors
  }
};

const updateWishInLocalStorage = (
  cartItems: CartItemType[],
  totalAmount: number,
  quantity: number
) => {
  const wishlistState = { cartItems, totalAmount, quantity };
  saveState(wishlistState);
};

export const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: loadState() || initialState,
  reducers: {
    addToWishlist: (state, { payload }: PayloadAction<CartItemType>) => {
      const isItemExist = state.cartItems.find((item) => item.id === payload.id);
      if (!isItemExist) {
        state.cartItems = [...state.cartItems, { ...payload }];
        state.quantity = 1;
      }
      state.totalAmount += Number(payload.price) * payload.quantity;
      state.quantity = state.cartItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
      updateWishInLocalStorage(state.cartItems, state.totalAmount, state.quantity);
    },

    removeFromWishlist: (state, { payload }: PayloadAction<CartItemType>) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== payload.id);
      state.quantity -= payload.quantity;
      state.totalAmount -= Number(payload.price || 0) * payload.quantity;
      saveState(state);
    },
    // New reducer to add selected wishlist item to the cart
    addWishlistItemToCart: (state, { payload }: PayloadAction<any>) => {
      // // Retrieve cart and wishlist data from local storage
      // const serializedCartState = localStorage.getItem("cart");
      // const cartState: CartState = serializedCartState
      //   ? JSON.parse(serializedCartState)
      //   : initialState;

      // const serializedWishlistState = localStorage.getItem("wishlist");
      // const wishlistState: WishlistState = serializedWishlistState
      //   ? JSON.parse(serializedWishlistState)
      //   : initialState;

      // Find the item in the wishlist and add it to the cart
      //       const itemToAdd = state.cartItems.find(
      //         (item) => item.id === payload.id
      //       );
      // console.log(itemToAdd)

      // if (itemToAdd) {
      //   const updatedCartItems = [...cartState.cartItems];
      //   const existingCartItemIndex = updatedCartItems.findIndex(
      //     (item) => item.id === itemToAdd.id
      //   );

      //   if (existingCartItemIndex >= 0) {
      //     const existingCartItem = updatedCartItems[existingCartItemIndex];
      //     const updatedCartItem = {
      //       ...existingCartItem,
      //       quantity: existingCartItem.quantity + itemToAdd.quantity,
      //     };
      //     updatedCartItems[existingCartItemIndex] = updatedCartItem;
      //   } else {
      //     updatedCartItems.push(itemToAdd);
      //     const updatedCartState = { ...cartState, cartItems: updatedCartItems };
      //     const serializedCartState = JSON.stringify(updatedCartState);
      //     localStorage.setItem("cart", serializedCartState);
      //   }

      //   // Remove the item from the wishlist local storage
      //   const updatedWishlistItems = wishlistState.cartItems.filter(
      //     (item) => item.id !== itemToAdd.id
      //   );
      //   const updatedWishlistState = {
      //     ...wishlistState,
      //     cartItems: updatedWishlistItems,
      //   };
      //   const serializedWishlistState = JSON.stringify(updatedWishlistState);
      //   localStorage.setItem("wishlist", serializedWishlistState);
      // }

      // return cartState;
    },

    // addWishlistItemToCart: (state, { payload }: PayloadAction<CartItemType>) => {
    // const cartItem = store.getState().cart.cartItems.find((item) => item.id === payload.id);
    // if (cartItem) {
    //   // Item already in the cart, don't add it again
    //   return;
    // }

    // Item not in the cart, add it
    //   store.dispatch(addToCartAction(payload));
    // },

    // const isItemExist = cartState.cartItems.find((item) => item.id === payload.id);
    // if (!isItemExist) {
    //   console.log("first")
    //   const serializedCartState = localStorage.getItem("cart");
    //   if (serializedCartState) {
    //     cartState.cartItems = { ...cartState.payload}
    //     cartState.quantity += 1
    //     cartState.totalAmount += Number(payload.price);

    //     cartState.saveState(state);

    //   }
    //   else {
    //     console.log("first")
    //   }
    // }

    // } else {
    //   state.cartItems = state.cartItems.map((item) => {
    //     if (item.id === payload.id) {
    //       return { ...item, quantity: item.quantity + 1 };
    //     } else {
    //       return item;
    //     }
    //   });
    //   state.quantity += 1;
    // }
    // state.totalAmount += Number(payload.price);
    // saveState(state);


    clearWishlist: (state) => {
      state.cartItems = [];
      state.totalAmount = 0;
      state.quantity = 0;
      saveState(state);
    },
  },
});

export const { addToWishlist, removeFromWishlist, clearWishlist, addWishlistItemToCart } = wishlistSlice.actions;

export default wishlistSlice.reducer;
