"use client"
import PostCard from "@/components/postCard"
import TagCard from "@/components/tagCard"
import { Rocket } from "@/assets/svg"
import { RefObject, useRef } from "react"
import { useGoTop } from "@/hooks/useGoTop"
import { allNotes } from "contentlayer/generated"
import { compareDesc } from "date-fns"
import Link from "next/link"

export default function Note() {
  const notes = allNotes
    .filter((note) => note.published)
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date))
    })

  const backRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)
  useGoTop(backRef)

  return (
    <>
      <div className="min-h-screen w-full bg-secondary bgimg">
        <div ref={backRef} >
          <a className="fixed bottom-[100px] right-[80px] text-baseColor" href="#">
            <Rocket className='custom-svg' />
          </a>
        </div>
        <div className="flex w-9/12 mx-auto pt-[100px] pb-[30px] px-[100px]">
          <div className="w-[300px] pr-[30px]">
            <TagCard title={"分类"} />
          </div>
          <div className="w-3/4 px-[20px] pb-[20px] rounded-lg bg-baseColor">
          {
            notes?.length ? (
              <div>
                {notes.map((note, index) => (
                  <div
                    key={note._id}
                  >
                    <Link href={note.slug}>
                      <PostCard title={note.title} abstract={note.description} tags={["xx", "xxx"]} time={note.date}></PostCard>
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
    </>

  )
}