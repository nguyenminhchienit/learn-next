import React from "react";
import LoginForm from "./login-form";

const page = async () => {
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  return (
    <div className="my-auto w-full">
      <h1 className="flex justify-center text-xl font-bold">Đăng nhập</h1>
      <div className="flex justify-center">
        <LoginForm />
      </div>
    </div>
  );
};

export default page;
