"use client"
import React from 'react'
import { Time, DianZhan } from '@/assets/svg'
import { formatDate } from "@/lib/utils"
import { Tag } from '@prisma/client'

interface Props {
  title: string,
  abstract: string | undefined,
  tags: Tag[],
  time: string
}

export default function PostCard(props: Props) {
  const { title, abstract, tags, time } = props

  return (
    <div className='border-b-[1px]'>
      <div className="min-w-0 my-[10px]" >
        <div className="text-[22px] font-semibold text-primary">{title}</div>
        <div className='mt-[2px] truncate text-baseColor'>{abstract}</div>
        <div className="flex justify-between items-center mt-[10px] truncate text-secondary">
          <div className='text-[14px]'>
            {
              tags ? (
                tags.map((tag) => (
                  <span key={tag.id} className='py-[1px] mr-[5px] cursor-default text-thirdary'>{tag.name}</span>
                ))
              ) : (
                <span></span>
              )
            }
          </div>
          <div>
            <div className="flex gap-x-6">
              <div className='flex items-center gap-x-1'>
                <Time width='20' height='20' className='custom-svg' />
                <p className="text-[16px] text-baseColor">{formatDate(time)}</p>
              </div>
              <div className='flex items-center text-bottom gap-x-1'>
                <DianZhan width='22' height='22' className='custom-svg' />
                <p className="text-[16px] text-baseColor">129</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
