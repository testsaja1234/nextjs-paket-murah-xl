import { useCallback, useEffect, useState } from "react";
import { RespTransactions } from "./../types/transaction";
import { transactionService } from "@/services";
import { useSearchParams } from "next/navigation";

export const useTransaction = () => {
  const getAll = async (params = {}) => {
    const transactions = await transactionService.getAll(params);

    return transactions as RespTransactions;
  };

  const create = async (data: any) => {
    const transactions = await transactionService.create(data);
    return transactions;
  };

  const process = async (id: number) => {
    const transactions = await transactionService.updateStatus(id);
    return transactions;
  };

  return { getAll, create, process };
};

export const useGetTransaction = () => {
  const searchParams = useSearchParams();
  const queryParams = JSON.stringify(
    Object.fromEntries(searchParams.entries())
  );
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<RespTransactions>({
    status: false,
    message: "",
    data: [],
    current_page: 0,
    last_page: 0,
  });
  const { getAll } = useTransaction();

  const getTransaction = useCallback(() => {
    setLoading(true);
    setData((data) => ({ ...data, current_page: 0, last_page: 0, data: [] }));
    let params = JSON.parse(queryParams);
    getAll({
      ...params,
      status: params.status ? params.status : "PROCESSING",
    })
      .then((resp: RespTransactions) => {
        setData(resp);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, [queryParams]);

  useEffect(() => {
    getTransaction();
  }, [getTransaction]);

  return {
    loading,
    data,
    getTransaction,
  };
};
