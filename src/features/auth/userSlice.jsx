import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';


const initialState = {
    data: (() => {
      try {
        return JSON.parse(localStorage.getItem('user_data') ?? '');
      } catch {
        return null;
      }
    })(),
    message: "",
    isLoggedIn: localStorage.getItem('user_data') ? true : false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isLoggedIn = true
      state.data = action.payload;
      state.message = '';
      localStorage.setItem('user_data', JSON.stringify(action.payload));
      Cookies.set('jwt', JSON.stringify(action.payload), { expires: 7 });
    },
    loginFailure: (state, action) => {
      state.isLoggedIn = false
      state.data = null
      state.message = action.payload.data.message;
    },
    clearMessage: (state) => {
      state.isLoggedIn = false
      state.message = '';
    },
    logoutUser: (state) => {
      state.isLoggedIn = false
      state.data = null;
      state.message = '';
      Cookies.remove('jwt', { path: '/' });
      localStorage.removeItem('user_data');

    },
  },
});

export const { loginSuccess, loginFailure, clearMessage, logoutUser } = userSlice.actions;

export default userSlice.reducer;