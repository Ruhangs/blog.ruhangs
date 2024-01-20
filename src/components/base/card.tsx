import { db } from '@/lib/db'
import React from 'react'


interface Props {
  title: string
}


export default async function Card({ title }: Props) {

  let allBlog = null
  if(title === "博 客"){
    allBlog = await db.post.findMany({
      where: {
        type: "blog",
        published: true,
      }
    })
  }else{
    allBlog = await db.post.findMany({
      where: {
        type: "note",
        published: true,
      }
    })
  }

  return (
    <div className='w-[48%] h-[150px] bg-baseColor rounded-lg px-[20px] py-[20px] text-center'>
      <span className='text-[22px] text-primary'>{title}</span>
      <div className="border border-dashed my-[20px]"></div>
      <span className='text-[22px] '>{allBlog.length}</span>
    </div>
  )
}
