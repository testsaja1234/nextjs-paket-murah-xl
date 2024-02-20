import { useEffect, useState } from "react";
import { packageService } from "@/services";
import { RespPackages } from "@/types/packages";

export const usePackage = () => {
  const getAll = async () => {
    const packages = await packageService.getAll();
    return packages as RespPackages;
  };

  const create = async (data: any) => {
    const transactions = await packageService.create(data);
    return transactions;
  };

  return { getAll, create };
};

export const useGetPackage = () => {
  const [data, setData] = useState<RespPackages>({
    status: false,
    message: "",
    data: [],
  });
  const { getAll } = usePackage();

  const getPackage = () => {
    getAll()
      .then((resp: RespPackages) => setData(resp))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getPackage();
  }, []);

  return {
    data,
    getPackage,
  };
};
