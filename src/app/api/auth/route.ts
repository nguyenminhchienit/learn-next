export async function POST(req: Request) {
  const body = await req.json();
  const sessionToken = body.sessionToken as string;
  const expiresAt = body.expiresAt as string;
  if (!sessionToken) {
    return Response.json({ message: "SessionToken Invalid" }, { status: 400 });
  }

  const expiresDate = new Date(expiresAt).toUTCString();
  return Response.json(
    { body },
    {
      status: 200,
      headers: {
        "Set-Cookie": `sessionToken=${sessionToken}; HttpOnly; Path=/; Expires=${expiresDate}; SameSite=Lax; Secure`,
      },
    }
  );
}
