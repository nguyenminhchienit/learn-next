import { cookies } from "next/headers";
import React from "react";
import accountApiRequest from "@/apiRequests/account";
import ButtonCustom from "@/components/button";
import ProfileForm from "./profile-form";

const Profile = async () => {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken");
  const result = await accountApiRequest.account(sessionToken?.value || "");

  return (
    <div className="flex h-screen flex-col gap-5 items-center justify-center">
      Profile of: {result?.payload?.data?.name}
      <ProfileForm profile={result?.payload?.data} />
      <div>
        <ButtonCustom />
      </div>
    </div>
  );
};

export default Profile;
