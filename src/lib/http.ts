import envConfig from "@/configs/config";
import { LoginResType } from "@/schemaValidations/auth.schema";
import { normalizeString } from "./utils";
import { redirect } from "next/navigation";

const ENTITY_ERROR_STATUS = 422;
const HTTP_AUTH_STATUS = 401;

type EntityErrorPayload = {
  message: string;
  errors: {
    field: string;
    message: string;
  }[];
};

export class HttpError extends Error {
  status: number;
  payload: {
    message: string;
    [key: string]: any;
  };
  constructor({ status, payload }: { status: number; payload: any }) {
    super("Http Error");
    this.status = status;
    this.payload = payload;
  }
}

export class EntityError extends HttpError {
  status: 422;
  payload: EntityErrorPayload;
  constructor({
    status,
    payload,
  }: {
    status: 422;
    payload: EntityErrorPayload;
  }) {
    super({ status, payload });
    this.status = status;
    this.payload = payload;
  }
}

class sessionToken {
  private token: string = "";
  private _expiresAt = new Date().toISOString();
  get value() {
    return this.token;
  }
  set value(value: string) {
    if (typeof window === "undefined") {
      throw new Error("Cannot set token in server");
    }
    this.token = value;
  }
  get expiresAt() {
    return this._expiresAt;
  }
  set expiresAt(value: string) {
    if (typeof window === "undefined") {
      throw new Error("Cannot set token in server");
    }
    this._expiresAt = value;
  }
}

export const clientSessionToken = new sessionToken();

type CustomRequest = RequestInit & {
  baseUrl?: string | undefined;
};

let clientLogoutRequest: null | Promise<any> = null;
const request = async <Response>(
  method: "POST" | "GET" | "DELETE" | "PUT" | "PATCH",
  url: string,
  options?: CustomRequest | undefined
) => {
  const body = options?.body ? JSON.stringify(options.body) : undefined;
  const baseHeaders = {
    "Content-Type": "application/json",
    Authorization: clientSessionToken.value
      ? `Bearer ${clientSessionToken.value}`
      : "",
  };

  // Nếu không truyền baseUrl (hoặc baseUrl = undefined) thì lấy từ envConfig.NEXT_PUBLIC_API_ENDPOINT
  // Nếu truyền baseUrl thì lấy giá trị truyền vào, truyền vào '' thì đồng nghĩa với việc chúng ta gọi API đến Next.js Server
  const baseUrl =
    options?.baseUrl === undefined
      ? envConfig.NEXT_PUBLIC_API_ENDPOINT
      : options?.baseUrl;

  const fullUrl = url.startsWith("/")
    ? `${baseUrl}${url}`
    : `${baseUrl}/${url}`;

  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers,
    },
    body,
    method,
  });

  const payload: Response = await res.json();
  const data = {
    status: res.status,
    payload,
  };

  // Interceptor là nời chúng ta xử lý request và response trước khi trả về cho phía component
  if (!res.ok) {
    if (res.status === ENTITY_ERROR_STATUS) {
      throw new EntityError(
        data as {
          status: 422;
          payload: EntityErrorPayload;
        }
      );
    } else if (res.status === HTTP_AUTH_STATUS) {
      if (typeof window !== "undefined") {
        if (!clientLogoutRequest) {
          clientLogoutRequest = fetch("api/auth/logout", {
            method: "POST",
            headers: {
              ...baseHeaders,
            },
            body: JSON.stringify({ force: true }),
          });
          await clientLogoutRequest;
          clientSessionToken.value = "";
          clientSessionToken.expiresAt = new Date().toISOString();
          location.href = "/login";
        }
      } else {
        const sessionTokenToServer = (
          options?.headers as any
        )?.Authorization.split("Bearer ")[1];
        redirect(`/logout?sessionToken=${sessionTokenToServer}`);
      }
    } else {
      throw new HttpError(data);
    }
  }

  if (typeof window !== "undefined") {
    if (
      ["auth/login", "auth/register"].some(
        (path) => path === normalizeString(url)
      )
    ) {
      clientSessionToken.value = (payload as LoginResType).data.token;
      clientSessionToken.expiresAt = (payload as LoginResType).data.expiresAt;
    } else if ("auth/logout" === normalizeString(url)) {
      clientSessionToken.value = "";
      clientSessionToken.expiresAt = new Date().toISOString();
    }
  }
  return data;
};

const http = {
  get<Response>(
    url: string,
    options?: Omit<CustomRequest, "body"> | undefined
  ) {
    return request<Response>("GET", url, options);
  },
  post<Response>(
    url: string,
    body: any,
    options?: Omit<CustomRequest, "body"> | undefined
  ) {
    return request<Response>("POST", url, { ...options, body });
  },
  put<Response>(
    url: string,
    body: any,
    options?: Omit<CustomRequest, "body"> | undefined
  ) {
    return request<Response>("PUT", url, { ...options, body });
  },
  delete<Response>(
    url: string,
    body: any,
    options?: Omit<CustomRequest, "body"> | undefined
  ) {
    return request<Response>("DELETE", url, { ...options, body });
  },
};

export default http;
