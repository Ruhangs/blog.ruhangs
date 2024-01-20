import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"


export default function ArticleListSkeleton() {
  return (
    <div className='w-full h-[250px] bg-baseColor rounded-lg mt-[20px] px-[20px] py-[20px] text-center space-y-3'>
      <Skeleton className="m-auto h-[38px] w-[80px]" />
      <Skeleton className="m-auto h-[20px] w-[250px]" />
      <Skeleton className="h-[20px] w-full" />
      <Skeleton className="h-[20px] w-full" />
    </div>
  )
}
