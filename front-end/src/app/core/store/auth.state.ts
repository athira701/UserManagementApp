import { AuthResponse } from "../models/user.model";


export interface AuthState {
  user: Omit<AuthResponse, 'token' | 'message'> | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

export const initialAuthState: AuthState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};
