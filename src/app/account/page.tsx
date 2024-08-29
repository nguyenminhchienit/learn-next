import envConfig from "@/configs/config";
import { cookies } from "next/headers";
import React from "react";
import ProfileClient from "./profile";

const Profile = async () => {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken");
  const result = await fetch(
    `${envConfig.NEXT_PUBLIC_API_ENDPOINT}/account/me`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionToken?.value}`,
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
  console.log(result);
  return (
    <div>
      Profile of: {result?.payload?.data?.name}
      <ProfileClient />
    </div>
  );
};

export default Profile;
