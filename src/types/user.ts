export type User = {
  name: string;
  accessToken: string;
  id: number;
  email: string;
};

export type UserDetail = {
  name: string;
  id: number;
  email: string;
  role: string;
  balance: number;
};

export type Auth = {
  login(username: string, password: string): Promise<User>;
};
