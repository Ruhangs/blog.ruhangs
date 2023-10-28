"use client"
import { RefObject, useRef } from "react"
import { useGoTop } from "@/hooks/useGoTop"
import { Rocket } from "@/assets/svg"
import ProjectCard from "@/components/projectCard"

export default function Project() {
  const backRef: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null)

  useGoTop(backRef)
  return (
    <div className="min-h-screen bg-secondary bgimg">
      <div ref={backRef} >
        <a className="fixed bottom-[100px] right-[80px] text-baseColor" href="#">
          <Rocket className='custom-svg' />
        </a>
      </div>
      <div className="w-9/12 mx-auto pt-[100px] pb-[30px] px-[100px] ">
        <div className="bg-baseColor rounded-xl py-[20px] px-[20px]">
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
          <ProjectCard />
        </div>
      </div>
    </div>
  )
}