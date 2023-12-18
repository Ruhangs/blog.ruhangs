import React from 'react'
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import { authOptions } from "@/lib/auth"
import { getCurrentUser } from "@/lib/session"
import { EmptyPlaceholder } from "@/components/dashboard/empty-placeholder"
import { DashboardHeader } from "@/components/dashboard/header"
import { PostCreateButton } from "@/components/dashboard/post-create-button"
import { PostItem } from "@/components/dashboard/post-item"
import { DashboardShell } from "@/components/dashboard/shell"


export default async function Blogs() {
  const user = await getCurrentUser()

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/login")
  }

  const posts = await db.post.findMany({
    where: {
      authorId: user.id,
      type: "project"
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
      <DashboardHeader heading="文 档 管 理" text="创建或发布您的项目文档">
        <PostCreateButton postType='project' className=' bg-slate-500'/>
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
            <EmptyPlaceholder.Title>暂无项目文档</EmptyPlaceholder.Title>
            <EmptyPlaceholder.Description>
              您还没有任何项目文档，快开始创作吧！
            </EmptyPlaceholder.Description>
            <PostCreateButton postType='project' variant="outline" />
          </EmptyPlaceholder>
        )}
      </div>
    </DashboardShell>
  )
}
