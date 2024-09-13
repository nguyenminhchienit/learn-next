"use client";
import React from "react";
import { Button } from "./ui/button";
import { handleErrorApi } from "@/lib/utils";
import authApiRequest from "@/apiRequests/auth";
import { usePathname, useRouter } from "next/navigation";
import { useAppContext } from "@/app/AppProvider";

const ButtonCustom = () => {
  const { user } = useAppContext();
  console.log("user api context: ", user);

  const router = useRouter();
  const pathname = usePathname();
  const handleLogout = async () => {
    try {
      await authApiRequest.logoutNextClientToNextServer();
      router.push("/login");
    } catch (error) {
      handleErrorApi({
        error,
      });
      authApiRequest.logoutNextClientToNextServer(true).then((res) => {
        router.push(`/login?redirectFrom=${pathname}`);
      });
    } finally {
      router.refresh();
      localStorage.removeItem("sessionToken");
      localStorage.removeItem("sessionTokenExpiresAt");
    }
  };
  return (
    <Button size={"sm"} className="flex flex-shrink-0" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default ButtonCustom;
