"use client"
import { RefObject, useRef } from "react"
import { useGoTop } from "@/hooks/useGoTop"
import PostCard from "@/components/postCard"
import TagCard from "@/components/tagCard"
import { allPosts } from "contentlayer/generated"
import { compareDesc } from "date-fns"
import Link from "next/link"
import { Rocket } from "@/assets/svg"




export default function Blog() {
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date))
    })

  const backRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)

  useGoTop(backRef)
  return (
    <div className="min-h-screen bg-secondary bgimg">
      <div ref={backRef} >
        <a className="fixed bottom-[100px] right-[80px] text-baseColor" href="#">
          <Rocket className='custom-svg' />
        </a>
      </div>
      <div className="flex w-9/12 mx-auto py-[100px] px-[100px] ">
        <div className="w-[300px] pr-[30px]">
          <TagCard title={"标签"} />
        </div>
        <div className="w-3/4 px-[20px] pb-[20px] rounded-lg bg-baseColor">
          {
            posts?.length ? (
              <div>
                {posts.map((post, index) => (
                  <div
                    key={post._id}
                  >
                    <Link href={post.slug}>
                      <PostCard title={post.title} abstract={post.description} tags={["xx", "xxx"]} time={post.date}></PostCard>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center mt-[100px] text-baseColor text-[26px]">暂 无 文 章</p>
            )
          }
        </div>
      </div>
    </div>
  )
}