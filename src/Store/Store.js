import {configureStore} from '@reduxjs/toolkit';

import UserSlice from './UserSlice';

const Store = configureStore({
  reducer: {
    user: UserSlice,
    // data: DataSlice,
  },
});

export default Store;
