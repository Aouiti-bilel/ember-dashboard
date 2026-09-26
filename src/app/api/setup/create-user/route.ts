import { auth } from "@/lib/auth"

export async function POST(request: Request) {
  const body = await request.json()

  const result = await auth.api.signUpEmail({
    body: {
      name: body.name,
      email: body.email,
      password: body.password,
    },
  })

  return Response.json(result)
}