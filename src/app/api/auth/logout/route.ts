import authApiRequest from "@/apiRequests/auth";
import { HttpError } from "@/lib/http";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get("sessionToken");
  if (!sessionToken) {
    return Response.json({ message: "SessionToken Invalid" }, { status: 400 });
  }
  try {
    const result = await authApiRequest.logoutNextServerToServer(
      sessionToken.value
    );
    return Response.json(result.payload, {
      status: 200,
      headers: {
        // Xóa cookie sessionToken
        "Set-Cookie": `sessionToken=; Path=/; HttpOnly; Max-Age=0`,
      },
    });
  } catch (error) {
    if (error instanceof HttpError) {
      return Response.json(error.payload, {
        status: error.status,
      });
    } else {
      return Response.json(
        {
          message: "Lỗi không xác định",
        },
        {
          status: 500,
        }
      );
    }
  }
}
