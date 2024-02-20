"use client";

import FormPackage from "@/components/FormPackage";
import { useGetPackage } from "@/hooks/usePackage";
import { AuthContext } from "@/provider/AuthProvider";
import { Badge, Button, Modal, Spinner } from "flowbite-react";
import React, { useContext, useState } from "react";

export default function Packages() {
  const { data, getPackage, loading } = useGetPackage();
  const [openModalForm, setOpenModalForm] = useState(false);
  const ctx = useContext(AuthContext);

  return (
    <div className="w-full h-full relative">
      <div className="px-8 space-y-2">
        {loading && (
          <Button color="gray">
            <Spinner size="sm" />
            <span className="pl-3">Loading...</span>
          </Button>
        )}
        {data.data.map((val, key) => {
          return (
            <div
              key={key}
              className="flex flex-row border p-4 rounded-md shadow-md shadow-slate-100 items-center relative"
            >
              <div className="flex-1 flex flex-col items-start">
                <h2 className="text-sm font-bold">{val.name}</h2>
                <Badge className="absolute right-0 top-0" color={"warning"}>
                  Stok : {val.stock}
                </Badge>
                <p className="text-xs">{val.desc}</p>
              </div>
              <Badge color={"gray"}>{val.price}</Badge>
            </div>
          );
        })}
      </div>
      {ctx?.userDetail?.role == "admin" && (
        <div className="fixed left-0 bottom-20 right-10">
          <div className="max-w-md mx-auto flex justify-end">
            <div
              className="bg-cyan-600 p-2 rounded-full text-white cursor-pointer"
              onClick={(_) => setOpenModalForm(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </div>
          </div>
        </div>
      )}

      <Modal
        show={openModalForm}
        size="sm"
        dismissible
        onClose={() => setOpenModalForm(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <FormPackage
            reload={() => {
              getPackage();
              setOpenModalForm(false);
            }}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}
