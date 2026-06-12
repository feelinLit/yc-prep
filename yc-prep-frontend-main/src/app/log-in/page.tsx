"use client";

import {Google} from "@/icons/Google";
import {useRouter} from "next/navigation";
import {setCookie} from "cookies-next";
import {accessTokenCookieName, authUserCookieName, refreshTokenCookieName} from "@/constants";
import {AuthContext} from "@/utils/auth/authProvider";
import {useContext} from "react";

const DEMO_USER = {
  uid: "demo-user",
  email: "demo@ycprep.local",
  displayName: "Demo Founder",
  photoURL: "",
};

export default function Login() {
  const router = useRouter();
  const authContext = useContext(AuthContext);
  const handleGoogleLogin = () => {
    setCookie(authUserCookieName, JSON.stringify(DEMO_USER));
    setCookie(accessTokenCookieName, "demo-token");
    setCookie(refreshTokenCookieName, "demo-token");
    authContext?.setAccessToken("demo-token");
    authContext?.setRefreshToken("demo-token");
    router.push("/onboarding/role");
  };
  return (
    <div className="flex h-dvh flex-col items-center justify-center gap-10 bg-orange-500 text-white">
      <div className="text-center space-y-4 mb-4">
        <h1 className="text-6xl font-bold tracking-tight">App Name</h1>
        <p className="text-xl font-medium text-orange-100">Your Catchy Slogan Goes Here</p>
      </div>
      
      <div className="flex flex-col items-center gap-6 rounded-2xl bg-white/10 p-10 backdrop-blur-md shadow-xl border border-white/20">
        <h2 className="text-3xl font-semibold">Sign in</h2>
        <button 
          onClick={handleGoogleLogin}
          className="flex items-center gap-3 rounded-full bg-white px-6 py-3 transition-transform hover:scale-105 active:scale-95 shadow-lg"
        >
          <Google />
          <span className="text-lg font-medium text-gray-800">
            Continue with Google
          </span>
        </button>
      </div>
    </div>
  );
}
