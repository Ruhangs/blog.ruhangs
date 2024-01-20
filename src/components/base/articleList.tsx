import React from 'react'
import { db } from '@/lib/db'
import Link from 'next/link'

export const dynamic = "force-dynamic"

export default async function ArticleList() {

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

  const classes = await db.class.count()

  const tags = await db.tag.count()


  return (
    <div className='w-full bg-baseColor rounded-lg mt-[20px] px-[20px] py-[20px] text-center'>
      <span className='text-[22px] text-primary'>时 间 线</span>
      <p>{classes + "分类 × " + tags + "标签 × " + allPosts.length + "文章 "}</p>
      <ul className='text-start mt-[20px]'>
        {
          allPosts ? allPosts.map((post) => {
            return (
              <li key={post.id} className='h-[30px] border-b-[1px] border-dashed border-dark truncate hover:border-light'>
                <span className='inline-block text-[#747474] w-[95px]'>{post.createdAt.toLocaleDateString()}</span>
                <Link href={post.type === "blog" ? `/Blog/${post.id}` : `/Note/${post.id}`} >{post.title}</Link>
              </li>
            )
          }) : (
            <p className="text-center mt-[100px] text-baseColor text-[26px]">暂 无 文 章</p>
          )
        }
      </ul>
    </div>
  )
}
