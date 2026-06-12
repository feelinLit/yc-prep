"use client";
import React, { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";
import {
  accessTokenCookieName,
  refreshTokenCookieName,
  authUserCookieName,
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
  const [accessToken, setAccessToken] = React.useState("none");
  const [refreshToken, setRefreshToken] = React.useState("none");

  useEffect(() => {
    deleteCookie(accessTokenCookieName);
    deleteCookie(refreshTokenCookieName);
    deleteCookie(authUserCookieName);
  }, []);

  useEffect(() => {
    const loggedIn =
      accessToken && accessToken !== "none" && refreshToken && refreshToken !== "none";
    if (!loggedIn) {
      if (pathname !== "/log-in" && pathname !== "/") {
        router.push("/log-in");
      }
    } else if (pathname === "/log-in" || pathname === "/") {
      router.push("/onboarding/role");
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
