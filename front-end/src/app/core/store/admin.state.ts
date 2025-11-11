import { User } from '../models/user.model';

export interface AdminState {
  adminToken: string | null;
  users: User[];
  loading: boolean;
  error: string | null;
}

export const initialAdminState: AdminState = {
  adminToken: null,
  users: [],
  loading: false,
  error: null,
};
