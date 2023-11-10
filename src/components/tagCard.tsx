import { Tag } from '@prisma/client'
import React from 'react'

interface Props {
  title: String
  tags: Tag[]
}

export default function TagCard(props: Props) {
  const { title, tags } = props
  return (
    <div className="w-full h-[500px] mr-[30px] px-[10px] py-[10px] sticky top-[100px] rounded-lg bg-baseColor">
      <div className="text-baseColor">
        <div className="text-[16px]">
          {title}
        </div>
        {
          tags.map(tag => {
            return <span className='inline-block h-[24px] bg-slate-500 mr-[8px] mt-[8px] rounded-md px-[4px] py-[2px] leading-[20px] cursor-pointer' key={tag.id}>{tag.name}</span>
          })
        }
      </div>

    </div>
  )
}
