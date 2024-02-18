import { authorizationHeader } from "@/utils/authorizationHeader";
import axios, { AxiosInstance } from "axios";

export class AuthService {
  protected readonly instance: AxiosInstance;

  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 300000,
      timeoutErrorMessage: "Time out!",
    });
  }

  login = async (email: string, password: string) => {
    const res = await this.instance.post("/login", { email, password });
    return {
      name: res.data.data.user_detail.name,
      email: res.data.data.user_detail.email,
      id: res.data.data.user_detail.id,
      accessToken: res.data.data.token,
    };
  };

  getDetail = async () => {
    const res = await this.instance.get("/v1/user-detail", {
      headers: authorizationHeader(),
    });
    return res.data;
  };
}
