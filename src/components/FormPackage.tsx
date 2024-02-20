"use client";

import React, { useState } from "react";
import { Button, Label, TextInput } from "flowbite-react";
import { usePackage } from "@/hooks/usePackage";

export default function FormPackage({ reload }: { reload: () => void }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [desc, setDesc] = useState("");

  const { create } = usePackage();

  const handleSubmit = () => {
    create({ name, price, desc }).then(() => reload());
  };

  return (
    <div className="bg-white flex flex-col gap-2 rounded-lg">
      <div>
        <div className="block">
          <Label htmlFor="small" value="Nama Paket" />
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
          <Label htmlFor="small" value="Harga Paket" />
        </div>
        <TextInput
          id="small"
          type="number"
          sizing="sm"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
        />
      </div>
      <div>
        <div className="block">
          <Label htmlFor="large" value="Deskripsi" />
        </div>
        <TextInput
          id="large"
          type="text"
          sizing="lg"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>
      <Button type="submit" onClick={handleSubmit}>
        Simpan
      </Button>
    </div>
  );
}
