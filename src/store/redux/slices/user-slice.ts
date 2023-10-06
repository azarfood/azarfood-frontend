import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
	user?: {
		access_token: string;
	};
}

const initialState: UserState = {};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<Required<UserState>['user']>) => {
			state.user = action.payload;
		},
		deleteUser: state => {
			state.user = undefined;
		},
	},
});

export const { setUser, deleteUser } = userSlice.actions;
export default userSlice;
