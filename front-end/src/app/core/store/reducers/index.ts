import { ActionReducerMap } from '@ngrx/store';
import { authReducer } from './auth.reducer';
import { AuthState } from '../auth.state';

export interface AppState {
  auth: AuthState;
}

export const reducers: ActionReducerMap<AppState> = {
  auth: authReducer,
};
