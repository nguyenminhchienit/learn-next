"use client";
import authApiRequest from "@/apiRequests/auth";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import React, { Suspense, useEffect } from "react";

const LogoutLogic = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionToken = searchParams.get("sessionToken");

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (sessionToken === localStorage.getItem("sessionToken")) {
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

const LogoutAuto = () => {
  return (
    <Suspense>
      <LogoutLogic />
    </Suspense>
  );
};

export default LogoutAuto;
