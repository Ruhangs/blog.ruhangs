"use client"
import React from 'react'
// @ts-ignore
import MarkdownNavbar from '@/lib/navbar'
import "@/styles/navbar.css"

interface Props {
  content: string
}


export default function Catalogue({ content }: Props) {
  return (
    <div className="w-[250px] h-[500px] mr-[30px] px-[10px] py-[10px] fixed top-[100px]  rounded-lg bg-baseColor overflow-y-auto scrollbar">
      <div className="text-baseColor">
        <div className="text-[16px] mb-[10px]">
          目录
        </div>
        <MarkdownNavbar
          className="cursor-pointer"
          source={content}
          headingTopOffset={90} //离顶部的距离
          ordered={false}   //是否显示标题题号1,2等
        />
      </div>

    </div>
  )
}
