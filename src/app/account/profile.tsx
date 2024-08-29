"use client";
import React, { useEffect } from "react";
import { useAppContext } from "../AppProvider";
import envConfig from "@/configs/config";

const ProfileClient = () => {
  const { sessionToken } = useAppContext();
  useEffect(() => {
    const fetchRequest = async () => {
      const result = await fetch(
        `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/account/me`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionToken}`,
          },
        }
      ).then(async (res) => {
        const payload = await res.json();
        const data = {
          status: res.status,
          payload,
        };
        if (!res.ok) {
          throw data;
        }
        return data;
      });
      console.log(" call from next client: ", result);
    };
    fetchRequest();
  }, [sessionToken]);
  return <div>Profile</div>;
};

export default ProfileClient;
