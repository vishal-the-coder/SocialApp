const {createSlice} = require('@reduxjs/toolkit');

const initialState = {
  users: {},
};

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addLoginUser(state, action) {
      state.users = action.payload;
    },
    removeLoginUser(state, action) {
      state.users = {};
    },
  },
});

export const userAction = UserSlice.actions;
export default UserSlice.reducer;
