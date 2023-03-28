import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';
import loginReducer from '../features/login/loginSlice';
import profileReducer from '../features/Profile/profileSlice';
import cartReducer from '../services/cartSlice';
import productsReducer from '../services/productsSlice';
import shippingReducer from '../services/shippingSlice';
import wishlistReducer from '../services/wishlistSlice';



export const store = configureStore({
  reducer: {
    login: loginReducer,
    profile : profileReducer,
    products: productsReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    shipping :shippingReducer
   
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
