import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"


export default function CardSkeleton() {
  return (
    <div className='w-[48%] h-[150px] bg-baseColor rounded-lg px-[20px] py-[20px] text-center'>
      <Skeleton className="m-auto h-[32px] w-1/4" />
      <div className="border border-dashed my-[20px]"></div>
      <Skeleton className="m-auto h-[32px] w-1/4" />
    </div>
  )
}
