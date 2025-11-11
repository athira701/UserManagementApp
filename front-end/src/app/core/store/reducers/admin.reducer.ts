import { createReducer, on } from '@ngrx/store';
import { initialAdminState } from '../admin.state';
import * as AdminActions from '../actions/admin.actions';

export const adminReducer = createReducer(
  initialAdminState,

  on(AdminActions.adminLoginStart, (state) => ({ ...state, loading: true })),
  on(AdminActions.adminLoginSuccess, (state, { token }) => ({
    ...state,
    adminToken: token,
    loading: false,
    error: null,
  })),
  on(AdminActions.adminLoginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(AdminActions.loadUsers, (state) => ({ ...state, loading: true })),
  on(AdminActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    loading: false,
    error: null,
  })),
  on(AdminActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(AdminActions.createUserStart, (state) => ({
    ...state,
    loading: true,
  })),
  on(AdminActions.createUserSuccess, (state, { user }) => ({
    ...state,
    users: [...state.users, user],
    loading: false,
  })),
  on(AdminActions.createUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(AdminActions.updateUserStart, (state) => ({
    ...state,
    loading: true,
  })),
  on(AdminActions.updateUserSuccess, (state, { user }) => ({
    ...state,
    users: state.users.map((u) => (u._id === user._id ? user : u)),
    loading: false,
  })),
  on(AdminActions.updateUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(AdminActions.deleteUserStart, (state) => ({
    ...state,
    loading: true,
  })),
  on(AdminActions.deleteUserSuccess, (state, { id }) => ({
    ...state,
    users: state.users.filter((u) => u._id !== id),
    loading: false,
  })),
  on(AdminActions.deleteUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(AdminActions.adminLogout, () => ({
    ...initialAdminState,
  }))
);
