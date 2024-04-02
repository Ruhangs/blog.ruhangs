import { getServerSession } from "next-auth/next"
import * as z from "zod"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"

const tagCreateSchema = z.object({
  name: z.string()
})

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    // if (!session) {
    //   return new Response("Unauthorized", { status: 403 })
    // }

    // const { user } = session
    const posts = await db.tag.findMany({
      select: {
        id: true,
        name: true,
      },
    })

    return new Response(JSON.stringify(posts))
  } catch (error) {
    return new Response(null, { status: 500 })
  }
}


export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return new Response("Unauthorized", { status: 403 })
    }

    const json = await req.json()
    const body = tagCreateSchema.parse(json)

    const classes = await db.tag.create({
      data: {
        name: body.name,
      },
      select: {
        id: true,
      },
    })

    return new Response(JSON.stringify(classes))
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(null, { status: 500 })
  }
}