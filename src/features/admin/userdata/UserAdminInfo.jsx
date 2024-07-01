import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    data:[  {
        id: null,
        username: "",
        email: "",
        first_name: "",
        last_name: "",
        is_blocked: false,
    },]
};

const userAdminInfoSlice = createSlice({
    name: "userAdminInfo",
    initialState,
    reducers: {
        setUserAdminInfo: (state, action) => {
            state.data = action.payload;
        },
        updateUserAdminInfo: (state, action) => {
            const updatedData = state.data?.map(user => {
                if (user.id === action.payload?.id) {
                    return {
                        ...user,
                        is_blocked: action.payload.is_blocked
                    };
                }
                return user;
            });
            state.data = updatedData ?? null;
        },
    },
});

export const { setUserAdminInfo, updateUserAdminInfo } = userAdminInfoSlice.actions;

export default userAdminInfoSlice.reducer;
