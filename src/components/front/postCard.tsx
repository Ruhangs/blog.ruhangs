"use client"
import React from 'react'
import Image from 'next/image'
import { Time, DianZhan } from '@/assets/svg'
import { formatDate } from "@/lib/utils"
import { Class, Tag } from '@prisma/client'

interface Props {
  title: string,
  abstract: string | undefined,
  tags: Tag[],
  classes: Class[],
  time: string,
  imgSrc: string | null
}

export default function PostCard(props: Props) {
  const { title, abstract, tags, time, imgSrc, classes } = props

  return (
    <div className='rounded-lg bg-baseColor mb-[10px]'>
      <div className="min-w-0 mb-[10px]" >
        {imgSrc && (
          <Image
            src={imgSrc}
            alt={title}
            width={720}
            height={405}
            className="rounded-t-lg w-full h-[250px] max-md:h-[20vh] bg-muted transition-colors"
          // priority {post.content?.toString()}
          />
        )}
        <div className='px-[10px] py-[10px]'>
          <div className="text-[22px] font-semibold text-primary truncate">{title}</div>
          <div className='mt-[2px] truncate text-baseColor'>{abstract}</div>
          <div className="flex justify-between items-center mt-[10px] truncate text-secondary">
            <div className='text-[14px]'>
              {
                classes ? (
                  classes.map((item: Class) => (
                    <span key={item.id} className='py-[1px] mr-[5px] cursor-default text-thirdary'>{item.name}</span>
                  ))
                ) : (
                  <span></span>
                )
              }
              {
                tags ? (
                  tags.map((tag: Tag) => (
                    <span key={tag.id} className='py-[1px] mr-[5px] cursor-default text-thirdary'>{tag.name}</span>
                  ))
                ) : (
                  <span></span>
                )
              }
            </div>
            <div>
              <div className="flex gap-x-2">
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
    </div>
  )
}
