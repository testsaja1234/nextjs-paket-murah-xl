"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Button, Label, TextInput } from "flowbite-react";

export default function Admin() {
  const [data, setData] = useState({ email: "", password: "" });
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    login(data.email, data.password).then((_) => router.push("/admin"));
  };

  return (
    <div className="w-full mx-auto max-w-xs flex flex-col items-center justify-center h-screen ">
      {/* <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"> */}
      <form
        className="bg-white flex w-80 max-w-md flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Your email" />
          </div>
          <TextInput
            id="email1"
            type="email"
            placeholder="name@gmail.com"
            required
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Your password" />
          </div>
          <TextInput
            id="password1"
            type="password"
            required
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </div>

        <Button type="submit">Submit</Button>
      </form>

      <p className="text-center text-gray-500 text-xs">
        &copy;2020 Acme Corp. All rights reserved.
      </p>
    </div>
  );
}
