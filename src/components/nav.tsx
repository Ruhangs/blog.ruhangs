"use client"
import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, usePathname } from 'next/navigation';
import { Back, Home, Git, Light, Dark } from '@/assets/svg'

export default function Nav() {

  const headerRef = useRef<HTMLInputElement>(null)
  const miniMenuRef = useRef<HTMLInputElement>(null)
  const menuListRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const pathName = usePathname()

  // const themes = ["light", "dark"];
  const [theme, setTheme] = useState<String>("system");

  useEffect(() => {
    let root = document.querySelector(':root')
    let radio = document.querySelector('#myRadio')
    if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setTheme("dark")
      document.documentElement.classList.add('theme-dark')
    } else {
      document.documentElement.classList.remove('theme-dark')
    }

  }, [theme])


  // 手机端打开列表
  const openList = () => {
    if (miniMenuRef.current?.classList.contains('active')) {
      miniMenuRef.current.classList.remove('active')
      menuListRef.current?.classList.remove('active')
    } else {
      miniMenuRef.current?.classList.add('active')
      menuListRef.current?.classList.add('active')
    }
  }

  return (
    <>
      <div className="position: fixed z-[2] flex items-center top-0 bg-base w-full h-[70px] shadow-lg" ref={headerRef}>
        <div className="ml-[60px]" onClick={() => history.back()}>
          <Back className="hidden" />
        </div>
        <div className="w-9/12 mx-auto flex justify-between items-center">
          <div>
            <Link href={"/"}>
              <Home width="140" height="40" className="custom-svg" />
            </Link>
          </div>


          {/* <!-- 右边操作栏 --> */}
          <div >
            {/* <!-- 按钮 -->
            <div className="min-w-[40px]" ref={miniMenuRef} id="minmenu" onClick={openList}>
              <span className="hidden h-0 w-[40px] rounded-sm relative"></span>
            </div> */}

            {/* <!-- 列表 --> */}
            <div className="flex justify-between  items-center h-[70px]" ref={menuListRef}>
              <div className='w-[200px] h-[30px] mr-[40px] border rounded-xl leading-[30px] '>
                <span className='text-baseColor text-sm ml-[10px]'>请输入。。。。</span>
              </div>
              {/* <!-- 栏目 --> */}
              <ul className="flex justify-between items-center text-[18px] text-baseColor font-medium w-[300px]  font-serif mr-[40px]" id='nav' >
                <li className={pathName === '/' ? "active" : ""}><Link href={"/"}>首页</Link></li>
                <li className={pathName === '/Blog' ? "active" : ""}><Link href={"/Blog"}>博客</Link></li>
                <li className={pathName === '/Note/1' ? "active" : ""}><Link href={"/Note/1"}>笔记</Link></li>
                <li className={pathName === '/Project' ? "active" : ""}><Link href={"/Project"}>项目</Link></li>
              </ul>
              {/* <!-- 开关灯 --> */}
              <div className="h-[20px] w-[20px] flex justify-center align-middle cursor-pointer" id="myRadio" >
                <div className='text-baseColor'>
                  <Light width="18" height="18" className={theme === 'light' ? "custom-svg" : "hidden"} onClick={() => setTheme("dark")} />
                  <Dark width="18" height="18" className={theme === 'dark' ? "custom-svg" : "hidden"} onClick={() => setTheme("light")} />
                </div>
              </div>
              <div className='ml-[30px]'>
                <a href='https://github.com/Ruhangs/RHS-Bolg'>
                  <Git width="19" height="19" className="custom-svg" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
