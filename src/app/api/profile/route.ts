import { getServerSession } from "next-auth"
import * as z from "zod"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { profilePatchSchema } from "@/lib/validations/post"

export async function PATCH(
  req: Request,
) {
  try {
    const session = await getServerSession(authOptions)
    const json = await req.json()
    const body = profilePatchSchema.parse(json)

    const userProfile = await db.profile.findFirst({
      where:{
        userId: session?.user.id
      }
    })

    if(userProfile){
      await db.user.update({
        where: {
          id: session?.user.id,
        },
        data: {
          name: body.name,
          email: body.email,
          password: body.password,
          profile: {
            update:{
              github: body.github,
              qq: body.qq,
              weixin: body.weixin,
              hometown: body.hometown,
              university: body.university,
              introduction: body.introduction
            }
          }
        },
      })
    }else{
      await db.user.update({
        where: {
          id: session?.user.id,
        },
        data: {
          name: body.name,
          email: body.email,
          password: body.password,
          profile: {
            create:{
              github: body.github,
              qq: body.qq,
              weixin: body.weixin,
              hometown: body.hometown,
              university: body.university,
              introduction: body.introduction
            }
          }
        },
      })
    }
    
    return new Response(null, { status: 200 })
  } catch (error) {

    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 })
    }

    return new Response(JSON.stringify(error), { status: 500 })
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    const user = await db.user.findFirst({
      where: {
        id: session?.user.id,
      },
      select:{
        name:true,
        email:true,
        password: true,
        profile: true
      }
    })
    return new Response(JSON.stringify(user), { status: 200 })
  } catch (error) {

    return new Response(null, { status: 500 })
  }

}