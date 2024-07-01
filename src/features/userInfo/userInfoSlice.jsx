import { createSlice } from "@reduxjs/toolkit";




const initialState= {
    data: {
        username: "",
        email: "",
        first_name: "",
        last_name: "",
        phone_number: "",
        profile_picture: "",
        country:""
        
    },
};

const userInfoSlice = createSlice({
    name: "userInfo",
    initialState,
    reducers: {
        setUserInfo: (state, action) => {
            state.data = action.payload;
        },
    },
});

export const { setUserInfo } = userInfoSlice.actions;

export default userInfoSlice.reducer;
