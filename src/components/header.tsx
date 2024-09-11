import Link from "next/link";
import { cookies } from "next/headers";
import accountApiRequest from "@/apiRequests/account";
import ButtonCustom from "./button";
import { ModeToggle } from "./toggle-mode";

export default async function Header() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken")?.value;
  let user = null;
  if (sessionToken) {
    const data = await accountApiRequest.account(sessionToken);
    user = data.payload.data;
  }
  return (
    <div>
      <ul className="flex space-x-4">
        <li>
          <Link href="/products">Sản phẩm</Link>
        </li>
        {user ? (
          <>
            <li>
              <div>
                Xin chào <strong>{user.name}</strong>
              </div>
            </li>
            <li>
              <ButtonCustom />
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/login">Đăng nhập</Link>
            </li>
            <li>
              <Link href="/register">Đăng ký</Link>
            </li>
          </>
        )}
      </ul>
      <ModeToggle />
    </div>
  );
}
