"use client";
import Link from "next/link";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { Button, Modal } from "flowbite-react";

export default function MenuIcon({ label, link, children }: any) {
  const [openModal, setOpenModal] = useState(false);
  if (link) {
    return (
      <Link href={link ? link : "/home"} scroll={false}>
        <div className="flex flex-col items-center cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            {children}
          </svg>
          {label}
        </div>
      </Link>
    );
  } else {
    return (
      <>
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
                Apakah kamu yakin ingin keluar?
              </h3>
              <div className="flex justify-center gap-4">
                <Button color="gray" onClick={() => setOpenModal(false)}>
                  Batal
                </Button>
                <Button
                  color="failure"
                  onClick={() => {
                    Cookies.remove("currentUser");
                    Cookies.remove("package_id");
                    window.location.reload();
                  }}
                >
                  Keluar
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => setOpenModal(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            {children}
          </svg>
          {label}
        </div>
      </>
    );
  }
}
