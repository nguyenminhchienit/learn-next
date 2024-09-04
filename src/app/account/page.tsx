import { cookies } from "next/headers";
import React from "react";
import ProfileClient from "./profile";
import accountApiRequest from "@/apiRequests/account";
import ButtonCustom from "@/components/button";

const Profile = async () => {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken");
  const result = await accountApiRequest.account(sessionToken?.value || "");

  return (
    <div>
      Profile of: {result?.payload?.data?.name}
      {/* <ProfileClient /> */}
      <ButtonCustom />
    </div>
  );
};

export default Profile;
