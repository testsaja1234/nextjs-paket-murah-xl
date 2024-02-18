import { useGetPackage } from "@/hooks/usePackage";
import { useTransaction } from "@/hooks/useTransaction";
import { Button, Label, Select, TextInput } from "flowbite-react";
import React, { useState } from "react";

export default function FormCreateTransaction({
  reload,
}: {
  reload: () => void;
}) {
  const { create } = useTransaction();
  const { data } = useGetPackage();
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paket, setPaket] = useState("");

  const handleSubmit = () => {
    create({ name, phone_number: phoneNumber, package_id: paket })
      .then((_) => {
        reload();
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="bg-white flex flex-col gap-2 p-2 rounded-lg">
      <div>
        <div className="block">
          <Label htmlFor="small" value="Nama Pelanggan" />
        </div>
        <TextInput
          id="small"
          type="text"
          sizing="sm"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <div className="block">
          <Label htmlFor="small" value="Nomor Telepon" />
        </div>
        <TextInput
          id="small"
          type="text"
          sizing="sm"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
      <div>
        <div className="block">
          <Label htmlFor="small" value="Pilih Paket" />
        </div>
        <Select
          id="package"
          required
          value={paket}
          onChange={(e) => setPaket(e.target.value)}
        >
          <option value={""}>Pilih Paket</option>
          {data.data.map((val, key) => {
            return (
              <option key={key} value={val.id}>
                {val.name}
              </option>
            );
          })}
        </Select>
      </div>

      <Button type="submit" onClick={handleSubmit}>
        Buat Transaksi
      </Button>
    </div>
  );
}
