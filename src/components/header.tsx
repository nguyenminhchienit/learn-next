import Link from "next/link";
import ButtonCustom from "./button";
import { ModeToggle } from "./toggle-mode";
import { AccountResType } from "@/schemaValidations/account.schema";

export default async function Header({
  user,
}: {
  user: AccountResType["data"] | null;
}) {
  return (
    <div>
      <ul className="flex space-x-4">
        <li>
          <Link href="/products">Sản phẩm</Link>
        </li>
        {user ? (
          <>
            <li>
              <Link href={"/account"}>
                Xin chào <strong>{user.name}</strong>
              </Link>
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
