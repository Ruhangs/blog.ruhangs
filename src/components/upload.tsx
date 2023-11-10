"use client"
import React, { ChangeEventHandler, useState } from 'react'
import Image from 'next/image'
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Close } from '@/assets/svg'


interface Props {
  accept: string
  upload: ChangeEventHandler<HTMLInputElement>
  imageSrc: string | ""
}

export default function Upload({ accept, upload, imageSrc }: Props) {

  const handleClick = (e: any) => {
    const upimg = document.getElementById("upload");
    upimg?.click()
    e.preventDefault()
  }


  const close = () => {
    const el = document.querySelector("#image")
    console.log(el?.classList);
    el?.classList.add("hidden")
  }

  return (
    <div className="relative">
      <button className={`${cn(buttonVariants())} bg-slate-500`} onClick={handleClick}>{imageSrc === "" ? "上传封面" : "重传封面"}</button>
      <input id='upload' type="file" name="image" accept={accept} onChange={upload} className="hidden" />
      <div id='image' className={imageSrc ? "absolute z-20 w-[200px] h-[180px]" : "hidden"}>
        {
          imageSrc
            ? <div className='relative w-[300px] h-[180px] college'>
              <Image src={imageSrc} alt='预览封面' fill />
              <div className="hidden absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 mask">
                <Close fill="white" width="20" height="20" className="float-right mt-[5px] mr-[5px]" onClick={close} />
              </div>
            </div>
            : ""
        }
      </div>
    </div>
  )
}
