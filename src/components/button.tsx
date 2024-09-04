"use client";
import React from "react";
import { Button } from "./ui/button";
import { handleErrorApi } from "@/lib/utils";
import authApiRequest from "@/apiRequests/auth";
import { usePathname, useRouter } from "next/navigation";

const ButtonCustom = () => {
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
    }
  };
  return (
    <Button size={"sm"} onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default ButtonCustom;
