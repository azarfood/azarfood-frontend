import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
	user?: unknown;
}

const initialState: UserState = {};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<unknown>) => {
			state.user = action.payload;
		},
		deleteUser: state => {
			state.user = undefined;
		},
	},
});

export const { setUser, deleteUser } = userSlice.actions;
export default userSlice;
