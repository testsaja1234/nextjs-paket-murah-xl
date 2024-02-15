import { authService } from "@/services";
import { User } from "@/types/user";
import Cookie from "js-cookie";

export const useAuth = () => {
  const login = async (email: string, password: string) => {
    const user = await authService.login(email, password);

    if (user) {
      Cookie.set("currentUser", JSON.stringify(user));
    }

    return user as User;
  };

  return { login };
};
