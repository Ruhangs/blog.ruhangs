import React from 'react'
import Image from 'next/image'
import Tag from './base/tag'

export default function ProjectCard() {
  return (
    <div className='flex items-start h-[150px] mt-8 border-b-[1px]'>
      <div className='w-3/4 text-baseColor'>
        <div className='text-primary text-[22px]'>项目名称：</div>
        <div className='my-[8px]'>项目介绍：</div>
        <div>技术栈：<Tag name='Vue'></Tag></div>
      </div>
      <div >
        <Image
          alt='项目截图'
          src={"/images/cqyd.jpeg"}
          width={300}
          height={250}
        />
      </div>
    </div>
  )
}
