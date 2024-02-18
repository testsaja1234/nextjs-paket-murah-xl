"use client";

import { useGetTransaction } from "@/hooks/useTransaction";
import React from "react";

export default function Transactions() {
  const { data } = useGetTransaction();

  return (
    <div className="w-full h-full">
      <div className="px-8 space-y-2">
        {data.data.map((val, key) => {
          return (
            <div key={key} className="w-full flex flex-row border p-2">
              <div className="flex-1">
                <h3>{val.name}</h3>
                <h3>{val.phone_number}</h3>
              </div>
              <div>
                <h3>{val.package_name}</h3>
                <h3>{val.status}</h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
