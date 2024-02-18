"use client";

import FormCreateTransaction from "@/components/FormCreateTransaction";
import { useGetTransaction, useTransaction } from "@/hooks/useTransaction";
import { AuthContext } from "@/provider/AuthProvider";
import { Badge, Button, Modal, Pagination, Spinner } from "flowbite-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useContext, useState } from "react";

export default function Admin() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [openModal, setOpenModal] = useState(false);
  const [openModalForm, setOpenModalForm] = useState(false);
  const { loading, data, getTransaction } = useGetTransaction();
  const { process } = useTransaction();
  const [id, setId] = useState<number | null>(null);
  const ctx = useContext(AuthContext);

  return (
    <>
      <div className="w-full min-h-96 overflow-y-scroll  relative">
        <div className="px-8 space-y-2 mb-16  ">
          {loading && (
            <Button color="gray">
              <Spinner size="sm" />
              <span className="pl-3">Loading...</span>
            </Button>
          )}
          {data.data.map((val, key) => {
            return (
              <div
                className="flex flex-row border p-4 rounded-md shadow-md shadow-slate-100 items-center"
                key={key}
              >
                <div className="flex-1">
                  <h3 className="flex items-center">
                    {val.name}
                    <Badge className="text-xs ml-1" color={"purple"}>
                      {val.package_name}
                    </Badge>
                  </h3>
                  <div>{val.phone_number}</div>
                </div>
                <div>
                  {ctx?.userDetail?.role === "user" || val.status === "DONE" ? (
                    <Badge>
                      {val.status === "DONE" ? "Selesai" : "Sedang Diproses"}
                    </Badge>
                  ) : (
                    <Button
                      size={"xs"}
                      onClick={() => {
                        setOpenModal(true);
                        setId(val.id);
                      }}
                    >
                      PROSES
                    </Button>
                  )}
                </div>
              </div>
            );
          })}

          {data.last_page > 1 && (
            <div className="flex overflow-x-auto sm:justify-center">
              <Pagination
                layout="navigation"
                currentPage={data.current_page}
                totalPages={data.last_page}
                onPageChange={(page) => {
                  const current = new URLSearchParams(searchParams);
                  current.set("page", String(page));
                  router.push(`${pathname}?${current}`);
                }}
                showIcons
              />
            </div>
          )}
        </div>
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
      </div>
      <Modal
        show={openModal}
        size="sm"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Apakah kamu yakin ingin transaksi ini sudah selesai?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="gray" onClick={() => setOpenModal(false)}>
                Batal
              </Button>
              <Button
                color="success"
                onClick={() => {
                  console.log(id);
                  if (id != null) {
                    process(id)
                      .then(() => {
                        setOpenModal(false);
                        window.location.reload();
                      })
                      .catch((err) => alert("Terjadi Kesalahan"));
                  }
                }}
              >
                Ya, Saya yakin
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        show={openModalForm}
        size="sm"
        dismissible
        onClose={() => setOpenModalForm(false)}
      >
        <FormCreateTransaction
          reload={() => {
            setOpenModalForm(false);
            getTransaction();
          }}
        />
      </Modal>
    </>
  );
}
