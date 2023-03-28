import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import Icred from '../../models/cred';
import { addprofile, getprofile, myOrders, myOrdersById, updprofile} from './profileAPI';
import jwt_decode from "jwt-decode";
import Iprof from '../../models/profile';
import { MyOrders } from '../../models/myOrders';

export interface LoginState {
  refreshflag : boolean
 profile :Iprof []
 myOrders : MyOrders[]
 myOrdersById: []
}

const initialState: LoginState = {
  profile: [],
  refreshflag: false,
  myOrders: [],
  myOrdersById: []
};

export const getprofileAsync = createAsyncThunk(
  'profile/getprofile',
  async (access : any) => {

    const response = await getprofile(access);

    return response.data;
  }
);


export const addprofileAsync = createAsyncThunk(
  'profile/addprofile',
  async (prof : Iprof) => {
    // console.log(prof)
    const response = await addprofile(prof);
    return response.data;
  }
);

export const updprofileasync = createAsyncThunk(
  'profile/updprofile',
  async (prof : Iprof) => {
    // console.log(prof)
    const response = await updprofile(prof);
    return response.data;
  }
);


export const getMyOrdersAsync = createAsyncThunk(

  'profile/myOrders',
  async (access : any) => {

    const response = await myOrders(access);
    return response.data;
  }
);


export const getMyOrderByIdsAsync = createAsyncThunk(

  'profile/myOrdersById',
  async (accessId : any) => {

    const response = await myOrdersById(accessId);
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
        state.refreshflag = ! state.refreshflag

       })
       .addCase(updprofileasync.fulfilled, (state, action) => {
        // console.log(action.payload)
        state.refreshflag = ! state.refreshflag

        })
        .addCase(getMyOrdersAsync.fulfilled, (state, action) => {
          // console.log(action.payload)
          state.myOrders =  action.payload
  
          })
          .addCase(getMyOrderByIdsAsync.fulfilled, (state, action) => {
            // console.log(action.payload)
           console.log(action.payload)
    
            })
          
  },
});

export const {  } = profileSlice.actions;

export const selectProfile = (state: RootState) => state.profile.profile;
export const selectRefresh = (state: RootState) => state.profile.refreshflag;
export const selectMYOrders = (state: RootState) => state.profile.myOrders;


export default profileSlice.reducer;
