"use client";

import FormCreateTransaction from "@/components/FormCreateTransaction";
import { useGetTransaction, useTransaction } from "@/hooks/useTransaction";
import { AuthContext } from "@/provider/AuthProvider";
import { Badge, Button, Modal, Pagination, Spinner } from "flowbite-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useContext, useState } from "react";
import { Bounce, toast } from "react-toastify";

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

  async function copyTextToClipboard(text: string) {
    if ("clipboard" in navigator) {
      toast.success(`Copied ${text} `, {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }

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
                <div className="flex items-center">
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

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                    onClick={() => {
                      console.log(val.phone_number);
                      copyTextToClipboard(val.phone_number);
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
                    />
                  </svg>
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
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <FormCreateTransaction
            reload={() => {
              setOpenModalForm(false);
              getTransaction();
            }}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}
