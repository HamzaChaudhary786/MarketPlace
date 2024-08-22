import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userData: null,
    token: null,
    isAuth: false,
 
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
    
  },
});

export const { setLogin, setLogout } = userSlice.actions;
export default userSlice.reducer;
