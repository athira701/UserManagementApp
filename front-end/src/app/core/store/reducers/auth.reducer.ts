import { createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';
import { AuthState, initialAuthState } from '../auth.state';

export const authReducer = createReducer(
  initialAuthState,

  on(AuthActions.loginStart, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(AuthActions.loginSuccess, (state, { response }) => ({
    ...state,
    user: {
      _id: response.user?._id ?? null,
      name: response.user?.name ?? null,
      email: response.user?.email ?? null,
      role: response.user?.role ?? 'user',
      profileImage: response.user?.profileImage ?? null,
      createdAt: new Date(),
    },
    token: response.token ?? null,
    loading: false,
    isAuthenticated: true,
  })),

  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(AuthActions.registerStart, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(AuthActions.registerSuccess, (state, { response }) => ({
    ...state,
    user: {
      _id: response._id,
      name: response.name,
      email: response.email,
      role: response.role,
      profileImage: response.profileImage,
      createdAt: new Date(),
    },
    token: response.token ?? null,
    loading: false,
    isAuthenticated: true,
  })),

  on(AuthActions.registerFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(AuthActions.logout, () => ({
    ...initialAuthState,
  }))
);
