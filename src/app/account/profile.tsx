"use client";
import React, { useEffect } from "react";
import accountApiRequest from "@/apiRequests/account";

const ProfileClient = () => {
  const [username, setUsername] = React.useState("");

  useEffect(() => {
    const fetchRequest = async () => {
      const result = await accountApiRequest.accountClient();
      if (result?.payload?.data?.name) {
        setUsername(result.payload.data.name);
      }
    };
    fetchRequest();
  }, []);

  return <div>Profile of: {username}</div>;
};

export default ProfileClient;
