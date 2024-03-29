"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Button, Checkbox, Label, Spinner, TextInput } from "flowbite-react";
import { toast } from "react-toastify";

export default function Admin() {
  const [data, setData] = useState({ email: "", password: "" });
  const router = useRouter();
  const { login } = useAuth();
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    login(data.email, data.password)
      .then((_) => {
        setLoading(false);
        router.push("/admin");
        window.location.reload();
      })
      .catch((err) => {
        setLoading(false);
        if (err.response) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Terjadi Kesalahan Sistem");
        }
      });
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full mx-auto max-w-xs flex flex-col items-center justify-center h-screen ">
      {/* <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"> */}
      <form
        className="bg-white flex w-80 max-w-md flex-col gap-4"
        onSubmit={handleSubmit}
      >
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Email Address" />
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
            <Label htmlFor="password1" value="Password" />
          </div>

          <TextInput
            id="password1"
            type={showPassword ? "text" : "password"}
            required
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            placeholder="*******"
          />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="remember"
            onChange={() => setShowPassword(!showPassword)}
          />
          <Label htmlFor="remember">Show Password</Label>
        </div>

        <Button type="submit">
          {isLoading && (
            <Spinner aria-label="Alternate spinner button example" size="sm" />
          )}
          <span className="pl-3">Masuk</span>
        </Button>
      </form>

      <p className="text-center text-gray-500 text-xs">
        &copy;2024 Hari Irawan. All rights reserved
      </p>
    </div>
  );
}
