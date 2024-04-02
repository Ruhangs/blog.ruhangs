import { getServerSession } from "next-auth/next"
import * as z from "zod"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"


export async function GET(){

  try {
    const allPosts = await db.post.findMany({
      where:{
        OR:[
          {type: "blog"},
          {type: "note"}
        ],
        published: true
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        type: true
      },
      orderBy: [
        {
          createdAt: "desc"
        }
      ]
    })
    return new Response(JSON.stringify(allPosts))
  } catch (error) {
    return new Response(null, { status: 500 })
  }
  
}


