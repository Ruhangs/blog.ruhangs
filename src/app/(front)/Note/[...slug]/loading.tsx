import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="flex-grow bg-secondary text-baseColor">
      <div className="pt-[100px] pb-[50px] w-full px-[20px] md:px-[40px] lg:w-3/4 lg:mx-auto lg:px-0">
        <Skeleton className="max-lg:hidden fixed top-[100px] h-[38px] w-[80px]" />
        <div className="w-full lg:pl-[100px] lg:pr-[20%] space-y-6">
          <Skeleton className="h-[50px] w-2/4" />
          <Skeleton className="h-[20px] w-1/4" />
          <Skeleton className="h-[20px] w-full" />
          <Skeleton className="h-[20px] w-full" />
        </div>
        <div className="max-lg:hidden fixed top-[100px] right-1/4">
          <div className="w-[250px] h-[500px] mr-[30px] px-[10px] py-[10px] space-y-3 fixed top-[100px] rounded-lg bg-baseColor overflow-y-auto scrollbar">
            <Skeleton className="h-[20px] w-1/4" />
            <Skeleton className="h-[20px] w-3/4" />
            <Skeleton className="h-[10px] w-3/4" />
            <Skeleton className="h-[20px] w-1/4" />
          </div>
        </div>
      </div>
    </div>
  )
}
