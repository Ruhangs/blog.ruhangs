import Profile from '@/components/front/profile'
import Card from '@/components/base/card'
import ArticleList from '@/components/base/articleList'
import { Rocket } from "@/assets/svg"
import { Suspense } from 'react'
import CardSkeleton from '@/components/skeleton/cardSkeleton'
import ArticleListSkeleton from '@/components/skeleton/articleListSkeleton'

export default function Home() {

  return (
    <div className='flex-grow bg-secondary text-baseColor bgimg'>
      <div id="goTop">
        <a className="fixed bottom-[100px] right-[80px] text-baseColor" href="#">
          <Rocket className='custom-svg' />
        </a>
      </div>
      <div className='pt-[100px] pb-[30px] lg:px-[100px] w-full mx-0 px-[20px] lg:flex lg:w-10/12 lg:mx-auto'>
        <Profile />
        <div className='flex-1'>
          <div className='flex w-full justify-between'>
            <Suspense fallback={<CardSkeleton />}>
              <Card title={"博 客"} />
            </Suspense>
            <Suspense fallback={<CardSkeleton />}>
              <Card title={"笔 记"} />
            </Suspense>
          </div>
          <Suspense fallback={<ArticleListSkeleton />}>
            <ArticleList />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
