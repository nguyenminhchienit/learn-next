import http from "@/lib/http";
import {
  AccountResType,
  UpdateMeBodyType,
} from "@/schemaValidations/account.schema";

const accountApiRequest = {
  account: (sessionToken: string) => {
    return http.get<AccountResType>("/account/me", {
      headers: {
        Authorization: `Bearer ${sessionToken}`,
      },
    });
  },
  accountClient: () => {
    return http.get<AccountResType>("/account/me");
  },
  accountUpdateClient: (body: UpdateMeBodyType) => {
    return http.put<AccountResType>("/account/me", body);
  },
};

export default accountApiRequest;
