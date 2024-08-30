import http from "@/lib/http";
import { AccountResType } from "@/schemaValidations/account.schema";

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
};

export default accountApiRequest;
