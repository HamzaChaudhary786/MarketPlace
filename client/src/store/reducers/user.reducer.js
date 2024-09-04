import { createSlice } from '@reduxjs/toolkit';
const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: null,
    litings: null,
    userListingData: null,
    singleList: null,
  },
  reducers: {
    setLogin: (state, action) => {
      state.userData = action.payload.user;
      // state.token = action.payload.token;
      // localStorage.setItem('userData', JSON.stringify(state.userData));
      // localStorage.setItem('token', state.token);
    },
    setLogout: (state) => {
      state.userData = null;
      localStorage.removeItem('userData');

    },
    setListings: (state, action) => {
      state.litings = action.payload.litings;
    },

    setUserListingData: (state, action) => {
      state.userListingData = action.payload.userListingData;
    },

    setSingleListData: (state, action) => {
      state.singleList = action.payload.singleList;

    },

  },
});

export const { setLogin, setLogout, setListings, setUserListingData, setSingleListData } = userSlice.actions;
export default userSlice.reducer;
