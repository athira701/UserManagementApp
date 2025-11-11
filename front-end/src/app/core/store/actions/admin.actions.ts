import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';

export const adminLoginStart = createAction(
  '[Admin] Login Start',
  props<{ email: string; password: string }>()
);

export const adminLoginSuccess = createAction(
  '[Admin] Login Success',
  props<{ token: string }>()
);

export const adminLoginFailure = createAction(
  '[Admin] Login Failure',
  props<{ error: string }>()
);

export const loadUsers = createAction('[Admin] Load Users');
export const loadUsersSuccess = createAction(
  '[Admin] Load Users Success',
  props<{ users: User[] }>()
);
export const loadUsersFailure = createAction(
  '[Admin] Load Users Failure',
  props<{ error: string }>()
);




export const createUserStart = createAction(
  '[Admin] Create User Start',
  props<{ user: { name: string; email: string; password: string } }>()
);

export const createUserSuccess = createAction(
  '[Admin] Create User Success',
  props<{ user: any }>()
);

export const createUserFailure = createAction(
  '[Admin] Create User Failure',
  props<{ error: string }>()
);





export const updateUserStart = createAction(
  '[Admin] Update User Start',
  props<{ id: string; user: Partial<any> }>()
);

export const updateUserSuccess = createAction(
  '[Admin] Update User Success',
  props<{ user: any }>()
);

export const updateUserFailure = createAction(
  '[Admin] Update User Failure',
  props<{ error: string }>()
);





export const deleteUserStart = createAction(
  '[Admin] Delete User Start',
  props<{ id: string }>()
);

export const deleteUserSuccess = createAction(
  '[Admin] Delete User Success',
  props<{ id: string }>()
);

export const deleteUserFailure = createAction(
  '[Admin] Delete User Failure',
  props<{ error: string }>()
);

export const adminLogout = createAction('[Admin] Logout');
