"use client"
import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { Back, Home, Git, Light, Dark, Login } from '@/assets/svg'
// import { changeTheme } from "@/redux/features/themeSlice";
// import { useAppDispatch } from "@/redux/hooks";

export default function Nav() {

  const headerRef = useRef<HTMLInputElement>(null)
  const menuListRef = useRef<HTMLInputElement>(null)
  const pathName = usePathname()

  const [theme, setTheme] = useState<String>("system");
  // const dispatch = useAppDispatch()

  useEffect(() => {
    switch (theme) {
      case 'dark':
        document.documentElement.className = 'theme-dark'
        break;
      case 'system':
        window.matchMedia('(prefers-color-scheme: dark)').matches
          ? setTheme("dark")
          : setTheme("light")
        break;
      case 'light':
        document.documentElement.className = 'theme-light'
        break;

      default:
        break;
    }
  }, [theme])

  return (
    <div className={pathName === '/login' || pathName === '/register' ? "hidden" : ""}>
      <div className="fixed z-[10] bg-baseColor w-full h-[70px] shadow-lg" ref={headerRef}>
        <div className="ml-[60px]" onClick={() => history.back()}>
          <Back className="hidden" />
        </div>
        <div className="w-9/12 mx-auto flex justify-between items-center">
          <div>
            <Link href={"/"}>
              <Home width="170" height="50" className="custom-svg" />
            </Link>
          </div>
          <div >
            {/* <!-- 列表 --> */}
            <div className="flex justify-between  items-center h-[70px]" ref={menuListRef}>
              {/* <div className='w-[200px] h-[30px] mr-[40px] border rounded-xl leading-[30px] '>
                <span className='text-baseColor text-sm ml-[10px]'>请输入。。。。</span>
              </div> */}
              {/* <!-- 栏目 --> */}
              <ul className={pathName === '/dashboard' || new RegExp("\/dashboard\/.+").test(pathName) ? "hidden" : "flex justify-between items-center text-[18px] font-normal text-baseColor w-[300px] mr-[40px]"} id='nav' >
                <li className={pathName === '/' ? "active" : ""}><Link href={"/"}>首 页</Link></li>
                <li className={pathName === '/Blog' || new RegExp("\/Blog\/.+").test(pathName) ? "active" : ""}><Link href={"/Blog"}>博 客</Link></li>
                <li className={pathName === '/Note' || new RegExp("\/Note\/.+").test(pathName) ? "active" : ""}><Link href={"/Note"}>笔 记</Link></li>
                <li className={pathName === '/Project' || new RegExp("\/Project\/.+").test(pathName) ? "active" : ""}><Link href={"/Project"}>项 目</Link></li>
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
                  <Git width="20" height="20" className="custom-svg" />
                </a>
              </div>
              <div className='ml-[30px]'>
                <Link href={"/dashboard"}><Login className="custom-svg" width="20" height="20" /></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
