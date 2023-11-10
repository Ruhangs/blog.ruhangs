import React from 'react'
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { EmptyPlaceholder } from "@/components/empty-placeholder"
import { DashboardHeader } from "@/components/header"
import { PostCreateButton } from "@/components/post-create-button"
import { PostItem } from "@/components/post-item"
import { DashboardShell } from "@/components/shell"


export default async function Notes() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const posts = await db.post.findMany({
    where: {
      authorId: user.id,
      type: "note"
    },
    select: {
      id: true,
      title: true,
      published: true,
      createdAt: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  })

  return (
    <DashboardShell className='h-full bg-baseColor rounded-md px-5 py-5'>
      <DashboardHeader heading="笔 记 管 理" text="创建或发布您的笔记">
        <PostCreateButton postType='note' className=' bg-slate-500'/>
      </DashboardHeader>
      <div className='h-[85%]'>
        {posts?.length ? (
          <div className="h-full divide-y divide-border border overflow-y-auto scrollbar px-4">
            {posts.map((post) => (
              <PostItem  key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder>
            <EmptyPlaceholder.Icon name="post" />
            <EmptyPlaceholder.Title>暂无笔记</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              您还没有任何笔记，快开始创作吧！
            </EmptyPlaceholder.Description>
            <PostCreateButton postType='note' variant="outline" />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  )
}
