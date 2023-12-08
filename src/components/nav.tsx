"use client"
import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import { Home, Git, Light, Dark, Login, Menu } from '@/assets/svg'
import DialogDemo from './search';

export default function Nav() {

  const headerRef = useRef<HTMLInputElement>(null)
  const menuListRef = useRef<HTMLInputElement>(null)
  const pathName = usePathname()

  const [theme, setTheme] = useState<String>("system");

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

  const [menuHidden, setmenuHidden] = useState<boolean>(true)

  const handleClick = () => {
    setmenuHidden(!menuHidden)
  }

  return (
    <div className={pathName === '/login' || pathName === '/register' ? "hidden" : ""}>
      <div className="fixed z-[10] bg-baseColor w-full h-[70px] shadow-lg" ref={headerRef}>
        <div className="w-full h-[70px] px-[20px] lg:w-11/12 lg:mx-auto flex justify-between items-center">
          <div>
            <Link href={"/"}>
              <Home width="150" height="50" className="fill-baseColor" />
            </Link>
          </div>
          <div onClick={handleClick}>
            <Menu className="block fill-baseColor md:hidden" />
            {/* <!-- 列表 --> */}
            <div className={`${menuHidden ? "max-md:hidden" : "max-md:bg-baseColor max-md:border max-md:rounded-lg max-md:w-[30vw] max-md:absolute max-md:top-[70px] max-md:right-[10px] max-md:text-center max-md:p-[10px]"} md:flex md:justify-between md:items-center md:h-[70px]`} ref={menuListRef}>
              {/* <!-- 栏目 --> */}
              <ul className={pathName === '/dashboard' || new RegExp("\/(dashboard|editor)\/.+").test(pathName) ? "hidden" : "md:flex md:justify-between md:items-center text-[18px] font-normal text-baseColor md:w-[300px] md:mr-[40px]"} id='nav' >
                <li className={`${pathName === '/' ? "active" : "hover:text-primary"} max-md:h-[6vh]`}><Link href={"/"}>首 页</Link></li>
                <li className={`${pathName === '/Blog' || new RegExp("\/Blog\/.+").test(pathName) ? "active" : "hover:text-primary"} max-md:h-[6vh]`}><Link href={"/Blog"}>博 客</Link></li>
                <li className={`${pathName === '/Note' || new RegExp("\/Note\/.+").test(pathName) ? "active" : "hover:text-primary"} max-md:h-[6vh]`}><Link href={"/Note"}>笔 记</Link></li>
                <li className={`${pathName === '/Project' || new RegExp("\/Project\/.+").test(pathName) ? "active" : "hover:text-primary"} max-md:h-[6vh]`}><Link href={"/Project"}>项 目</Link></li>
              </ul>
              {/* <!-- 开关灯 --> */}
              <div className='flex max-md:justify-evenly max-md:w-[20vw] max-md:mx-auto max-md:mt-[5px]'>
                <DialogDemo></DialogDemo>
                <div className="h-[20px] w-[20px] flex justify-center align-middle cursor-pointer" id="myRadio" >
                  <div className='text-baseColor'>
                    <Light width="18" height="18" className={theme === 'light' ? "custom-svg" : "hidden"} onClick={() => setTheme("dark")} />
                    <Dark width="18" height="18" className={theme === 'dark' ? "custom-svg" : "hidden"} onClick={() => setTheme("light")} />
                  </div>
                </div>
                <div className='max-md:ml-0 ml-[30px]'>
                  <a href='https://github.com/Ruhangs/RHS-Bolg'>
                    <Git width="20" height="20" className="custom-svg" />
                  </a>
                </div>
              </div>

              <div className='max-md:hidden md:ml-[30px]'>
                <Link href={"/dashboard"}><Login className="custom-svg" width="20" height="20" /></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
