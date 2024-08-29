export async function POST(req: Request) {
    const res = await req.json()
    const sessionToken = res;
    if (!sessionToken) {
        return Response.json({message: "SessionToken Invalid"},{status: 400})
    }
    return Response.json({ res }, {
        status: 200,
        headers: {
            'Set-Cookie': `sessionToken=${sessionToken}; HttpOnly; Path=/`
        }
  })
}