export type AuthData = {
  email: string;
  password: string;
};

export type StoredUser = {
  email: string;
};

export type User = StoredUser & {
  token: string;
};
