"use client";

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/provider/AuthProvider";
import { Badge, Button, Spinner } from "flowbite-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function Header() {
  const ctx = useContext(AuthContext);
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const pathname = usePathname();

  return (
    <>
      <nav className=" fixed top-0 left-0 right-0 w-full z-50 bg-white">
        <div
          className={`max-w-md mx-auto  ${
            pathname === "/admin" ? "pt-4" : "py-4"
          } px-6 border-b `}
        >
          <div className="flex items-center ">
            {ctx?.loading ? (
              <React.Fragment>
                <Spinner
                  aria-label="Alternate spinner button example"
                  size="sm"
                />
                <span className="pl-3">Loading...</span>
              </React.Fragment>
            ) : (
              <div className="flex flex-1 items-center">
                {ctx?.userDetail?.name}{" "}
                <Badge className="ml-2">{ctx?.userDetail?.role}</Badge>
              </div>
            )}
            {ctx?.userDetail?.role === "user" && (
              <div>{ctx?.userDetail?.balance}</div>
            )}

            {ctx?.userDetail?.role === "admin" && (
              <Link href={"/admin/package"}>
                <Button size={"xs"}>Paket</Button>
              </Link>
            )}
          </div>
          {pathname === "/admin" && (
            <div className="flex-1 flex mt-4">
              <Link href={"/admin?status=PROCESSING"} className="flex-1">
                <div
                  className={`flex justify-center py-2  text-gray-800 cursor-pointer rounded-t-lg ${
                    status !== "DONE" && "bg-gray-200"
                  }`}
                >
                  Diproses
                </div>
              </Link>
              <Link href={"/admin?status=DONE"} className="flex-1">
                <div
                  className={`flex justify-center py-2  text-gray-800 cursor-pointer rounded-t-lg ${
                    status === "DONE" && "bg-gray-200"
                  }`}
                >
                  Selesai
                </div>
              </Link>
            </div>
          )}
        </div>
      </nav>
      <div className={pathname === "/admin" ? "mt-28" : "mt-16"}></div>
    </>
  );
}
