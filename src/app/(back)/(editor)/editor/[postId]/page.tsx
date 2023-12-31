import { notFound, redirect } from "next/navigation"
import { Post, User } from "@prisma/client"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/db"
import { getCurrentUser } from "@/lib/session"
import { Editor } from "@/components/editor/vditor"

async function getPostForUser(postId: Post["id"], userId: User["id"]) {
  return await db.post.findFirst({
    where: {
      id: postId,
      authorId: userId,
    },
    include: {
      tags: true,
      class: true
    }
  })
}

async function getInitData() {
  const allTags = await db.tag.findMany()
  const allClasses = await db.class.findMany()
  return { allTags, allClasses }
}

interface EditorPageProps {
  params: { postId: string }
}

export default async function EditorPage({ params }: EditorPageProps) {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const post = await getPostForUser(params.postId, user.id)
  const res = await getInitData()

  if (!post) {
    notFound()
  }

  return (
    <Editor
      post={{
        id: post.id,
        title: post.title,
        content: post.content,
        published: post.published,
        image: post.image,
        des: post.des
      }}
      selectTag={post.tags}
      selectClass={post.class}
      allTag={res.allTags}
      allClass={res.allClasses}
    />
  )
}
