import { useEffect, useState } from "react";
import { packageService } from "@/services";
import { RespPackages } from "@/types/packages";
import { toast } from "react-toastify";

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
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<RespPackages>({
    status: false,
    message: "",
    data: [],
  });
  const { getAll } = usePackage();

  const getPackage = () => {
    setLoading(true);
    getAll()
      .then((resp: RespPackages) => {
        setData(resp);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        if (err.response) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Terjadi Kesalahan sistem");
        }
      });
  };

  useEffect(() => {
    getPackage();
  }, []);

  return {
    data,
    getPackage,
    loading,
  };
};
