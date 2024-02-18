"use client";

import { useAuth } from "@/hooks/useAuth";
import { UserDetail } from "@/types/user";
import { createContext, useCallback, useEffect, useState } from "react";

export const AuthContext = createContext<{
  loading: boolean;
  userDetail: UserDetail | null;
  getUserDetail: () => void;
} | null>(null);

export default function AuthProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { getUserDetail } = useAuth();
  const [loading, setLoading] = useState(true);
  const [userDetail, setUserDetail] = useState<UserDetail | null>(null);

  const handleGetUserDetail = useCallback(() => {
    setLoading(true);
    getUserDetail()
      .then((res: any) => {
        setLoading(false);
        setUserDetail(res);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    handleGetUserDetail();
  }, [handleGetUserDetail]);

  return (
    <AuthContext.Provider
      value={{
        loading,
        userDetail: userDetail,
        getUserDetail: () => handleGetUserDetail(),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
