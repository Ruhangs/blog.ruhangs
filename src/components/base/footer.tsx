"use client"
import React from 'react'
import { usePathname } from 'next/navigation'

interface Props {
  className: string
}

export default function Footer({className}: Props) {
  const pathName = usePathname()
  return (
    <div>
      <div className={`${className} h-[80px] w-full  text-center text-thirdary pt-[40px] max-md:pt-[20px]`}>
        Copyright © Ruhangs 2023 备案号：渝ICP备2023004086号
      </div>
    </div>
  )
}
