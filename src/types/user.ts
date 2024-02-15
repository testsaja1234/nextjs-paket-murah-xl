export type User = {
  name: string;
  accessToken: string;
  id: number;
  email: string;
};

export type Auth = {
  login(username: string, password: string): Promise<User>;
};
