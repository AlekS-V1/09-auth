export type User = {
  email: string;
  username: string;
  avatar: string;
};

export type LoginRequest = {
  email: string;
  username: string;
};

export type RegisterRequest = {
  email: string;
  username: string;
  avatar: string;
};

export type UpdateUserRequest = {
  username: string;
};

export type CheckSessionRequest = {
  success: boolean;
  email: string;
  username: string;
  avatar: string;
};
