"use client"
import React from 'react'
import Image from 'next/image'
import TagItem from '../base/tag'
import { Tag } from '@prisma/client'

interface Props {
  title: string,
  image: string,
  des: string,
  tags: Tag[]
}

export default function ProjectCard({ title, image, tags, des }: Props) {

  return (
    <div className='flex items-start h-[150px] mt-8 border-b-[1px]'>
      <div className='w-3/4 text-baseColor'>
        <div className='text-primary text-[22px]'>项目名称：{title}</div>
        {/* TODO 还差项目介绍 */}
        <div className='my-[8px]'>项目介绍：{des}</div>
        <div>技术栈：
          {
            tags ? tags.map((tag) => {
              return <TagItem key={tag.id} name={tag.name} />
            }) : ""
          }
        </div>
      </div>
      <div className='relative overflow-hidden h-[130px] w-[250px]'>
        {
          image !== "" ? <Image
            alt='项目截图'
            src={image}
            fill
          /> : ""
        }

      </div>
    </div>
  )
}
