import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import Icred from '../../models/cred';
import { addprofile, createReview, getmyshippinginfo, getprofile, myAddressById, myOrders, myOrdersById, updprofile } from './profileAPI';
import jwt_decode from "jwt-decode";
import Iprof from '../../models/profile';
import { MyOrders } from '../../models/myOrders';
import ShippingType from '../../models/shipping';

export interface LoginState {
  refreshflag: boolean
  profile: Iprof[]
  myOrders: MyOrders[]
  myOrdersById: ShippingType[]
  myaddressgById: ShippingType[]
  myshippinginfo : ShippingType
}

const initialState: LoginState = {
  profile: [],
  refreshflag: false,
  myOrders: [],
  myOrdersById: [],
  myaddressgById: [],
  myshippinginfo: {address:"",city:"",country:"", phone:"", postalCode:"" }
};

export const getprofileAsync = createAsyncThunk(
  'profile/getprofile',
  async (access: any) => {

    const response = await getprofile(access);

    return response.data;
  }
);


export const addprofileAsync = createAsyncThunk(
  'profile/addprofile',
  async (prof: Iprof) => {
    // console.log(prof)
    const response = await addprofile(prof);
    return response.data;
  }
);

export const updprofileasync = createAsyncThunk(
  'profile/updprofile',
  async (prof: Iprof) => {
    // console.log(prof)
    const response = await updprofile(prof);
    return response.data;
  }
);


export const getMyOrdersAsync = createAsyncThunk(

  'profile/myOrders',
  async (access: any) => {

    const response = await myOrders(access);
    return response.data;
  }
);


export const getMyOrderByIdsAsync = createAsyncThunk(

  'profile/myOrdersById',
  async (accessId: any) => {

    const response = await myOrdersById(accessId);
    return response.data;
  }
);

export const getMyAddressByIdsAsync = createAsyncThunk(

  'profile/myAddressById',
  async (accessId: any) => {

    const response = await myAddressById(accessId);
    return response.data;
  }
);

export const createOrderReviewAsync = createAsyncThunk(

  'profile/createReview',
  async (reviewaccessId: any) => {
    console.log(reviewaccessId)
    const response = await createReview(reviewaccessId);
    return response.data;
  }
);

export const getmyshippinginfoAsync = createAsyncThunk(

  'profile/getmyshippinginfo',
  async (access: any) => {

    const response = await getmyshippinginfo(access);
    return response.data;
  }
);

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {


  },
  extraReducers: (builder) => {
    builder
      .addCase(getprofileAsync.fulfilled, (state, action) => {
        state.profile = action.payload
        console.log(state.profile)

      })
      .addCase(addprofileAsync.fulfilled, (state, action) => {
        // console.log(action.payload)
        state.profile.push(action.payload)
        state.refreshflag = !state.refreshflag

      })
      .addCase(updprofileasync.fulfilled, (state, action) => {
        // console.log(action.payload)
        state.refreshflag = !state.refreshflag

      })
      .addCase(getMyOrdersAsync.fulfilled, (state, action) => {
        // console.log(action.payload)
        state.myOrders = action.payload

      })
      .addCase(getMyOrderByIdsAsync.fulfilled, (state, action) => {
        state.myOrdersById = action.payload

        //  console.log(state.myOrdersById)

      })
      .addCase(getMyAddressByIdsAsync.fulfilled, (state, action) => {
        state.myaddressgById = action.payload


      })
      .addCase(getmyshippinginfoAsync.fulfilled, (state, action) => {
        state.myshippinginfo = action.payload


      })
    
  },
});

export const { } = profileSlice.actions;

export const selectProfile = (state: RootState) => state.profile.profile;
export const selectRefresh = (state: RootState) => state.profile.refreshflag;
export const selectMYOrders = (state: RootState) => state.profile.myOrders;
export const selectMYOrdersById = (state: RootState) => state.profile.myOrdersById;
export const selectMYAddressOrders = (state: RootState) => state.profile.myaddressgById;
export const selectMYShippingInfo = (state: RootState) => state.profile.myshippinginfo;


export default profileSlice.reducer;
