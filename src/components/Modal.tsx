"use client";
import React from "react";
import { redirect, useRouter } from "next/navigation";

export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-screen w-full bg-slate-400 bg-opacity-55  z-50 ">
        <div className="h-screen w-full flex items-center justify-center ">
          <button
            className="absolute  left-0 right-0 top-0 bottom-0"
            onClick={() => {
              router.back();
            }}
          ></button>
          <div className="relative ">{children}</div>
        </div>
      </div>
    </>
  );
}
