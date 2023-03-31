import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import Icred from '../../models/cred';
import { login , register, refresh} from './loginAPI';
import jwt_decode from "jwt-decode";

export interface LoginState {
 logged : boolean
 access : string
 refresh : string
 username:string
 email : string
 registered : boolean
}

const initialState: LoginState = {
  logged: false,
  access: '',
  username: '',
  registered: false,
  refresh: '',
  email: ''
};

export const registerAsync = createAsyncThunk(
  'login/register',
  async (reg : Icred) => {
    const response = await register(reg);
    return response.data;
  }
);


export const loginAsync = createAsyncThunk(
  'login/login',
  async (cred: Icred) => {
    // console.log(cred)
    const response = await login(cred);
    // console.log(response)

    return response.data;
  }
);

export const refreshAsync = createAsyncThunk(
  'login/refresh',
  async (token:string ) => {
    const response = await refresh(token);
    return response.data;
  }
);
export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logout: (state) => {
      state.logged = false;
      // localStorage.setItem("logged", "false")
      localStorage.setItem("username","")

      state.access = ''
      state.refresh = ''
      localStorage.setItem("access","")
      localStorage.setItem("refresh","")
      localStorage.setItem("remember", "false")
    },
   
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state, action) => {
      state.logged = true
      // localStorage.setItem("logged", "true")

      //  console.log (jwt_decode<any>(action.payload.refresh))
       state.access = action.payload.access
       state.refresh = action.payload.refresh
       localStorage.setItem("access",state.access)
       localStorage.setItem("refresh",state.refresh)
      // jwt_decode -  packege that enables access to pablic token part (can be seen at jwt_decode site)
       state.username = jwt_decode<any>(state.access).username
       state.email = jwt_decode<any>(state.access).email
       localStorage.setItem("username",state.username)
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
       state.registered = true
        
        })
        .addCase(refreshAsync.fulfilled, (state, action) => {
          state.access = action.payload.access
          state.refresh = action.payload.refresh
          // console.log( jwt_decode(action.payload.refresh))
          // console.log( jwt_decode(state.access))
          localStorage.setItem("access",state.access)
          localStorage.setItem("refresh", state.refresh)
          state.username=jwt_decode<any>(state.access).username
          state.email = jwt_decode<any>(state.access).email
          state.logged =true
        })
  },
});

export const { logout } = loginSlice.actions;
export const selectLooged = (state: RootState) => state.login.logged;
export const selectAccess = (state: RootState) => state.login.access;
export const selectUsername = (state: RootState) => state.login.username;
export const selectEmail = (state: RootState) => state.login.email;
export const selectRegistered = (state: RootState) => state.login.registered;


export default loginSlice.reducer;
