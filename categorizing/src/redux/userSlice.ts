import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  email: string | null;
  name?: string | null;
  photoURL?: string | null;
}

const initialState: UserState = {
  email: null,
  name: null,
  photoURL: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      state.email = action.payload.email;
      state.name = action.payload.name || null;
      state.photoURL = action.payload.photoURL || null;
    },
    logout(state) {
      state.email = null;
    },
  },
});

export const { setUser, logout } = userSlice.actions;
export default userSlice.reducer;