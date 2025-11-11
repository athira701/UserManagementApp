import { ActionReducerMap } from '@ngrx/store';
import { authReducer } from './auth.reducer';
import { AuthState } from '../auth.state';
import { AdminState } from '../admin.state';
import { adminReducer } from './admin.reducer';

export interface AppState {
  auth: AuthState;
  admin: AdminState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
  admin:adminReducer,
};
