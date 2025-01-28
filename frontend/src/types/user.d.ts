export interface User {
  _id?: string;
  name: string;
  email: string;
  password: string;
  dataCreated?: string; 
}

export interface UserResponse {
  message: string;
  user: User;
}

export interface LoginResponse {
  token: string;
  user: User;
}
