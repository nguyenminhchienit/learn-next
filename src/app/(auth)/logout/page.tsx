"use client";
import authApiRequest from "@/apiRequests/auth";
import { clientSessionToken } from "@/lib/http";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import React, { useEffect } from "react";

const LogoutAuto = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionToken = searchParams.get("sessionToken");

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    if (sessionToken === clientSessionToken.value) {
      authApiRequest.logoutNextClientToNextServer(true, signal).then((res) => {
        router.push("/");
      });
    }
    return () => {
      controller.abort();
    };
  }, [sessionToken, router]);
  return <div></div>;
};

export default LogoutAuto;
