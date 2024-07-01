import userSlice from '../features/auth/userSlice';
import {configureStore} from '@reduxjs/toolkit';
import userAdminInfoSlice from '../features/admin/userdata/UserAdminInfo';
import userInfoSlice from '../features/userInfo/userInfoSlice';

const store = configureStore({
    reducer:{
        user: userSlice,
        userAdminInfo: userAdminInfoSlice,
        userInfo:userInfoSlice,
    },
})

export default store;