import { decodeJWT } from "@/lib/utils";

type PayloadJWT = {
  iat: number;
  exp: number;
  tokenType: string;
  userId: number;
};

export async function POST(req: Request) {
  const res = await req.json();
  const sessionToken = res;
  if (!sessionToken) {
    return Response.json({ message: "SessionToken Invalid" }, { status: 400 });
  }
  const payload = decodeJWT<PayloadJWT>(sessionToken);
  const expiresDate = new Date(payload.exp * 1000).toUTCString();
  return Response.json(
    { res },
    {
      status: 200,
      headers: {
        "Set-Cookie": `sessionToken=${sessionToken}; HttpOnly; Path=/; Expires=${expiresDate}; SameSite=Lax; Secure`,
      },
    }
  );
}
