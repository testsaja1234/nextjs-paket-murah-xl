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

  users = async () => {
    const res = await this.instance.get("/v1/users", {
      headers: authorizationHeader(),
    });
    return res.data;
  };

  topup = async (id: number, body = {}) => {
    const res = await this.instance.put(`/v1/users/${id}`, body, {
      headers: authorizationHeader(),
    });
    return res.data;
  };

  createUser = async (body = {}) => {
    const res = await this.instance.post(`/v1/create-user`, body, {
      headers: authorizationHeader(),
    });
    return res.data;
  };
}
