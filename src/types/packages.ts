export type RespPackages = {
  status: boolean;
  message: string;
  data: Package[];
};

export type Package = {
  id: number;
  name: string;
  desc: string;
  price: number;
  stock: number;
};
