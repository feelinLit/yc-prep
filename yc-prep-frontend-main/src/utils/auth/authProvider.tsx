"use client";
import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getCookie } from "cookies-next";
import {
  accessTokenCookieName,
  refreshTokenCookieName,
} from "@/constants";

export const AuthContext = React.createContext<{
  accessToken: string;
  setAccessToken: React.Dispatch<React.SetStateAction<string>>;
  refreshToken: string;
  setRefreshToken: React.Dispatch<React.SetStateAction<string>>;
} | null>(null);

export const AuthProvider = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode => {
  const router = useRouter();
  const pathname = usePathname();
  const [accessToken, setAccessToken] = React.useState(
    getCookie(accessTokenCookieName) || "none",
  );
  const [refreshToken, setRefreshToken] = React.useState(
    getCookie(refreshTokenCookieName) || "none",
  );

  useEffect(() => {
    const loggedIn =
      accessToken && accessToken !== "none" && refreshToken && refreshToken !== "none";
    if (!loggedIn) {
      if (pathname !== "/log-in" && pathname !== "/") {
        router.push("/log-in");
      }
    } else if (pathname === "/log-in" || pathname === "/") {
      router.push("/home/levels");
    }
  }, [accessToken, refreshToken, pathname]);

  return (
    <AuthContext.Provider
      value={{ accessToken, setAccessToken, refreshToken, setRefreshToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
