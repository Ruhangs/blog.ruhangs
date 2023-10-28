"use client"
import React, { useRef } from 'react'
import { handelrImgUrl } from '@/utils/useHandlerURL'
import { QQ, Wechat, Mail, Github } from '@/assets/svg'
import Image from 'next/image'

export default function Profile() {

  const profileInfo = {
    avatar: "xxx",
    name: "rhs",
    introduction: "每天进步一点点",
    weixin: "weixin",
    email: 'email',
    qq: 'qq',
    university: "university",
    hometown: 'hometown',
    grade: 'grade'
  }

  const mycardRef = useRef(null)

  return (
    <div className="w-[300px] h-[600px] mr-[30px] px-[10px] py-[10px] fixed top-[100px] rounded-lg bg-baseColor text-baseColor">
      <div className="px-[20px] py-[20px]" ref={mycardRef} id="mycard">
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
          <h3 className='text-[22px] font-bold text-primary mt-[5px]'>{profileInfo.name}</h3>
          <p className="text-[12px]">
            <span>{profileInfo.introduction}</span>
          </p>
        </div>
        <div className="border border-dashed my-[20px]"></div>
        <div className="px-[30px] flex items-center justify-evenly">
          <a title={`wx:${profileInfo.weixin}`}>
            <Wechat className="custom-svg" />
          </a>
          <a title="github:ruhangs" href="https://github.com/Ruhangs">
            <Github className="custom-svg" />
          </a>
          <a title={`email:${profileInfo.email}`} href={`Mailto:${profileInfo.email}?Subject=邮箱标题&amp;Body=邮箱内容！`}>
            <Mail className="custom-svg" />
          </a>
          <a title={`QQ:${profileInfo.qq}`}>
            <QQ className="custom-svg" />
          </a>
        </div>
        <div className="border border-dashed my-[20px]"></div>

        <div className='flex justify-between h-[30px] leading-[30px]'>
          <span>毕业院校</span>
          <span className='text-[#747474]'>{profileInfo.university}</span>
        </div>
        <div className='flex justify-between h-[30px] leading-[30px]'>
          <span>所在城市</span>
          <span className='text-[#747474]'>{profileInfo.hometown}</span>
        </div>
        <div className='flex justify-between h-[30px] leading-[30px]'>
          <span>年级</span>
          <span className='text-[#747474]'>{profileInfo.grade}</span>
        </div>

        <div className="border border-dashed my-[20px]"></div>

        <div className="w-9/12 h-[40px] mx-auto bg-primary text-center leading-[40px] rounded-full">
          <a className="button" href={`Mailto:${profileInfo.email}?Subject=邮箱标题&amp;Body=邮箱内容！`}>联系我</a>
        </div>
      </div>
    </div>
  )

}