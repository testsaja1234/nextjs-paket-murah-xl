import { authorizationHeader } from "@/utils/authorizationHeader";
import axios, { AxiosInstance } from "axios";

export class TransactionService {
  protected readonly instance: AxiosInstance;

  public constructor(url: string) {
    this.instance = axios.create({
      baseURL: url,
      timeout: 300000,
      timeoutErrorMessage: "Time out!",
    });
  }

  getAll = async (params = {}) => {
    const res = await this.instance.get("/transactions", {
      headers: authorizationHeader(),
      params,
    });
    return res.data;
  };

  create = async (data: any) => {
    const res = await this.instance.post("/transactions", data, {
      headers: authorizationHeader(),
    });

    return res.data;
  };

  updateStatus = async (id: number) => {
    const res = await this.instance.put(
      `/transactions/${id}`,
      {},
      {
        headers: authorizationHeader(),
      }
    );

    return res.data;
  };
}
