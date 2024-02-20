"use client";

import { useGetPackage } from "@/hooks/usePackage";
import React from "react";
import Cookies from "js-cookie";

export default function PackageList() {
  const { data } = useGetPackage();

  if (data.data.length < 1) {
    // window.location.replace("/admin");
  }

  return (
    <div className=" bg-white px-4 space-y-2  py-4 rounded-md ">
      {data.data.map((val, key) => {
        return (
          <div
            key={key}
            onClick={() => {
              Cookies.set("package_id", String(val.id));
              window.location.replace("/admin");
            }}
            className="flex flex-row border p-4 rounded-md bg-white items-center w-full cursor-pointer"
          >
            <div className="flex-1 ">
              <h2 className="text-sm font-bold">{val.name}</h2>
              <p className="text-xs">{val.desc}</p>
            </div>
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
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </div>
        );
      })}
    </div>
  );
}
