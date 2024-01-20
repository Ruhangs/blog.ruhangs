import React, { useRef } from 'react'
import { QQ, Wechat, Mail, Github } from '@/assets/svg'
import { db } from '@/lib/db'
import Image from 'next/image'
import { Profile } from '@prisma/client'

export default async function Profile() {


  const profileInfo = await db.user.findFirst({
    select:{
      name: true,
      email: true,
      profile: true
    }
  })

  return (
    <div className="w-full px-[10px] py-[10px] mb-[20px] lg:w-[250px] lg:h-[500px] lg:mr-[30px] lg:sticky lg:top-[100px] rounded-lg bg-baseColor text-baseColor">
      <div className="w-full px-[20px] py-[20px]" id="mycard">
        <div className="text-center">
          <div className="mt-[10px]">
            {/* <span className="status">
                <i>努力!!!</i>
              </span> */}
            <Image
              className='mx-auto rounded-[50px]'
              alt='头像'
              src={"/images/avatar.jpg"}
              width={100}
              height={100}
            />
          </div>
          <h3 className='text-[22px] font-bold text-primary mt-[5px]'>{profileInfo?.name}</h3>
          <p className="text-[12px]">
            <span>{profileInfo?.profile?.introduction}</span>
          </p>
        </div>
        <div className="border border-dashed my-[20px]"></div>
        <div className="px-[30px] flex items-center justify-evenly">
          <a title={`wx:${profileInfo?.profile?.weixin}`}>
            <Wechat className="custom-svg" />
          </a>
          <a title="github:ruhangs" href="https://github.com/Ruhangs">
            <Github className="custom-svg" />
          </a>
          <a title={`email:${profileInfo?.email}`} href={`Mailto:${profileInfo?.email}?Subject=邮箱标题&amp;Body=邮箱内容！`}>
            <Mail className="custom-svg" />
          </a>
          <a title={`QQ:${profileInfo?.profile?.qq}`}>
            <QQ className="custom-svg" />
          </a>
        </div>
        <div className="border border-dashed my-[20px]"></div>

        <div className='flex justify-between h-[30px] leading-[30px]'>
          <span>毕业院校</span>
          <span className='text-[#747474]'>{profileInfo?.profile?.university}</span>
        </div>
        <div className='flex justify-between h-[30px] leading-[30px]'>
          <span>所在城市</span>
          <span className='text-[#747474]'>{profileInfo?.profile?.hometown}</span>
        </div>
        

        <div className="border border-dashed my-[20px]"></div>

        <div className="w-9/12 h-[40px] mx-auto bg-primary text-center leading-[40px] rounded-full">
          <a className="button" href={`Mailto:${profileInfo?.email}?Subject=邮箱标题&amp;Body=邮箱内容！`}>联系我</a>
        </div>
      </div>
    </div>
  )

}