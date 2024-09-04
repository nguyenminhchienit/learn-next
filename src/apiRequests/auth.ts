import http from "@/lib/http";
import {
  LoginBodyType,
  LoginResType,
  RegisterBodyType,
  RegisterResType,
  SlideSessionResType,
} from "@/schemaValidations/auth.schema";
import { MessageResType } from "@/schemaValidations/common.schema";

const authApiRequest = {
  login: (body: LoginBodyType) => {
    return http.post<LoginResType>("/auth/login", body);
  },
  register: (body: RegisterBodyType) => {
    return http.post<RegisterResType>("/auth/register", body);
  },
  auth: (body: { sessionToken: string; expiresAt: string }) => {
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
  slideSessionFromNextServerToServer: (sessionToken: string) => {
    return http.post<SlideSessionResType>(
      "/auth/slide-session",
      {},
      {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      }
    );
  },
  slideSessionFromNextClientToNextServer: () => {
    return http.post<SlideSessionResType>(
      "/api/auth/slide-session",
      {},
      { baseUrl: "" }
    );
  },
};

export default authApiRequest;
