"use client"
import React, { useEffect, useState } from 'react'
import { Class, Tag } from '@prisma/client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'



export default function TagCard({ classes, tags }: { classes: Class[], tags: Tag[] }) {

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleClick(type: string, id: string) {
    const params = new URLSearchParams(searchParams);
    if (id) {
      params.set('type', type);
      params.set('id', id);
    } else {
      params.delete('type');
      params.delete('id');
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="w-full lg:h-[500px] mr-[30px] px-[10px] py-[10px] sticky top-[100px] rounded-lg bg-baseColor">
      <div className="text-baseColor h-1/2">
        <div className="text-[18px] font-bold">
          分类:
        </div>
        {
          classes?.map(tag => {
            return <span
              className='inline-block h-[24px] bg-secondary mr-[8px] mt-[8px] rounded-xl px-[8px] py-[2px] leading-[20px] cursor-pointer hover:text-primary'
              key={tag.id}
              onClick={() => handleClick("class", tag.id)}
            >
              {tag.name}
            </span>
          })
        }
      </div>
      <div className="text-baseColor">
        <div className="text-[18px] font-bold">
          标签:
        </div>
        {
          tags?.map(tag => {
            return <span
              className='inline-block h-[24px] bg-secondary mr-[8px] mt-[8px] rounded-xl px-[8px] py-[2px] leading-[20px] cursor-pointer hover:text-primary'
              key={tag.id}
              onClick={() => handleClick("tag", tag.id)}
            >
              {tag.name}
            </span>
          })
        }
      </div>
    </div>
  )
}
