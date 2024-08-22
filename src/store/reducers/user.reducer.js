import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: null,
    token: null,
    isAuth: false,
    wishList: [],
    tripList: [],
    propertyList: [],
    reservationList: [],
  },
  reducers: {
    setLogin: (state, action) => {
      state.userData = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('userData', JSON.stringify(state.userData));
      localStorage.setItem('token', state.token);
    },
    setLogout: (state) => {
      state.userData = null;
      state.token = null;
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
    },
    setListings: (state, action) => {
      state.listings = action.payload.listings;
    },
    setSingleListings: (state, action) => {
      state.singleList = action.payload.singleList;
    },
    setTripList: (state, action) => {
      state.tripList = action.payload.tripList;
    },
    setWishList: (state, action) => {
      state.wishList = action.payload.wishList;
    },
    setPropertyList: (state, action) => {
      state.propertyList = action.payload.propertyList;
    },
    setReservationList: (state, action) => {
      state.reservationList = action.payload.reservationList;
    },
  },
});

export const { setLogin, setLogout, setListings, setSingleListings, setTripList, setWishList, setPropertyList, setReservationList } = userSlice.actions;
export default userSlice.reducer;
