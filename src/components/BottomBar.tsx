"use client";
import React, { useContext } from "react";
import MenuIcon from "./MenuIcon";
import { AuthContext } from "@/provider/AuthProvider";

export default function BottomBar() {
  const ctx = useContext(AuthContext);

  return (
    <aside className="fixed bottom-0 left-0 right-0 z-30 ">
      <div
        className={`max-w-md mx-auto items-center bg-white py-2 px-6  grid ${
          ctx?.userDetail?.role == "admin" ? " grid-cols-4" : "grid-cols-3"
        } border-t`}
      >
        <MenuIcon label="Traksaksi" link="/admin">
          <path
            strokeLinejoin="round"
            strokeLinecap="round"
            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </MenuIcon>
        <MenuIcon label="Paket" link="/admin/packages">
          <path
            strokeLinejoin="round"
            strokeLinecap="round"
            d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
          />
          <path
            strokeLinejoin="round"
            strokeLinecap="round"
            d="M6 6h.008v.008H6V6Z"
          />
        </MenuIcon>
        {ctx?.userDetail?.role == "admin" && (
          <MenuIcon label="Pelanggan" link="/admin/reseller">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
            />
          </MenuIcon>
        )}
        <MenuIcon label="Keluar">
          <path
            strokeLinejoin="round"
            strokeLinecap="round"
            d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
          />
        </MenuIcon>
      </div>
    </aside>
  );
}
