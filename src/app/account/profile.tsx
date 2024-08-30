"use client";
import React, { useEffect } from "react";
import accountApiRequest from "@/apiRequests/account";

const ProfileClient = () => {
  useEffect(() => {
    const fetchRequest = async () => {
      const result = await accountApiRequest.accountClient();
      console.log(" call from next client: ", result);
    };
    fetchRequest();
  }, []);

  return <div>Profile of:</div>;
};

export default ProfileClient;
