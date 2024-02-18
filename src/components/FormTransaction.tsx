"use client";

import React, { useState } from "react";
import Modal from "./Modal";
import { useGetPackage } from "@/hooks/usePackage";
import { useTransaction } from "@/hooks/useTransaction";
import { redirect, useRouter } from "next/navigation";

export default function FormTransaction() {
  const router = useRouter();
  const { create } = useTransaction();
  const { data } = useGetPackage();
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [paket, setPaket] = useState("");

  const handleSubmit = () => {
    create({ name, phone_number: phoneNumber, package_id: paket })
      .then((res) => {
        router.back();
        window.location.replace("/admin/transactions");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="w-full my-6 pr-0">
      <div className="leading-loose">
        <div className="p-10 bg-white rounded shadow-xl">
          <div className="">
            <label className="block text-sm text-gray-600" htmlFor="name">
              Nama Pelanggan
            </label>
            <input
              className="w-full px-3 py-1 text-gray-700 bg-gray-200 rounded"
              id="name"
              name="name"
              type="text"
              placeholder="Nama Pelanggan"
              aria-label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mt-2">
            <label
              className="block text-sm text-gray-600"
              htmlFor="phone_number"
            >
              Nomor Telepon
            </label>
            <input
              className="w-full px-3  py-1 text-gray-700 bg-gray-200 rounded"
              id="phone_number"
              name="phone_number"
              type="text"
              placeholder="Nomor Telepon"
              aria-label="Email"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <div className="mt-2">
            <label className=" block text-sm text-gray-600" htmlFor="message">
              Paket
            </label>
            <select
              value={paket}
              onChange={(e) => setPaket(e.target.value)}
              className="border bg-gray-200 py-1 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value={""}>Pilih Paket</option>
              {data.data.map((val, key) => {
                return (
                  <option key={key} value={val.id}>
                    {val.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="mt-6">
            <button
              className="px-4 py-1 w-full text-white font-light tracking-wider bg-gray-900 rounded"
              type="button"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
