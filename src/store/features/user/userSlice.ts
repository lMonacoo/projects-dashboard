import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ILocalUser, IUsers, IUserSlice } from '~/interfaces';
import initialUsers from '~/store/features/user/mock';
import { getPropertyInArray, findBiggerNumberInArray } from '~/utils';

const initialState: IUserSlice = {
  allUsers: initialUsers,
  currentUser: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<ILocalUser>) => {
      state.currentUser = action.payload;
    },
    logout: state => {
      state.currentUser = null;
    },
    addUser(state, action: PayloadAction<Omit<IUsers, 'id'>>) {
      const allExistentIds = getPropertyInArray<IUsers>(state.allUsers, 'id') as number[];
      const getBiggerId = findBiggerNumberInArray(allExistentIds);
      state.allUsers.unshift({ ...action.payload, id: getBiggerId + 1 });
    },
    editUser(state, action: PayloadAction<IUsers>) {
      const usersWithoutEdited = state.allUsers.filter(user => user.id !== action.payload.id);
      state.allUsers = [action.payload, ...usersWithoutEdited];
    },
    removeUser(state, action: PayloadAction<IUsers['id']>) {
      const filteredUsers = state.allUsers.filter(user => user.id !== action.payload);
      state.allUsers = filteredUsers;
    }
  }
});

export const { login, logout, addUser, editUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
