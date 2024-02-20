import { authService } from "@/services";
import { User, UserDetail } from "@/types/user";
import Cookie from "js-cookie";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const login = async (email: string, password: string) => {
    const user = await authService.login(email, password);

    if (user) {
      Cookie.set("currentUser", JSON.stringify(user));
    }

    return user as User;
  };

  const getUserDetail = async () => {
    const userDetail = await authService.getDetail();

    return userDetail.data as UserDetail;
  };

  const getUsers = async () => {
    const users = await authService.users();

    return users as { data: UserDetail[] };
  };

  const topup = async (id: number, body = {}) => {
    const users = await authService.topup(id, body);

    return users as { data: UserDetail[] };
  };

  const create = async (body = {}) => {
    const users = await authService.createUser(body);

    return users as { data: UserDetail[] };
  };

  return { login, getUserDetail, getUsers, topup, create };
};

export const useGetUsers = () => {
  const [data, setData] = useState<{ data?: UserDetail[] } | null>(null);
  const { getUsers } = useAuth();

  const getAllUsers = () => {
    getUsers()
      .then((resp: any) => setData(resp))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return {
    data,
    getAllUsers,
  };
};
