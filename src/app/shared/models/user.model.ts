export interface CommonUser {
  username: string;
  bio: string;
  image: string;
}

export interface User extends CommonUser {
  email: string;
  token: string;
}

export interface UserProfile extends CommonUser {
  following: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  username: string;
}
