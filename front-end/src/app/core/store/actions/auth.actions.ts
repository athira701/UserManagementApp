import { createAction, props } from '@ngrx/store';
import {
  AuthResponse,
  LoginCredentials,
  RegisterData,
} from '../../models/user.model';

export const loginStart = createAction(
  '[Auth] Login Start',
  props<{ credentials: LoginCredentials }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ response: AuthResponse }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const registerStart = createAction(
  '[Auth] Register Start',
  props<{ userData: RegisterData }>()
);

export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<{ response: AuthResponse }>()
);

export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout');
