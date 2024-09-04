import http from "@/lib/http";
import {
  LoginBodyType,
  LoginResType,
  RegisterBodyType,
  RegisterResType,
} from "@/schemaValidations/auth.schema";
import { MessageResType } from "@/schemaValidations/common.schema";

const authApiRequest = {
  login: (body: LoginBodyType) => {
    return http.post<LoginResType>("/auth/login", body);
  },
  register: (body: RegisterBodyType) => {
    return http.post<RegisterResType>("/auth/register", body);
  },
  auth: (body: string) => {
    return http.post("/api/auth", body, {
      baseUrl: "",
    });
  },
  logoutNextServerToServer: (sessionToken: string) => {
    return http.post<MessageResType>(
      "/auth/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    );
  },
  logoutNextClientToNextServer: (
    force?: boolean | undefined,
    signal?: AbortSignal | undefined
  ) => {
    return http.post<MessageResType>(
      "/api/auth/logout",
      { force },
      {
        baseUrl: "",
        signal,
      }
    );
  },
};

export default authApiRequest;
