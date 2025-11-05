export interface User {
  _id?: string | null;
  name?: string | null;
  email?: string|null;
  role?: 'user' | 'admin';
  profileImage?: string|null;
  createdAt?: Date;
}

export interface AuthResponse {
  message?: string;
  token?: string|null;
  user?: User | null;
  _id?: string | null;
  name?: string|null;
  email?: string|null;
  profileImage?: string|null;
  role?: 'user' | 'admin';
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}
