import { authorizationHeader } from "@/utils/authorizationHeader";
import axios, { AxiosInstance } from "axios";

export class PackageService {
  protected readonly instance: AxiosInstance;

  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 300000,
      timeoutErrorMessage: "Time out!",
    });
  }

  getAll = async () => {
    const res = await this.instance.get("/packages", {
      headers: authorizationHeader(),
    });
    return res.data;
  };

  create = async (data: any) => {
    const res = await this.instance.post("/packages", data, {
      headers: authorizationHeader(),
    });

    return res.data;
  };
}
