import envConfig from "@/configs/config";
import { LoginResType } from "@/schemaValidations/auth.schema";

class HttpError extends Error {
  status: number;
  payload: any;
  constructor({ status, payload }: { status: number; payload: any }) {
    super("Http Error");
    this.status = status;
    this.payload = payload;
  }
}
class sessionToken {
  private token: string = "";
  get value() {
    return this.token;
  }
  set value(value: string) {
    if (typeof window === "undefined") {
      throw new Error("Cannot set token in server");
    }
    this.token = value;
  }
}

export const clientSessionToken = new sessionToken();

type CustomRequest = RequestInit & {
  baseUrl?: string | undefined;
};

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

  if (!res.ok) {
    throw new HttpError(data);
  }

  if (["/auth/login", "/auth/register"].includes(url)) {
    clientSessionToken.value = (payload as LoginResType).data.token;
  } else if ("/auth/logout".includes(url)) {
    clientSessionToken.value = "";
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
