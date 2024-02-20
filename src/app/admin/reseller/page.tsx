"use client";

import FormPackage from "@/components/FormPackage";
import { useAuth, useGetUsers } from "@/hooks/useAuth";
import { AuthContext } from "@/provider/AuthProvider";
import { Badge, Button, Label, Modal, TextInput } from "flowbite-react";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";

export default function Reseler() {
  const { data, getAllUsers } = useGetUsers();
  const { topup, create } = useAuth();
  const [openModalForm, setOpenModalForm] = useState(false);
  const [createModalForm, setCreateModalForm] = useState(false);
  const ctx = useContext(AuthContext);

  const [userID, setUserID] = useState<number | null>(null);
  const [balance, setBalance] = useState<any>(null);

  const handleTopup = () => {
    if (userID && balance) {
      topup(userID, { balance: Number(balance) })
        .then((_) => {
          setOpenModalForm(false);
          setBalance(null);
          getAllUsers();
        })
        .catch(() => {
          toast.error("Terjadi kesalahan");
        });
    } else {
      toast.error("Saldo harus diisi");
    }
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCreateUser = () => {
    create({ name, email, password, balance: 0, role: "user" })
      .then((_) => {
        setOpenModalForm(false);
        setBalance(null);
        getAllUsers();
      })
      .catch(() => {
        toast.error("Terjadi kesalahan");
      });
  };

  return (
    <div className="w-full h-full relative">
      <div className="px-8 space-y-2">
        {data?.data?.map((val, key) => {
          return (
            <div
              key={key}
              className="flex flex-row border p-4 rounded-md shadow-md shadow-slate-100 items-center"
            >
              <div className="flex flex-col items-start space-y-1 flex-1">
                <h2 className="text-sm font-bold">{val.name}</h2>
                <p className="text-xs">{val.balance_rp}</p>
                <Badge color={"info"}>Role : {val.role}</Badge>
              </div>
              <div>
                <Button
                  size={"xs"}
                  onClick={() => {
                    setUserID(val.id);
                    setOpenModalForm(true);
                  }}
                >
                  Topup
                </Button>
              </div>
            </div>
          );
        })}
      </div>
      {ctx?.userDetail?.role == "admin" && (
        <div className="fixed left-0 bottom-20 right-10">
          <div className="max-w-md mx-auto flex justify-end">
            <div
              className="bg-cyan-600 p-2 rounded-full text-white cursor-pointer"
              onClick={(_) => setCreateModalForm(true)}
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
        onClose={() => {
          setOpenModalForm(false);
          setBalance(null);
        }}
        popup
        className="p-2"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="mb-2">
            <div className="mb-2 block">
              <Label htmlFor="small" value="Saldo" />
            </div>
            <TextInput
              id="small"
              type="text"
              sizing="sm"
              placeholder="Masukkan nominal saldo"
              value={balance}
              onChange={(e) => setBalance(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full" onClick={handleTopup}>
            Simpan
          </Button>
        </Modal.Body>
      </Modal>
      <Modal
        show={createModalForm}
        size="sm"
        onClose={() => {
          setCreateModalForm(false);
        }}
        popup
        className="p-2"
      >
        <Modal.Header />
        <Modal.Body>
          <form className="flex max-w-md flex-col gap-4">
            <div>
              <div className="mb-1 block">
                <Label htmlFor="name" value="Nama" />
              </div>
              <TextInput
                id="name"
                type="text"
                placeholder="Masukkan nama"
                required
                shadow
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <div className="mb-1 block">
                <Label htmlFor="email2" value="Alamat Email" />
              </div>
              <TextInput
                id="email"
                type="email"
                placeholder="name@gmail.com"
                required
                shadow
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <div className="mb-1 block">
                <Label htmlFor="password2" value="Kata Sandi" />
              </div>
              <TextInput
                id="password2"
                type="password"
                required
                shadow
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>

            <Button type="submit" onClick={handleCreateUser}>
              Buat Akun
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
