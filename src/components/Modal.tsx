"use client";
import React from "react";
import { redirect, useRouter } from "next/navigation";

export default function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-screen  flex items-center bottom-0 w-full bg-slate-400 bg-opacity-55  z-50 ">
        <div className="w-full  max-w-md mx-auto px-4">{children}</div>
      </div>
    </>
  );
}
